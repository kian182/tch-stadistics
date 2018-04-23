<template>
  <div>
    <header>
      <nav class="navbar navbar-default navbar-fixed-top navbar-license">
        <div class="container-fluid">
          <div class="row">
            <div class="col-xs-6 navbar-logo-container">
              <a class="navbar-brand1 navbar-link navbar-logo">
                <router-link  to="/generator">
                  <img src="../../assets/images/starflex_logo.svg" class="img-responsive logo-login" alt=""/>
                </router-link>
              </a>
            </div>
            <about-drop-down></about-drop-down>
          </div>
        </div>
      </nav>
    </header>
    <div>
      <router-view></router-view>
    </div>

    <footer>
    </footer>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'Welcome to Your  App'
      }
    },
    methods: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
