export const salonesEjemplo = [
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

const STORAGE_KEY = "salones";

export function inicializarLocalStorage() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(salonesEjemplo));
  }
}

export function getSalones() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveSalones(salones) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(salones));
}
