import { getImagenes, saveImagenes, inicializarLocalStorageImagen } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  inicializarLocalStorageImagen();

  const form = document.getElementById("form-imagen");
  const tablaBody = document.querySelector("#tabla-imagenes tbody");
  const btnCancelar = document.getElementById("btn-cancelar");

  let imagenes = getImagenes();
  let editandoId = null;

  function renderizarTabla() {
    tablaBody.innerHTML = "";
    imagenes.forEach(imagen => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${imagen.titulo}</td>
        <td><img src="${imagen.base64}" alt="${imagen.titulo}" style="width: 100px; height: 60px; object-fit: cover; border-radius: 6px;"></td>
        <td>
          <button class="btn btn-sm btn-warning btn-editar me-2" data-id="${imagen.id}" aria-label="Editar ${imagen.titulo}">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-sm btn-danger btn-eliminar" data-id="${imagen.id}" aria-label="Eliminar ${imagen.titulo}">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      `;
      tablaBody.appendChild(tr);
    });
  }

  function cargarFormulario(imagen) {
    document.getElementById("imagen-id").value = imagen.id;
    document.getElementById("nombreImagen").value = imagen.titulo;
  }

  function limpiarFormulario() {
    form.reset();
    document.getElementById("imagen-id").value = "";
    editandoId = null;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const archivoImagen = document.getElementById("archivo").files[0];
    let base64Imagen = "";

    if (archivoImagen) {
      base64Imagen = await convertirImagenABase64(archivoImagen);
    } else if (editandoId) {
      const imgExistente = imagenes.find(img => img.id === editandoId);
      base64Imagen = imgExistente.base64;
    } else {
      alert("Debe seleccionar una imagen.");
      return;
    }

    const nuevaImagen = {
      id: editandoId || Date.now().toString(),
      titulo: document.getElementById("nombreImagen").value.trim(),
      base64: base64Imagen
    };

    if (editandoId) {
      imagenes = imagenes.map(img => img.id === editandoId ? nuevaImagen : img);
    } else {
      imagenes.push(nuevaImagen);
    }

    saveImagenes(imagenes);
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
      const imagen = imagenes.find(img => img.id === id);
      if (imagen) {
        editandoId = id;
        cargarFormulario(imagen);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    if (e.target.closest(".btn-eliminar")) {
      const id = e.target.closest(".btn-eliminar").dataset.id;
      if (confirm("¿Seguro que desea eliminar esta imagen?")) {
        imagenes = imagenes.filter(img => img.id !== id);
        saveImagenes(imagenes);
        renderizarTabla();
      }
    }
  });

  renderizarTabla();
});
