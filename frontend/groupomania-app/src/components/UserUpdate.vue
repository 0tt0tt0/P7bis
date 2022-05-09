<template>
	<h3>{{user.pseudo}}</h3>
    <button @click="Redirect">Retourner au forum</button>
    <button @click="UpdateAccount" class="btn-logout">Modifier mon profil</button>
    <button @click="DeleteAccount" class="btn-logout">Supprimer mon compte</button>
</template>

<script>
import axios from 'axios'

export default {
    name: 'UserUpdate',

    methods:{
        DeleteAccount(id) {
            id = localStorage.getItem('userId');
            axios
            .delete('http://localhost:8080/api/users/'+id, id)
            localStorage.clear();
            this.$router.push('/auth/login')
        },
        Redirect(){
            this.$router.push('/forum')
        },
        //  ModifyPassword(id) {
        //     //id = localStorage.getItem('userId');
        //     axios
        //     .update('http://localhost:8080/api/users/'+id, id)
        //     localStorage.clear();
        //     this.$router.push('/auth/login')
        // },
    },
    data(){
        return{
            id : '',
            user: [],
        }
    },
    beforeCreate() {
        let id = localStorage.getItem('userId');
        axios
            .get('http://localhost:8080/api/users/'+id)
            .then (res=>{
                this.user = res.data;
            });
    },
}
</script>
