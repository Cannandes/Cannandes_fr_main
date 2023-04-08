import axios from "axios";
import generalHeader from "@/services/general-header";
const API_PLANTA_ACTIVIDAD = "http://localhost:12590/api/tucann/proPlantaActividad/";


class plantaActividadService {

    crearActividadPlanta(plantaActividad){
        var cabeceras = {
          method: "post",
          url: API_PLANTA_ACTIVIDAD,
          headers: generalHeader(),
          data: plantaActividad
        };
    
        return axios(cabeceras);
      }
    
}

export default new plantaActividadService();