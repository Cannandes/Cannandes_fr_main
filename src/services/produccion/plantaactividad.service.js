import axios from "axios";
import generalHeader from "@/services/general-header.js";
const API_PLANTA = "http://localhost:12590/api/tucann/proPlantaActividad/";

class plantaActividadService {

  buscarPlantaActividad(idPlanta, idActividad, loteSiembra) {
    var config = {
      method: "get",
      url:
        API_PLANTA +
        "pxidandidactandls/" +  idPlanta + "/" +  idActividad +  "/" + loteSiembra,
      headers: generalHeader(),
    };
    return axios(config);
  }

 actualizarPlantaActividad(plantaActividad) {
    var config = {
      method: "put",
      url: API_PLANTA,
      headers: generalHeader(),
      data: plantaActividad
    };
    return axios(config);
  }
}

export default new plantaActividadService();
