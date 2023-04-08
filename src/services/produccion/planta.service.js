import axios from "axios";
import generalHeader from "@/services/general-header.js";
const API_PLANTA = "http://localhost:12590/api/tucann/proPlanta/";

class plantaService {
  
  listarPlantasXRegistroSiembra(registrosiembra) {
    var config = {
      method: "get",
      url: API_PLANTA + "lpxru/" + registrosiembra,
      headers: generalHeader(),
    };
    return axios(config);
  }

  listarPlantaActividad(idPlanta, idActividad, loteSiembra) {
    var config = {
      method: "get",
      url:
        API_PLANTA +
        "pxidandidactandls/" +  idPlanta + "/" +  idActividad +  "/" + loteSiembra,
      headers: generalHeader(),
    };
    return axios(config);
  }

  crearPlanta( planta) {
    var config = {
      method: "post",
      url: API_PLANTA ,
      headers: generalHeader(),
      data: planta
    };
    return axios(config);
  }

  actualizarPlanta( planta) {
    var config = {
      method: "put",
      url: API_PLANTA ,
      headers: generalHeader(),
      data: planta
    };
    return axios(config);
  }

  buscarPlantaXIdUbicacion(idUbicacion) {
    var config = {
      method: "get",
      url: API_PLANTA+'xubi/'+idUbicacion ,
      headers: generalHeader(),
    };
    return axios(config);
  }

  buscarPlantaXCodigoPlanta(codigoPlanta) {
    var config = {
      method: "get",
      url: API_PLANTA+codigoPlanta ,
      headers: generalHeader(),
    };
    return axios(config);
  }

  buscarPlantaXIdEstadoPlanta(idEstadoPlanta) {
    var config = {
      method: "get",
      url: API_PLANTA+'lxestp/'+idEstadoPlanta ,
      headers: generalHeader(),
    };
    return axios(config);
  }

  devolverNumPlantasEnRegistroSiembra(idRegistroSiembra) {
    var config = {
      method: "get",
      url: API_PLANTA+'numpxrsf/'+idRegistroSiembra ,
      headers: generalHeader(),
    };
    return axios(config);
  }

  listaPlantasXIdRegistroSiembra(idRegistroSiembra) {
    var config = {
      method: "get",
      url: API_PLANTA+'bpxrs/'+idRegistroSiembra ,
      headers: generalHeader(),
    };
    return axios(config);
  }

  eliminarPlanta(idPlanta) {
    var config = {
      method: "delete",
      url: API_PLANTA + idPlanta ,
      headers: generalHeader(),
    };
    return axios(config);
  }

}
export default new plantaService();
