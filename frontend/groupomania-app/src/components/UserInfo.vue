<template>
	<h3> Bonjour, {{user.pseudo}} </h3>
    <button @click="Logout" class="btn-logout">Se déconnecter</button>
    <button @click="Redirect">Mettre à jour mon profil</button>
	<!--<Alert :status="statusAlert" :message="messageAlert" :show="showAlert" />-->
</template>

<script>
import axios from 'axios'

export default {
	name: 'UserInfo',
    methods:{
        Logout() {
            localStorage.clear();
            this.$router.push('/auth/login')
        },
        Redirect(){
            this.$router.push('/user')
        }
    },
	data(){
		return{
            user: [],
		}
    },
    beforeCreate() {
        let id = localStorage.getItem('userId');
        axios
				.get('http://localhost:8080/api/users/'+id)
                .then (res=>{
                    this.user = res.data;
                })
    },
}
</script>

<style>
	input {
		border : solid 1px black;
	}
</style>