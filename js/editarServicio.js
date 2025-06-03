import { getServicios, saveServicios, inicializarServicios } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  inicializarServicios();

  const form = document.getElementById("form-servicio");
  const tablaBody = document.querySelector("#tabla-servicios tbody");
  const btnCancelar = document.getElementById("btn-cancelar");

  let servicios = getServicios();
  let editandoId = null;

  function renderizarTabla() {
    tablaBody.innerHTML = "";
    servicios.forEach(servicio => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${servicio.nombre}</td>
        <td>$${servicio.valor.toLocaleString()}</td>
        
        <td>
          <button class="btn btn-sm btn-warning btn-editar me-2" data-id="${servicio.id}" aria-label="Editar ${servicio.nombre}">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-sm btn-danger btn-eliminar" data-id="${servicio.id}" aria-label="Eliminar ${servicio.nombre}">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      `;
      tablaBody.appendChild(tr);
    });
  }

  function cargarFormulario(servicio) {
    document.getElementById("servicio-id").value = servicio.id;
    document.getElementById("nombre").value = servicio.nombre;
    document.getElementById("valor").value = servicio.valor;
  }

  function limpiarFormulario() {
    form.reset();
    document.getElementById("servicio-id").value = "";
    editandoId = null;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nuevoServicio = {
      id: editandoId || Date.now().toString(),
      nombre: document.getElementById("nombre").value.trim(),
      valor: Number(document.getElementById("valor").value),
    };

    if (editandoId) {
      servicios = servicios.map(servicio => servicio.id === editandoId ? nuevoServicio : servicio);
    } else {
      servicios.push(nuevoServicio);
    }

    saveServicios(servicios);
    renderizarTabla();
    limpiarFormulario();
  });

  btnCancelar.addEventListener("click", () => {
    limpiarFormulario();
  });

  tablaBody.addEventListener("click", e => {
    if (e.target.closest(".btn-editar")) {
      const id = e.target.closest(".btn-editar").dataset.id;
      const servicio = servicios.find(s => s.id === id);
      if (servicio) {
        editandoId = id;
        cargarFormulario(servicio);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    if (e.target.closest(".btn-eliminar")) {
      const id = e.target.closest(".btn-eliminar").dataset.id;
      if (confirm("¿Seguro que desea eliminar este servicio?")) {
        servicios = servicios.filter(s => s.id !== id);
        saveServicios(servicios);
        renderizarTabla();
      }
    }
  });

  renderizarTabla();
});
