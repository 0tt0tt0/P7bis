<template>
	<button @click="Logout" class="btn-back">Se déconnecter</button>
</template>



<script>
import { mapState } from 'vuex'

export default {
	name: 'LogoutBtn',
    computed:{
        ...mapState("isAdmin"),
    },
    methods:{
        Logout() {
            this.$store.commit('ADMIN_STOP');
            console.log(this.$store.state.isAdmin)
            localStorage.clear();
            //this.$router.push('/auth/login')
        },
    }
}
</script>