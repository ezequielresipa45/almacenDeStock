/* VARIABLES FORMULARIO DE REGISTRO DE USUARIOS */

let contenedorRegistroPersonas = document.getElementsByClassName(
  "contenedorRegistroPersonas"
)[0];
let contenedorIngresoDePersonas = document.getElementsByClassName(
  "contenedorIngresoDePersonas"
)[0];
let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let correo = document.getElementById("correo");
let dni = document.getElementById("dni");
let clave = document.getElementById("clave");
let formulario = document.getElementById("formulario");

/* VARIABLES PARA EVENTO DE CERRAR Y ABRIR FORMULARIO */

let enlaceRegistroPersonas = document.getElementById("enlaceRegistroPersonas");
let h2 = document.getElementsByTagName("h2")[0];
let h1 = document.getElementsByTagName("h1")[0];
let iconClosed = document.getElementById("icon-closed");

/* VARIABLES PARA INGRESAR USUARIO */

let ingresarCorreoUsuario = document.getElementById("ingresarCorreoUsuario");
let ingresarClave = document.getElementById("ingresarClave");
let formularioIngresoPersonas = document.getElementById(
  "formularioIngresoPersonas"
);
let loader = document.getElementsByClassName("loader")[0];
let contenidoImagenesDetalles = document.getElementsByClassName(
  "contenidoImagenesDetalles"
)[0];
let contenedorPantallaPrincipal = document.getElementsByClassName(
  "contenedorPantallaPrincipal"
)[0];

/***** EVENTO BOTON CERRAR  FORMULARIO DE REGISTRO Y EVENTO PARA ABRIR FORMULARIO DE REGISTRO  */

iconClosed.style.opacity = "0";
iconClosed.style.visibility = "hidden";

// Agregamos el evento click al boton para simular cerrar la ventana de registro de usuarios //
iconClosed.addEventListener("click", () => {
  contenedorIngresoDePersonas.style.display = "flex";
  contenedorRegistroPersonas.style.display = "none";
  iconClosed.style.opacity = "0";
  iconClosed.style.visibility = "hidden";
  h2.innerHTML = "Almacén de Stock <span>...</span>";
  contenidoImagenesDetalles.style.backgroundImage =
    "url('../images/imagen-inicio.jpg')";
});

// Agregamos el evento click para simular el ingreso a la seccion de registro de personas a travez del enlace //
enlaceRegistroPersonas.addEventListener("click", () => {
  contenedorIngresoDePersonas.style.display = "none";
  contenedorRegistroPersonas.style.display = "flex";
  contenidoImagenesDetalles.style.backgroundImage =
    "url('../images/imagen-registro.jpg')";
  h2.innerHTML = "Registro de Usuarios";
  iconClosed.style.opacity = "1";
  iconClosed.style.visibility = "visible";
});

/******************************************************************************************************** */

/* CREAR OBJETO USUARIO // INGRESAR USUARIO */

class Usuarios {
  constructor(nombre, apellido, correo, dni, clave) {
    (this.nombre = nombre),
      (this.apellido = apellido),
      (this.correo = correo),
      (this.dni = dni),
      (this.clave = clave);
  }
}

/* VARIABLE DONDE TENDREMOS EL ARREGLO DE TODOS LOS USUARIOS REGISTRADOS */

let coleccionUsuarios = JSON.parse(localStorage.getItem("listaUsuarios")) ?? [];

/* EVENTO PARA EL FORMULARIO, AL DARLE SUBMIT PUSHEA AL ARREGLO LOS VALORES DEL USUARIO QUE REGISTRO EN EL FORM,
    LUEGO ALMACENA ESE ARREGLO DE USUARIOS EN EL LOCAL STORAGE Y ENVIA UNA ALERTA AL USUARIO SI SE CARGO CORRECTAMENTE EL USUARIO,
    HAY UN SETTIMEOUT QUE ME ACTUALIZA LA PAGINA LUEGO DE 1500 SEGUNDOS PARA VOLVER AL INICIO DE LA PAGINA.
*/

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  let personas = new Usuarios(
    nombre.value,
    apellido.value,
    correo.value,
    dni.value,
    clave.value
  );
  coleccionUsuarios.push(personas);

  /* ALMACENAR COLECCION USUARIOS EN EL LOCAL STORAGE PARA SIMULAR UNA BASE DE DATOS*/

  const guardarLocal = (clave, valor) => {
    localStorage.setItem(clave, valor);
  };

  for (const arregloUsuarios of coleccionUsuarios) {
    guardarLocal("listaUsuarios", JSON.stringify(coleccionUsuarios));
  }

  Swal.fire({
    icon: "success",
    title: "Usuario registrado exitosamente...",
  });

  setTimeout(() => {
    location.reload();
  }, 1500);
});

/******************************************************************************************************** */

/* INGRESO DE USUARIO */

/* CONSUMIMOS LA BASE DE DATOS de PERSONAS (objeto) DEL LOCAL STORAGE A TRAVEZ DE UNA PROMESA CON FETCH DENTRO DEL EVENTO SUBMIT DEL FORMULARIO */

let coleccionJSON = JSON.stringify(coleccionUsuarios);

formularioIngresoPersonas.addEventListener("submit", (e) => {
  e.preventDefault();

  let JSON_POST = "https://jsonplaceholder.typicode.com/users";

  fetch(JSON_POST, {
    method: "POST",
    body: coleccionJSON,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((respuesta) => {
      return respuesta.json();
    })
    .then((nueva) => {
      delete nueva.id;

      /*** AQUI ITERAMOS LAS PERSONAS DENTRO DEL OBJETO QUE NOS TRAE LA APPI Y CHEQUEAMOS A TRAVEZ DE UN CONDICIONAL SI EL OBJETO TRAIDO ES EXACTAMENTE IGUAL AL OBJETO INGRESADO POR EL USUARIO, DE SER ASÍ LOS CONTENEDORES DEL INDEX DEJARAN DE MOSTRARSE, CARGARA UN SPINNER E INGRESARA A LA ALMACEN DE STOCK DEL USUARIO REGISTRADO, DE LLENAR MAL UN DATO EN EL CAMPO DE LOGEO, UNA ALERTA SALTARÁ PARA AVISAR QUE ALGO SALIO MAL. */

      let alerta = true; /** VARIABLE QUE FUNCIONA COMO ALERTA SI EL USUARIO LLENO MAL UN DATO EN EL CAMPO DE LOGEO */

      for (const personas in nueva) {
        if (
          nueva[personas].correo === ingresarCorreoUsuario.value &&
          nueva[personas].clave === ingresarClave.value
        ) {
          contenedorPantallaPrincipal.style.display = "none";
          contenidoImagenesDetalles.style.display = "none";
          contenedorRegistroPersonas.style.display = "none";
          contenedorIngresoDePersonas.style.display = "none";
          h1.style.display = "none";
          h2.style.display = "none";
          loader.style.display = "block";
          alerta = false;

          localStorage.setItem("usuarioLogeado", nueva[personas].nombre);

          setTimeout(() => {
            window.location.href = "../almacenUsuario.html";

            loader.style.display = "none";
          }, 3000);
        }
      }

      if (alerta) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algunos datos ingresados no son validos...",
        });
      }
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al cargar usuario, ponganse en contacto con el administrador",
      });
    })
    .finally(() => {});
});

/******************************************************************************************************** */
