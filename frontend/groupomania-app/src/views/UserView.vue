<template>
	<h3>{{user.pseudo}}</h3>
    <button @click="Redirect">Retourner au forum</button>
    <!--<button @click="showUserForm = !showUserForm" class="btn-logout">Modifier mon profil</button>-->
    <button v-if="!this.$store.state.isAdmin" @click="DeleteAccount" class="btn-logout">Supprimer mon compte</button>

    <!--<div v-if="showUserForm">
        <form @submit="UpdateAccount">
            <label for= "pseudo"> Pseudo : </label> <input type= "pseudo" id= "pseudo" v-model= "pseudo" />
            <label for= "password"> Mot de passe : </label> <input type= "password" id= "password" v-model="password" />
            <input class="btn-submit" type="submit" value="Modifier mes informations">
        </form>
    </div>-->
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
    name: 'UserUpdate',
    computed: {
        ...mapState("isAdmin"),
    },

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
        // UpdateAccount(id){

        //     id = localStorage.getItem('userId');
        //     axios
        //     .put('http://localhost:8080/api/users/'+id, id);
        //     console.log("Utilisateur mis à jour")
        // },
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
            showUserForm: false,
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
