<template>
<img alt="Vue logo" src="../assets/Groupomania_Logos/groupo.gif">
	<h2> Veuillez-vous connecter : </h2>
	<form @submit="onSubmit">
		<p>
			<label for= "email"> E-mail : </label> <input type= "email" id= "email" v-model= "email" />
			<label for= "password"> Mot de passe : </label> <input type= "password" id= "password" v-model="password" />
			<input class="btn-submit" type="submit" value="Se connecter">
		</p>
	</form>
	<p v-if="resmessage!==''"> Veuillez-réessayer</p>
	<!--<Alert :status="statusAlert" :message="messageAlert" :show="showAlert" />-->
</template>

<script>
import axios from 'axios'

export default {
	name: 'LoginBox',
	props: {
		msg:String,
	},
	components:{
	},
	data(){
		return{
			statusAlert: '',
			showAlert: false, 
			showForm: true,
			//myToken: '',
			email: '',
			password: '',
			form: { },
			resmessage: '',
		}
	},
	methods:{
		onSubmit() {
			//event.preventDefault()
			axios
				.post('http://localhost:8080/api/users/login', {email : this.email, password :this.password})
				.then(res => {
				this.resmessage = res.message;
				//création d'un petit localStorage pour garder le token
					localStorage.setItem('userToken', res.data.token);
					localStorage.setItem('userId', res.data.userId);
					this.$router.push('/forum');
				})
				//.catch(() => this.msgAlert(true, "Votre mot de passe ou identifiants sont incorrects.", "danger"));
			},
	}
}
</script>

<style>
	img{
		height: 100px;
	}
	input {
		border : solid 1px black;
	}
</style>