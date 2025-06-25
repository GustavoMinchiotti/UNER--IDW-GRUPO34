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
  renderizarServicios();

  servicioSelect.value = "";
});

function renderizarServicios() {
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

form.addEventListener('submit', async (e) => {
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
  await generarPDF(presupuesto);


  alert('Presupuesto guardado exitosamente');
  form.reset();
  listaServicios.innerHTML = '';
  totalSpan.textContent = '0';
  serviciosSeleccionados = [];
});

async function generarPDF(presupuesto) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Presupuesto de Evento", 20, 20);

  doc.setFontSize(12);
  doc.text(`Cliente: ${presupuesto.cliente}`, 20, 35);
  doc.text(`Fecha: ${new Date(presupuesto.fecha).toLocaleDateString()}`, 20, 45);
  doc.text(`Salón: ${presupuesto.salon.nombre}`, 20, 55);
  doc.text(`Valor Salón: $${presupuesto.salon.valor.toLocaleString()}`, 20, 65);

  doc.text("Servicios:", 20, 80);
  presupuesto.servicios.forEach((servicio, index) => {
    doc.text(`- ${servicio.nombre}: $${servicio.valor.toLocaleString()}`, 25, 90 + index * 10);
  });

  const yFinal = 90 + presupuesto.servicios.length * 10 + 10;
  doc.setFontSize(14);
  doc.text(`Total: $${presupuesto.total.toLocaleString()}`, 20, yFinal);

  doc.save(`Presupuesto_${presupuesto.cliente.replace(/\s+/g, "_")}.pdf`);
}

