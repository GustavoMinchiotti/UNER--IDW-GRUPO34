import { getSalones, saveSalones, inicializarLocalStorage } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  inicializarLocalStorage();

  const form = document.getElementById("form-salon");
  const tablaBody = document.querySelector("#tabla-salones tbody");
  const btnCancelar = document.getElementById("btn-cancelar");
  const selectImagen = document.getElementById("imagenSelect");
  const preview = document.getElementById("preview-imagen");

  let salones = getSalones();
  let editandoId = null;

  function cargarImagenesDesdeLocalStorage() {
    const imagenes = JSON.parse(localStorage.getItem('imagenes')) || [];

    selectImagen.innerHTML = `<option value="">-- Selecciona una imagen --</option>`;

    const optionDefault = document.createElement("option");
    optionDefault.value = "img/salon default.jpeg";
    optionDefault.textContent = "Salón Default";
    selectImagen.appendChild(optionDefault);

    imagenes.forEach(img => {
      const option = document.createElement("option");
      option.value = img.base64;
      option.textContent = img.titulo;
      selectImagen.appendChild(option);
    });
  }


  selectImagen.addEventListener("change", () => {
    if (selectImagen.value) {
      preview.src = selectImagen.value;
      preview.style.display = "block";
    } else {
      preview.style.display = "none";
    }
  });

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

    let existe = false;
    for (let option of selectImagen.options) {
      if (option.value === salon.imagen) {
        existe = true;
        break;
      }
    }
    if (!existe && salon.imagen) {
      const optionExtra = document.createElement("option");
      optionExtra.value = salon.imagen;
      optionExtra.textContent = "Imagen actual";
      selectImagen.appendChild(optionExtra);
    }

    selectImagen.value = salon.imagen;
    preview.src = salon.imagen;
    preview.style.display = "block";
  }

  function limpiarFormulario() {
    form.reset();
    document.getElementById("salon-id").value = "";
    preview.style.display = "none";
    editandoId = null;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const imagenBase64 = document.getElementById("imagenSelect").value;

    if (!editandoId && !imagenBase64) {
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

  cargarImagenesDesdeLocalStorage();
  renderizarTabla();
});
