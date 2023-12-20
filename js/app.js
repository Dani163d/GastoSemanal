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

    nuevoGasto(gasto) {
        this.gastos = [...this.gastos, gasto]
        console.log(this.gastos);
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
    
   agregarGastoListado(gastos) {
    
    this.limpiarHTML() // eliminar el HTML previo

    // iterar sobre los gastos
    gastos.forEach(gasto => {

        const {cantidad, nombre, id } = gasto;

        // crear LI
        const nuevoGasto = document.createElement('li')
            nuevoGasto.className = 'List-group-item d-flex justify-content-between align-items-center';

        nuevoGasto.dataset.id = id;
            console.log(nuevoGasto)

        // agregar HTML del gasto
        nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill"> ${cantidad} </span>`;

        // boton para borrar el gasto
        const btnBorrar = document.createElement('button');
        btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
        btnBorrar.innerHTML = 'Borrar &times';
        nuevoGasto.appendChild(btnBorrar);

        // agregar al HTML
        gastoListado.appendChild(nuevoGasto);
    });

    }
    
    limpiarHTML() {
        while(gastoListado.firstChild) {
            gastoListado.removeChild(gastoListado.firstChild);
        }
    }

   };



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
    const cantidad = Number(document.querySelector('#cantidad').value);

    // validar
    if(nombre === "" || cantidad === "") {
        ui.imprimirAlerta("ambos campos son obligatorios", "error");

        return;
    } else if ( cantidad <= 0 || isNaN(cantidad) ) {
        ui.imprimirAlerta('cantidad no validad', 'error');

        return;
    }

    // generar un objeto con el gasto
    const gasto = { nombre, cantidad, id: Date.now() }

    // agraga un nuevo gasto
    presupuesto.nuevoGasto( gasto );

    // mesaej de todo bien
    ui.imprimirAlerta('Gasto agregado correctamente')

    // imprimir los gastos
    const { gastos } = presupuesto;
    ui.agregarGastoListado(gastos);

    // reiniciar el formulario
    formulario.reset();
}





