<template>
	
	<div id="forum-header">
		<NavLink/>
		<span id="bonjour"><h2> Bonjour,</h2><h2 class="text-orange">{{this.$store.state.user.pseudo}} </h2></span>
	</div>
	<form @submit="newPost" id="newPost">
		<label class="post-title" for= "content"> Postez quelquechose   <b-icon-chat-dots-fill /> </label><textarea  required="required" maxlength="400" minlength="4" rows="6" cols="30" wrap="hard" v-model="postcontent" placeholder="Ecrivez ici ..." ></textarea>
		<!--<input type="file" accept="image/png, image/jpeg" v-on:="imageUrl" Parcourir.../>-->
		<p class="text-orange">{{this.postcontent.length}} / 400</p>
		<div id="btn-form">
			<input id="btn-newpost" type="submit" value="Publier"/>
			<input type="reset" value="Effacer"/>
		</div>
	</form>
	<div id="displayPosts">
		<OnePost v-for="post in posts"
			v-bind:key="post.id_post"
			v-bind:post="post"
			v-bind:comments="comments"
			v-on:deletePost="deletePost"
			v-on:deleteComment="deleteComment"
			v-on:newLike="addLike"
			v-on:removeLike="removeLike"
			v-on:newComment="newComment"
		></OnePost>	
	<button id="goUpForum" type=" button" @click="goUp"><b-icon-arrow-up-circle-fill /></button>
	</div>
</template>

<script>
import OnePost from '@/components/OnePost.vue'
import NavLink from '@/components/NavLink.vue'
import axios from 'axios'


import { mapState } from 'vuex'

