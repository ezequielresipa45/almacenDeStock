// * VARIABLES PRODUCTOS */

let botonAgregarProducto = document.getElementById("agregarProducto");
let formularioAgregarProductos = document.getElementById(
  "formularioAgregarProductos"
);
let cargandoVerProductos = document.getElementById("cargandoVerProductos");
let inputProducto = document.getElementById("inputProducto");
let inputPrecio = document.getElementById("inputPrecio");
let inputCantidad = document.getElementById("inputCantidad");
let botonVerProductos = document.getElementById("botonVerProductos");
let contenedorVerProductos = document.getElementsByClassName(
  "contenedorVerProductos"
)[0];
let administrador = document.getElementById("administrador");
let salirAlmacenAdmin = document.getElementsByClassName("salirAlmacenAdmin")[0];

/** VARIABLE PARA OBTENER EL NOMBRE DEL USUARIO QUE SE LOGEO RECIENTEMENTE */
let obtenerNombre = localStorage.getItem("usuarioLogeado");

/****** VARIABLES PARA EL MODAL PARA AGREGAR UN PRODUCTO NUEVO */
let cerrarModal = document.getElementById("cerrarModal");
let modal = document.getElementsByClassName("modal")[0];
let modalContainer = document.getElementsByClassName(
  "contenedorModalAgregarProducto"
)[0];

/** OBTENEMOS EL NOMBRE DEL USUARIO LOGEADO RECIENTEMENTE */
administrador.innerHTML = `Administrador: ${obtenerNombre} `;

/***** DESLOGEAMOS AL USUARIO CON UN EVENTO AL BOTON DE SALIR DE LA ALMACEN DEL USUARIO */
salirAlmacenAdmin.addEventListener("click", () => {
  localStorage.removeItem("usuarioLogeado");
});

/* EVENTO AGREGAR PRODUCTO A LA ALMACEN A TRAVEZ DE UN MODAL */

botonAgregarProducto.addEventListener("click", (e) => {
  e.preventDefault();

  modalContainer.style.opacity = "1";
  modalContainer.style.visibility = "visible";

  modal.classList.toggle("modal-close");
});

/********************************************************* */

/** EVENTO PARA CERRAR EL MODAL  */

cerrarModal.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.toggle("modal-close");

  setTimeout(() => {
    modalContainer.style.opacity = "0";
    modalContainer.style.visibility = "hidden";
  }, 400);
});

/********************************************************* */

/** EVENTO PARA CERRAR EL MODAL AL HACER CLICK EN CUALQUIER PARTE DE LA PANTALLA */

window.addEventListener("click", (e) => {
  if (e.target == modalContainer) {
    modal.classList.toggle("modal-close");

    setTimeout(() => {
      modalContainer.style.opacity = "0";
      modalContainer.style.visibility = "hidden";
    }, 400);
  }
});

/********************************************************* */

/* FUNCION RANDOM PARA CREAR NUMEROS ALEATORIOS DEL 1 AL 100 Y ASIGNARLOS A LOS PRODUCTOS INGRESADOS */

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/********************************************************* */

/** CREAMOS EL OBJETO CON EL CONSTRUCTOR Y SUS PARAMETROS */
class Productos {
  constructor(producto, precio, cantidad) {
    this.producto = producto;
    this.precio = precio;
    this.cantidad = cantidad;
    this.identificador = random(1, 100);
  }
}

/*** VARIABLE QUE ALMACENARA LOS PRODUCTOS INGRESADOS */
let arregloProductos = JSON.parse(localStorage.getItem("listaProductos")) ?? [];

/* FUNCION PARA ORDENAR EL ARREGLO POR PRODUCTOS DE LA A - Z */

function compare_productos(a, b) {
  if (a.producto.toLowerCase() < b.producto.toLowerCase()) {
    return -1;
  }
  if (a.producto.toLowerCase() > b.producto.toLowerCase()) {
    return 1;
  }
  return 0;
}

arregloProductos.sort(compare_productos);

/********************************************************* */

/****** EVENTO SUBMIT PARA AGREGAR PRODUCTOS DESDE UN FORMULARIO */

