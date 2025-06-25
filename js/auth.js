export function estaLogueado() {
  return !!sessionStorage.getItem("accessToken");
}

export function cerrarSesion() {
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("usuario");
  location.href = "index.html";
}
