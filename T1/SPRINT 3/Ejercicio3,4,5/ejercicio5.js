const API_URL1 = "http://localhost:3000";
let parties = []; // Variable global para almacenar las parties

// Obtener y mostrar todas las parties creadas
async function fetchParties() {
    try {
        const response = await fetch(`${API_URL1}/partyfinder`);
        if (response.ok) {
            parties = await response.json();
            displayParties(parties);
        } else {
            showErrorMessage("Error al obtener la lista de parties.");
        }
    } catch (error) {
        console.error("Error al obtener las parties:", error);
        showErrorMessage("No se pudo obtener la lista de parties.");
    }
}

// Mostrar detalles de cada party en la lista
function displayParties(parties) {
    const partyListContainer = document.getElementById("partyListContainer");
    partyListContainer.innerHTML = ''; // Limpiar lista existente

    // Verificar si hay parties para mostrar
    if (parties.length === 0) {
        partyListContainer.innerHTML = '<p>No hay parties creadas.</p>';
        return;
    }

    // Crear elementos para cada party
    parties.forEach(party => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>Party ID:</strong> ${party.id} <br>
            <strong>Creator ID:</strong> ${party.creator_id} <br>
            <strong>Planned Start:</strong> ${party.planned_start} <br>
            <strong>Level Cap:</strong> ${party.level_cap} <br>
            <strong>Item Level Cap:</strong> ${party.ilvl_cap} <br>
            <strong>Miembros:</strong> ${party.members ? party.members.length : 0}/${party.party_size} <br>
            <button onclick="openAddMemberModal(${party.id})">Add Member</button>
            ${party.members ? party.members.map(member => `
                <div>${member.user_id} - ${member.role} 
                    <button onclick="removeMember(${party.id}, '${member.user_id}')">Remove Member</button>
                </div>
            `).join('') : ''}
        `;
        partyListContainer.appendChild(listItem);
    });
}

// Abrir modal para añadir miembro
function openAddMemberModal(partyId) {
    document.getElementById("addMemberModal").style.display = "flex"; // Cambia el estilo para mostrar el modal
    document.getElementById("addMemberBtn").onclick = () => addMemberToParty(partyId); // Asignar la función al botón
}

// Cerrar modal de añadir miembro
document.getElementById("closeAddMemberModal").onclick = () => {
    document.getElementById("addMemberModal").style.display = "none"; // Cambia el estilo para ocultar el modal
    document.getElementById("addMemberForm").reset(); // Resetea el formulario
};

// Añadir miembro a una party
async function addMemberToParty(partyId) {
    const userId = document.getElementById("memberUserId").value;
    const role = document.getElementById("memberPartyRole").value;

    // Validaciones: existencia del miembro y rol único
    if (await isMemberRegistered(userId) && !isRoleOccupied(partyId, role)) {
        try {
            const response = await fetch(`${API_URL1}/partyfinder/${partyId}/members`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: userId, role })
            });
            if (response.ok) {
                alert("Miembro añadido exitosamente.");
                fetchParties(); // Recargar parties
                closeAddMemberModal();
            } else {
                showErrorMessage("No se pudo añadir el miembro. Intenta de nuevo.");
            }
        } catch (error) {
            console.error("Error añadiendo miembro:", error);
            showErrorMessage("No se pudo añadir el miembro.");
        }
    } else {
        showErrorMessage("El rol ya está ocupado o el miembro no está registrado.");
    }
}

// Verificar si un rol está ocupado en una party
function isRoleOccupied(partyId, role) {
    const party = parties.find(p => p.id === partyId);
    return party && party.members && party.members.some(member => member.role === role);
}

// Remover miembro de una party
async function removeMember(partyId, userId) {
    const party = parties.find(p => p.id === partyId);
    if (party.creator_id === userId) {
        showErrorMessage("No se puede remover al creador de la party.");
        return;
    }

    try {
        const response = await fetch(`${API_URL1}/partyfinder/${partyId}/members/${userId}`, {
            method: "DELETE"
        });
        if (response.ok) {
            alert("Miembro removido exitosamente.");
            fetchParties();
        } else {
            showErrorMessage("Error al intentar remover el miembro.");
        }
    } catch (error) {
        console.error("Error removiendo miembro:", error);
        showErrorMessage("No se pudo remover el miembro.");
    }
}

// Cerrar modal de añadir miembro
function closeAddMemberModal() {
    document.getElementById("addMemberModal").style.display = "none";
    document.getElementById("addMemberForm").reset();
}

// Inicializar la carga de parties al cargar la página
fetchParties();
