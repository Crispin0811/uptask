const tareas = document.querySelector(".listado-pendientes");
import Swal from "sweetalert2";
import axios from "axios";
import {mostrarAvance} from '../funciones/avance';

if (tareas) {
  tareas.addEventListener("click", (e) => {
    e.preventDefault();

    const btnEstado = e.target.classList.contains("fa-check-circle");
    if (btnEstado) {
      const icono = e.target;
      const tareaId = e.target.parentElement.parentElement.dataset.tarea;
      const url = location.origin + `/tareas/${tareaId}`;
      axios
        .patch(url, { tareaId })
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            icono.classList.toggle("completo");
            mostrarAvance()
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }

    if (e.target.classList.contains("fa-trash")) {
      const tareaHtml = e.target.parentElement.parentElement;
      const idTarea = tareaHtml.dataset.tarea;

      Swal.fire({
        title: "¿Estas seguro que quieres eliminar esta tarea?",
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, Eliminar!",
        cancelButtonText: "No, Cancelar",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          //enviar peticion en AXIOS
          const url = location.origin + `/tareas/${idTarea}`;
          axios
            .delete(url, { paramas: idTarea })
            .then((resp) => {
              if (resp.status == 200) {
                //  eliminar el div con los datos de la tarea
                tareaHtml.parentElement.removeChild(tareaHtml);
                Swal.fire({
                  title: "Eliminado",
                  text: resp.data,
                  icon: "success",
                  timer: 1000,
                });
                mostrarAvance()
              }
            })
            .catch((e) => {
              console.log(e);
              Swal.fire({
                title: "Ocurrio un error",
                icon: "error",
                timer: 1500,
              });
            });
        }
      });
    }
  });
}

export default tareas;
