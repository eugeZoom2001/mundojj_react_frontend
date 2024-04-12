// Recibe una frase y reemplaza las primeras letras x mayusculas
const crearNombre = (nombre) => {
  let nuevoNombre = nombre;
  if (nombre.length > 0) {
    let nuevoNombreArr = nombre.split(" ").map((el) => {
      return el.charAt(0).toUpperCase() + el.slice(1);
    });
    nuevoNombre = nuevoNombreArr.join(" ");
  }
  return nuevoNombre.trim();
};

const toCaps = (word) => {
  if (word && word.length > 0) {
    return word.toUpperCase();
  }
  return "";
};
export { crearNombre, toCaps };
