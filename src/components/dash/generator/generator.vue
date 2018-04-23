<template>
  <div class="container generator">
    <div class="row">
      <div class="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12 text-center">
        <h5><span v-if="flags.optionsSaved!==''">{{flags.optionsSaved}} Options have been saved successfully!</span>&#160;</h5>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
        <h3>Licence Generator</h3>
      </div>
    </div>
    <form>
      <div class="row">
        <div class="col-md-offset-1 col-md-10 col-sm-12 col-xs-12 col-nopadding">
        <div class="col-sm-4">
          <div class="form-group">
            <label class="control-label">MAC Address *</label>
            <!--  TODO: Move input func -->

            <input-select
              @changeInputSelect="updateMacAddresses">
            </input-select>

            <label class="control-label error" v-if="errors.macAddress.hexValue">All MAC Addresses must be on hex value</label>
            <label class="control-label error" v-if="errors.macAddress.length">All MAC Addresses must have 12 characters</label>
            <label class="control-label error" v-if="errors.macAddress.format">All MAC Addresses must start with "001F48" value</label>
            <label class="control-label error" v-if="errors.macAddress.isEmpty">Enter " MAC Address "</label>
          </div>
        </div>
        <div class="col-sm-4 col-xs-6">
          <div class="form-group">
            <label class="control-label">Company / licence to *</label>
            <div>
              <input
                type="text"
                class="form-control"
                v-model="licenseTo.value"
                @input="validateLicensesFields"
              />
            </div>
            <label class="control-label error" v-if="errors.licenseTo.isEmpty">Enter " Company/licence to * "</label>
            <label class="control-label error" v-if="errors.licenseTo.hasSpecialChars">Please use only letters (a-z) and numbers.</label>
          </div>
        </div>
        <div class="col-sm-4 col-xs-6 no-padding-left-xs">
          <div class="form-group">
            <label class="control-label">End Customer (optional)</label>
            <div>
              <input
                type="text"
                class="form-control"
                v-model="endCustomer.value"
              />
            </div>
          </div>
        </div>
        </div>
      </div>
    </form>
    <div class="row hide-xs">
      <div class="col-md-10 col-md-offset-1 col-sm-12">
        <hr class="margin-top-10 margin-bottom-20" />
      </div>
    </div>

    <div class="row margin-bottom-20">
      <div class="col-sm-2 col-sm-offset-5 col-xs-8 col-xs-offset-2">
        <button
          class="btn btn-primary btn-block"
          type="submit"
          v-on:click="beforeGenerate()"
          :disabled="licenses.length === 0 || licenseTo.value.trim()===''  || flags.noneSelected || errors.global || flags.disabledBtnGenerate">
          Generate
        </button>
      </div>
    </div>
    <div class="licence-empty-area" v-show="licenses.length === 0">
      <div class="row">
        <div class="col-md-10 col-md-offset-1 col-sm-12">
          <table class="table table-license">
            <thead>
            <tr>
              <th>&nbsp;</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td class="text-center no-items">No Licences</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="licence-area" v-show="licenses.length !== 0">
    <div class="row">
      <div class="col-md-6 col-md-offset-1 col-sm-7 col-xs-7">
        <label class="control-label">Licences </label>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-5 col-xs-5 text-right">
        <div class="checkbox">
          <input type="checkbox"
                 id="cb_00"
                 v-model="selectAll"
                 :disabled="licenses.length === 0"
                 @change="selectAllLicenses">
          <label for="cb_00">
            <span class="sprite icon-checkbox hand">
            </span>Select All</label>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-10 col-md-offset-1 col-sm-12">
        <p class="form-description">Please, select the licences you need to generate.</p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-10 col-md-offset-1 col-sm-12">

        <div class="outer-container">
          <div class="inner-container">
            <section class="section-head">
              <div class="table-header-left">
                <table class="table table-license" style="width: auto;">
                  <thead>
                  <tr>
                    <th class="col2"><div class="th-div"><div class="th-div-inner">Mac Address</div></div></th>
                    <!--<th class="col3"> &#160;</th>-->
                  </tr>
                  </thead>
                </table>
              </div>
              <div class="table-header-right">
                <div class="table-header">
                  <table class="table table-striped table-license" id="headertable">
                    <thead>
                    <tr>
                      <th class="col3"> &#160;</th>
                      <!--<th class="col2"><div class="th-div"><div class="th-div-inner">Mac Address</div></div></th>-->
                      <th class="col1 text-center" v-for="type in licensesType"><div class="th-div"><div class="th-div-inner" :title="type.name">{{type.name}}</div></div></th>
                    </tr>
                    </thead>
                  </table>
                </div>
              </div>
            </section>


            <section>
            <div class="table-left">
              <div class="table-leftSide">
                <table class="table table-striped">
                  <tbody>
                    <tr class="flex-tr" v-for="(mac,index) in licenses">
                      <td class="col2">{{mac.macAddress}}</td>
                      <!--<td class="col3 text-right text-nowrap">-->
                        <!--<span class="sprite icon-close hand" v-on:click="deleteLicense(index)" title="Delete"></span>-->
                        <!--<span class="sprite icon-document hand"-->
                              <!--@click="showOptionModal = true ;-->
                               <!--optionIndex=index ;-->
                               <!--macAddressSelected = mac.macAddress;-->
                                <!--options=mac.options"-->
                              <!--title="Edit Options"></span>-->
                      <!--</td>-->
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="table-body">
              <table class="table table-striped table-license" id="bodytable">
                <tbody>
                <tr v-if="licenses.length === 0">
                  <td colspan="5" class="text-center col-xs-12 no-items">No Licences</td>
                </tr>
                <tr class="flex-tr" v-for="(mac,index) in licenses">
                  <td class="col3 text-right text-nowrap">
                    <span class="sprite icon-close hand" v-on:click="deleteLicense(index)" title="Delete"></span>
                    <span class="sprite icon-document hand"
                          @click="showOptionModal = true ;
                               optionIndex=index ;
                               macAddressSelected = mac.macAddress;
                                options=mac.options"
                          title="Edit Licence Description"></span>
                  </td>
                  <!--<td class="col2">{{mac.macAddress}}</td>-->
                  <td class="col1 text-center" v-for="(type,key) in licensesType">
                    <div class="checkbox" :class="{'remark': mac.duplicated[key]}" :title="mac.duplicated[key] ? 'This license has been created before.':''">
                      <input type="checkbox" :id="type.name +'-'+ index" v-model="mac[key]" @click="validateCheckboxes">
                    <label :for="type.name +'-'+ index">
                    <span class="sprite icon-checkbox hand"></span>
                    </label>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            </section>
          </div>
        </div>

      </div>
    </div>
    <div class="row">
      <div class="col-md-10 col-md-offset-1 col-sm-12" v-if="logs.length > 0">
        <label class="control-label center-block margin-top-20">Generating Logs</label>

        <div class="row">
            <div class="col-md-10 col-md-offset-1 col-sm-12">
              <!-- Logs START -->
              <div class="textarea-wrapper" v-bind:class="{ open: logs.length > 0 }">
                <div class="textarea" rows="4" cols="50" v-model="logs">
                  <div v-if="item.text" v-for="item in logs">
                    <span v-if="item.time" :class="{'warning' : item.type === 'warning','error' : item.type === 'error', 'success': item.type === 'success'}">{{item.time}}</span>
                    <span v-if="item.time" :class="{'warning' : item.type === 'warning','error' : item.type === 'error', 'success': item.type === 'success'}">-</span>
                    <span v-if="item.text" :class="{'warning' : item.type === 'warning','error' : item.type === 'error', 'success': item.type === 'success'}">{{item.text}}</span>
                   </div>
                </div>
              </div>
              <!-- Logs END -->
            </div>
        </div>
      </div>
    </div>
    </div>
    <option-modal
      v-if="showOptionModal"
      :options="options"
      :macAddress="macAddressSelected"
      :savemsg="flags"
      @close="showOptionModal = false">
    </option-modal>
    <duplicate-warning-modal
      v-if="duplicateWarningModal.show"
      @close="closeDuplicateWarningModal"
      @generate="generate">
    </duplicate-warning-modal>
  </div>

</template>

<script src="./generator.js"></script>
<style lang="scss" src="./generator.scss"></style>
