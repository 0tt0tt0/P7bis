<template>
  <a href="/"><img alt="Vue logo" src="./assets/Groupomania_Logos/icon-above-font.png"></a>
  <div>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  watch: {
  $route(to) {
     document.title = `Groupomania - ${to.meta.title}`;
  }
}
}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
img {
  height: 200px;
}
h1{
  margin-bottom: 50px;
}
button {
  font-weight: bold;
  background-color: #ffffff;
  color: #fc1c00;
  padding: 10px;
  margin: 10px;
  border-radius: 15px;
  &:hover{
        background-color: #ffffff;
        color: #fc1c00;
        border-color: #fc1c00;
    }
}
form{
  input{
  font-weight: bold;
  background-color: #ffffff;
  padding: 10px;
  margin: 10px;
  border-radius: 15px;
  border-color: #fed7d6;
  }
}

.btn-submit{
  color: #fff;
  font-weight: bold;
  background-color: #fc1c00;
  border-color: #fc1c00;
  border-color: #fc1c00;
  &:hover{
  background-color: #ffffff;
  color: #fc1c00;
  box-shadow: 0 12px 16px 0 #fed7d6, 0 17px 50px 0 #fed7d6;
  &:active{
    color: #fff;
    background-color: #fc1c00;
    transform: translateY(4px);
  }
  }
}
</style>
