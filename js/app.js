// variables y selecctores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector("#gastos ul");


// Eventos
eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);


    formulario.addEventListener('submit', agregarGasto);

}





// Clases
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }
}

class UI {
   insertarPresupuesto( cantidad ) {
    // extrayendo valores
    const {presupuesto, restante} = cantidad;

    // agregar al html
    document.querySelector('#total').textContent = presupuesto;
    document.querySelector('#restante').textContent = restante;
   }

   imprimirAlerta(mensaje, tipo) {
    // crear div
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('text-center', 'alert');

    if(tipo === 'error') {
        divMensaje.classList.add('alert-danger');
    } else {
        divMensaje.classList.add('alert-success');
    }

    // mensaje error
    divMensaje.textContent = mensaje;

    // insertar en el html
    document.querySelector('.primario').insertBefore(divMensaje, formulario)

    // quitar html
    setTimeout(() => {
        divMensaje.remove();
    }, 3000);
   }
    
}

// instanciar
const ui = new UI();
let presupuesto;



// Funciones

function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('¿cual es tu presupuesto?');

    // console.log(Number(presupuestoUsuario));


    if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload()
    }


        // presupuesto valido
        presupuesto = new Presupuesto(presupuestoUsuario);
        console.log(presupuesto);

        ui.insertarPresupuesto(presupuesto);
}

// agragar gastos
function agregarGasto(e) {
    e.preventDefault();


    // leer los datos del formulario
    const nombre = document.querySelector('#gasto').value
    const cantidad = document.querySelector('#cantidad').value

    // validar
    if(nombre === "" || cantidad === "") {
        ui.imprimirAlerta("ambos campos son obligatorios", "error");

        return;
    } else if ( cantidad <= 0 || isNaN(cantidad) ) {
        ui.imprimirAlerta('cantidad no validad', 'error');

        return;
    }

}





