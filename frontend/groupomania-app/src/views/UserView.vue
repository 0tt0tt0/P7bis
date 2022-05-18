<template>
    <NavLink/>
    <div id="profile-card">
    <b-icon-person-circle id="profile-pic"/>
	<h2>{{this.user.pseudo}}</h2>
    <p>{{this.user.email}}</p>
    <button v-if="this.user.admin==0" @click="DeleteAccount" class="btn-logout">Supprimer mon compte</button>
    <p v-else class="text-orange">ADMINISTRATEUR</p>
    </div>
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
// import { mapState } from 'vuex'
import NavLink from '@/components/NavLink.vue';

export default {
    name: "UserUpdate",
    // computed: {
    //     ...mapState("isAdmin", ["isAdmin"]),
    // },
    methods: {
        DeleteAccount(id) {
            confirm("Etes vous sûr de vouloir supprimer ce compte ? Cette action est définitive.");
            id = localStorage.getItem("userId");
            axios
                .delete("http://localhost:8080/api/users/" + id, id);
            localStorage.clear();
            this.$router.push("/auth/register");
        },
        Redirect() {
            this.$router.push("/forum");
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
    data() {
        return {
            id: "",
            user: [],
            showUserForm: false,
        };
    },
    beforeCreate() {
        this.token = localStorage.getItem("token");
        axios
            .get('http://localhost:8080/api/users/'+this.token, {headers:{"Authorization": "Bearer "+this.token}})
            .then (res=>{
                this.user = res.data;
            })
    },
    components: { NavLink }
}
</script>

<style lang="scss">
    #profile-card{
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        // gap: 10px;
        border-radius: 30px;
        border: 10px double #fed7d6;
        width: fit-content;
        margin: auto;
        padding: 30px;
        box-shadow: 0 12px 10px 0 #ffebea, 0 12px 10px 0 #fff6f5
    }
    #profile-pic{
        height: 5em;
        width: 5em;
        color: #fc1c00;
        margin-top: 20px;
        animation: 300ms 0S shake;
    }
    @keyframes shake {
        0% { transform: translate(1px, 1px) rotate(0deg); }
        10% { transform: translate(-1px, -2px) rotate(-1deg); }
        20% { transform: translate(-3px, 0px) rotate(1deg); }
        30% { transform: translate(3px, 2px) rotate(0deg); }
        40% { transform: translate(1px, -1px) rotate(1deg); }
        50% { transform: translate(-1px, 2px) rotate(-1deg); }
        60% { transform: translate(-3px, 1px) rotate(0deg); }
        70% { transform: translate(3px, 1px) rotate(-1deg); }
        80% { transform: translate(-1px, -1px) rotate(1deg); }
        90% { transform: translate(1px, 2px) rotate(0deg); }
        100% { transform: translate(1px, -2px) rotate(-1deg); }
    }
</style>