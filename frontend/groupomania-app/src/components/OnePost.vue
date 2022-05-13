<template>
		<div class="post post-container">
			<!--<p> {{now}}</p>-->
			<div class="post-header">
				<span class="post-pseudo-head"><p class="post-pseudo-label">Publié par </p> <p class="post-pseudo"> {{post.pseudo}}</p></span>	
				<p class="post-date">{{formatDatePost(post.post_datetime)}}</p>
			</div>
			
			<div class ="post-content">
				<p>{{post.post_content}}</p>
			</div>

			<div class= "post-actions">
				<button class="btn-liked" v-if="this.post.alreadyLiked" @click="$emit('removeLike', this.post.id_post)">J'aime ({{post.like_count}})</button>
				<button class="btn-like" v-else @click="$emit('newLike', this.post.id_post)">J'aime ({{post.like_count}})</button>
				<button class="btn-comment" @click="this.showCommentForm = !this.showCommentForm">Commenter</button>
				<button class="btn-showcomments" v-show="this.post.comment_count!==0" @click="displayComments()">Commentaires ({{post.comment_count}}) </button>
				<button class="btn-delete" v-if="this.$store.state.isAdmin" @click="$emit('deletePost', this.post.id_post)"> Supprimer</button>
			</div> 
			<div class="new-comment" v-if="showCommentForm">
				<form @submit="$emit('newComment', this.post.id_post, comment_content)">
						<label for= "content"> Ajouter un commentaire</label> : <input type= "content" id= "content" v-model= "comment_content" />
						<input class="btn-sumbit" type="submit" value="Publier">
				</form>
			</div>
			<div v-if="showComments" class="comments comments-container">
				<div class="comment-container" v-for="(comment, index) in commentsByPost" v-bind:key="index">
					<div class="comment-header">
						<span class="comment-pseudo-head"><p class="comment-pseudo"> {{comment.pseudo}}</p><p class="comment-date">{{formatDatePost(comment.comment_datetime)}}</p></span>		
					</div>
					<p> {{comment.comment_content}}</p>
					<button class="btn-delete" v-if="this.$store.state.isAdmin" @click="$emit('deleteComment', comment.id_post, this.post.id_post)"> Supprimer</button>
				</div>	
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
		commentsByPost(){
			let commentsByPost = this.comments.filter(comment => comment.comment_post_id == this.post.id_post);
			console.log(commentsByPost);
			return commentsByPost;
		},
		...mapState("isAdmin"),
    },
	data(){
		return{
			showComments : false,
			showCommentForm : false,
			comment_content: '',
		}
	},
	methods:{	
		displayComments(){
			return this.showComments = !this.showComments;
		},
		formatDatePost(dateSQL){
			// 	return '';
			// }
			// let now = this.now;
			// let deltaTime = now - dateVue;
			// console.log(now, dateVue);
			// console.log(deltaTime);
			// if (deltaTime < 60000){
			// 	return ("quelques secondes");
			// }else if (deltaTime < 60000 * 60){
			// 	return (Math.ceil(deltaTime / 60000) + " min.");
			// }else if (deltaTime < 60000 * 60 * 24){
			// 	return (Math.ceil(deltaTime / 60000 /60) + " h.");
			// }else if (deltaTime < 60000 * 60 * 24 * 7){
			// 	return (Math.ceil(deltaTime / 60000 /60 / 24) + " j.");
			// }else if (deltaTime < 60000 * 60 * 24 * 7 * 52){
				let table_month = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
				var sYear = parseInt(dateSQL.slice(0,5));
				var sMonth = parseInt(dateSQL.slice(5,7))-1;
				var sDay = parseInt(dateSQL.slice(8,10));
				var sHour = parseInt(dateSQL.slice(11,13))+4;
				var sMinute = parseInt(dateSQL.slice(14,16));
				
				return (sDay+" "+table_month[sMonth]+" "+sYear+", "+sHour+":"+sMinute);
			// var sSec = parseInt(date.slice(17,19));
			// let deltaYear = now.getFullYear()-sYear;
			// let deltaMonth = (now.getMonth()+1)-sMonth;
			// let deltaDay = now.getDate()-sDay;
			// let deltaHour = now.getHours()-sHour;
			// let deltaMinute = now.getMinutes()-sMinute;
			// let deltaSec = now.getSeconds()-sSec;
			// console.log(deltaYear,deltaMonth,deltaDay,deltaHour,deltaMinute);
			// if(deltaYear > 1 || (deltaYear==1 && deltaMonth >= 1)){
			// 	return ("il y a plus d'un an");
			// }
			// else if(deltaMonth > 1 || (deltaMonth==1 && deltaDay >= 1)){
			// 	return ("il y a "+deltaMonth+" mois");
			// 	}
			// 	else if(deltaDay > 1 || (deltaDay==1 && deltaHour >= 1)){
			// 		return ("il y a "+deltaDay+" jours");
			// 		}
			// 		else if(deltaHour > 1 || (deltaHour==1 && deltaMinute >= 1)){
			// 			return ("il y a "+deltaHour+" heures");
			// 			}
			// 			else if(deltaHour ==1){}
			// 			else if (deltaMinute > 1 || (deltaMinute==1 && deltaSec >= 1)){
			// 				return ("il y a "+deltaMinute+" minutes");
			// 				}
			// 				// else if ((this.now.getMinutes()-sMinute)>1){
			// 				// 	return ("il y a "+(this.now.getMinutes()-sMinute)+" minutes");
			// 				// }
			// 				return ("il y a quelques secondes");
			}
	},
}
</script>

<style lang="scss">
	.post-container{
		background-color: #ffdbdb;
		margin-bottom: 70px;
		// border-radius: 20px;
		//display: flex;
		max-width: 80%;
		margin-left: auto;
		margin-right: auto;
		box-shadow: 0 12px 10px 0 #ffebea, 0 12px 10px 0 #fff6f5;
	}
	.comment-container{
		border: 1px, solid, grey;
	}
	.post-header, .comment-header{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: baseline;
		height: 30px;
		margin-left: 20px;

	}
	.post-pseudo-head{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		gap: 10px;
	}
	.comment-pseudo-head{
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	.post-pseudo, .comment-pseudo{
		color:#fc1c00;
	}
	.post-date, .comment-date{
		font-size: smaller;
		color:  grayscale($color: #00000087);
		margin-right: 20px;
	}
	.post-content{
		background-color: #ffffff;
		border: solid, 1px;
		min-height: 50px;
		p{
			padding-top:15px;
		}
	}
	.comment-container{
		border-bottom: 2px solid #ffdbdb;
		background-color: #ffffff;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		padding: 5px;
	}
	.post-actions{
		background-color: #ffffff;
		border-bottom: 2px solid #ffdbdb;

	}
	.btn-liked{
		background-color: #fc1c00;
		color: #ffffff;
		&:hover{
			background-color: #fc1c00;
		color: #ffffff;
		}
	}
</style>