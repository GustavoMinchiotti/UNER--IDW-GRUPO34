import { inicializarLocalStorage, getSalones } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  inicializarLocalStorage();

  const salones = getSalones();
  const catalogo = document.getElementById("catalogo");

  salones.forEach(salon => {
    const col = document.createElement("div");
    col.className = "col";

    col.innerHTML = `
      <div class="card h-100 clickable" data-bs-toggle="modal" data-bs-target="#modal-${salon.id}" role="button" tabindex="0" aria-label="Abrir detalles ${salon.nombre}">
        <img src="${salon.imagen}" class="card-img-top img-fluid" alt="${salon.nombre}" />
        <div class="card-body">
          <h5 class="card-title">${salon.nombre}</h5>
          <p class="card-text">${salon.descripcionCorta}</p>
        </div>
      </div>
    `;

    catalogo.appendChild(col);

    const modalDiv = document.createElement("div");
    modalDiv.className = "modal fade";
    modalDiv.id = `modal-${salon.id}`;
    modalDiv.setAttribute("tabindex", "-1");
    modalDiv.setAttribute("aria-labelledby", `modal-${salon.id}-label`);
    modalDiv.setAttribute("aria-hidden", "true");

    modalDiv.innerHTML = `
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modal-${salon.id}-label">
              ${salon.nombre}
              <span class="badge ${salon.estado === "Disponible" ? "badge-disponible" : "badge-reservado"} ms-2">${salon.estado}</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body">
            <p>${salon.descripcionLarga}</p>
            <ul class="list-unstyled">
              <li><strong>Dirección:</strong> ${salon.direccion}</li>
              <li><strong>Valor:</strong> $${salon.valor.toLocaleString()}</li>
              <li><strong>Estado:</strong> ${salon.estado}</li>
            </ul>
            <h6 class="mt-4">Ubicación:</h6>
            <div class="modal-map">
              <iframe src="${salon.ubicacion}" allowfullscreen loading="lazy"></iframe>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modalDiv);
  });
});
