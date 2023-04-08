import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#4CAF50',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#50B748',
        warning: '#FFC107',
        fondo: '#6DFC71',
        analogo1:'#43C485',
        analogo2:'#46CF65',
        analogo3:'#7FCF46',
        analogo4:'#A6C443',
        monocromatico1:'#183816',
        monocromatico2:'#8BC387',
        monocromatico3:'#283827',
        monocromatico4:'#398534',
        complementario1:'#246B1F',
        complementario2:'#86FF7D',
        complementario3:'#6B1448',
        complementario4:'#B8488A',
        triada1:'#246B1F',
        triada2:'#665AB8',
        triada3:'#B86B35',
        triada4:'#6B4124'
      },
    },
  },
});
