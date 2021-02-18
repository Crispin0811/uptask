import Swal from "sweetalert2";
import axios from "axios";

const eliminarProyecto = document.getElementById("eliminar-proyecto");
if (eliminarProyecto) {
  eliminarProyecto.addEventListener("click", (e) => {
    const urlProyecto = e.target.dataset.proyectoUrl;

    Swal.fire({
      title: "¿Estas seguro que quieres eliminar esta proyecto?",
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
        const url = `${location.origin}/proyecto/${urlProyecto}`;
        axios
          .delete(url, { paramas: urlProyecto })
          .then((resp) => {
            Swal.fire({
              title: "Eliminado",
              text: resp.data,
              icon: "success",
            });
            //redireccionar al inicio
            setTimeout(() => {
              window.location.href = "/";
            }, 1500);
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
  });
}

export default eliminarProyecto;
