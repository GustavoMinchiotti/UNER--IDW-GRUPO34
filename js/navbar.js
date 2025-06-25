import { estaLogueado, cerrarSesion } from './auth.js';

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar-nav");

  if (estaLogueado()) {
    navbar.innerHTML += `
      <li class="nav-item"><a class="nav-link" href="./editarSalon.html">Salones</a></li>
      <li class="nav-item"><a class="nav-link" href="./editarImagen.html">Imágenes</a></li>
      <li class="nav-item"><a class="nav-link" href="./editarServicio.html">Servicios</a></li>
      <li class="nav-item"><a class="nav-link" href="./usuario.html">Usuarios</a></li>
      <li class="nav-item"><a class="nav-link" href="#" id="cerrar-sesion">Cerrar sesión</a></li>
    `;

    document.getElementById("cerrar-sesion").addEventListener("click", (e) => {
      e.preventDefault();
      cerrarSesion();
    });
  } else {
    navbar.innerHTML += `
      <li class="nav-item"><a class="nav-link" href="./login.html">Login</a></li>
    `;
  }
});
