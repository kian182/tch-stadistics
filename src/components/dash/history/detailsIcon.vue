<template>
<span class="d-inline-block custom-popover-block">
  <span class="sprite icon-info hand" @click="toggle" aria-hidden="true" title="Information"></span>
  <!--Popover-->
  <div v-if="open" class="custom-popover" style="will-change: transform;" v-click-outside="toggle">
    <!--<div class="arrow" style="left: 127px;"></div>-->
    <label class="popover-header">
      <div>
        <button @click="toggle" type="button" class="close btn btn-secondary">
          <span>×</span>
        </button>
      </div>
    </label>

    <div class="popover-body">
      <table>
        <tbody v-for="option in options">
          <tr  v-for="(value, key) in option">
            <th>{{key}} </th>
            <td>{{value}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!--Popover-->
</span>
</template>
<script>
  export default {
    props: {
      options: Array
    },
    data: function () {
      return {
        open: false
      }
    },

    methods: {
      toggle: function () {
        this.open = !this.open
      }
    }
  }
</script>
<style lang="scss">

</style>
