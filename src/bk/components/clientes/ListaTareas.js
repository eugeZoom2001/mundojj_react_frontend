import React, { useMemo } from "react";
import { fechaFromIsoStr } from "../../services/Fechas";

const ListaTareas = (props) => {
  let tareas = props?.tareas ?? null;

  const sortedTareas = useMemo(() => {
    if (!tareas) {
      return null;
    }
    return tareas.sort((tarea1, tarea2) => {
      return new Date(tarea2.fecha) - new Date(tarea1.fecha);
    });
  }, [tareas]);

  let tareasSorted = sortedTareas;

  if (tareasSorted && tareasSorted.length > 0) {
    tareasSorted.sort((tarea1, tarea2) => {
      return new Date(tarea2.fecha) - new Date(tarea1.fecha);
    });
    return tareas.map((tarea) => {
      return (
        <p key={tarea._id}>
          {tarea.tarea +
            " " +
            fechaFromIsoStr(tarea.fecha).toLocaleDateString()}
        </p>
      );
    });
  } else {
    return null;
  }
};

export default ListaTareas;
