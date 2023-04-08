export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.tokenSesionUsuarioSistema) {
      return { Authorization: 'Bearer ' + user.tokenSesionUsuarioSistema }; // for Spring Boot back-end

    } else {
      return {};
    }
  }