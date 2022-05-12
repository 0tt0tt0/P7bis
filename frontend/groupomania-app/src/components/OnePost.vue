<template>
		<div class="post post-container">
			<!--<p> {{now}}</p>-->
			<div class="post-header">
				<strong>{{post.pseudo}}</strong>	
				<p>{{formatDatePost(post.post_datetime)}}</p>
			</div>
			
			<div class ="post-content">
				<p>{{post.post_content}}</p>
			</div>

			<div class= "post-react-count">
				<p v-if="this.post.like_count !==0"> Mentions j'aime ({{post.like_count}}) </p>
				<button v-show="this.post.comment_count!==0" @click="displayComments()">Commentaires ({{post.comment_count}}) </button>
			</div>

			<div class= "post-actions">
				<button class="btn-like" v-if="this.post.alreadyLiked" @click="$emit('removeLike', this.post.id_post)">DisLiker</button>
				<button class="btn-liked" v-else @click="$emit('newLike', this.post.id_post)">J'aime</button>

				<button class="btn-comment" @click="this.showCommentForm = !this.showCommentForm">Commenter</button>
				<button class="btn-delete" v-if="this.$store.state.isAdmin" @click="$emit('deletePost', this.post.id_post)"> Supprimer</button>
			</div> 
			<div class="new-comment" v-if="showCommentForm">
				<form @submit="$emit('newComment', this.post.id_post, comment_content)">
						<label for= "content"> Ajouter un commentaire</label> : <input type= "content" id= "content" v-model= "comment_content" />
						<input class="btn-sumbit" type="submit" value="Publier">
				</form>
			</div>
			<div v-if="showComments" class="comment comment-container">
				<div v-for="(comment, index) in commentsByPost" v-bind:key="index">
					<strong>{{comment.pseudo}}</strong>
					<p> {{comment.comment_content}}</p>
					<p>{{formatDatePost(comment.comment_datetime)}}</p>
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
				var sHour = parseInt(dateSQL.slice(11,13));
				var sMinute = parseInt(dateSQL.slice(14,16));
				
				return ("le "+sDay+" "+table_month[sMonth]+" "+sYear+", "+sHour+":"+sMinute);
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
		margin-bottom: 50px;
	}
	.comment-container{
		border: 1px solid #ffdbdb;
		background-color: #ffffff;
	}
</style>