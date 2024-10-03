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


document.getElementById('mainButton').addEventListener('click', function() {
    const xpath = getXPath(this);
    alert(`XPath del Botón Principal: ${xpath}`);
    document.getElementById('xpathOutput').textContent = `XPath: ${xpath}`;
});


const iframe = document.getElementById('myIframe');


iframe.onload = function() {
    console.log("Iframe cargado correctamente.");

    
    setTimeout(function() {
       
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

        if (iframeDocument) {
            console.log("Accediendo al iframe:", iframe);
           
            const iframeButton = iframeDocument.getElementById('iframeButton');

            if (iframeButton) {
                console.log("Botón dentro del iframe encontrado.");
               
                iframeButton.addEventListener('click', function(event) {
                    event.stopPropagation(); 

                   
                    const xpath = getXPath(event.target);
                    alert('XPath del botón dentro del iframe: ' + xpath);

                   
                    document.getElementById('xpathOutput').textContent = 'XPath dentro del iframe: ' + xpath;
                });
            } else {
                console.error("Botón dentro del iframe no encontrado.");
            }
        } else {
            console.error("No se pudo acceder al contenido del iframe.");
        }
    }, 500); 
};


document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('El documento principal ha perdido el foco.');
    }
});
