import HistoryService from './history.service'

import _ from 'lodash'
import InfiniteLoading from 'vue-infinite-loading';

import {exportLicenses} from '@/services/exportLics.service'


import Vue from 'vue'

import Papa from 'papaparse'
import axios from 'axios';


export default {
  name: 'History',
  data() {
    return {

    }
  },
  beforeCreate() {

  },
  watch:{

  },
  methods: {

  },

  components:{
    InfiniteLoading
  }
}
