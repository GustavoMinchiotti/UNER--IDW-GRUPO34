document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value.trim();
  const clave = document.getElementById("contrasena").value.trim();

  if (usuario === "admin" && clave === "1234") {
    sessionStorage.setItem("usuario", usuario);
    window.location.href = "editarSalon.html";
  } else {
    alert("Credenciales incorrectas");
  }
});
