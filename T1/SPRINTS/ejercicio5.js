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

document.addEventListener('click', function(event) {
    const target = event.target; 
    const xpath = getXPath(target); 
    
    alert(`XPath del elemento clickeado: ${xpath}`);
    document.getElementById('xpathOutput').textContent = `XPath: ${xpath}`;
});


const iframe = document.getElementById('myIframe');

iframe.onload = function() {
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

   
    iframeDocument.addEventListener('click', function(event) {
        const target = event.target; 
        const xpath = getXPath(target); 

        
        const iframeXPath = getXPath(iframe);
        
        alert(`XPath del iframe: ${iframeXPath}\nXPath del elemento dentro del iframe: ${xpath}`);

       
        document.getElementById('xpathOutput').textContent = `XPath del iframe: ${iframeXPath}\nXPath dentro del iframe: ${xpath}`;
    });
};


document.getElementById('iframeWrapper').addEventListener('click', function() {
    const iframe = document.getElementById('myIframe');
    iframe.style.display = (iframe.style.display === "none") ? "block" : "none"; // Alternar la visibilidad del iframe
});
