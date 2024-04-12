// calcula el color en funcion de los dias -- valor=dias desde una fecha

function venciMFechaClaseCelda(valor) {
  const x = valor;
  let color = "bg-light";
  switch (true) {
    case x > -10 && x < 0:
      color = "bg-warning";
      break;
    case x >= 0:
      color = "bg-danger";
      break;
    default:
      color = "bg-light";
      break;
  }
  return color;
}

export { venciMFechaClaseCelda };
