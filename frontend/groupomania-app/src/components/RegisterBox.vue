<template>
	<h2>Veuillez remplir les informations pour vous inscrire :</h2>
	<form @submit="onSubmit">
		<p>
			<label for= "pseudo"> Pseudo : </label> <input type= "pseudo" id= "pseudo" v-model= "pseudo" />
            <label for= "email"> E-mail : </label> <input type= "email" id= "email" v-model= "email" />
			<label for= "password"> Mot de passe : </label> <input type= "password" minlength="8" id= "password" v-model="password" />
			<input class="btn-submit" type="submit" value="S'enregistrer">
		</p>
	</form>
	<span class="msgAlert">{{this.messageAlert}}</span>
	<p> Déja inscrit ? Connectez-vous !</p>
    <router-link to="/auth/login">Se connecter</router-link>
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
			messageAlert: '',
			statusAlert: '',
			showAlert: false, 
			showForm: true,
			//myToken: '',
            pseudo: '',
			email: '',
			password: '',
			admin: 0,
			//form: { },
		}
	},
	methods:{
		onSubmit() {
			// bcrypt.hash(this.password, 10)
			// .then(hash => {
			// 	this.hash = hash
			// 	});
			//event.preventDefault()
			axios
				.get('http://localhost:8080/api/users/')
				.then(res =>{
					if (!res.length){
						this.admin = 1;
					}
				})
			axios
				.post('http://localhost:8080/api/users/register', {pseudo: this.pseudo, email : this.email, password :this.password, admin: this.admin})
				.then(res => {
				//création d'un petit localStorage pour garder le token
				localStorage.setItem('token', res.data.token);
				localStorage.setItem('userId', res.data.id_user)
				this.messageAlert = res.message;
				this.$router.push('/forum');
				})
			},
	}
}
</script>

<style>
	input {
		border : solid 1px black;
	}
</style>