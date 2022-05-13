<template>
	<div id ="userInfo">
		<UserInfo/>
	</div>
	<h3 id="bienvenue"> Bienvenue sur le forum, échangez avec vos collaborateurs dès maintenant ! </h3>
    <div id="newPost">
		<form @submit="newPost()">
			<label for= "content"> Post</label> : <input type= "postcontent" v-model="postcontent" placeholder="Postez quelquechose ..."/>
			<!--<input type="file" accept="image/png, image/jpeg" Parcourir.../>-->
			<input type="submit" value="Publier"/>
		</form>
    </div>
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
	<!--<Alert :status="statusAlert" :message="messageAlert" :show="showAlert" />-->
	</div>
</template>

<script>
import OnePost from '@/components/OnePost.vue'
import UserInfo from '@/components/UserInfo.vue'
import axios from 'axios'
import { mapState } from 'vuex'

export default {
	name: 'ForumView',
	components:{
		OnePost,
		UserInfo,
	},
	data(){
		return{
			posts: [],
			user_id: '',
			likes: [],
			comments:[],
			postcontent: '',
			token: '',
		}
	},
	computed: {
		...mapState('now', ['now']),
	},
	methods:{
		newPost() {
			console.log(this.token);
			axios
				.post('http://localhost:8080/api/posts/create', {post_content : this.postcontent, token: this.token, dateVue: this.now})
				.then(res=>{
					let newpost = res.data[0];
					newpost.comment_count = 0;
					newpost.like_count = 0;
					this.posts.unshift(newpost);
				});
		},
		newComment(id, content) {
		/**/let user_id = localStorage.getItem("userId");
			axios
				.post('http://localhost:8080/api/comments/', {comment_content : content, comment_user_id : user_id, comment_post_id : id})
				.then(res=>{
					let newcomment = res.data[0];
					this.comments.push(newcomment);
					let postToUpdateIndex = this.posts.findIndex(post => post.id_post == id);
					this.posts[postToUpdateIndex].comment_count = ++ this.posts[postToUpdateIndex].comment_count;
				});
		},
		addLike(post_id){
		/**/let user_id = localStorage.getItem("userId");
			axios
				.post('http://localhost:8080/api/likes/'+post_id+"/"+user_id)
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
		/**/let user_id = localStorage.getItem("userId");
			axios
				.delete('http://localhost:8080/api/likes/'+post_id+"/"+user_id)
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
				.delete('http://localhost:8080/api/posts/'+id)
				.then(res=>{
					if(res){
						let postToRemove = this.posts.find(post => post.id_post === id);
						let indexPostToDelete = this.posts.indexOf(postToRemove);
						this.posts.splice(indexPostToDelete, 1);
					}
				});
		},
		deleteComment(id, post_id){
			console.log(id);
			axios
				.delete('http://localhost:8080/api/comments/'+id)
				.then(res=>{
					if(res){
						let commentToRemove = this.comments.find(comment => comment.id_comment === id);
						let indexCommentToDelete = this.posts.indexOf(commentToRemove);
						this.comments.splice(indexCommentToDelete, 1);
						let postToUpdate = this.posts.find(post => post.id_post == post_id);
						postToUpdate.comment_count = --postToUpdate.comment_count;
					}
				});
		}
	},
	mounted(){
		this.token = localStorage.getItem("token");
		axios 
			.get('http://localhost:8080/api/likes/')
			.then (res=>{
				this.likes = res.data;
			});
		axios 
			.get('http://localhost:8080/api/comments/')
			.then (res=>{
				this.comments = res.data;
			});
		axios
			.get('http://localhost:8080/api/posts/getAll')
			.then(res =>{
				let preposts = res.data;
				
				preposts.forEach(post=>{
					post.like_count = 0;
					post.comment_count = 0;
					post.alreadyLiked = false;

				
				/**/let user_id = localStorage.getItem("userId");

					this.likes.forEach(like=>{
						if(like.like_post_id==post.id_post){
							post.like_count= ++post.like_count;
						}
				
					this.likes.forEach(like=>{		
						if(like.like_post_id==post.id_post && like.like_user_id == user_id){
							post.alreadyLiked = true;
						}
					});
				});
			
					this.comments.forEach(comment=>{
						if(comment.comment_post_id==post.id_post){
							post.comment_count= ++post.comment_count;
						}			
				});
				console.log(preposts);
				this.posts = preposts;	
				});
			})		
	}	
}				
</script>

<style>
	input {
		border : solid 1px black;
	}
	#newPost{
		padding: 20px;
	}
</style>