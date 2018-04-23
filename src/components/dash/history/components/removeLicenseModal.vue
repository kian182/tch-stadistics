<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container modal-edit-license">
          <div class="modal-header text-center">
            <button @click="$emit('close')" type="button" class="close" data-dismiss="modal" aria-label="Close" title="Close">
              <span aria-hidden="true">×</span>
            </button>
            <br/>
          </div>
          <div class="modal-body text-center">
            <div >
              <div class="form-group">
                <label class="control-label overflow-ellipsis"> Are you sure you want to remove  <b>{{nameLabel}}</b>
                  {{this.removeLicenseList.length > 1 ? 'Licences' : 'Licence' }}?</label>
              </div>
            </div>
          </div>
          <div class="modal-footer center-block">
            <div class="row">
              <div class="col-xs-12 text-center">
                <button type="button"
                        @click="$emit('removeLicense')"
                        class="btn btn-primary one-btn">
                  Remove
                </button>
                <button type="button"
                        @click="$emit('close')"
                        class="btn btn-danger one-btn">
                  Cancel
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
    props: {
      removeLicenseList: Array
    },
    data() {
      return {
        nameLabel: ''
      }
    },
    mounted() {
      this.nameLabel = this.removeLicenseList.length > 1 ? this.removeLicenseList.length : this.removeLicenseList[0].filename
    }
  }
</script>

