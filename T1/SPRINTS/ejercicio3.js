var botonAñadir = document.getElementById('añadir');
var campoNuevoItem = document.getElementById('nuevoItem');
var lista = document.getElementById('lista');


botonAñadir.addEventListener('click', function() {
    
    var nuevoTexto = campoNuevoItem.value;

  
    if (nuevoTexto.trim() !== "") {
      
        var nuevoElemento = document.createElement('li');

        
        nuevoElemento.textContent = nuevoTexto;

       
        lista.appendChild(nuevoElemento);

      
        campoNuevoItem.value = '';
    } else {
        alert("Por favor, ingresa un ítem válido.");
    }
});
