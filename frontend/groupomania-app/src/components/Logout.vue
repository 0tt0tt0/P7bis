<template>
	<button @click="Logout" class="btn-back">Se déconnecter</button>
</template>

<script>
export default {
	name: 'LogoutBtn',
    methods:{
        Logout() {
            localStorage.clear();
            //this.$router.push('/auth/login')
        },
    }
}
</script>