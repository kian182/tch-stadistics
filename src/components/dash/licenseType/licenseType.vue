<template>
  <div class="container licenseType">
    <div class="row">
      <div class="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12 text-center">
        <h5>&#160;</h5>
      </div>
    </div>
    <div class="row">
    <div class="col-sm-offset-1 col-sm-10 col-xs-12">
        <h3>Licence Type</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-offset-1 col-sm-10 col-xs-12">
        <p>Please, select the licences you need edit or delete.</p>
      </div>
    </div>
    <div class="row margin-bottom-20">
      <div class="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-xs-12 text-center container-addLicence">
        <button class="btn btn-primary" type="submit" @click="openLicTypeManager('create')">
          <span class="sprite icon-add-white"  aria-hidden="true"></span>&#160;Add Licence Type
        </button>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-10 col-sm-offset-1">
        <div class="row">
          <div class="col-md-12">
            <!--<div class="table-licenseType">-->
              <table class="table table-striped table-license table-fixed table-licenseType">
              <thead>
              <tr>
                <th class="col-xs-7 col-sm-9 col-md-10 col-lg-10">
                  Types
                </th>
                <th class="col-xs-5 col-sm-3 col-md-2 col-lg-2">&#160;</th>
              </tr>
              </thead>
              <tbody>
              <tr v-if="licenseTypeList.length === 0">
                <td colspan="5" class="text-center col-xs-12 no-items">No Licence Types</td>
              </tr>
              <tr v-for="(licType, key) in licenseTypeList">
                <td class="col-xs-7 col-sm-9 col-md-10 col-lg-10">
                  <div class="table-div-ellipsis">{{licType.name}}</div>
                </td>
                <td class="col-xs-5 col-sm-3 col-md-2 col-lg-2 text-right content-visible">
                  <span class="d-inline-block" @click="openLicTypeManager('edit', licType)"  title="Edit Licence Type">
                    <span class="sprite icon-edit hand"  aria-hidden="true"></span>
                  </span>
                  <span class="d-inline-block" @click="openRemoveModal(licType)" title="Delete">
                    <span class="sprite icon-close hand"  aria-hidden="true"></span>
                  </span>
                  <lt-detail-icon :details="licType"></lt-detail-icon>
                </td>
              </tr>
              </tbody>
            </table>
            <!--</div>-->
          </div>
        </div>
      </div>
    </div>
    <!--modals-->
    <licType-mng-modal
      v-if="licenseTypeMng.showModal"
      :model="licenseTypeMng.model"
      :license-type-list="licenseTypeList"
      :is-create-mode="licenseTypeMng.mode==='create'"
      @close="closeLicTypeManager"
      @save="saveLicenseType">
    </licType-mng-modal>
    <licType-rm-modal
      v-if="removeModal.show"
      :license-type-name="removeModal.licTypeModel.name"
      @close="closeRemoveModal"
      @removeLicenseType="deleteLicenseType">
    </licType-rm-modal>
  </div>
</template>

<script src="./licenseType.js"></script>
<style lang="scss" src="./licenseType.scss" scoped></style>

