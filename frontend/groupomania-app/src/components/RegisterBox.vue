<template>
	<h2>Veuillez remplir ces informations pour vous inscrire :</h2>
	<button v-if="!admin_checked" id="admin_account" @click="showAdminPasswordInput">Compte administrateur ?</button>
	<p id="admin_ok" v-else>Compte administrateur <b-icon-check-circle-fill /></p> 
	<form id="form-container" @submit="onSubmit">
		<span class="form-item" v-if="check_admin">
		<label for= "password-admin"> Mot de passe administrateur : </label> <input type= "password" minlength="8" id= "password-admin" v-model="password_admin" /><button @click="checkAdmin">Vérifier</button>
		<p class="alert" v-if="showAlert_admin">{{messageAlert_admin}}</p>
		</span>
		<span class="form-item"><label for= "pseudo"> Pseudo : </label> <input type= "pseudo" id= "pseudo" v-model= "pseudo" autofocus/></span>
		<span class="form-item">
		<label for= "email"> E-mail : </label> <input type= "email" id= "email" v-model= "email" />
		</span>
		<span class="form-item">
		<label for= "password"> Mot de passe : </label> <input type= "password" minlength="8" id= "password" v-model="password" />
		</span>
		
		<input class="btn-submit" type="submit" value="S'enregistrer">
	</form>
	<p id="alert" v-if="showAlert">{{messageAlert}}</p>
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
			messageAlert_admin: '',
			statusAlert: '',
			showAlert: false, 
			showAlert_admin: false,
			showForm: true,
			//myToken: '',
            pseudo: '',
			email: '',
			password: '',
			password_admin: '',
			admin: 0,
			check_admin: false,
			admin_checked: false,
			//form: { },
		}
	},
	methods:{
		checkAdmin(){
			axios
				.post('http://localhost:8080/api/users/register/admin', {admin_password : this.password_admin})
				.then(res=>{
					console.log(res.data.check_admin);
					this.admin = res.data.check_admin;
					this.admin_checked = true;
					this.check_admin = false;
				})
				.catch (error =>{
					this.showAlert_admin = true;
					console.log(error.response.data.message);
					this.messageAlert_admin=error.response.data.message;
				})
		},
		onSubmit(){
			axios
				.post('http://localhost:8080/api/users/register', {pseudo: this.pseudo, email : this.email, password :this.password, admin: this.admin})
				.then(res => {
					console.log(res.data);
					// if (res.data.admin == 1){
					// 	this.$store.state.isAdmin = true;
					// 	console.log(this.$store.state.isAdmin)
					// }
				//création d'un petit localStorage pour garder le token
				localStorage.setItem('token', res.data.token);
				this.messageAlert = res.message;
				this.$router.push('/forum');
				})
				.catch (error =>{this.showAlert = true, console.log(error.response.data.message), this.messageAlert=error.response.data.message})
		},
		showAdminPasswordInput(){
			this.check_admin=!this.check_admin;
		}
	},
	// beforeCreate(){
	// 	axios
	// 			.get('http://localhost:8080/api/users/')
	// 			.then(res =>{
	// 				console.log(res.data.length);
	// 				if (res.data.length == 0){
	// 					this.admin = 1;	
	// 				}
	// 			})
	// }
}
</script>

<style>
	#form-container{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.form-item{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.btn-submit{
		max-width: 200px
	}
	input {
		border : solid 1px black;
	}
	.alert{
	color: red;
	}
	#admin_ok{
	width: fit-content;
	margin-left: auto;
	margin-right:auto;
	margin-bottom: 10px;
	font-size: small;
	color: #fc1c00;
	font-weight: bold;
	background-color: #ffffff;
	padding: 10px;
	border-radius: 15px;
	border: 2px solid #fc1c00;
	}
</style>