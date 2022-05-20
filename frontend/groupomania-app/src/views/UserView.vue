<template>
    <NavLink/>
    <div id="profile-card">
        <b-icon-person-circle id="profile-pic"/>
        <h2>{{this.$store.state.user.pseudo}}</h2>
        <p>{{this.$store.state.user.email}}</p>
        <p v-if="this.$store.state.user.admin==1" class="text-orange">ADMINISTRATEUR</p>
        <button @click="ShowUpdate" class="btn-show-update">Modifier mon profil</button>
        <button  @click="DeleteAccount" class="btn-logout">Supprimer mon compte</button>
    </div>
    <div v-if="update_profile" class="container">
        <button  @click="ShowUpdatePseudo" class="btn-update">Modifier mon pseudo</button>
        <button @click="ShowUpdatePassword" class="btn-update">Modifier mon mot de passe</button>
    </div>
    <div class="container">
        <div v-if="showPseudoForm">
            <form @submit="UpdatePseudo">
                <label for= "pseudo"> Nouveau pseudo : </label> <input type= "new_pseudo" id= "new_pseudo" v-model= "new_pseudo" />
                <input class="btn-submit" type="submit" value="Envoyer">
            </form>
        </div>
        <div v-if="showPasswordForm">
            <form class="form-container" v-if="to_check_password" @submit="CheckPassword">
                <span><label for= "old_password"> Mot de passe actuel : </label> <input type= "password" id= "old_password" v-model= "old_password" />
                <button type="button" class="password_eye" @click="showPassword('old_password')"><b-icon-eye-fill/></button>
                <input class="btn-submit" type="submit" value="Vérifier" >
                </span>
            </form>
            <form class="form-container" v-if="password_ok" @submit="UpdatePassword">
                <label for= "new_password"> Nouveau mot de passe : </label> <input type= "password" id= "new_password" v-model= "new_password" />
                <button type="button" class="password_eye" @click="showPassword('new_password')"><b-icon-eye-fill/></button>
                <label for= "confirm_password"> Confirmer le mot de passe : </label> <input type= "password" id= "confirm_password" v-model="confirm_password" />
                <input class="btn-submit" type="submit" value="Envoyer">
            </form>
        </div>
        <p class="alert" v-if="showAlert">{{messageAlert}}</p>
    </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import NavLink from '@/components/NavLink.vue';

export default {
    data(){
        return{
            new_pseudo: '',
            old_password: '',
            new_password: '',
            confirm_password: '',
            showPseudoForm: false,
            showPasswordForm: false,
            id: "",
            showUserForm: false,
            token :localStorage.getItem("token"),
            password_ok: false,
            to_check_password: false,
            messageAlert: '',
            showAlert: false, 
            update_profile: false,

        }
    },
    computed: {
        ...mapState(["user"]),
    },
    methods: {
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
        DeleteAccount() {
            if(confirm("Etes vous sûr de vouloir supprimer ce compte ? Cette action est définitive.")){
                axios
                    .delete("http://localhost:8080/api/users/", {headers:{"Authorization": "Bearer "+this.token}});
            localStorage.clear();
            this.$router.push("/auth/register");
            }
        },
        Redirect() {
            this.$router.push("/forum");
        },
        ShowUpdate(){
            this.update_profile= !this.update_profile;
            this.showAlert = false; 
        },
        ShowUpdatePseudo(){
            this.showAlert = false; 
            this.showPseudoForm = !this.showPseudoForm;
            this.showPasswordForm = false;
        },
        ShowUpdatePassword(){
            this.showAlert = false; 
            this.showPasswordForm = !this.showPasswordForm;
            this.showPseudoForm = false;
            this.to_check_password = true;
            this.password_ok = false;
        },
        UpdatePseudo(){
            axios
                .put("http://localhost:8080/api/users/pseudo", {pseudo: this.new_pseudo}, {headers:{"Authorization": "Bearer "+this.token}})
                .then (res=>{
                this.$store.state.user.pseudo = res.data.pseudo;
                this.showPseudoForm = false;
                this.messageAlert="Pseudo mis à jour !";
                this.showAlert = true;   
                this.new_pseudo='';
                })
                .catch (error =>{this.showAlert = true, console.log(error.response.data.message), this.messageAlert=error.response.data.message})
        },
        CheckPassword(){
            axios
				.post('http://localhost:8080/api/users/login', {email : this.$store.state.user.email, password :this.old_password})
				.then(res => {
                    console.log(res);
                    this.password_ok = true;
                    this.to_check_password = false;
                    this.old_password= '';
                    this.showAlert= false;
                })
                .catch(err=>{
                    console.log(err);
                    this.showAlert = true;
                    this.password_ok=false;
                    this.messageAlert="Mot de passe incorrect";
                    this.old_password = "";
                });
        },
        UpdatePassword(){
            if(this.new_password == this.confirm_password){
                axios
                    .put("http://localhost:8080/api/users/password", {password : this.new_password}, {headers:{"Authorization": "Bearer "+this.token}})
                    .then (res=>{
                    console.log(res);
                    this.showPasswordForm = false;
                    this.messageAlert="Mot de passe mis à jour !";
                    this.showAlert = true;   
                    this.new_password='';
                    this.confirm_password= '';
                    this.password_ok= false;

                    })
                    .catch (error =>{this.showAlert = true, console.log(error.response.data.message), this.messageAlert=error.response.data.message})
            }
            this.messageAlert="Les mots de passes ne correspondent pas, veuillez-réessayer";
            this.showAlert = true;     
        }
             
    },
    beforeCreate() {
        this.token = localStorage.getItem("token");
        axios 
			.get('http://localhost:8080/api/users/one', {headers:{"Authorization": "Bearer "+this.token}})
			.then (res=>{
				this.$store.state.user = res.data;
			});
    },
    components: { NavLink }
}
</script>

<style lang="scss">
    .btn_update{
        color: #fc1c00;
        background-color: #ffffff;
    }
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