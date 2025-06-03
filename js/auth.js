export function estaLogueado() {
  return sessionStorage.getItem("usuario") === "admin";
}

export function cerrarSesion() {
  sessionStorage.removeItem("usuario");
  location.href = "index.html";
}
