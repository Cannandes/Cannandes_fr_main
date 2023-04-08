import Vue from 'vue'
import VueSimpleAlert from "vue-simple-alert";
import VueCurrencyFilter from 'vue-currency-filter'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false
Vue.use(VueSimpleAlert);

Vue.use(VueCurrencyFilter, [ { 
  symbol: '$', // El símbolo, por ejemplo €
  thousandsSeparator: '.', // Separador de miles
  fractionCount: 2, // ¿Cuántos decimales mostrar?
  fractionSeparator: ',', // Separador de decimales
  symbolPosition: 'front', // Posición del símbolo. Puede ser al inicio ('front') o al final ('') es decir, si queremos que sea al final, en lugar de front ponemos una cadena vacía ''
  symbolSpacing: true // Indica si debe poner un espacio entre el símbolo y la cantidad
},{ // default name 'currency_2'
  name: 'numero',
  symbol: '',
  thousandsSeparator: '.',
  fractionCount: 2,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: false,
  avoidEmptyDecimals: '',
},
{ // default name 'currency_2'
name: 'currency_3',
symbol: '',
thousandsSeparator: '.',
fractionCount: 2,
fractionSeparator: ',',
symbolPosition: 'front',
symbolSpacing: false,
avoidEmptyDecimals: '',
},
{ // default name 'currency_2'
name: 'porcentaje',
symbol: '% ',
thousandsSeparator: '.',
fractionCount: 2,
fractionSeparator: ',',
symbolPosition: 'front',
symbolSpacing: false,
avoidEmptyDecimals: '',
}])


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
