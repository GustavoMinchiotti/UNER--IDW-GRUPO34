import { getSalones, saveSalones, inicializarLocalStorage } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  inicializarLocalStorage();

  const form = document.getElementById("form-salon");
  const tablaBody = document.querySelector("#tabla-salones tbody");
  const btnCancelar = document.getElementById("btn-cancelar");

  let salones = getSalones();
  let editandoId = null;

  
  function renderizarTabla() {
    tablaBody.innerHTML = "";
    salones.forEach(salon => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${salon.nombre}</td>
        <td>${salon.descripcionCorta}</td>
        <td>${salon.direccion}</td>
        <td>$${salon.valor.toLocaleString()}</td>
        <td>${salon.estado}</td>
        <td><img src="${salon.imagen}" alt="${salon.nombre}" style="width: 80px; height: 50px; object-fit: cover; border-radius: 8px;"></td>
        <td>
          <button class="btn btn-sm btn-warning btn-editar me-2" data-id="${salon.id}" aria-label="Editar ${salon.nombre}">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-sm btn-danger btn-eliminar" data-id="${salon.id}" aria-label="Eliminar ${salon.nombre}">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      `;
      tablaBody.appendChild(tr);
    });
  }

  
  function cargarFormulario(salon) {
    document.getElementById("salon-id").value = salon.id;
    document.getElementById("nombre").value = salon.nombre;
    document.getElementById("descripcionCorta").value = salon.descripcionCorta;
    document.getElementById("descripcionLarga").value = salon.descripcionLarga;
    document.getElementById("direccion").value = salon.direccion;
    document.getElementById("valor").value = salon.valor;
    document.getElementById("estado").value = salon.estado;
    document.getElementById("ubicacion").value = salon.ubicacion;
  }

  
  function limpiarFormulario() {
    form.reset();
    document.getElementById("salon-id").value = "";
    editandoId = null;
  }

  
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const archivoImagen = document.getElementById("imagen").files[0];
    let imagenBase64 = "";

    if (archivoImagen) {
      imagenBase64 = await convertirImagenABase64(archivoImagen);
    } else if (editandoId) {
      const salonExistente = salones.find(s => s.id === editandoId);
      imagenBase64 = salonExistente.imagen;
    } else {
      alert("Debe seleccionar una imagen.");
      return;
    }

    const nuevoSalon = {
      id: editandoId || Date.now().toString(),
      nombre: document.getElementById("nombre").value.trim(),
      descripcionCorta: document.getElementById("descripcionCorta").value.trim(),
      descripcionLarga: document.getElementById("descripcionLarga").value.trim(),
      direccion: document.getElementById("direccion").value.trim(),
      valor: Number(document.getElementById("valor").value),
      estado: document.getElementById("estado").value,
      imagen: imagenBase64,
      ubicacion: document.getElementById("ubicacion").value.trim(),
    };

    if (editandoId) {
      salones = salones.map(salon => salon.id === editandoId ? nuevoSalon : salon);
    } else {
      salones.push(nuevoSalon);
    }

    saveSalones(salones);
    renderizarTabla();
    limpiarFormulario();
  });


  function convertirImagenABase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }


  
  btnCancelar.addEventListener("click", () => {
    limpiarFormulario();
  });

  
  tablaBody.addEventListener("click", e => {
    if (e.target.closest(".btn-editar")) {
      const id = e.target.closest(".btn-editar").dataset.id;
      const salon = salones.find(s => s.id === id);
      if (salon) {
        editandoId = id;
        cargarFormulario(salon);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    if (e.target.closest(".btn-eliminar")) {
      const id = e.target.closest(".btn-eliminar").dataset.id;
      if (confirm("¿Seguro que desea eliminar este salón?")) {
        salones = salones.filter(s => s.id !== id);
        saveSalones(salones);
        renderizarTabla();
      }
    }
  });

  renderizarTabla();
});
