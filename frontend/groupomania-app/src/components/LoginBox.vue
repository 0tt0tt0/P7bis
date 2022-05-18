<template>
	<h2> Veuillez-vous connecter : </h2>
	<form @submit="onSubmit">
		<p id="form-container">
			<span id="email"><label for= "email" class="item"> E-mail : </label> <input type= "email" class= "item email-item" v-model= "email" autofocus/></span>
			<span id="password"><label for= "password"> Mot de passe : </label> <input type= "password" class= "item password-item" minlength="8" v-model="password" /></span>
			<input class="btn-submit" type="submit" value="Se connecter">
		</p>
	</form>
	<p id="alert" v-if="showAlert">{{messageAlert}}</p>
	<div class="register">
		<p> Pas de compte ? Enregistrez-vous !</p>
		<router-link to="/auth/register">S'enregistrer</router-link>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
	name: 'LoginBox',
	computed: {
		...mapState("isAdmin", ["isAdmin"])
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
			messageAlert: '',
		}
	},
	methods:{
		onSubmit() {
			//event.preventDefault()
			axios
				.post('http://localhost:8080/api/users/login', {email : this.email, password :this.password})
				.then(res => {
				console.log(res.data);
				//création d'un petit localStorage pour garder le token
					if (res.data.isAdmin == 1){
						this.$store.state.isAdmin = true;
						console.log(this.$store.state.isAdmin)
					}
					localStorage.setItem('token', res.data.token);
					this.$router.push('/forum');
				})
				.catch (error =>{this.showAlert = true, console.log(error.response.data.message), this.messageAlert=error.response.data.message})
			},
	}
}
</script>

<style>
	#form-container{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	#email{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	#password{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.btn-submit{
		max-width: 200px
	}
	img{
		height: 100px;
	}
	input {
		border : solid 1px black;
	}
	#alert{
		color: red;
	}
</style>