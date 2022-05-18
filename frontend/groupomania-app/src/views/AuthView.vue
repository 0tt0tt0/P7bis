<template>
  <div id="auth">
    <div id ="header">
     
    </div>
    <h1>Bienvenue sur le réseau <span class="text-orange">Groupomania</span></h1>
    <img id="gif" alt="Vue logo" src="../assets/Groupomania_Logos/groupo.gif">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'AuthView',
}

</script>

<style>
  #logo-top{
    box-shadow: 2px solid #fc1c00;
    position: relative;
    top: 10px;
  }
  #gif{
    height: 80px;
  }
  h1{
    margin-top: 20px;
  }
  img{
    height: 100px;
  }

  #link-top{
    background-color: #fed7d6;
    border: 5px solid #fed7d6;
    border-radius: 100%;
  }
</style>