import axios from 'axios';
import generalHeader from '@/services/general-header.js';
const API_SEMILLA = 'http://localhost:12590/api/tucann/proSemilla';

class semillaService{

    listarSemillas(){
    var config = {
        method: 'get',
        url: API_SEMILLA,
        headers: generalHeader(),
      };
      return axios(config);
    }

   

}

export default new semillaService();