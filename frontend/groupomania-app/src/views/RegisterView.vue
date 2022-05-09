<template>
  <div class="register">
    <RegisterBox/>
    <p> Déja inscrit ? Connectez-vous !</p>
    <router-link to="/auth/login">Se connecter</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import RegisterBox from '@/components/RegisterBox.vue'

export default {
  name: 'RegisterView',
  components: {
    RegisterBox
  }
}
</script>