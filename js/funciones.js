let grabar = document.getElementById("grabarCookie");
let leer = document.getElementById("leerCookie");
let borrar = document.getElementById("borrarCookie");
let datosTabla = new Array();
let claveCookie = 0;

//Al clicar sobre el icono de grabar, ejecuta la función grabar
grabar.addEventListener("click", grabaCookie, false);
//Al clicar sobre el icono de la tabla, lee los datos de la cookie y los muestra en un dataTable
leer.addEventListener("click", leeCookie, false);
//Al clicar sobre el icono de la basura, eliminará todas las cookies almacenadas
borrar.addEventListener("click", borrarDatos, false);

//Comprobar cookies
let datosc = document.cookie;
let mensajeCookies = "Utilizamos cookies analíticas"

Swal.fire({
   title: "Sitio con cookies",
   showDenyButton: true,
   showCancelButton: true,
   text: mensajeCookies,
   imageUrl: 'imagenes/Logo.png',
   imageWidth: 200,
   imageHeight: 200,
   imagealt: 'cookies',
}).then(function (result) {
   if (result.isConfirmed) {
      Swal.fire('Cookies Aceptadas', '', 'success');
   } else {
      Swal.fire('Cookies rechazadas, no las usaremos', '<a href="./miPagina.html" target="_blank">Política de cookies</a>', 'info');
      grabar.removeEventListener("click", grabaCookie, false);
      leer.removeEventListener("click", leeCookie, false);
   }
});

//////////////////// SESSION STORAGE ///////////

//Función constructura de objetos que guarda los datos de la cookie
function registroTarea(clave, tarea, tp, te, descripcion) {
   this.clave = clave;
   this.tarea = tarea;
   this.tp = tp;
   this.te = te;
   this.descripcion = descripcion;
   this.toString = toString;
}

//Función que devuelve un string con los campos de la cookie
function toString() {
   return this.clave + "," + this.tarea + "," + this.tp + "," + this.te + "," + this.descripcion;
}

//Función que graba la cookie utilizando setItem
function grabaCookie() {
   let dTarea = document.getElementById("tarea").value;
   let dTp = document.getElementById("Tp").value;
   let dTe = document.getElementById("Te").value;
   let dDescripcion = document.getElementById("descripcion").value;

   //let  galleta = claveCookie + "=" + claveCookie + "," + dTarea + "," + dTp + "," + dTe+","+dDescripcion+ ";expires=" + fechaMuerte.toGMTString();
   // Crea la cookie y la almacena en el navegador
   let galleta = new registroTarea(claveCookie, dTarea, dTp, dTe, dDescripcion);
   sessionStorage.setItem(claveCookie, galleta.toString());
   claveCookie++;

}

//Función que lee las cookies grabadas
function leeCookie() {
   let isNull = false;
   datosTabla = new Array();
   
   for (i = 0; i < sessionStorage.length; i++) {
      let datos = sessionStorage.getItem(Object.keys(sessionStorage)[i]);

      if (datos == null) {
         isNull = true;
         datosTabla = "Eliminado";
      } else {
         let campos = datos.split(",");
         let linea = [campos[0], campos[1], campos[2], campos[3], campos[4]]
         datosTabla.push(linea);
         isNull = false;
      }
      if (isNull == false) {
         visualizaTabla();
      } else {
         break;
      }

   }
}

//Función que visualiza las cookies grabadas en una tabla
function visualizaTabla() {
   // Establecemos el objeto creado de DataTable con el div
   // html sobre el cual vamos a visualizar los datos
   const datatable = new DataTable("#datatable", {
      columns: [
         {
            name: 'Clave',
            id: 'Clave',
            editable: false,
            resizable: true,
            focusable: true,
            drowdown: false,
            width: 15,
            format: (value) => {
               return "<input type='button' value=" + value + " onClick='borraCookie(value)'></input>"

            }

         }, 'TAREA', 'Tpo.Progra', 'Tpo.Emple', 'Descripción'],
      data: datosTabla

   });

}

//Función que borra las cookies al pinchar sobre el botón de su clave y muestra la tabla con los datos resultantes
function borraCookie(clave) {
   sessionStorage.removeItem(clave);
   alert("Cookie borrada");
   leeCookie();
}

//Función que borra todas las cookies que existan en la sesión y muestra la tabla con los datos resultantes
function borrarDatos() {
   sessionStorage.clear();
   alert("Se han borrado todas las cookies");
   leeCookie();
}