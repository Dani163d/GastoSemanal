// variables y selecctores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector("#gastos ul");


// Eventos
eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
}



// Clases





// Funciones

function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('¿cual es tu presupuesto?');

    console.log(presupuestoUsuario);


    if(presupuestoUsuario === '' || presupuestoUsuario === null) {
        window.location.reload()
    }
}





