<template>
	<h2> Veuillez-vous connecter : </h2>
	<form @submit="onSubmit">
		<p class="form-container">
			<span class="form-container"><label for= "email" class="item"> E-mail : </label> <input type= "email" class= "item email-item" v-model= "email" autofocus/></span>
			<span class="form-container"><label for= "password"> Mot de passe : </label> <input id="login_password" type= "password" class= "item password-item" minlength="8" v-model="password" />
			<button type="button" class="password_eye" @click="showPassword('login_password')"><b-icon-eye-fill/></button>
			</span>
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
		...mapState(["user"])
	},
	data(){
		return{
			statusAlert: '',
			showAlert: false, 
			showForm: true,
			email: '',
			password: '',
			form: { },
			messageAlert: '',
		}
	},
	methods:{
		showPassword(elementId){ 
            var input = document.getElementById(elementId); 
            if (input.type === "password")
            { 
            input.type = "text"; 
            } 
            else
            { 
            input.type = "password"; 
            } 
        }, 
		onSubmit() {
			axios
				.post('http://localhost:8080/api/users/login', {email : this.email, password :this.password})
				.then(res => {
					let user = {id_user: res.data.id_user, pseudo: res.data.pseudo, email: res.data.email, admin: res.data.isAdmin};
					this.$store.state.user = user;
					localStorage.setItem('token', res.data.token);
					this.$router.push('/forum');
				})
				.catch (error =>{this.showAlert = true, console.log(error.response.data.message), this.messageAlert=error.response.data.message})
			},
	}
}
</script>
