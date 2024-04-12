var date = new Date("2022-10-01T00:00:00.000Z");

// toLocaleDateString() sin argumentos depende de la implementación,
// la configuración regional por defecto y la zona horaria por defecto
//console.log(date.toLocaleDateString());

//****	calcula la diferencia de tiempo en unidades unid
//	donde unid puede ser "m":minutos ; "s":segundos ;h:horas
//	y las fechaHora son en formato Date()
function diferenciaT(fechaHoraH, fechaHoraD, unid) {
  var diferencia = fechaHoraH - fechaHoraD;

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
