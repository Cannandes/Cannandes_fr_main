import axios from "axios";
import generalHeader from "@/services/general-header";
const API_USUARIO = "http://localhost:12590/api/tucann/genUsuarioSistema/";
const API_ROL_USUARIO = "http://localhost:12590/api/tucann/genRolUsuarioSistema/";

class usuarioServices {
  registrarNuevoUsuario(usuario) {
    var config = {
      method: "post",
      url: API_USUARIO,
      headers: generalHeader(),
      data: usuario,
    };
    //  console.log(generalHeader);
    return axios(config);
  }

  editarUsuario(usuario) {
    var config = {
      method: "put",
      url: API_USUARIO,
      headers: generalHeader(),
      data: usuario,
    };
    //  console.log(generalHeader);
    return axios(config);
  }

  listarRolUsuario() {
    var config = {
      method: "get",
      url: API_ROL_USUARIO,
      headers: generalHeader(),
    };
    //  console.log(config.data);
    return axios(config);
  }

  listarUsuarioSistema() {
    var config = {
      method: "get",
      url: API_USUARIO,
      headers: generalHeader(),
    };
    //  console.log(config.data);
    return axios(config);
  }
}

export default new usuarioServices();
