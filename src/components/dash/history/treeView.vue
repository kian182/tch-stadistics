<template>
  <div class="item">
    <span>
      <div
        :class="{bold: haveChilds}"
        @click="toggle">
        <span v-if="haveChilds">[{{open ? '-' : '+'}}]</span>
        {{model.name}}
      </div>

      <ul v-show="open" v-if="haveChilds">
        <tree-view
          class="item"
          v-for="model in model.children"
          track-by="$index"
          :key="model.name"
          :model="model">
        </tree-view>
      </ul>
    </span>
  </div>
</template>
<script>
  export default {
    props: {
      model: Object
    },
    data: function () {
      return {
        open: false
      }
    },
    computed: {
      haveChilds: function () {
        return this.model.children &&
          this.model.children.length
      }
    },
    methods: {
      toggle: function () {
        if (this.haveChilds) {
          this.open = !this.open
        }
      }
    }
  }
</script>
<style lang="scss">
  .item {
    cursor: pointer;
  }

  .bold {
    font-weight: bold;
  }

  ul {
    padding-left: 1em;
    line-height: 1.5em;
    list-style-type: dot;
  }
</style>
