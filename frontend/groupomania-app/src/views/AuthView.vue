<template>
  <div id="auth">
    <div id ="header">  
    </div>
    <h1>Bienvenue sur le réseau <span class="text-orange">Groupomania</span></h1>
    <img id="gif" alt="Vue logo" src="../../public/Groupomania_Logos/groupo.gif">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'AuthView',
}

</script>

<style>
  #gif{
    height: 80px;
  }
</style>