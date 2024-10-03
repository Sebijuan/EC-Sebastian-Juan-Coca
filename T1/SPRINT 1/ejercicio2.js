document.getElementById('calcular').addEventListener('click', function() {
    var ancho = document.getElementById('ancho').value;
    var alto = document.getElementById('alto').value;

    
    if (ancho === '' || alto === '' || isNaN(ancho) || isNaN(alto)) {
        document.getElementById('resultado').textContent = 'Por favor ingresa valores válidos.';
        return;
    }

    var area = ancho * alto;
    document.getElementById('resultado').textContent = 'El área es: ' + area;
});
