import { inicializarServicios, getServicios } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  inicializarServicios();

  const servicios = getServicios();
  const listaServicios = document.getElementById("lista-servicios");

  servicios.forEach(servicio => {
    const li = document.createElement("li");
    li.classList.add("mb-2");
    li.innerHTML = `
      <i class="fas fa-star text-primary me-2"></i>
      <strong>${servicio.nombre}</strong> - 
      <span class="text-success">$${servicio.valor.toLocaleString()}</span>
    `;
    listaServicios.appendChild(li);
  });
});
