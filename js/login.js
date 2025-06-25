document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value.trim();
  const clave = document.getElementById("contrasena").value.trim();
  const mensajeError = document.getElementById("mensaje-error");

  try {
    const response = await  fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify({
        username: usuario,
        password: clave
      }),
    });

    if (!response.ok) throw new Error("Credenciales Inválidas");
    
    const data = await response.json();
    console.log(data);

    sessionStorage.setItem("accessToken", data.accessToken);
    sessionStorage.setItem("usuario", data.username);

    window.location.href = "editarSalon.html";
  } catch (error) {
    mensajeError.style.display = "block";
  }

});
