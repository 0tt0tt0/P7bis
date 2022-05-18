<template>
    <div class="nav">
    <img id="logo" alt="logo" src="../assets/Groupomania_Logos/icon.png">
    <span v-show="this.$router!=='/auth'" id="btn-nav">
    <b-icon-house-fill @click="Home" class="b-icon"/>
    <b-icon-person-circle @click="Redirect" class="b-icon"/>
	<b-icon-box-arrow-right @click="Logout" class="b-icon"/>
    </span>
    </div>
	<!--<Alert :status="statusAlert" :message="messageAlert" :show="showAlert" />-->
</template>

<script>

export default {
	name: 'NavLink',
    methods:{
        Logout() {
            this.$store.commit('ADMIN_STOP');
            console.log(this.$store.state.isAdmin);
            localStorage.clear();
            this.$router.push('/auth/login')
        },
        Redirect(){
            this.$router.push('/user')
        },
        Home(){
           this.$router.push('/forum') 
        }
    },
}
</script>

<style lang="scss">
    .nav{
        display:flex;
        justify-content: space-between;
        align-items: center;
        overflow: visible;
        height: 50px;
        border-radius: 10px;
        margin-bottom: 40px;
        position: sticky;
        top:10px;
    }
    #logo{
        &:hover{
           transform: rotate(360deg);
            transition-duration: 400ms;
            transition-delay: 0s; 
        }

    }
    img{
        margin: 15px;
        border-radius: 100%;
        height: 100px;
    }
    .b-icon{
        margin: 10px;
        height:2em;
        width:2em;
        color: #ffffff;
        padding: 5px;
        &:hover{
            border-bottom: solid 2px #ffffff;
        }
        &:active {
            transform: rotate(360deg);
            transition-duration: 300ms;
            transition-delay: 0s;
            border: none;
        }

    }
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