<template>
	<h2>Veuillez remplir les informations pour vous inscrire :</h2>
	<form @submit="onSubmit">
		<p>
			<label for= "pseudo"> Pseudo : </label> <input type= "pseudo" id= "pseudo" v-model= "pseudo" />
            <label for= "email"> E-mail : </label> <input type= "email" id= "email" v-model= "email" />
			<label for= "password"> Mot de passe : </label> <input type= "password" id= "password" v-model="password" />
			<input class="btn-submit" type="submit" value="S'enregistrer">
		</p>
	</form>
	<!--<Alert :status="statusAlert" :message="messageAlert" :show="showAlert" />-->
</template>

<script>
import axios from 'axios'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config();

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
			hash: '',
			//form: { },
		}
	},
	methods:{
		onSubmit() {
			bcrypt.hash(this.password, 10)
			.then(hash => {
				this.hash = hash
				});
			//event.preventDefault()
			axios
				.post('http://localhost:8080/api/users/register', {pseudo: this.pseudo, email : this.email, password :this.hash})
				.then(res => {
				//création d'un petit localStorage pour garder le token
				localStorage.setItem('userToken', res.data.token);
				//localStorage.setItem('userId', res.data.userId)
				this.msgAlert = (true, "Vous êtes maintenant identifiez.", "success");
				setTimeout(function(){ document.location.href="/" }, 2000);
				this.$router.push('/forum');
				})
			},
	},
	created(){
		dotenv.config();
	}
}
</script>

<style>
	input {
		border : solid 1px black;
	}
</style>