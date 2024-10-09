
let votes = {
    Rojo: 0,
    Azul: 0,
    Verde: 0,
    Amarillo: 0
};


function submitVote() {
    
    const selectedColor = document.querySelector('input[name="Color"]:checked');

    if (selectedColor) {
        const colorValue = selectedColor.value;
        
        votes[colorValue]++;

        
        updateResults();
    } else {
        alert("Por favor, selecciona un color antes de enviar.");
    }
}


function updateResults() {
    const totalVotes = votes.Rojo + votes.Azul + votes.Verde + votes.Amarillo;

    
    for (let color in votes) {
        const voteCount = votes[color];
        const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;

        
        document.getElementById(`bar-${color}`).style.width = percentage + "%";
       
        document.getElementById(`${color}-votes`).textContent = `${voteCount} votos`;
    }
}