formularioAgregarProductos.addEventListener("submit", (e) => {
  e.preventDefault();

  let productoAgregado = new Productos(
    inputProducto.value,
    inputPrecio.value,
    inputCantidad.value
  );

  arregloProductos.push(productoAgregado);

  /* ALMACENAR ARREGLO DE PRODUCTOS  EN EL LOCAL STORAGE PARA SIMULAR UNA BASE DE DATOS*/

  const guardarLocal = (clave, valor) => {
    localStorage.setItem(clave, valor);
  };

  for (const arregloProducto of arregloProductos) {
    guardarLocal("listaProductos", JSON.stringify(arregloProductos));
  }

  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Producto cargado correctamente",
    showConfirmButton: false,
    timer: 1500,
  });

  setTimeout(() => {
    location.reload();
  }, 1000);
});

// /* CONSUMIMOS LA BASE DE DATOS DEL LOCAL STORAGE A TRAVEZ DE UNA PROMESA CON FETCH ) */

let arrayProductosJSON = JSON.stringify(arregloProductos);

/* CONSUMIR LOS PRODUCTOS DEL OBJETO A TRAVEZ DE UN FETCH COMO APPI */

let JSON_POST = "https://jsonplaceholder.typicode.com/posts";

fetch(JSON_POST, {
  method: "POST",
  body: arrayProductosJSON,
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
})
  .then((respuesta) => {
    return respuesta.json();
  })
  .then((nueva) => {
    delete nueva.id;

    for (const productos in nueva) {
      /*** MOSTRAMOS LOS PRODUCTOS ITERANDO EL OBJETO TRAIDO DE LA APPI EN UN CONTENEDOR ORDENADOS DE LA A - Z POR PRODUCTO */

      let parrafo = document.createElement("p");

      cargandoVerProductos.style.display = "block";

      setTimeout(() => {
        cargandoVerProductos.style.display = "none";
        parrafo.innerHTML = `
         
              <p> ${nueva[productos].producto.toUpperCase()} </p>
              <p>$ ${nueva[productos].precio} </p>
              <p> ${nueva[productos].cantidad} </p>
              <p> ${nueva[productos].identificador} </p>`;
        contenedorVerProductos.appendChild(parrafo);

        let elemento = document.createElement("h3");

        elemento.classList = `eliminar${nueva[
          productos
        ].identificador.toString()}`;

        elemento.title = "Eliminar";
        elemento.innerHTML = "X";

        parrafo.appendChild(elemento);

        let eliminarElemento = document.getElementsByClassName(
          `eliminar${nueva[productos].identificador}`
        )[0];

        /** DENTRO DEL FOR, CREAMOS UN EVENTO PARA ELIMINAR UN PRODUCTO DESEADO */

        eliminarElemento.addEventListener("click", () => {
          Swal.fire({
            title: "Usted está seguro?",
            text: "Se eliminará el elemento seleccionado.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                "Eliminado!",
                "Su producto ah sido eliminado.",
                "success"
              );

              contenedorVerProductos.removeChild(
                parrafo
              ); /**ELIMINAMOS EL PRODUCTO */
              parrafo.removeChild(
                eliminarElemento
              ); /**ELIMINAMOS EL BOTON ELIMINAR */

              //Obtengo los productos de mi "local storage" (Desconvierto de json a objeto) /
              let arregloProductos = JSON.parse(
                localStorage.getItem("listaProductos")
              );

              //Busco ell indice / posicion del producto que quiero eliminar
              let obtenerIndiceArray = arregloProductos.findIndex(
                (e) => e.identificador === nueva[productos].identificador
              );

              // Eliimino el elemento de esa posicion
              arregloProductos.splice(obtenerIndiceArray, 1);

              // Convierto de objeto a json
              let arregloString = JSON.stringify(arregloProductos);

              // Guardo mi array de productos nuevo en formato JSON en el local storage
              localStorage.setItem("listaProductos", arregloString);
            }
          });
        });
      }, 3000);
    }
  })
  .catch((error) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error al cargar los productos",
    });
  })
  .finally(() => {});

/********************************************************* */

/**EVENTO CLICK AL BOTON VER PRODUCTOS, MOSTRANDO UNA ALERTA CUANDO ESTA VACIO O MOSTRAR Y/O OCULTAR PRODUCTOS EN CASO QUE ESTEN */

botonVerProductos.addEventListener("click", () => {
  if (arregloProductos.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "¡No hay nada que mostar! Intente cargar un producto...",
    });
  } else {
    contenedorVerProductos.classList.toggle("display");
  }
});

/********************************************************* */
