import _ from "lodash"

export default {
  props : {
    list: {}
  },
  data() {
    return {
      macAddress: '',
      textAreaFlag : false
    }
  },
  created(){

  },
  methods: {
    checkInputStatus(){
      let vm = this;
      if(!this.macAddress){ return; }
      if(this.macAddress.length > 12){
        this.textAreaFlag = true;
        setTimeout(function(){
          vm.$refs.textAreaSelect.focus();
        },0);
      }
      else if(this.macAddress.length <=12){
        this.textAreaFlag = false;
        this.$refs.inputSelect.focus();
        setTimeout(function(){
          vm.$refs.inputSelect.focus();
        },0);
      }
    },
    confirmValue(){
      this.textAreaFlag = false;
    },
    /* Pending */
    filterMacAddressList(list,macAddress){
      var x = Object.assign({}, list);
      if(Object.keys(list).length === 0 || macAddress===''){
        return [];
      }
      return _.filter(x,function(mac){
        mac = Object.assign({}, mac);
        return mac.macAddress.indexOf(macAddress) !== -1;
      })
    }
  }
}
