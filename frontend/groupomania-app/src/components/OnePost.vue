<template>
	<div class="post post-container">
		<div class="post-header">
			<span class="post-pseudo-head"><p class="post-pseudo-label">Publié par </p> <p class="post-pseudo"> {{post.pseudo}}</p></span>	
			<p class="post-date">{{formatDatePost(post.post_datetime)}}</p>
		</div>
		
		<div class ="post-content">
			<p>{{post.post_content}}</p>
		</div>

		<div class= "post-actions">
			<button class="btn-liked" v-if="this.post.alreadyLiked" @click="$emit('removeLike', post.id_post)"><b-icon-hand-thumbs-up-fill /> {{post.like_count}}</button>
			<button class="btn-like" v-else @click="$emit('newLike', this.post.id_post)"><b-icon-hand-thumbs-up /> {{post.like_count}} </button>

			<span v-if="!showCommentForm"><button class="btn-comment" @click="this.showCommentForm = !this.showCommentForm, this.showComments=true">Commenter</button></span>
			<span v-else><button class="btn-comment--shown" @click="this.showCommentForm = !this.showCommentForm">Commenter</button></span>

			<span v-if="!showComments"><button class="btn-showcomments" v-show="this.post.comment_count!==0" @click="displayComments()"><b-icon-chat /> {{post.comment_count}} </button></span>
			<span v-else><button class="btn-showcomments--shown" v-show="this.post.comment_count!==0" @click="displayComments()"><b-icon-chat-fill /> {{post.comment_count}} </button></span>
			
			<button class="btn-delete" v-if="this.$store.state.user.admin==1" @click="$emit('deletePost', this.post.id_post)"> Supprimer</button>
		</div> 

		<div class="new-comment" v-if="showCommentForm">
			<form @submit="$emit('newComment', this.post.id_post, comment_content), reset()">
					<label id="label-comment" for= "content"> Commentaire</label> : <input type= "content" id= "content" v-model= "comment_content" maxlength="100"/>
					<input class="btn-sumbit" type="submit" value="Publier">
					
			</form>
		</div>

		<div v-if="showComments" class="comments comments-container">
			<span id="top-container"></span>
			<div class="comment-container" v-for="(comment, index) in comments.filter(comment => comment.comment_post_id == this.post.id_post)" v-bind:key="index">
				<div class="comment-header">
					<span class="comment-pseudo-head"><p class="comment-pseudo"> {{comment.pseudo}}</p><p class="comment-date">{{formatDatePost(comment.comment_datetime)}}</p></span>		
				</div>
				<p> {{comment.comment_content}}</p>
				<button class="btn-delete" v-show="this.$store.state.user.admin==1" @click="$emit('deleteComment', comment.idcomment)"> Supprimer</button>
			</div>
			<span id="bottom-container"><button id="goUpComments" type=" button" @click="goUp"><b-icon-arrow-up-circle-fill /></button></span>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'OnePost',
	props: {
		post:{
			type: Object,
		},
		comments: {
			type: Array,
		},
	},
	computed:{
		...mapState(["user"]),
    },
	data(){
		return{
			showComments : false,
			showCommentForm : false,
			comment_content: '',
			comments_shown: false,
		}
	},
	methods:{
		goUp(){
			document.getElementById("top-container").scrollIntoView({behavior: "smooth", block: "center", inline: "start"});
			this.showComments=false;
		},
		reset(){
			this.comment_content = '';
			this.showCommentForm= false;
			this.showComments=true;
			document.getElementById("bottom-container").scrollIntoView({behavior: "smooth", block: "center", inline: "end"});
		},
		displayComments(){
			this.showComments = !this.showComments;
			if(this.showComments==false){
				document.getElementById("top-container").scrollIntoView({behavior: "smooth", block: "center", inline: "start"})	
			}	
		},
		formatDatePost(dateSQL){
			let table_month = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
			var sYear = dateSQL.slice(0,4);
			var sMonth = parseInt(dateSQL.slice(5,7))-1;
			var sDay = dateSQL.slice(8,10);
			var sHour = dateSQL.slice(11,13);
			var sMinute = dateSQL.slice(14,16);
			
			return (sDay+" "+table_month[sMonth]+" "+sYear+", "+sHour+":"+sMinute);
		},
	}
}
</script>

<style lang="scss">

	.post-container{
		margin-bottom: 70px;
		border-radius: 20px;
		//display: flex;
		max-width: 80%;
		margin-left: auto;
		margin-right: auto;
		box-shadow: 0 12px 10px 0 #ffebea, 0 12px 10px 0 #fff6f5;
		animation:  2s 0s fadein;
		animation-fill-mode: backwards;
		overflow: hidden;
	}
	.post-header{ 
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: baseline;
		height: 30px;
		padding-left: 20px;
		padding-right: 20px;
		height: min-content;
		background-color: #ffdbdb;
	}
	.post-pseudo-head{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		gap: 10px;
	}
	.post-pseudo, .comment-pseudo{
		color:#fc1c00;
	}
	.post-date, .comment-date{
		font-size: smaller;
		color:  grayscale($color: #00000087);
		
	}
	.post-content{
		background-color: #ffffff;
		border: solid, 1px;
		min-height: 50px;
		align-content: center;
		p{
			padding:15px;
			overflow-wrap: break-word;
		}
	}
	.post-actions{
		padding: 10px;
		background-color: #ffffff;

	}
	.btn-like, .btn-comment, .btn-showcomments, .btn-delete{
		background-color: #ffffff;
		color: #fc1c00;
	}
	.btn-showcomments--shown, .btn-comment--shown{
		&:hover{
			background-color: #fc1c00;
			color: #ffffff;
		}
	}
	.btn-liked{
		&:hover{
		background-color: #fc1c00;
		color: #ffffff;
		}
	}
	.new-comment{
		animation:  1s 0s fadeinnomove;
		animation-fill-mode: backwards;
	}
	.comment-container{
		border-top: 2px solid #ffdbdb;
		background-color: #ffffff;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-start;
		padding: 5px;
		animation:  1s 0s fadein;
		animation-fill-mode: backwards;
		& > p{
			margin-right: 70px;
			padding-right: 50px;
			padding-left: 10px;
			flex-grow: 4;
			flex-shrink:1;
			overflow: auto;
			word-break: break-all;
		}
		form{
			.btn-submit{
				&:active{
					animation: 300ms 0S shake;
				}
			}
			
		}
	}
	.comment-header{
		display: flex;
		flex-direction: row;
		align-items: space-between;
		flex-shrink: 0;
	}
	.comment-pseudo-head{
		padding-left :5px;
	}
	#label-comment{
		font-weight: bold;
	}
	#goUpComments{
		border-radius:100%;
		border: none;
		padding:0px;
		animation:  2s 0s fadeinnomove;
		animation-fill-mode: backwards;
		&:hover{
			background-color:#fc1c00;
			color:white;
		}
	}

	@keyframes fadein{
		from{
			opacity:0;
			transform: translateY(50px);
		}
		to{
			opacity:1;
			transform: translateY(0px);
		}
	}
	@keyframes fadeinnomove {
    from { opacity: 0; }
    to { opacity: 1; }
}

	
</style>