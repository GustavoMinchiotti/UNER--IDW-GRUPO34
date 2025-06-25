import { getSalones, getServicios } from './data.js';

const nombreInput = document.getElementById('nombre');
const salonSelect = document.getElementById('salon');
const servicioSelect = document.getElementById('servicio');
const listaServicios = document.getElementById('lista-servicios');
const totalSpan = document.getElementById('total');
const form = document.getElementById('form-presupuesto');
const agregarBtn = document.getElementById('agregar-servicio');

let serviciosSeleccionados = [];
let salones = [];
let servicios = [];

document.addEventListener('DOMContentLoaded', () => {
  salones = getSalones();
  servicios = getServicios();

  salones.forEach(salon => {
    const option = document.createElement('option');
    option.value = salon.id;
    option.textContent = `${salon.nombre} ($${salon.valor.toLocaleString()})`;
    salonSelect.appendChild(option);
  });

  servicios.forEach(servicio => {
    const option = document.createElement('option');
    option.value = servicio.id;
    option.textContent = `${servicio.nombre} ($${servicio.valor})`;
    servicioSelect.appendChild(option);
  });
});

agregarBtn.addEventListener('click', () => {
  const servicioId = servicioSelect.value;
  if (!servicioId) return;

  const servicio = servicios.find(s => s.id === servicioId);
  if (serviciosSeleccionados.find(s => s.id === servicioId)) return;

  serviciosSeleccionados.push(servicio);
  renderServicios();
});

function renderServicios() {
  listaServicios.innerHTML = '';
  serviciosSeleccionados.forEach(servicio => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between';
    li.textContent = servicio.nombre;

    const span = document.createElement('span');
    span.className = 'text-success';
    span.textContent = `$${servicio.valor.toLocaleString()}`;

    li.appendChild(span);
    listaServicios.appendChild(li);
  });

  actualizarTotal();
}

function actualizarTotal() {
  const salonId = salonSelect.value;
  const salon = salones.find(s => s.id === salonId);
  const totalServicios = serviciosSeleccionados.reduce((acc, s) => acc + s.valor, 0);
  const totalSalon = salon ? salon.valor : 0;
  const total = totalServicios + totalSalon;
  totalSpan.textContent = total.toLocaleString();
}

salonSelect.addEventListener('change', actualizarTotal);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const cliente = nombreInput.value.trim();
  const salonId = salonSelect.value;

  if (!nombre || !salonId || serviciosSeleccionados.length === 0) {
    alert('Complete todos los campos y agregue al menos un servicio');
    return;
  }

  const salon = salones.find(s => s.id === salonId);
  const total = serviciosSeleccionados.reduce((acc, s) => acc + s.valor, 0) + salon.valor;

  const presupuesto = {
    cliente,
    salon: {
      id: salon.id,
      nombre: salon.nombre,
      valor: salon.valor
    },
    servicios: serviciosSeleccionados,
    total,
    fecha: new Date().toISOString(),
  };

  const presupuestos = JSON.parse(localStorage.getItem('presupuestos')) || [];
  presupuestos.push(presupuesto);
  localStorage.setItem('presupuestos', JSON.stringify(presupuestos));

  alert('Presupuesto guardado exitosamente');
  form.reset();
  listaServicios.innerHTML = '';
  totalSpan.textContent = '0';
  serviciosSeleccionados = [];
});
