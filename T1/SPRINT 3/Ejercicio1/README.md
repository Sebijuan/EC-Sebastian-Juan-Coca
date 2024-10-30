# Ejercicios de Desarrollo Web

## Ejercicio 1: Análisis y Transformación Avanzada de Datos

### Análisis del problema:
Se requiere implementar una serie de funciones en JavaScript para analizar un conjunto de datos de estudiantes. Este conjunto incluye información sobre sus calificaciones en diferentes asignaturas, su ciudad de residencia y si cuentan con una beca. El objetivo es crear funcionalidades que permitan obtener información relevante y transformaciones sobre estos datos.

### Diseño de la propuesta de solución:
1. **Estructura de Datos**: Un array de objetos donde cada objeto representa a un estudiante con sus detalles.
2. **Funciones a implementar**:
   - Función para obtener los 3 estudiantes con mejores calificaciones en una asignatura.
   - Función para identificar la asignatura con menor rendimiento promedio.
   - Función para aumentar las notas de estudiantes con beca.
   - Función para filtrar estudiantes por ciudad y asignatura.
   - Función para contar estudiantes sin beca en una ciudad.
   - Función para calcular el promedio de edad de estudiantes con beca.
   - Función para obtener los 2 estudiantes con mejor promedio general.
   - Función para listar estudiantes que aprobaron todas las materias.

3. **Diagrama de flujo**:
   - Inicia -> Seleccionar función -> Ejecutar lógica de la función -> Retornar resultado -> Fin.

### Implementación del diseño propuesto:
Se desarrollará un archivo JavaScript que incluirá las funciones especificadas. Cada función procesará el array de estudiantes y retornará los resultados requeridos.

### Ejemplo de Entrada:
```javascript
const estudiantes = [
    { nombre: "Juan", ciudad: "Madrid", beca: false, edad: 21, calificaciones: { matematicas: 5, fisica: 7, historia: 6 } },
    { nombre: "Ana", ciudad: "Barcelona", beca: true, edad: 20, calificaciones: { matematicas: 9, fisica: 6, historia: 8 } },
    // ... (resto de los estudiantes)
];
   ### Pruebas de la resolución del problema:
