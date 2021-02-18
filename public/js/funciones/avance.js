const Swal = require("sweetalert2");
const mostrarAvance = () => {
  const tareas = document.querySelectorAll("li.tarea");

  if (tareas.length) {
    const tareasCompletadas = document.querySelectorAll("i.completo");
    const avance = Math.round((tareasCompletadas.length / tareas.length) * 100);
    const porcentaje = document.querySelector("#porcentaje");
    porcentaje.style.width = avance + "%";

    if (avance == 100) {
        Swal.fire({
          title: "Completaste el Proyecto",
          text: "Las tareas del Proyecto fueron completadas",
          icon: "success",
        });
    }
  }
};

module.exports = {
  mostrarAvance,
};
