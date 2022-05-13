<template>
	<button @click="Logout" class="btn-logout">Se déconnecter</button>
    <button @click="Redirect">Mettre à jour mon profil</button>
    <span id="bonjour"><h3> Bonjour,</h3><h3 class="user-pseudo">{{user.pseudo}} </h3></span>
	<!--<Alert :status="statusAlert" :message="messageAlert" :show="showAlert" />-->
</template>

<script>
import axios from 'axios'

export default {
	name: 'UserInfo',
    methods:{
        Logout() {
            this.$store.commit('ADMIN_STOP');
            console.log(this.$store.state.isAdmin);
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
    .user-pseudo{
        color: #fc1f00
    }
    #bonjour{
        display: flex;
        flex-direction: row;
        gap: 10px;
        justify-content: center;
    }
</style>