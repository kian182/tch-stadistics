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
            <h4 class="text-left margin-top-0 margin-bottom-0">Licence Description</h4>
          </div>

          <!---->
          <div class="modal-body col-nopadding-top">
            <div>
              <ul class="nav nav-tabs">
                <li class="active">
                  <a href="#general-tab"
                     v-on:click="status='general';switchTab()"
                     role="tab"
                     ref="gotoGeneral"
                     data-toggle="tab">
                    General
                  </a>
                </li>
                <li class="">
                  <a href="#custom-tab"
                     role="tab"
                     ref="gotoCustom"
                     v-on:click="status='custom';switchTab()"
                     data-toggle="tab">
                    Custom
                  </a>
                </li>
              </ul>
              <div class="tab-content">
                <!-- GENERAL -->
                <div role="tabpanel" class="tab-pane active" id="general-tab">
                  <p class="form-description">Add and edit new fields as attributes for this MAC Address ({{ macAddress }}) for all selected licences. </p>
                  <div class="popup-license-form margin-top-20">

                    <div class="row" v-for="(item,index) in options.general">

                      <!-- Description -->
                      <div class="description-block" v-if="index===0">
                        <div class="col-sm-4 col-xs-12 col-nopadding-right"><span class="label-lic no-border cursor-default">Description </span></div>
                        <div class="col-sm-8 col-xs-12">
                          <div class="form-group">
                            <textarea
                              :class="{'input-error-border': item.error}"
                              v-model="item.value"
                            ></textarea>
                          </div>
                        </div>
                      </div>

                      <!-- New Fields -->
                      <div class="new-fields-block" v-if="index>0">
                        <div class="col-sm-4 col-xs-12 col-nopadding-right">
                        <span class="label-lic no-border-xs no-padding">
                        <input class="input-lic input-button"
                               :class="{'input-error-border': (item.error || item.empty)}"
                               type="text"
                               v-model="item.id"
                               @input="checkGeneralValidations()"
                               placeholder="New Field" />
                        </span>
                        </div>
                        <div class="col-sm-8 col-xs-12">
                          <div class="form-group">
                            <input
                              class="input-lic input-button"
                              v-model="item.value"
                              type="text"/>
                            <button class="btn btn-default"
                                    type="button"
                                    v-on:click="deleteNewField(index)"> - </button>
                          </div>
                        </div>
                        <div class="col-xs-12 margin-bottom-10">
                          <span class="text-danger" v-if="item.error">
                            {{item.id}} is duplicated.
                          </span>
                          <span class="text-danger" v-if="item.empty">
                            This field cannot be empty.
                          </span>
                        </div>
                      </div>

                    </div>

                    <div class="row">
                      <div class="col-xs-12 text-right"><span>
                        <a href="#"
                           :class="{'disabled' : disableGeneralAddFieldOption() }"
                           v-on:click="addNewField()"
                          >+ Add Field</a>
                      </span></div>
                    </div>

                    <div class="row">
                      <div class="col-xs-12 col-nopadding-right no-border-xl margin-top-10">
                        <!--Mensaje de error-->
                      </div>
                    </div>

                  </div>
                </div>

                <!-- CUSTOM -->
                <div role="tabpanel" class="tab-pane" id="custom-tab">
                  <p class="form-description">Add and edit new fields as attributes for this MAC Address ({{ macAddress }}) for each selected licence individually. </p>
                  <div class="custom-license-form">
                    <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                      <div class="panel panel-default" :class="{'panel-default-error': type.error}" v-for="(type,index) in options.custom">
                        <div class="panel-heading panel-heading-license" role="tab" id="headingOne">
                          <h4 class="panel-title">
                            {{type.name}}
                            <a class="right-position arrow-panel collapsed"
                               role="button"
                               data-toggle="collapse"
                               data-parent="#accordion"
                               :href="'#collapse-'+index+''"
                               aria-expanded="true"
                               :aria-controls="'collapse-'+index+''">
                              <span class="sprite icon-expand-white hand"></span>
                            </a>
                          </h4>
                        </div>
                        <div :id="'collapse-'+index+''" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                          <div class="panel-body">
                            <div class="popup-license-form">
                              <div class="row" v-for="(desc,i) in type.description">

                                <!-- Description -->
                                <div class="description-block" v-if="i==0">
                                  <div class="col-sm-4 col-xs-12 col-padding-only-xs"><span class="label-lic no-border cursor-default">Description </span></div>
                                  <div class="col-sm-8 col-xs-12">
                                    <div class="form-group">
                            <textarea
                              v-model="desc.value"
                            ></textarea>
                                    </div>
                                  </div>
                                </div>

                                <!-- New Fields -->
                                <div class="new-fields-block" v-if="i>0">
                                  <div class="col-sm-4 col-xs-12 col-padding-only-xs">
                                    <span class="label-lic no-border-xs no-padding">
                                    <input class="input-lic input-button"
                                           type="text"
                                           v-model="desc.id"
                                           :class="{'input-error-border': (desc.error || desc.empty)}"
                                           @input="checkCustomValidations()"
                                           placeholder="New Field" />
                                    </span>
                                  </div>
                                  <div class="col-sm-8 col-xs-12">
                                    <div class="form-group">
                                      <input
                                        class="input-lic input-button"
                                        v-model="desc.value"
                                        type="text"/>
                                      <button class="btn btn-default"
                                              type="button"
                                              v-on:click="deleteNewCustomField(index,i)"> - </button>
                                    </div>
                                  </div>
                                  <div class="col-xs-12 margin-bottom-10">
                                    <span class="text-danger" v-if="desc.error">
                                      {{desc.id}} is duplicated.
                                    </span>
                                    <span class="text-danger" v-if="desc.empty">
                                      This field cannot be empty.
                                    </span>
                                  </div>
                                </div>

                              </div>

                              <div class="row">
                                <div class="col-xs-12 text-right">
                                  <span>
                                    <a href="#"
                                       :class="{'disabled' : disableCustomAddFieldOption(index) }"
                                       v-on:click="addNewCustomField(index)">+ Add Field</a>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>

          <!---->
          <div class="modal-footer center-block">
            <div class="row">
              <div class="col-xs-12 text-center">
                <button type="button"
                        @click="save()"
                        :disabled="global.error"
                        class="btn btn-primary one-btn">
                  Save
                </button>
                <button type="button"
                        @click="cancel()"
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
<script src="../optionsLicenses/options.js"></script>
