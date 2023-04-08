import axios from "axios";
import generalHeader from "@/services/general-header.js";
const API_REGISTRO_PRODUCCION =
  "http://localhost:12590/api/tucann/posRegistroProduccion/";

class registroproduccionService {
  registrarProduccion(registroproduccion) {
    var config = {
      method: "post",
      url: API_REGISTRO_PRODUCCION,
      headers: generalHeader(),
      data: registroproduccion,
    };
    return axios(config);
  }

  listarRegistrosProduccion() {
    var config = { 
      method: "get",
      url: API_REGISTRO_PRODUCCION,
      headers: generalHeader(),
    };
    return axios(config);
  }

  listarRegistrosProduccionFechas(fechaInicial,fechaFinal) {
    var config = { 
      method: "get",
      url: API_REGISTRO_PRODUCCION+'bxfiAndFf/'+fechaInicial+'/'+fechaFinal,
      headers: generalHeader(),
    };
    return axios(config);
  }

  editarRegistrosProduccion(registro) {
    var config = {
      method: "put",
      url: API_REGISTRO_PRODUCCION,
      headers: generalHeader(),
      data : registro
    };
    return axios(config);
  }

  eliminarRegistrosProduccion(idregistroproduccion) {
    var config = {
      method: "delete",
      url: API_REGISTRO_PRODUCCION + idregistroproduccion,
      headers: generalHeader(),
    };
    return axios(config);
  }
}

export default new registroproduccionService();
