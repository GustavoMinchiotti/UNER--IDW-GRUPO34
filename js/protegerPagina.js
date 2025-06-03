import { estaLogueado, cerrarSesion } from './auth.js';


if (!estaLogueado()) {
  window.location.href = "login.html";
} else {
  document.addEventListener("DOMContentLoaded", () => {
    const botonCerrarSesion = document.getElementById("cerrar-sesion");
    if (botonCerrarSesion) {
      botonCerrarSesion.addEventListener("click", (e) => {
        e.preventDefault();
        cerrarSesion();
      });
    }
  });
}
