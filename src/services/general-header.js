export default function generalHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.tokenSesionUsuarioSistema) {
      return { 
          Authorization: user.tokenSesionUsuarioSistema,
          Accept : "application/json",
          'Content-Type' : "application/json"
        };
    } else {
      return {};
    }
  }