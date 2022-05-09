<template>
		<div class="post-container">
			<p> {{now}}</p>
			<strong>{{post.pseudo}}</strong>
			<p>{{post.post_content}}</p>
			<p> Publié {{formatDatePost(post.post_datetime)}}</p>

			<button v-if="this.post.alreadyLiked" @click="$emit('removeLike', this.post.id_post)"> DisLiker ({{post.like_count}}) </button>
			<button v-else @click="$emit('newLike', this.post.id_post)"> Liker ({{post.like_count}}) </button>
			
			<div v-if="this.post.comment_count==0"><p>Pas de commentaires</p></div>
			<div v-else>
				<button v-if="!showComments" @click="displayComments()">Afficher les commentaires ({{post.comment_count}})</button>
				<button v-if="showComments" @click="showComments = !showComments" >Masquer les commentaires</button>
			</div>

			<div v-if="showComments" class="comment-container">
				<div v-for="(comment, index) in commentsByPost" v-bind:key="index">

					<strong>{{comment.pseudo}}</strong>
					<p> {{comment.comment_content}}</p>
					<p>{{formatDatePost(comment.comment_datetime)}}</p>
				</div>	
			</div>
			<form @submit="$emit('newComment', this.post.id_post, comment_content)">
				<p>
					<label for= "content"> Ajouter un commentaire</label> : <input type= "content" id= "content" v-model= "comment_content" />
					<input class="btn-sumbit" type="submit" value="Publier">
				</p>
			</form>
		</div>
</template>

<script>

export default {
	name: 'OnePost',
	props: {
		post:{
			type: Object,
		},
		comments: {
			type: Array,
		}
	},
	computed:{
		commentsByPost(){
			let commentsByPost = this.comments.filter(comment => comment.comment_post_id == this.post.id_post);
			console.log(commentsByPost);
			return commentsByPost;
		},
    },
	data(){
		return{
			showComments : false,
			comment_content: '',
		}
	},
	methods:{	
		displayComments(){
			return this.showComments = !this.showComments;
		},
		formatDatePost(date){
			if(!date){
				return '';
			}
			// let now = this.now;

			var sYear = parseInt(date.slice(0,4));
			var sMonth = parseInt(date.slice(6,7));
			var sDay = parseInt(date.slice(9,10));
			var sHour = parseInt(date.slice(11,13));
			var sMinute = parseInt(date.slice(14,16));
			return ("le "+sDay+"/"+sMonth+"/"+sYear+" à "+sHour+"h"+sMinute); 
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