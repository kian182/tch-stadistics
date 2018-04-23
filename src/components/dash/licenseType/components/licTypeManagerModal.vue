<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container modal-edit-license">
          <div class="modal-header">
            <button @click="$emit('close')" type="button" class="close" data-dismiss="modal" aria-label="Close" title="Close">
              <span aria-hidden="true">×</span>
            </button>
            <div class="row">
              <div class="col-xs-12">
                <h3 slot="header" v-if="isCreateMode">Create Licence Type</h3>
                <h3 slot="header" v-if="!isCreateMode" v-once>Edit {{model.name}}</h3>
              </div>
            </div>
          </div>
          <!---->
          <div class="modal-body">
            <p class="form-description" v-if="!isCreateMode">Edit attributes for this Licence Type.</p>
            <p class="form-description" v-if="isCreateMode">Add and edit attributes for this Licence Type.</p>
            <div class="popup-license-form">

              <div class="row">
                <div class="col-sm-5 col-xs-12 col-nopadding-right"><span class="label-lic no-border-xs">Name </span></div>
                <div class="col-sm-7 col-xs-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="model.name"
                      class="form-control input-lic"/>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-5 col-xs-12 col-nopadding-right no-border-xl"><span class="label-lic no-border cursor-default">Description </span></div>
                <div class="col-sm-7 col-xs-12">
                  <div class="form-group">
                    <textarea class="form-control" v-model="model.description"></textarea>
                  </div>
                </div>
              </div>
              <div class="row" v-if="duplicateNameFlag">
                <div class="col-xs-12 col-nopadding-right no-border-xl margin-top-10">
                  <p class="text-danger">&#160;
                    This Licence Type name has already been taken. Please, select another one.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer center-block">
            <div class="row">
              <div class="col-xs-12 text-center">
                <button type="button"
                        @click="$emit('save')"
                        :disabled="!model.name || !existChanges || duplicateNameFlag"
                        class="btn btn-primary one-btn">
                  Save
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
  import _ from 'lodash'

  export default {
    props: {
      model: Object,
      isCreateMode: false,
      licenseTypeList: Array
    },
    data() {
      return {
        existChanges: false,
        duplicateNameFlag:false,
        editName:''
      }
    },
    watch: {
      model: {
        handler(val) {
          var alphanumericRegex = /[^a-z0-9]/gi;
          this.model.name = val.name.replace(alphanumericRegex, '');
          if (this.model.name.length > 25) {
            this.model.name = this.model.name.slice(0, -1);
          }
          this.existChanges = true
          this.checkIfAlreadyExistName()
        },
        deep: true
      }
    },
    mounted(){
      this.editName= this.model.name;
    },
    methods: {
      checkIfAlreadyExistName: function () {
        let obj = _.find(this.licenseTypeList, o => {
          if(o.name.toLowerCase() === this.editName.toLowerCase() && !this.isCreateMode){
            return false
          }
          return o.name.toLowerCase() === this.model.name.toLowerCase();
        });
        this.duplicateNameFlag = !!obj
      }
    }
  }
</script>

