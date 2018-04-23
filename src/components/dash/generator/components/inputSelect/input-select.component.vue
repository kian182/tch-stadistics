<template>
  <div class="">
    <input
      type="text"
      class="form-control"
      ref="inputSelect"
      v-model="macAddress"
      v-show="!textAreaFlag"
      @focus="checkInputStatus()"
      @input="
        macAddress = $event.target.value.toUpperCase();
        $emit('changeInputSelect', $event.target.value.toUpperCase())
        checkInputStatus()"
      />

    <div class="mac-address" v-show="textAreaFlag">
      <div class="textArea-MAC">
        <textarea rows="6"
                  cols="200"
                  ref="textAreaSelect"
                  spellcheck="true" class="form-control generator-textArea"
                  v-model="macAddress"
                  @blur="confirmValue()"
                  @input="
                    macAddress = $event.target.value.toUpperCase();
                    $emit('changeInputSelect', $event.target.value.toUpperCase())
                    checkInputStatus()"
        ></textarea>
      </div>
      <div class="buttons">
        <span class="sprite icon-check hand" title="Select MAC Addresses" v-on:click="confirmValue()"></span>
        <!--<span class="sprite icon-close hand" v-on:click=""></span>-->
      </div>
    </div>

    <!--<ul class="list-group">-->
      <!--<li class="list-group-item" v-for="macs in filterMacAddressList(list,macAddress)">-->
        <!--{{macs.macAddress}}-->
      <!--</li>-->
    <!--</ul>-->
  </div>
</template>
<script src="../inputSelect/input-select.js"></script>
