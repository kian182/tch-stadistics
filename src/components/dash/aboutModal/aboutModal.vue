<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container modal-about">
          <div class="modal-header col-nopadding-bottom text-center col-">
            <button @click="$emit('close')" type="button" class="close" data-dismiss="modal" aria-label="Close" title="Close">
              <span aria-hidden="true">×</span>
            </button>
            <br/>
            <h3 slot="header">About</h3>
          </div>

          <!---->
          <div class="modal-body col-nopadding-top text-center">
            <div class="row">
              <div class="col-xs-10 col-xs-offset-1">
                <hr />
              </div>
            </div>
            <div class="row">
              <div class="col-xs-6 text-right">
                <label>Version </label>
              </div>
              <div class="col-xs-6 text-left">
                <span>1</span>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-10 col-xs-offset-1">
                <hr />
              </div>
            </div>
            <div class="row">
              <div class="col-xs-6 text-right">
                <label>Build Number</label>
              </div>
              <div class="col-xs-6 text-left">
                <span>{{buildNumber}}</span>
              </div>
            </div>
          </div>
          <div class="modal-footer center-block">
            <div class="row">
              <div class="col-xs-12 text-center">
                <button type="button"
                        @click="$emit('close')"
                        class="btn btn-primary one-btn">
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    data(){
      return {
        buildNumber:localStorage.getItem('buildNumber')
      }
    }
  }
</script>
<style lang="scss">

</style>
