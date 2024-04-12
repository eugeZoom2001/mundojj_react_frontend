//crea un String yyyy-mm-dd desde un objeto Date
const fechaFromDateServer = (fechaIn) => {
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

//****	calcula la diferencia de tiempo en unidades unid
//	donde unid puede ser "m":minutos ; "s":segundos ;h:horas
//	y las fechaHora son en formato Date()
function diferenciaT(fechaHoraD, unid) {
  let diferencia = 0;
  if (
    !fechaHoraD ||
    fechaHoraD === FECHA_X_DEFECTO ||
    fechaHoraD === FECHA_X_DEFECTO2
  ) {
    return -5000;
  }
  const fechaHDate = new Date();
  const fechaDDate = new Date(fechaHoraD);
  diferencia = fechaHDate - fechaDDate;

  switch (unid) {
    case "d":
      diferencia = diferencia / (3600000 * 24);
      break;
    case "h":
      diferencia = diferencia / 3600000;
      break;
    case "m":
      diferencia = diferencia / 60000;
      break;
    case "s":
      diferencia = diferencia / 1000;
      break;
    default:
  }
  return Math.floor(diferencia);
}
const FECHA_X_DEFECTO = "1969-12-30T00:00:00.000Z";
const FECHA_X_DEFECTO2 = "1970-01-01T00:00:00.000Z";

export {
  fechaFromDateServer,
  fechaFromIsoStr,
  FECHA_X_DEFECTO,
  fechaMostrarFromIso,
  diferenciaT,
};
