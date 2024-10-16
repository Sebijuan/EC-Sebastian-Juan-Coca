# Fases de la resolución de problemas

1. **Análisis del problema**: Se debe indicar en el directorio específico de la asignatura el problema que se va a resolver de una forma adecuada, es decir, no debe contener ambigüedades, debe ser simple y autocontenido.

2. **Diseño de la propuesta de solución del problema**: Como todo aquel problema que se quiere resolver, es necesario realizar el diseño de la o las soluciones que se procederá a implementar en el siguiente paso. Para esto nos debemos ayudar de las herramientas para realizar esquemas gráficos (UML, Diagramas de flujos, etc.).

3. **Implementación del diseño propuesto**: En este punto ya se procederá a implementar todo el diseño establecido en el punto anterior.

4. **Pruebas de la resolución del problema**: Es indispensable realizar pruebas para verificar la integridad y correcto funcionamiento de la implementación realizada, para ello simplemente compararemos si el comportamiento esperado del análisis del problema se ha implementado de forma adecuada.

---

# Ejercicio 1: Contrarreloj

## Descripción
Crear un temporizador simple en el que el usuario pueda introducir una cantidad de segundos, y al hacer clic en un botón, comience la cuenta regresiva. Cuando el tiempo llegue a cero, debe mostrar un mensaje que diga "¡Tiempo finalizado!".

## HTML
- Un campo de entrada (input) para ingresar los segundos.
- Un botón para iniciar la cuenta regresiva.
- Un área para mostrar el tiempo restante.

## JS
- Detectar el evento click en el botón.
- Iniciar la cuenta regresiva y actualizar el tiempo en la página cada segundo hasta llegar a cero.

## Objetivos
- Uso de eventos (click).
- Métodos de temporización como setInterval y clearInterval.
- Manipulación básica del DOM para mostrar el tiempo restante.

## Pruebas
- Vídeos GIF en Readme.md mostrando:
  - Rellenar el campo de tiempo con el valor 2 segundos y pulsar el botón "Iniciar", verificando que el temporizador cuenta correctamente y muestra una alerta al terminar los 2 segundos.
  - Repetir la prueba con el valor 4 segundos, asegurándose de que el temporizador cuenta hasta los 4 segundos y que al finalizar se muestra la alerta correspondiente.
    ![ejercico1](gif1.gif)
---

# Ejercicio 2: Calculadora básica

## Descripción
Crear una calculadora básica que permita realizar operaciones de suma, resta, multiplicación y división. Los usuarios deben poder introducir dos números y seleccionar una operación. Al hacer clic en "Calcular", se debe mostrar el resultado de la operación seleccionada.

## HTML
- Dos campos para introducir los números.
- Una lista de selección (select) para elegir la operación.
- Un botón "Calcular".
- Un área para mostrar el resultado.

## JS
- Detectar el evento click en el botón "Calcular".
- Capturar los valores de los campos y realizar la operación matemática seleccionada.
- Mostrar el resultado en la página.

## Objetivos
- Manejo de eventos (click).
- Validación de entradas de usuario (asegurarse de que los campos no estén vacíos).
- Uso de métodos matemáticos básicos (+, -, *, /).

## Pruebas
- Vídeos GIF en Readme.md mostrando:
  - Probar que la suma de 10 + 12 muestra correctamente el resultado de 22.
  - Verificar que la resta de 10 - 12 devuelve el valor esperado de -2.
  - Comprobar que la multiplicación de 5 x 4 es 20, y que 5 x 0 devuelve 0.
  - Probar que la división de 5 / 4 es 1.25 y que 5 / 0 devuelve el mensaje "INDEFINIDO".
    ![ejercico2](gif2.gif)
---

# Ejercicio 3: Encuesta con gráficos de resultados

## Descripción
Crear una página con una pequeña encuesta donde el usuario puede seleccionar una opción entre varias (por ejemplo: "¿Cuál es tu color favorito?"). Al enviar la respuesta, se deben mostrar los resultados en un gráfico de barras simple que se actualice dinámicamente cada vez que se envía una respuesta.

