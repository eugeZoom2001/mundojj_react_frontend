let persona = {
  tareas: [],
  datos: {},
  amigo: false,
};

const unaPersona = {
  nombre: "luis",
  edad: 45,
};

const tareas = [
  { id: 1, desc: "cambiar Lenguaje" },
  { id: 2, desc: "Aguante Python ???" },
];

persona = { ...persona, datos: unaPersona, tareas: tareas, amigo: true };
console.log(persona);
