<template>
  <div class="container history">
    <div class="row">
      <div class="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12 text-center">
        <h5>&#160;</h5>
      </div>
    </div>
    <div class="row">
    <div class="col-sm-offset-1 col-sm-5 col-xs-6">
        <h3>Ficha de Monitoreo</h3></div>
      <div class="col-sm-5 col-xs-6 text-right">
        <div class="form-group form-group-search">
          <span class="sprite icon-lens" @click="search"></span>
          <input class="form-control search" v-model="searchString" type="search" placeholder="Search"/>
        </div>
      </div>
    </div>
    <div class="row margin-bottom-20">
      <download-excel
        class   = "btn btn-default"
        :data   = "json_data"
        :fields = "json_fields"
        name    = "filename.xls">

        Download Excel (you can customize this with html code!)

      </download-excel>
      <div class="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-xs-12 text-center button-container">
        <button class="btn btn-primary btn-download" v-if="!isIpad"
                type="submit" @click="download" :disabled="licensesSelected.length<1">
          <span class="sprite icon-download-white"></span>
          &#160;Download
        </button>
        <button class="btn btn-danger btn-download"
                type="submit" @click="openRemoveModal" :disabled="licensesSelected.length<1">
          <!--<span class="sprite"></span>-->
          Remove
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-10 col-sm-offset-1 text-right"></div>
    </div>
    <div class="row">
      <div class="col-sm-10 col-sm-offset-1">
        <div class="row">
          <div class="col-md-12">
            <div class="no-items" v-if="treeList.length ===0 && !searchString" >No Licences have been generated</div>
            <div class="no-items" v-if="treeList.length ===0 && searchString">No Data found</div>
            <div class="panel panel-default tree-panel " v-if="treeList.length>0">
              <!--  BEGIN TREE -->
              <div class="item">
                <!--Level 1 -->
                <ul>
                  <div class="level1-box" v-for="(level1, index1) in treeList">
                    <div class="level1-box-head hand"  :class="{'open-toogle': level1.open}" @click="toggle(level1)">
                      <span class="sprite icon-collapse hand" :class="{'icon-expand-white': level1.open}"></span><!--
                        --><div class="checkbox">
                        <input type="checkbox" :id="level1._id"  v-model="level1.checked" @click="checkAllLicenseTo(level1)"><!--
                        --><label :for="level1._id"><span class="sprite icon-checkbox hand"></span>{{level1.licenseTo}}
                        </label>
                      </div>
                    </div>
                    <!-- Level 2 -->
                    <ul v-show="level1.open" v-if="level1.endCustomers && level1.endCustomers.length">
                      <div class="" v-for="level2 in level1.endCustomers">
                        <div class="bar-item level2-head hand" :class="{'open': level2.open}" @click="toggle(level2)">
                          <span class="sprite icon-collapse hand" :class="{'icon-expand': level2.open}"></span><!--
                        --><div class="checkbox">
                            <input type="checkbox" :id="level2._id" v-model="level2.checked" @click="checkAllEndCustomers(level2)"><!--
                        --><label :for="level2._id"><span class="sprite icon-checkbox hand"></span>{{level2.endCustomer === 'NONE' ? level1.licenseTo : level2.endCustomer}}
                            </label>
                          </div>

                        </div>
                        <!--Level 3-->
                        <ul v-show="level2.open" v-if="level2.sf_devices && level2.sf_devices.length">
                          <div class="" v-for="level3 in level2.sf_devices">
                            <div class="bar-item level3-head hand" :class="{'open': level3.open}" @click="toggle(level3)">
                              <span class="sprite icon-collapse hand" :class="{'icon-expand': level3.open}"></span><!--
                            --><div class="checkbox">
                                <input type="checkbox" :id="level3._id" v-model="level3.checked"  @click="checkAllMacAddress(level3)"><!--
                            --><label :for="level3._id"><span class="sprite icon-checkbox hand"></span>{{level3.macAddress}}
                                </label>
                              </div>
                            </div>
                            <!-- Level 4-->
                            <ul class="last-level" v-show="level3.open" v-if="level3.licenses && level3.licenses.length">
                              <div class="" v-for="level4 in level3.licenses">
                                  <div class="row bar-item" :class="{'open': level4.open}" @click="toggle(level4)">
                                    <div class="col-sm-7 col-xs-12 padding-left-5">
                                      <div class="checkbox">
                                        <input type="checkbox" :id="level4._id" v-model="level4.checked" @click="addLicenseToSelected(level4)"><!--
                                    --><label :for="level4._id"><span class="sprite icon-checkbox hand"></span>{{level4.filename}}
                                        </label>
                                      </div>

                                    </div>
                                    <div class="col-sm-5 col-xs-12 text-right col-nopadding text-left-xs">
                                      <span  class="tree-date">{{level4.creationDate | moment("MM-DD-YY [at] hh:mm a")}}</span>
                                      <details-icon :options="level4.options"></details-icon>
                                    </div>
                                  </div>
                              </div>
                            </ul>
                          </div>
                        </ul>
                      </div>
                    </ul>
                  </div>
                  <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading" >
                    <span slot="no-more"></span>
                    <span slot="no-results"></span>
                  </infinite-loading>
                </ul>
              </div>
              <!--  END TREE -->
              <!---->
            </div>
          </div>
        </div>
      </div>
    </div>
    <licenses-rm-modal
      v-if="removeModal.show"
      @close="closeRemoveModal"
      :remove-license-list="licensesSelected"
      @removeLicense="removeLicenses">
    </licenses-rm-modal>
  </div>
</template>

<script src="./history.js"></script>
<style lang="scss" src="./history.scss"></style>
