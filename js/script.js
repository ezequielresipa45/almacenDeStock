/* FUNCIONES  ✔
   METODOS
   CLASES  ✔
   OBJETOS  ✔
   ARREGLOS  ✔
   BUCLES ✔
   CONDICIONALES ✔
   LOCAL STORAGE ✔
   DOM  ✔
   EVENTOS ✔
   LIBRERIAS ✔
   PROMESAS Y FETCH ✔

*/  





/* VARIABLES DE CONTENEDOR ALMACEN */

// let contenedorAlmacen = document.getElementsByClassName('contenedorAlmacen')[0];
let contenedorPrincipalAlmacen = document.getElementsByClassName('contenedorPrincipalAlmacen')[0];

let contenedorRegistroPersonas = document.getElementsByClassName('contenedorRegistroPersonas')[0];
let contenedorIngresoDePersonas = document.getElementsByClassName('contenedorIngresoDePersonas')[0];

/* VARIABLES FORMULARIO DE REGISTRO DE USUARIOS */

let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let correo = document.getElementById("correo");
let dni = document.getElementById("dni");
let clave = document.getElementById("clave");
let formulario = document.getElementById("formulario");

/* CREAR USUARIO // INGRESAR USUARIO */

class Usuarios {
  constructor(nombre, apellido, correo, dni, clave) {
    (this.nombre = nombre),
      (this.apellido = apellido),
      (this.correo = correo),
      (this.dni = dni),
      (this.clave = clave);
  }
}

let coleccionUsuarios = JSON.parse(localStorage.getItem("listaUsuarios")) ?? [];

formulario.addEventListener("submit", () => {
  
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

  alert('Usuario Registrado')
});

/* VARIABLES PARA INGRESAR USUARIO */

let ingresarUsuarioBoton = document.getElementById("ingresarUsuarioBoton");
let ingresarCorreoUsuario = document.getElementById("ingresarCorreoUsuario");
let ingresarClave = document.getElementById("ingresarClave");
let formularioIngresoPersonas = document.getElementById('formularioIngresoPersonas');
let loader = document.getElementsByClassName('loader')[0];
let contenidoImagenesDetalles = document.getElementsByClassName('contenidoImagenesDetalles')[0];
let contenedorPantallaPrincipal = document.getElementsByClassName('contenedorPantallaPrincipal')[0];
let administrador = document.getElementById('administrador');

/* CONSUMIMOS LA BASE DE DATOS DEL LOCAL STORAGE A TRAVEZ DE UNA PROMESA CON FETCH ) */

let coleccionJSON = JSON.stringify(coleccionUsuarios);

formularioIngresoPersonas.addEventListener("submit", (e) => {
  e.preventDefault();
  
  // console.log(coleccionJSON);

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


let alerta = true;

      for (const personas in nueva) {
        console.log(nueva[personas].nombre + " ESTOY AFUERA");

        if (
          nueva[personas].correo === ingresarCorreoUsuario.value &&
          nueva[personas].clave === ingresarClave.value
        ) {
          // console.log(nueva[personas].nombre); /* ME IMPRIME EL NOMBRE SOLO DE LA PERSONA QUE INICIO SESION */
          contenedorPantallaPrincipal.style.display = 'none';
          contenidoImagenesDetalles.style.display = 'none';
          // contenedorRegistroPersonas.style.display = 'none';
          // contenedorIngresoDePersonas.style.display = 'none';
          h1.style.display = 'none';
          h2.style.display = 'none';
          loader.style.display = 'block';
          alerta = false;
          administrador.innerHTML = `Administrador: ${nueva[personas].nombre} ${nueva[personas].apellido}`;

          setTimeout(()=>{
          
          

          contenedorPrincipalAlmacen.style.display = 'flex';
          loader.style.display = 'none';

        },3000)
        }
      }

      if (alerta) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algunos datos ingresados no son validos...',
          // footer: '<a href="">Why do I have this issue?</a>'
        })
      }
     
    });
});





/* VARIABLES PRODUCTOS */

let contenedorAgregarProducto = document.getElementsByClassName('contenedorAgregarProducto')[0];
let botonAgregarProducto = document.getElementById('agregarProducto');
let formularioAgregarProductos = document.getElementById('formularioAgregarProductos');

let inputProducto = document.getElementById('inputProducto');
let inputPrecio = document.getElementById('inputPrecio');
let inputCantidad = document.getElementById('inputCantidad');
let botonVerProductos = document.getElementById('botonVerProductos');
let contenedorVerProductos = document.getElementsByClassName('contenedorVerProductos')[0];









