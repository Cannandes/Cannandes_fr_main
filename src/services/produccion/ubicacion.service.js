import axios from "axios";
import generalHeader from "@/services/general-header";
const API_UBICACION = "http://localhost:12590/api/tucann/proUbicacion/";
const API_TIPO_UBICACION = "http://localhost:12590/api/tucann/proTipoUbicacion";
const API_UBICACION_XID = "http://localhost:12590/api/tucann/proUbicacion/bxidtu/";
const API_EST_UBI = "http://localhost:12590/api/tucann/proEstadoUbicacion/";

class ubicacionService {
  listarUbicaciones() {
    var cabeceras = {
      method: "get",
      url: API_UBICACION,
      headers: generalHeader(),
    };
    //  console.log(config.data);
    return axios(cabeceras);
  }

  listarTipoUbicaciones() {
    var cabeceras = {
      method: "get",
      url: API_TIPO_UBICACION,
      headers: generalHeader(),
    };
    //  console.log(config.data);
    return axios(cabeceras);
  }

  listarUbicacionesXTipo(tipo) {
    var cabeceras = {
      method: "get",
      url: API_UBICACION_XID + tipo,
      headers: generalHeader(),
    };
    return axios(cabeceras);
  }

  contarBandejas(tipo) {
    var cabeceras = {
      method: "get",
      url: API_UBICACION_XID + tipo,
      headers: generalHeader(),
    };
    axios(cabeceras).then((resp) => {
      //   console.log(resp.data);
      this.quitarDuplicados = resp.data;
    });

    //   return axios(cabeceras);
  }

  darNumeroElementosVector(ubicacionesTodas) {
    let vectProvicional = [];
    let valor = "";
    var hash = {};
    for (var i = 0; i < ubicacionesTodas.length; i++) {
      if (!(ubicacionesTodas[i] in hash)) {
        hash[ubicacionesTodas[i]] = true;
        vectProvicional.push(ubicacionesTodas[i]);
      }
    }
    valor = vectProvicional.length;
    return valor;
  }

  buscarUbicacionPorTipoPrimeraParte(){
    var cabeceras = {
        method: "get",
        url: API_UBICACION_XID,
        headers: generalHeader(),
      };

      return axios(cabeceras);
  }
  buscarXBandejaTipoUbicacion(numBandeja, tipoUbicacion){
    var cabeceras = {
      method: "get",
      url: API_UBICACION+'bxbytpub/'+numBandeja+'/'+tipoUbicacion,
      headers: generalHeader(),
    };

    return axios(cabeceras);
  }
  quitarElementosDuplicados(ubicacionesTodas) {
    //   console.log(ubicacionesTodas);
    let vectProvicional = [];
    let valor = "";
    //  console.log(ubicacionesTodas);
    var hash = {};
    //  console.log(this.vectorActRegistroSiembra);
    for (var i = 0; i < ubicacionesTodas.length; i++) {
      if (!(ubicacionesTodas[i] in hash)) {
        //it works with objects! in FF, at least
        hash[ubicacionesTodas[i]] = true;
        vectProvicional.push(ubicacionesTodas[i]);
      }
    }
    //   console.log(vectProvicional);
    vectProvicional.sort(function(b, a) {
      return b - a;
    });
    //   console.log(vectProvicional);
  //  valor = vectProvicional.length;
    // console.log( valor);
    //  this.vectorActRegistroSiembra = this.bandActRegistroSiembra;
    // console.log(this.vectorActRegistroSiembra);
    //   return vectProvicional;
    return vectProvicional;
  }

  verificarUbicacion(ubicacion){
    var cabeceras = {
      method: "get",
      url: API_UBICACION+'bxidu/'+ubicacion,
      headers: generalHeader(),
    };

    return axios(cabeceras);
  }

  verificarUbixtipoPrimpSegp(tipoUbicacion,ubiPrimeraParte,ubiSegundaParte){
    var cabeceras = {
      method: "get",
      url: API_UBICACION+'bxtpuandpuandsu/'+tipoUbicacion+'/'+ubiPrimeraParte+'/'+ubiSegundaParte,
      headers: generalHeader(),
    };

    return axios(cabeceras);
  }

  nuevaUbicacion(ubicacion){
    var cabeceras = {
      method: "post",
      url: API_UBICACION,
      headers: generalHeader(),
      data:ubicacion
    };

    return axios(cabeceras);
  }

  modificarUbicacion(ubicacion){
    var cabeceras = {
      method: "put",
      url: API_UBICACION,
      headers: generalHeader(),
      data:ubicacion
    };

    return axios(cabeceras);
  }

  buscarUbicacionXIdUbicacion(ubicacion){
    var cabeceras = {
      method: "get",
      url: API_UBICACION+ubicacion,
      headers: generalHeader(),
    };

    return axios(cabeceras);
  }

  ////// lista de stado de ubicaciones 

  listaEstadoUbicacion(){
    var cabeceras = {
      method: "get",
      url: API_EST_UBI,
      headers: generalHeader(),
    };

    return axios(cabeceras);
  }

  listaEstadoUbicacionXEstadoYTipo(idEstadoUbicacion, idTipoUbicacion){
    var cabeceras = {
      method: "get",
      url: API_UBICACION+'bxtpandest/'+idEstadoUbicacion+'/'+idTipoUbicacion,
      headers: generalHeader(),
    };

    return axios(cabeceras);
  }

  
  valorEstadoUbicacionTotal(idEstadoUbicacion){
    var cabeceras = {
      method: "get",
      url: API_UBICACION+'bxtpub/'+idEstadoUbicacion,
      headers: generalHeader(),
    };

    return axios(cabeceras);
  }

  listaUbicacionesXEstadoUbicacion(idEstadoUbicacion){
    var cabeceras = {
      method: "get",
      url: API_UBICACION+'buxeu/'+idEstadoUbicacion,
      headers: generalHeader(),
    };

    return axios(cabeceras);
  }

}

export default new ubicacionService();
