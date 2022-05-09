<template>
  <div class="login">
    <LoginBox/>
  </div>
  <div class="register">
    <p> Pas de compte ? Enregistrez-vous !</p>
    <router-link to="/auth/register">S'enregistrer</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginBox from '@/components/LoginBox.vue'

export default {
  name: 'LoginView',
  components: {
    LoginBox
  }
}
</script>