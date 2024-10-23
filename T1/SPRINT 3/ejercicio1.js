// ejercicio1.js

// Ejemplo de entrada:
const estudiantes = [
    { nombre: "Juan", ciudad: "Madrid", beca: false, edad: 21, calificaciones: { matematicas: 5, fisica: 7, historia: 6 } },
    { nombre: "Ana", ciudad: "Barcelona", beca: true, edad: 20, calificaciones: { matematicas: 9, fisica: 6, historia: 8 } },
    { nombre: "Pedro", ciudad: "Madrid", beca: false, edad: 23, calificaciones: { matematicas: 4, fisica: 5, historia: 7 } },
    { nombre: "Maria", ciudad: "Sevilla", beca: true, edad: 19, calificaciones: { matematicas: 8, fisica: 7, historia: 9 } },
    { nombre: "Jose", ciudad: "Madrid", beca: false, edad: 22, calificaciones: { matematicas: 6, fisica: 7, historia: 5 } },
    { nombre: "Isabel", ciudad: "Valencia", beca: true, edad: 20, calificaciones: { matematicas: 5, fisica: 8, historia: 7 } },
    { nombre: "David", ciudad: "Bilbao", beca: false, edad: 24, calificaciones: { matematicas: 7, fisica: 6, historia: 8 } },
    { nombre: "Laura", ciudad: "Barcelona", beca: true, edad: 19, calificaciones: { matematicas: 6, fisica: 8, historia: 7 } },
    { nombre: "Miguel", ciudad: "Sevilla", beca: false, edad: 21, calificaciones: { matematicas: 7, fisica: 7, historia: 8 } },
    { nombre: "Sara", ciudad: "Madrid", beca: true, edad: 20, calificaciones: { matematicas: 6, fisica: 5, historia: 9 } },
    { nombre: "Daniela", ciudad: "Valencia", beca: false, edad: 22, calificaciones: { matematicas: 8, fisica: 9, historia: 6 } },
    { nombre: "Alberto", ciudad: "Bilbao", beca: true, edad: 23, calificaciones: { matematicas: 5, fisica: 8, historia: 6 } },
    { nombre: "Gabriel", ciudad: "Sevilla", beca: false, edad: 19, calificaciones: { matematicas: 8, fisica: 5, historia: 7 } },
    { nombre: "Carmen", ciudad: "Barcelona", beca: true, edad: 24, calificaciones: { matematicas: 9, fisica: 9, historia: 9 } },
    { nombre: "Roberto", ciudad: "Madrid", beca: false, edad: 20, calificaciones: { matematicas: 4, fisica: 5, historia: 5 } },
    { nombre: "Carolina", ciudad: "Valencia", beca: true, edad: 22, calificaciones: { matematicas: 5, fisica: 7, historia: 6 } },
    { nombre: "Alejandro", ciudad: "Bilbao", beca: false, edad: 23, calificaciones: { matematicas: 9, fisica: 8, historia: 8 } },
    { nombre: "Lucia", ciudad: "Barcelona", beca: true, edad: 21, calificaciones: { matematicas: 7, fisica: 7, historia: 7 } },
    { nombre: "Ricardo", ciudad: "Sevilla", beca: false, edad: 19, calificaciones: { matematicas: 6, fisica: 5, historia: 6 } },
    { nombre: "Marina", ciudad: "Madrid", beca: true, edad: 20, calificaciones: { matematicas: 5, fisica: 9, historia: 8 } }
];

// Parte 1: Estudiantes Destacados por Asignatura
function estudiantesDestacadosPorAsignatura(estudiantes, asignatura) {
    return estudiantes
        .filter(est => est.calificaciones[asignatura] !== undefined)
        .sort((a, b) => b.calificaciones[asignatura] - a.calificaciones[asignatura])
        .slice(0, 3);
}

// Parte 2: Asignatura con Menor Rendimiento
function asignaturaMenorRendimiento(estudiantes) {
    const asignaturas = Object.keys(estudiantes[0].calificaciones);
    let peorAsignatura = '';
    let menorPromedio = Infinity;

    asignaturas.forEach(asignatura => {
        const promedio = estudiantes.reduce((acc, est) => acc + est.calificaciones[asignatura], 0) / estudiantes.length;
        if (promedio < menorPromedio) {
            menorPromedio = promedio;
            peorAsignatura = asignatura;
        }
    });

    return peorAsignatura;
}

// Parte 3: Mejora de Notas para Estudiantes con Beca
function mejoraNotasBeca(estudiantes) {
    return estudiantes.map(est => {
        if (est.beca) {
            Object.keys(est.calificaciones).forEach(asignatura => {
                est.calificaciones[asignatura] = Math.min(10, est.calificaciones[asignatura] * 1.1);
            });
        }
        return est;
    });
}

// Parte 4: Filtrado por Ciudad y Asignatura
function filtrarPorCiudadYAsignatura(estudiantes, ciudad, asignatura) {
    return estudiantes
        .filter(est => est.ciudad === ciudad)
        .sort((a, b) => b.calificaciones[asignatura] - a.calificaciones[asignatura]);
}

// Parte 5: Estudiantes Sin Beca por Ciudad
function estudiantesSinBecaPorCiudad(estudiantes, ciudad) {
    return estudiantes.filter(est => est.ciudad === ciudad && !est.beca).length;
}

// Parte 6: Promedio de Edad de Estudiantes con Beca
function promedioEdadEstudiantesConBeca(estudiantes) {
    const becados = estudiantes.filter(est => est.beca);
    const totalEdad = becados.reduce((acc, est) => acc + est.edad, 0);
    return becados.length ? (totalEdad / becados.length) : 0;
}

// Parte 7: Mejores Estudiantes en Total
function mejoresEstudiantes(estudiantes) {
    return estudiantes
        .map(est => {
            const promedioGeneral = Object.values(est.calificaciones).reduce((a, b) => a + b) / Object.values(est.calificaciones).length;
            return { nombre: est.nombre, promedio: promedioGeneral };
        })
        .sort((a, b) => b.promedio - a.promedio)
        .slice(0, 2);
}

// Parte 8: Estudiantes con Todas las Materias Aprobadas
function estudiantesAprobados(estudiantes) {
    return estudiantes
        .filter(est => Object.values(est.calificaciones).every(nota => nota >= 5))
        .map(est => est.nombre);
}

// Pruebas
console.log(estudiantesDestacadosPorAsignatura(estudiantes, 'matematicas')); // Esperado: Carmen, Alejandro, Ana
console.log(asignaturaMenorRendimiento(estudiantes)); // Esperado: 'matematicas'
console.log(mejoraNotasBeca(estudiantes)); // Las notas de estudiantes con beca aumentan 10%
console.log(filtrarPorCiudadYAsignatura(estudiantes, 'Madrid', 'fisica')); // Esperado: Juan, Jose, Sara
console.log(estudiantesSinBecaPorCiudad(estudiantes, 'Madrid')); // Esperado: 4
console.log(promedioEdadEstudiantesConBeca(estudiantes)); // Esperado: 21
console.log(mejoresEstudiantes(estudiantes)); // Esperado: Carmen, Alejandro
console.log(estudiantesAprobados(estudiantes)); // Esperado: ["Juan", "Ana", "Maria", "Jose", ... ]
