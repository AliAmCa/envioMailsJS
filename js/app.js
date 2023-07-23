// Con esto se asegura que se haya descargado todo el documento html antes de ejecutarse js
document.addEventListener('DOMContentLoaded', function(){
    const email = {
        email: "",
        asunto: "",
        mensaje: ""
    };
    
    // Seleccionar elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    //console.log(inputEmail);
    //console.log(inputMensaje);

    // Asignar eventos a los elementos seleccionados
    inputEmail.addEventListener('input', validar );
    inputAsunto.addEventListener('input',validar);
    inputMensaje.addEventListener('input', validar);

    btnReset.addEventListener('click', function(e){
        e.preventDefault();
        //reiniciar el objeto
        reiniciarObjeto();
    });
    formulario.addEventListener('submit', enviarEmail);
    
    function enviarEmail(e){
        e.preventDefault();
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(()=>{
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            reiniciarObjeto();

            // Crear alerta
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white','text-center', 'p-2', 'rounded-lg', 'mt-10',
            'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Mensaje enviado correctamente';
            formulario.appendChild(alertaExito);
            setTimeout(()=>{
                alertaExito.remove();
            },3000);
    
        },3000);
    }


    // validar 
    function validar(e){
        if(e.target.value.trim() === ""){
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }
        
        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es válido',e.target.parentElement );
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }
        limpiarAlerta(e.target.parentElement);

        // Asignar valores
        email[e.target.name] = e.target.value.trim().toLowerCase();
        //console.log(email);

        //Comprobar el objeto email
        comprobarEmail();

    };

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
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

    function comprobarEmail(){
        //console.log(Object.values(email));
        // varifica si alguno de los elementos del arreglo incluye un string vacio
        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disable = true;
        }else{
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
        }
    }

    function reiniciarObjeto(){
        email.email = '';
        email.asunto = '';
        email.mensaje = '';
        formulario.reset();
        
        comprobarEmail();
    }
});