export default {
	name: 'ForumView',
	components:{
    OnePost,
    NavLink,

},
	data(){
		return{
			posts: [],
			likes: [],
			comments:[],
			postcontent: '',
			token: '',
		}
	},
	computed: {
		...mapState(['user'],),
	},
	methods:{
		goUp(){
			window.scrollTo(0, 0);
		},
		newPost() {
			axios
				.post('http://localhost:8080/api/posts/create', {post_content : this.postcontent, dateVue: "today"}, {headers:{"Authorization": "Bearer "+this.token}})
				.then(res=>{
					let newpost = res.data[0];
					newpost.comment_count = 0;
					newpost.like_count = 0;
					this.posts.unshift(newpost);
					this.postcontent = '';
				});
		},
		newComment(id, content) {
			axios
				.post('http://localhost:8080/api/comments/', {comment_content : content, comment_post_id : id}, {headers:{"Authorization": "Bearer "+this.token}})
				.then(res=>{
					let newcomment = res.data[0];
					this.comments.push(newcomment);
					let postToUpdateIndex = this.posts.findIndex(post => post.id_post == id);
					this.posts[postToUpdateIndex].comment_count = ++ this.posts[postToUpdateIndex].comment_count;
				});
		},
		addLike(post_id){
			axios
				.post('http://localhost:8080/api/likes/'+post_id, "",{headers:{"Authorization": "Bearer "+this.token}})
				.then(res=>{
					if(res){
						let postToUpdate = this.posts.find(post => post.id_post === post_id);
						let indexPostToUpdate = this.posts.indexOf(postToUpdate);
						postToUpdate.alreadyLiked = true;
						postToUpdate.like_count = ++postToUpdate.like_count;
						this.posts.splice(indexPostToUpdate, 1, postToUpdate);
					}
				});
		},
		removeLike(post_id){
			axios
				.delete('http://localhost:8080/api/likes/'+post_id, {headers:{"Authorization": "Bearer "+this.token}})
				.then(res=>{
					if(res){
						let postToUpdate = this.posts.find(post => post.id_post === post_id);
						let indexPostToUpdate = this.posts.indexOf(postToUpdate);
						postToUpdate.alreadyLiked = false;
						postToUpdate.like_count = --postToUpdate.like_count;
						this.posts.splice(indexPostToUpdate, 1, postToUpdate);
					}
				});
		},
		deletePost(id){
			axios
				.delete('http://localhost:8080/api/posts/'+id, {headers:{"Authorization": "Bearer "+this.token}})
				.then(res=>{
					if(res){
						let postToRemove = this.posts.find(post => post.id_post === id);
						let indexPostToDelete = this.posts.indexOf(postToRemove);
						this.posts.splice(indexPostToDelete, 1);
					}
				});
		},
		deleteComment(id){
			axios
				.delete('http://localhost:8080/api/comments/'+id, {headers:{"Authorization": "Bearer "+this.token}})
				.then(res=>{
					if(res){
						let commentToRemove = this.comments.find(comment => comment.idcomment === id);
						let postToUpdate = this.posts.find(post => post.id_post == commentToRemove.comment_post_id);
						postToUpdate.comment_count = --postToUpdate.comment_count;
						let indexCommentToDelete = this.comments.indexOf(commentToRemove);
						this.comments.splice(indexCommentToDelete, 1);
						
					}
				});
		}
	},
	mounted(){
		this.token = localStorage.getItem("token");
		axios 
			.get('http://localhost:8080/api/users/one', {headers:{"Authorization": "Bearer "+this.token}})
			.then (res=>{
				this.$store.state.user = res.data;
			});
		axios 
			.get('http://localhost:8080/api/likes/', {headers:{"Authorization": "Bearer "+this.token}})
			.then (res=>{
				this.likes = res.data;
			});
		axios 
			.get('http://localhost:8080/api/comments/', {headers:{"Authorization": "Bearer "+this.token}})
			.then (res=>{
				this.comments = res.data;
			});
		axios
			.get('http://localhost:8080/api/posts/getAll', {headers:{"Authorization": "Bearer "+this.token}})
			.then(res =>{
				let preposts = res.data;
				
				preposts.forEach(post=>{
					post.like_count = 0;
					post.comment_count = 0;
					post.alreadyLiked = false;

					this.likes.forEach(like=>{
						if(like.like_post_id==post.id_post){
							post.like_count +=1;
							if(like.like_user_id == this.$store.state.user.id_user){
							post.alreadyLiked = true;
						}
						}
					});
			
					this.comments.forEach(comment=>{
						if(comment.comment_post_id==post.id_post){
							post.comment_count+=1;
						}			
					});
					console.log(preposts);
					this.posts = preposts;	
				});
			})		
	}	
}				
</script>

<style lang="scss">

	#bonjour{
        display: flex;
        flex-direction: row;
        gap: 10px;
        justify-content: center;
		animation: 1500ms 0s getin;
		animation-fill-mode: backwards;
    }
	@keyframes getin{
		from{
			opacity:0;
			transform: translateX(100px);
		}
		to{
			opacity:1;
			transform: translateX(0px);
		}
	}
	textarea{
		border-radius: 10px;
		resize: none;
		padding: 10px;
		font-weight: bold;
		text-align: center;
		margin: 15px;
	}
	#newPost{
		display: flex;
		flex-direction: column;
		background-color: white;
		border-radius: 20px;
		margin-top: 40px;
		margin-bottom: 40px;
		box-shadow: 0 12px 10px 0 #ffebea, 0 12px 10px 0 #fff6f5;
		max-width: 60%;
		margin-left: auto;
		margin-right: auto;
		margin-top: 10px;
		margin-bottom: 40px;
		z-index:0;
		overflow: hidden;	
		& > p{
			margin-top: 0px;
			margin-bottom: 0px;
			font-size: smaller;
			font-weight: bold;
		}	
	}
	#goUpForum{
		border-radius:100%;
		padding:10px;
	}
	#btn-form{
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.post-title{
		font-weight: bold;
		color: white;
		background-color: #fc1c00;
		padding: 10px;
	}
	

</style>