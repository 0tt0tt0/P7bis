<template>
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
  },
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
    margin-top: 40px;
  }
  html {
    scroll-behavior: smooth;
  }
  h1{
    margin-top: 20px;
    margin-bottom: 50px;
  }
  button {
    font-size: small;
    font-weight: bold;
    color: #fff;
    background-color: #fc1c00;
    border-color: #fc1c00;
    padding: 10px;
    margin: 10px;
    border-radius: 15px;
    &:hover{
      background-color: #ffffff;
      color: #fc1c00;
      box-shadow: 0 12px 16px 0 #fed7d6, 0 17px 50px 0 #fed7d6;
    }
    &:active{
      transform: translateY(4px);
    }

  }
  input {
		border : solid 1px black;
	}
  form{
    input{
    text-align: center;
    font-weight: bold;
    background-color: #ffffff;
    padding: 10px;
    margin: 10px;
    border-radius: 15px;
    border-color: #fed7d6;
    border-width: 2px;
    &:hover{
      border-color: #fc1c00;
    }
    &:active{
      transform: translateY(4px);
    }
    }
  }
  .container{
    margin: 20px;
  }
  .form-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

  .text-orange{
    color: #fc1c00;
  }
  
  .alert{
      color: red;
      font-style: italic;
      font-size: small;
    }
  .password_eye{
    border-radius: 100%;
    padding: 5px;
  }

</style>
