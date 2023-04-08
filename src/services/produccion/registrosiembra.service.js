import axios from "axios";
import generalHeader from "@/services/general-header.js";
const API_REGISTRO = "http://localhost:12590/api/tucann/proRegistroSiembra/";
const API_REGISTRO_ACTIVIDAD = "http://localhost:12590/api/tucann/proRegistroSiembraActividad/";

class registrosiembraService {
  listarPlantasXRegistro(registrosiembra) {
    var config = {
      method: "get",
      url: API_REGISTRO + "bxrs/" + registrosiembra,
      headers: generalHeader(),
    };
    return axios(config);
  }

  modificarRegistroSiembra(registrosiembra) {
    var config = {
      method: "put",
      url: API_REGISTRO,
      headers: generalHeader(),
      data: registrosiembra,
    };
    return axios(config);
  }

  traerRegistrosSiembraActivos() {
    var config = {
      method: "get",
      url: API_REGISTRO,
      headers: generalHeader(),
    };
    return axios(config);
  }

  eliminarRegistrosSiembraActivos(idRegistroSiembra) {
    var config = {
      method: "delete",
      url: API_REGISTRO + idRegistroSiembra,
      headers: generalHeader(),
    };
    return axios(config);
  }

  listaPlantasTipoRegistroAndEstadoRegistro(
    idTipoRegistroSiembra,
    idEstadoRegistroSiembra
  ) {
    var config = {
      method: "get",
      url:
        API_REGISTRO +
        "bxidtrsandiders/" +
        idTipoRegistroSiembra +
        "/" +
        idEstadoRegistroSiembra,
      headers: generalHeader(),
    };
    return axios(config);
  }

  listaPlantasTipoRegistro(idTipoRegistroSiembra) {
    var config = {
      method: "get",
      url: API_REGISTRO + "bxidtrs/" + idTipoRegistroSiembra,
      headers: generalHeader(),
    };
    return axios(config);
  }

  numeroPlantasXRegistroSiembra(idRegistroSiembra) {
    var config = {
      method: "get",
      url: API_REGISTRO + "numpxrs/" + idRegistroSiembra,
      headers: generalHeader(),
    };
    return axios(config);
  }
// para poder gestionar directamente el registro busado por el lote
  obtenerIdRegistroSiembra(loteRegistroSiembra) {
    var config = {
      method: "get",
      url: API_REGISTRO + "bidrxlote/" + loteRegistroSiembra,
      headers: generalHeader(),
    };
    return axios(config);
  }

  // crear el registro de siembra - actividad
  crearRegistroSiembraActividad(registroSiembraActividad) {
    var config = {
      method: "post",
      url: API_REGISTRO_ACTIVIDAD ,
      headers: generalHeader(),
      data: registroSiembraActividad
    };
    return axios(config);
  }
}

export default new registrosiembraService();
