const API_URL1 = "http://localhost:3000";

// Mostrar mensaje de estado en la página
const statusMessage = document.getElementById("statusMessage");

// Función para obtener y mostrar todas las parties creadas
async function loadParties() {
    try {
        statusMessage.textContent = "Cargando parties...";
        const response = await fetch(`${API_URL}/partyfinder`);
        
        if (!response.ok) {
            throw new Error("Error al obtener las parties.");
        }
        
        const parties = await response.json();
        
        if (parties.length === 0) {
            statusMessage.textContent = "No se encontraron parties.";
        } else {
            statusMessage.textContent = "";
        }
        
        displayParties(parties);
    } catch (error) {
        console.error("Error al cargar parties:", error);
        statusMessage.textContent = "Error al cargar parties.";
    }
}

// Función para mostrar las parties en el HTML
function displayParties(parties) {
    const partyList = document.getElementById("partyList");
    partyList.innerHTML = ""; // Limpiar cualquier contenido previo

    parties.forEach(party => {
        const partyDiv = document.createElement("div");
        partyDiv.innerHTML = `
            <p><strong>Party ID:</strong> ${party.id}</p>
            <p><strong>Creator ID:</strong> ${party.creator_id}</p>
            <p><strong>Planned Start:</strong> ${party.planned_start}</p>
            <p><strong>Level Cap:</strong> ${party.level_cap}</p>
            <p><strong>Item Level Cap:</strong> ${party.ilvl_cap}</p>
            <p><strong>Número de miembros:</strong> ${party.members.length}</p>
            <button onclick="openAddMemberModal(${party.id})">Add Member</button>
            <div id="memberList-${party.id}">
                ${party.members.map(member => `
                    <p>${member.user_id} - ${member.role} <button onclick="removeMember(${party.id}, ${member.user_id})">Remove Member</button></p>
                `).join('')}
            </div>
            <hr>
        `;
        partyList.appendChild(partyDiv);
    });
}

// Función para abrir el modal y preparar el formulario para añadir un miembro
function openAddMemberModal(partyId) {
    document.getElementById("modal").style.display = "block";
    document.getElementById("addMemberBtn").onclick = () => addMember(partyId);
}

// Cerrar el modal
document.getElementById("closeModal").onclick = () => {
    document.getElementById("modal").style.display = "none";
};

// Función para añadir un miembro a la party
async function addMember(partyId) {
    const userId = document.getElementById("userId").value;
    const partyRole = document.getElementById("partyRole").value;
    const errorMessage = document.getElementById("errorMessage");

    try {
        const response = await fetch(`${API_URL}/partyfinder/${partyId}/add-member`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: userId, role: partyRole })
        });
        
        if (response.ok) {
            errorMessage.textContent = "";
            document.getElementById("modal").style.display = "none";
            loadParties(); // Recargar la lista de parties para ver los cambios
        } else {
            const result = await response.json();
            errorMessage.textContent = result.message || "Error al añadir miembro";
        }
    } catch (error) {
        console.error("Error al añadir miembro:", error);
        errorMessage.textContent = "No se pudo añadir el miembro.";
    }
}

// Función para remover un miembro de la party
async function removeMember(partyId, userId) {
    try {
        const response = await fetch(`${API_URL}/partyfinder/${partyId}/remove-member/${userId}`, {
            method: "DELETE"
        });
        if (response.ok) {
            loadParties(); // Recargar la lista de parties para ver los cambios
        } else {
            console.error("Error al remover miembro");
        }
    } catch (error) {
        console.error("Error al remover miembro:", error);
    }
}

// Cargar todas las parties al iniciar
loadParties();
