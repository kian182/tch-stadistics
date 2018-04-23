<template>
  <div class="container login">
    <div class="row">
      <div class="col-lg-6 col-md-8 col-sm-10 col-xs-12 col-centered">
        <div class="box-login">
          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-6">
              <!--<img src="../../assets/images/starflex_logo_blue_hat.svg" class="img-responsive logo-login" alt=""/>-->
              <img src="../../assets/images/starflex_logo_blue.svg" class="img-responsive logo-login" alt=""/>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6">
              <div class="form-login">
                <h3 class="margin-top-0 margin-bottom-20 text-center-xs">Licence Generator</h3>
                <form v-on:submit.prevent="login()">
                  <div class="form-group">
                    <input v-model.trim="username" type="text" placeholder="Username" class="form-control"/>
                  </div>
                  <div class="form-group form-group-addon">
                    <input v-model.trim="password" :type="showPassword? 'text':'password'" placeholder="Password" class="form-control form-control-addon"/>
                    <span type="button" class="input-group-addon" @click="showPassword = !showPassword">
                      <span class="sprite hand"
                            :class="{'icon-eye-open': !showPassword , 'icon-eye-closed':showPassword}" title="Show/Hide password"></span>
                    </span>
                  </div>
                  <p class="text-danger" v-if="errors.emptyFields">Enter username and password value</p>
                  <p class="text-danger" v-if="errors.wrongFields">Wrong username or password</p>
                  <button value="login" class="btn btn-primary btn-block" type="submit">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./login.js"></script>
<style lang="scss" src="./login.scss"></style>


