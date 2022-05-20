<template>
    <div class="nav">
        <img id="logo" alt="logo" src="../../public/Groupomania_Logos/icon.png">
        <div id="btn-nav">
            <b-icon-house-fill @click="Home" class="b-icon"/>
            <b-icon-person-circle @click="Redirect" class="b-icon"/>
            <b-icon-box-arrow-right @click="Logout" class="b-icon"/>
        </div>
    </div>
</template>

<script>

export default {
	name: 'NavLink',
    methods:{
        Logout() {
            this.$store.state.user={};
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
        background-color: #fc1c00;
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        overflow: visible;
        height: 50px;
        border-radius: 10px;
        margin-bottom: 40px;
       
    }
    #logo{
        margin: 15px;
        border-radius: 100%;
        height: 100px;
        &:hover{
           transform: rotate(360deg);
            transition-duration: 400ms;
            transition-delay: 0s; 
        }

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
</style>