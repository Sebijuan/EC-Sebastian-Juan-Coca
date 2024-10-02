# Ejercicio 1: Cambio de Color con Botón

Este ejercicio consiste en una página web simple que contiene un botón etiquetado como "Cambiar color". Al hacer clic en el botón, el color de fondo de la página cambia a un color aleatorio.

## Descripción del Funcionamiento

- Al cargar la página, el usuario verá un botón en el centro de la pantalla que dice "Cambiar color".
- Al presionar el botón, el color de fondo del `body` cambia aleatoriamente utilizando valores RGB generados con `Math.random()`.

### Archivos incluidos

1. **ejercicio1.html**: Archivo HTML que contiene la estructura básica de la página.
2. **ejercicio1.js**: Archivo JavaScript que maneja la lógica para generar colores aleatorios y cambiar el color de fondo de la página.


### Prueba del Ejercicio

Aquí puedes ver un vídeo en formato GIF que muestra el funcionamiento correcto del botón al cambiar el color de fondo:

![Prueba de cambio de color](gif1.gif)

---

### Ejemplo de Código JavaScript para Cambiar el Color

```javascript
function generarColorAleatorio() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

document.getElementById("colorButton").addEventListener("click", () => {
    document.body.style.backgroundColor = generarColorAleatorio();
});
