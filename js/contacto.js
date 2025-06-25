document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.querySelector("form");
  const mensajeExito = document.getElementById("mensaje-exito");

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    mensajeExito.classList.remove("d-none");

    formulario.reset();

  
    setTimeout(() => {
      mensajeExito.classList.add("d-none");
    }, 5000);
  });
});
