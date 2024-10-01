
function cambiarEstilo(div) {
    div.style.backgroundColor = 'blue';
    div.style.color = 'white';
}


function restaurarEstilo(div) {
    div.style.backgroundColor = 'lightgray';
    div.style.color = 'black'; 
}

window.onload = function() {
    var divs = document.querySelectorAll('.div-contenido');

    divs.forEach(function(div) {
        div.addEventListener('mouseover', function() {
            cambiarEstilo(div);
        });
        div.addEventListener('mouseout', function() {
            restaurarEstilo(div);
        });
    });
};
