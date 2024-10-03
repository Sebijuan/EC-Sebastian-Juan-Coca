// Función para generar el XPath único de un elemento
function getXPath(element) {
    if (element.id !== '') {
        return `//*[@id="${element.id}"]`;
    }
    if (element === document.body) {
        return '/html/body';
    }

    const ix = Array.from(element.parentNode.children).indexOf(element) + 1;
    const tagName = element.tagName.toLowerCase();

    return `${getXPath(element.parentNode)}/${tagName}[${ix}]`;
}

// Función para mostrar el XPath en el contenedor adecuado
function displayXPath(xpath) {
    document.getElementById('xpathValue').innerText = xpath;
}

// Añadir un evento de escucha para detectar clics en el documento
document.addEventListener('click', function (event) {
    // Obtener el elemento clicado
    const clickedElement = event.target;
    
    // Generar el XPath del elemento
    const xpath = getXPath(clickedElement);
    
    // Mostrar el XPath en el cuadro correspondiente
    displayXPath(xpath);
});

// Cargar contenido en el iframe
const iframe = document.getElementById('myIframe');
const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

iframeDoc.open();
iframeDoc.write(`
    <!DOCTYPE html>
    <html lang='en'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Contenido Iframe</title>
    </head>
    <body>
        <button id='iframeButton'>Botón Iframe</button>
        <script>
            // Función para generar el XPath único del botón en el iframe
            function getXPath(element) {
                if (element.id !== '') {
                    return '//*[@id="' + element.id + '"]';
                }
                if (element === document.body) {
                    return '/html/body';
                }
                const ix = Array.from(element.parentNode.children).indexOf(element) + 1;
                const tagName = element.tagName.toLowerCase();
                return getXPath(element.parentNode) + '/' + tagName + '[' + ix + ']';
            }

            // Función para mostrar el XPath en el contenedor adecuado del documento padre
            function displayXPath(xpath) {
                window.parent.document.getElementById('xpathValue').innerText = xpath;
            }

            // Añadir evento de clic en el botón del iframe
            document.getElementById('iframeButton').addEventListener('click', function(event) {
                const xpath = getXPath(event.target);
                displayXPath(xpath);
            });
        <\/script>
    </body>
    </html>
`);
iframeDoc.close();
