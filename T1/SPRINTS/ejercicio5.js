// Función para generar el XPath de un elemento
function getXPath(element) {
    if (element.id) {
        return `//*[@id="${element.id}"]`;
    }
    if (element === document.body) {
        return '/html/body';
    }

    let ix = 0;
    const siblings = element.parentNode.childNodes;

    for (let i = 0; i < siblings.length; i++) {
        const sibling = siblings[i];
        if (sibling === element) {
            return `${getXPath(element.parentNode)}/${element.tagName.toLowerCase()}[${ix + 1}]`;
        }
        if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
            ix++;
        }
    }
}

// Escuchar clics en el botón principal
document.getElementById('mainButton').addEventListener('click', function() {
    const xpath = getXPath(this);
    alert(`XPath del Botón Principal: ${xpath}`);
    document.getElementById('xpathOutput').textContent = `XPath: ${xpath}`;
});

// Obtener el iframe
const iframe = document.getElementById('myIframe');

// Esperar a que el iframe cargue completamente
iframe.onload = function() {
    console.log("Iframe cargado correctamente.");

    // Usar un setTimeout para dar tiempo al iframe a cargarse completamente
    setTimeout(function() {
        // Intentar acceder al documento del iframe
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

        if (iframeDocument) {
            console.log("Accediendo al iframe:", iframe);
            // Obtener el botón dentro del iframe
            const iframeButton = iframeDocument.getElementById('iframeButton');

            if (iframeButton) {
                console.log("Botón dentro del iframe encontrado.");
                // Agregar el evento de clic al botón dentro del iframe
                iframeButton.addEventListener('click', function(event) {
                    event.stopPropagation(); // Detener la propagación del evento

                    // Generar XPath para el botón dentro del iframe
                    const xpath = getXPath(event.target);
                    alert('XPath del botón dentro del iframe: ' + xpath);

                    // Actualizar el texto del párrafo en el HTML principal
                    document.getElementById('xpathOutput').textContent = 'XPath dentro del iframe: ' + xpath;
                });
            } else {
                console.error("Botón dentro del iframe no encontrado.");
            }
        } else {
            console.error("No se pudo acceder al contenido del iframe.");
        }
    }, 500); // Esperar medio segundo para asegurarse de que el iframe se haya cargado completamente
};

// Detectar cuando el documento principal pierde el foco
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('El documento principal ha perdido el foco.');
    }
});
