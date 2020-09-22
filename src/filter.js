import Vue from 'vue'

import moment from 'moment'

Vue.filter('dateFormat', function(date){
    return moment(date).format('YYYY-MM-DD HH:mm:ss')
})