//crea un String yyyy-mm-dd desde un objeto Date
const fechaFromDateServer = (fechaIn) => {
  console.log(fechaIn);
  if (fechaIn) {
    return new Date(fechaIn);
  } else {
    return "";
  }
};

// recibe un Date y devuelve la fecha ISO como String

//Recibe un String representando una fecha ISO (ej 2022-03-02T03:00:00.000Z )
// devuelve un Date
const fechaFromIsoStr = (fechaIn) => {
  if (!fechaIn || fechaIn === FECHA_X_DEFECTO || fechaIn === FECHA_X_DEFECTO2) {
    return "";
  }
  return new Date(fechaIn);
};

const fechaMostrarFromIso = (fecha) => {
  if (fecha)
    if (
      fecha.length &&
      fecha !== FECHA_X_DEFECTO &&
      fecha !== FECHA_X_DEFECTO2
    ) {
      return new Date(fecha).toLocaleDateString();
    } else {
      return "";
    }
  else {
    return "";
  }
};
const FECHA_X_DEFECTO = "1969-12-30T00:00:00.000Z";
const FECHA_X_DEFECTO2 = "1970-01-01T00:00:00.000Z";

export {
  fechaFromDateServer,
  fechaFromIsoStr,
  FECHA_X_DEFECTO,
  fechaMostrarFromIso,
};