## HTML
- Pregunta con varias opciones (utilizando radio buttons).
- Un botón "Enviar".
- Un área donde se mostrará el gráfico de barras con los resultados.

## JS
- Detectar el evento click en el botón "Enviar".
- Actualizar las respuestas seleccionadas y generar un gráfico de barras simple manipulando el DOM.

## Objetivos
- Manejo de eventos (click).
- Manipulación del DOM para actualizar el gráfico de barras dinámicamente.
- Lógica para contar votos y reflejar visualmente.

## Pruebas
- Vídeos GIF en Readme.md mostrando:
  - Verificar que al seleccionar una opción y hacer clic en "Enviar", se actualicen correctamente los votos en el gráfico.
  - Comprobar que el gráfico de barras se actualiza dinámicamente después de cada nueva votación.
  - Probar que el sistema gestiona correctamente intentos de envío sin seleccionar ninguna opción.
  - Verificar que las votaciones previas se mantienen después de varias interacciones.
    ![ejercico3](gif3.gif)
---

# Ejercicio 4: Cronómetro con controles de inicio, pausa y reinicio

## Descripción
Crear un cronómetro que permita al usuario iniciarlo, pausarlo y reiniciarlo. El cronómetro debe actualizarse cada segundo y mostrar el tiempo en minutos y segundos.

## HTML
- Botones para "Iniciar", "Pausar" y "Reiniciar".
- Un área para mostrar el tiempo.

## JS
- Detectar los eventos click en los botones para iniciar el cronómetro, detenerlo y reiniciarlo.
- Usar setInterval para actualizar el cronómetro cada segundo.

## Objetivos
- Uso avanzado de eventos (click en múltiples botones).
- Métodos como setInterval, clearInterval.
- Manipulación continua del DOM (actualización del tiempo).

## Pruebas
- Vídeos GIF en Readme.md mostrando:
  - Probar que el cronómetro comienza a contar correctamente al hacer clic en "Iniciar".
  - Comprobar que al pausar el cronómetro se detiene en el tiempo actual y no continúa avanzando.
  - Verificar que al hacer clic en "Reiniciar", el cronómetro vuelve a cero.
  - Probar que el cronómetro maneja correctamente largos períodos de tiempo sin errores.
    ![ejercico4](gif4.gif)
---

# Ejercicio 5: Juego de memoria con cartas

## Descripción
Crear un juego de memoria donde el usuario debe hacer clic en dos cartas para ver si coinciden. Si las cartas coinciden, permanecen boca arriba; si no, se voltean nuevamente después de un breve intervalo. El objetivo es encontrar todas las parejas de cartas.

## HTML
- Crear una cuadrícula de cartas (pueden ser imágenes o solo texto, como números o letras).

## JS
- Detectar el evento click en cada carta.
- Usar lógica para manejar la comparación de cartas seleccionadas, y un temporizador para voltearlas si no coinciden.
- Al final, mostrar un mensaje cuando el jugador haya encontrado todas las parejas.

## Objetivos
- Uso avanzado de eventos (click en elementos dinámicos).
- Uso de métodos de temporización como setTimeout para la lógica de volteo.
- Lógica condicional compleja para comparar cartas y gestionar el estado del juego.
- Manipulación dinámica del DOM (mostrar/ocultar cartas y actualización del estado del juego).

## Pruebas
- Vídeos GIF en Readme.md mostrando:
  - Verificar que las cartas se voltean al hacer clic y se quedan volteadas si coinciden.
  - Comprobar que dos cartas no coincidentes se voltean de nuevo después de un breve intervalo.
  - Probar que el juego detecta cuando se han encontrado todas las parejas y muestra un mensaje de finalización.
  - Verificar que el juego puede reiniciarse correctamente barajando las cartas de nuevo.
    ![ejercico5](gif5.gif)
    ![ejercico51](gif51.gif)
    ![ejercico5.2](gif5.2.gif)
    ![ejercico5](gif5.3.gif)