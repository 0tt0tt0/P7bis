<template>
	<form @submit="onSubmit('forum')">
		<p>
			<label for= "content"> Commentaire</label> : <input type= "content" id= "content" v-model= "content" />
			<input type="submit" value="Publier">
		</p>
	</form>
	<!--<Alert :status="statusAlert" :message="messageAlert" :show="showAlert" />-->
</template>

<script>
import axios from 'axios'

export default {
	name: 'NewComment',
	props: {
		//msg:String,
	},
	components:{
	},
	data(){
		return{
			//statusAlert: '',
			//showAlert: false, 
			//showForm: true,
			//myToken: '',
			content: '',
			user_id: '',
			//form: { },
		}
	},
	methods:{
		onSubmit(route) {
			let user_id = localStorage.getItem("userId");
			//event.preventDefault()
			axios
				.post('http://localhost:8080/api/comments/create', {comment_content : this.content, comment_user_id : user_id})
			this.$router.push(route);
		} 
	}
}
</script>

<style>
	input {
		border : solid 1px black;
	}
</style>