/****** MODAL PARA CREAR PRODUCTOS */

let cerrarModal = document.getElementById('cerrarModal');

let modal = document.getElementsByClassName('modal')[0];
let modalContainer = document.getElementsByClassName('contenedorModalAgregarProducto')[0];


/* AGREGAR PRODUCTO A LA ALMACENN */

botonAgregarProducto.addEventListener('click',(e)=>{

e.preventDefault();
contenedorRegistroPersonas.style.display = 'none';
contenedorIngresoDePersonas.style.display = 'none';

modalContainer.style.opacity = '1';
modalContainer.style.visibility = 'visible';

modal.classList.toggle('modal-close');

});

cerrarModal.addEventListener('click',(e)=>{

  e.preventDefault();
  modal.classList.toggle('modal-close');

setTimeout(()=>{  modalContainer.style.opacity = '0';
modalContainer.style.visibility = 'hidden';},400)
 
  
  });

  window.addEventListener('click',(e)=>{



if(e.target == modalContainer ){

  modal.classList.toggle('modal-close');

  setTimeout(()=>{  modalContainer.style.opacity = '0';
  modalContainer.style.visibility = 'hidden';},400)

}



  })



function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class Productos {
  constructor(producto, precio,cantidad) {
    this.producto = producto;
    this.precio = precio;
    this.cantidad = cantidad;
    this.identificador = random(1, 100);
  }
}


let arregloProductos = JSON.parse(localStorage.getItem("listaProductos")) ?? [];




formularioAgregarProductos.addEventListener('submit', (e)=>{
  e.preventDefault();


let productoAgregado = new Productos(inputProducto.value,inputPrecio.value,inputCantidad.value);


  arregloProductos.push(productoAgregado);


/* ALMACENAR ARREGLO DE PRODUCTOS  EN EL LOCAL STORAGE PARA SIMULAR UNA BASE DE DATOS*/

const guardarLocal = (clave, valor) => {
  localStorage.setItem(clave, valor);
};

for (const arregloProducto of arregloProductos) {
  guardarLocal("listaProductos", JSON.stringify(arregloProductos));

}

alert('Producto Cargado')



});












// /* CONSUMIMOS LA BASE DE DATOS DEL LOCAL STORAGE A TRAVEZ DE UNA PROMESA CON FETCH ) */

let arrayProductosJSON = JSON.stringify(arregloProductos);

console.log(arrayProductosJSON);

/* VER PRODUCTOS ADENTRO DE UN FORMULARIO */

botonVerProductos.addEventListener('click',()=>{
  console.log(arrayProductosJSON);



  botonVerProductos.disabled = true; 



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
    // console.log(nueva);

    contenedorRegistroPersonas.style.display = 'none';
    contenedorIngresoDePersonas.style.display = 'none';

    contenedorVerProductos.style.display = 'flex';

    for(const productos in nueva){

       console.log(nueva[productos].producto);
       console.log(nueva[productos].precio);


       let parrafo = document.createElement("p");
       parrafo.innerHTML = `
       
            <p> ${nueva[productos].producto.toUpperCase()} </p>
            <p> ${nueva[productos].precio} </p>`;
     
            contenedorVerProductos.appendChild(parrafo);

    }



  });


})





/***** DOM  */

let enlaceRegistroPersonas = document.getElementById('enlaceRegistroPersonas');
let h2 = document.getElementsByTagName('h2')[0];
let h1 = document.getElementsByTagName('h1')[0];
let iconClosed = document.getElementById('icon-closed');
    iconClosed.style.opacity = "0";
    iconClosed.style.visibility = "hidden";




    iconClosed.addEventListener('click',()=>{

    contenedorIngresoDePersonas.style.display = "flex";
    contenedorRegistroPersonas.style.display = "none";
    iconClosed.style.opacity = "0";
    iconClosed.style.visibility = "hidden";
    h2.innerHTML = "Almacén de Stock <span>...</span>"
    contenidoImagenesDetalles.style.backgroundImage = "url('../imagen-inicio.jpg')";


    })

enlaceRegistroPersonas.addEventListener('click', ()=>{
  contenedorIngresoDePersonas.style.display = "none";
  contenedorRegistroPersonas.style.display = "flex";
  contenidoImagenesDetalles.style.backgroundImage = "url('../imagen-registro.jpg')";
  h2.innerHTML = "Registro de Usuarios"
  iconClosed.style.opacity = "1";
  iconClosed.style.visibility = "visible";
})



