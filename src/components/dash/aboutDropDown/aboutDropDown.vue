<template>
  <div class="col-xs-6 text-right">
    <div class="dropdown">
      <a class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" title="Licence Generator Menu">
        {{username}}
        <span class="sprite icon-avatar icon-zoom hand"></span>
        <!--<span class="caret"></span>-->
        <!--<span class="icon-avatar x2 hand ng-scope"></span>-->
      </a>
      <ul class="dropdown-menu fix-right">
        <li>
          <router-link to="/generator">Home</router-link>
        </li>
        <li v-if="this.$route.name !== 'LicenseType'">
          <router-link  to="/licenseType">Licence Type</router-link>
        </li>
        <li v-if="this.$route.name !== 'History'">
          <router-link  to="/history">History</router-link>
        </li>
        <li @click="showModal = true">
          <a class="hand">About</a>
        </li>
        <li><a class="hand" v-on:click="logout">Logout</a></li>
      </ul>
    </div>

    <about-modal v-if="showModal" @close="showModal = false"></about-modal>
  </div>
</template>
<script src="./aboutDropDown.js"></script>
