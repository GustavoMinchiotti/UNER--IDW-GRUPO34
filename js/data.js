export const salonesDefault = [
  {
    id: "1",
    nombre: "Mundo Mágico",
    descripcionCorta: "Un espacio encantador diseñado para despertar la imaginación infantil.",
    descripcionLarga: "Un espacio encantador diseñado para despertar la imaginación infantil. Con decoraciones temáticas, zonas de juegos y detalles mágicos, es ideal para cumpleaños y celebraciones llenas de fantasía.",
    direccion: "Av. San Martín 1234, Buenos Aires",
    valor: 75000,
    estado: "Disponible",
    imagen: "img/mundo-magico.jpeg",
    ubicacion: "https://www.google.com/maps?q=Buenos+Aires,+Argentina&output=embed"
  },
  {
    id: "2",
    nombre: "Pequeños Encantos",
    descripcionCorta: "Este salón crea un ambiente lleno de ternura y diversión.",
    descripcionLarga: "Un salón lleno de ternura ideal para eventos infantiles. Ofrece espacios coloridos y acogedores que invitan a la creatividad.",
    direccion: "Gral. Paz 456, Córdoba",
    valor: 68000,
    estado: "Reservado",
    imagen: "img/pequenos-encantos.jpeg",
    ubicacion: "https://www.google.com/maps?q=Córdoba,+Argentina&output=embed"
  },
  {
    id: "3",
    nombre: "Reino de Fantasías",
    descripcionCorta: "Este salón transforma cualquier celebración en un viaje mágico.",
    descripcionLarga: "Con un diseño que evoca cuentos de hadas, es ideal para fiestas temáticas llenas de color.",
    direccion: "Tucumán 789, Rosario",
    valor: 80000,
    estado: "Disponible",
    imagen: "img/reino-fantasias.jpeg",
    ubicacion: "https://www.google.com/maps?q=Rosario,+Argentina&output=embed"
  }
];

const SALONES_KEY = "salones";

export function inicializarLocalStorage() {
  if (!localStorage.getItem(SALONES_KEY)) {
    localStorage.setItem(SALONES_KEY, JSON.stringify(salonesDefault));
  }
}

export function getSalones() {
  return JSON.parse(localStorage.getItem(SALONES_KEY)) || [];
}

export function saveSalones(salones) {
  localStorage.setItem(SALONES_KEY, JSON.stringify(salones));
}


const IMAGENES_KEY = "imagenes";

export function inicializarLocalStorageImagen() {
  if (!localStorage.getItem(IMAGENES_KEY)) {
    localStorage.setItem(IMAGENES_KEY, JSON.stringify([]));
  }
}

export function getImagenes() {
  return JSON.parse(localStorage.getItem(IMAGENES_KEY)) || [];
}

export function saveImagenes(imagen) {
  localStorage.setItem(IMAGENES_KEY, JSON.stringify(imagen));
}



const SERVICIOS_KEY = "servicios";

export const serviciosDefault = [
  { id: "1", nombre: "Animación", valor: 10000 },
  { id: "2", nombre: "Castillo inflable y metegol", valor: 12000 },
  { id: "3", nombre: "Iluminación Láser y Máquinas de Humo", valor: 11000 },
  { id: "4", nombre: "Disk Jockey", valor: 13000 },
  { id: "5", nombre: "Catering", valor: 15000 },
];

export function inicializarServicios() {
  if (!localStorage.getItem(SERVICIOS_KEY)) {
    localStorage.setItem(SERVICIOS_KEY, JSON.stringify(serviciosDefault));
  }
}

export function getServicios() {
  return JSON.parse(localStorage.getItem(SERVICIOS_KEY)) || [];
}

export function saveServicios(servicios) {
  localStorage.setItem(SERVICIOS_KEY, JSON.stringify(servicios));
}
