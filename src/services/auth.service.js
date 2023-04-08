import axios from 'axios';
const API_URL = 'http://localhost:12590/api/tucann/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'genSesionUsuarioSistema/tokenSession?correoUsuarioSistema='+user.correoUsuarioSistema+'&contraseniaUsuarioSistema='+user.contraseniaUsuarioSistema, {
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json',
         'Access-Control-Allow-Credentials': true
        }
      })
      .then(response => {
        if (response.data.tokenSesionUsuarioSistema) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  /*register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      cedula:user.cedula,
      nombres:user.nombres.toUpperCase(),
      //apellidos:user.apellidos.toUpperCase() ,
      telefono:user.telefono,
      direccion:user.direccion.toUpperCase() ,
      email: user.email,
      password: user.password,
      rol:user.rol,
      estadoId:user.estadoId
    });
  }*/
}

export default new AuthService();
