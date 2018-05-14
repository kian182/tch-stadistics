<template>
  <header class="v-header container">
    <div class="fullscreen-video-wrap">
      <!--  https://www.videvo.net/video/typing-on-computer-white-bg/4475/ -->
      <!-- DO NOT USE THIS VIDEO, I JUST NEEDED A HOSTED VIDEO FOR THIS CODEPEN> USE THE ONE ABOVE -->
      <video src="https://production.cdmycdn.com/assets/marketing-pages/intensives/bws/coding-scenes-9a2031e8142b40bdb5d936d5eef33dfa.mp4" autoplay="" loop="">
      </video>
    </div>
    <div class="header-overlay"></div>
    <div class="header-content text-md-center">
      <h1>TECHO</h1>
      <p>TECHO es una organización presente en Latinoamérica y El Caribe que busca superar la situación
        de pobreza que viven miles de personas en los asentamientos precarios, a través de la acción conjunta de
        sus pobladores y jóvenes voluntarios.</p>
      <a class="btn-home" v-on:click="goToDashboard()">Saber mas!</a>
    </div>
  </header>
</template>

<script src="./home.js"></script>
<style lang="scss" src="./home.scss"></style>


