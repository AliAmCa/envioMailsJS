// Con esto se asegura que se haya descargado todo el documento html antes de ejecutarse js
document.addEventListener('DOMContentLoaded', function(){
    
    // Seleccionar elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    //console.log(inputEmail);
    //console.log(inputMensaje);

    // Asignar eventos a los elementos seleccionados
    inputEmail.addEventListener('blur', validar );
    inputAsunto.addEventListener('blur',validar);
    inputMensaje.addEventListener('blur', validar);

    
    // validar 
    function validar(e){
        if(e.target.value.trim() === ""){
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            return;
        }
        limpiarAlerta(e.target.parentElement);
        validarEmail(e.target.value);
    };

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        console.log(resultado)

    }

    function mostrarAlerta(mensaje,referencia){
        //comprueba si existe una alerta
        limpiarAlerta(referencia);

        const error = document.createElement('p');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center')
        //Inyectar el error al formulario
        referencia.appendChild(error);
        
    };

    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove();
        }
    }
});