// URL base de la API
const API_URL = "http://localhost:3000/guildmembers";

// Función para mostrar y ocultar el modal
const showModal = () => document.getElementById("memberModal").style.display = "block";
const hideModal = () => {
    document.getElementById("memberModal").style.display = "none";
    document.getElementById("memberForm").reset();  // Limpiar formulario al cerrar el modal
};

// Función para mostrar mensaje de confirmación
function showConfirmationMessage(message) {
    const messageContainer = document.getElementById("confirmationMessage");
    messageContainer.textContent = message;
    messageContainer.style.display = "block";
    setTimeout(() => {
        messageContainer.style.display = "none";
    }, 3000);
}

// Función para obtener y mostrar todos los miembros de la guild
async function fetchMembers() {
    try {
        const response = await fetch(`${API_URL}`);
        if (!response.ok) throw new Error("Error al conectar con la API");

        const members = await response.json();
        const membersList = document.getElementById("membersList");
        membersList.innerHTML = "";  // Limpiar la tabla antes de agregar

        members.forEach(member => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${member.user_id}</td>
                <td>${member.username}</td>
                <td>${member.level}</td>
                <td>${member.ilvl}</td>
                <td>${member.character_role}</td>
                <td>${member.guild_role}</td>
                <td>${member.email}</td>
                <td>
                    <button onclick="editMember('${member.user_id}')">Edit</button>
                    <button onclick="deleteMember('${member.user_id}')">Delete</button>
                </td>
            `;
            membersList.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching members:", error);
        alert("No se pudo conectar con la API en el puerto 3000.");
    }
}

// Función para añadir un nuevo miembro
async function addMember(memberData) {
    try {
        const response = await fetch(`${API_URL}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(memberData)
        });
        const result = await response.json();
        
        if (response.ok) {
            showConfirmationMessage("Miembro añadido correctamente."); // Mostrar mensaje de confirmación
            fetchMembers();  // Refrescar la lista
            hideModal();
        } else {
            console.error("Error al añadir miembro:", result.message || result);
            alert("No se pudo añadir el miembro. Verifica los datos.");
        }
    } catch (error) {
        console.error("Error añadiendo miembro:", error);
    }
}

// Función para editar un miembro
async function editMember(memberId) {
    try {
        const response = await fetch(`${API_URL}/${memberId}`);
        if (!response.ok) throw new Error("Error al obtener los datos del miembro");

        const member = await response.json();

        // Rellenar formulario con los datos actuales
        document.getElementById("userId").value = member.user_id;
        document.getElementById("username").value = member.username;
        document.getElementById("level").value = member.level;
        document.getElementById("ilvl").value = member.ilvl;
        document.getElementById("characterRole").value = member.character_role;
        document.getElementById("guildRole").value = member.guild_role;
        document.getElementById("email").value = member.email;
        document.getElementById("notifyEmail").checked = member.notify_email;
        document.getElementById("mainArchetype").value = member.main_archetype;  // Nuevo campo
        document.getElementById("secondaryArchetype").value = member.secondary_archetype;  // Nuevo campo
        document.getElementById("grandmasterProfessionOne").value = member.grandmaster_profession_one;  // Nuevo campo
        document.getElementById("grandmasterProfessionTwo").value = member.grandmaster_profession_two;  // Nuevo campo

        showModal();

        // Manejo de envío para editar el miembro
        document.getElementById("submitMemberBtn").onclick = async (e) => {
            e.preventDefault();
            const updatedData = {
                user_id: document.getElementById("userId").value,
                username: document.getElementById("username").value,
                level: parseInt(document.getElementById("level").value, 10),
                ilvl: parseInt(document.getElementById("ilvl").value, 10),
                character_role: document.getElementById("characterRole").value,
                guild_role: document.getElementById("guildRole").value,
                email: document.getElementById("email").value,
                notify_email: document.getElementById("notifyEmail").checked,
                main_archetype: document.getElementById("mainArchetype").value,  // Nuevo campo
                secondary_archetype: document.getElementById("secondaryArchetype").value,  // Nuevo campo
                grandmaster_profession_one: document.getElementById("grandmasterProfessionOne").value,  // Nuevo campo
                grandmaster_profession_two: document.getElementById("grandmasterProfessionTwo").value  // Nuevo campo
            };

            try {
                const response = await fetch(`${API_URL}/${memberId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedData)
                });
                if (response.ok) {
                    showConfirmationMessage("Miembro actualizado correctamente.");
                    fetchMembers();  // Refrescar lista
                    hideModal();
                } else {
                    throw new Error("Error al actualizar el miembro.");
                }
            } catch (error) {
                console.error("Error editing member:", error);
            }
        };
    } catch (error) {
        console.error("Error fetching member data:", error);
    }
}

// Función para eliminar un miembro
async function deleteMember(memberId) {
    if (!confirm("¿Estás seguro de que deseas eliminar este miembro?")) return;

    try {
        const response = await fetch(`${API_URL}/${memberId}`, { method: "DELETE" });
        if (response.ok) {
            showConfirmationMessage("Miembro eliminado correctamente.");
            fetchMembers();  // Refrescar la lista
        } else {
            throw new Error("Error al eliminar el miembro.");
        }
    } catch (error) {
        console.error("Error deleting member:", error);
    }
}

// Evento para el botón "Add New Member"
document.getElementById("addMemberBtn").onclick = () => {
    showModal();  // Mostrar el modal al hacer clic en el botón

    // Manejo de envío para añadir un nuevo miembro
    document.getElementById("submitMemberBtn").onclick = async (e) => {
        e.preventDefault();
        const newMember = {
            user_id: document.getElementById("userId").value,
            username: document.getElementById("username").value,
            level: parseInt(document.getElementById("level").value, 10),
            ilvl: parseInt(document.getElementById("ilvl").value, 10),
            character_role: document.getElementById("characterRole").value,
            guild_role: document.getElementById("guildRole").value,
            email: document.getElementById("email").value,
            notify_email: document.getElementById("notifyEmail").checked,
            main_archetype: document.getElementById("mainArchetype").value,  // Nuevo campo
            secondary_archetype: document.getElementById("secondaryArchetype").value,  // Nuevo campo
            grandmaster_profession_one: document.getElementById("grandmasterProfessionOne").value,  // Nuevo campo
            grandmaster_profession_two: document.getElementById("grandmasterProfessionTwo").value  // Nuevo campo
        };

        // Log para verificar que el email se está recogiendo correctamente
        console.log(newMember);  // Asegúrate de que email no esté vacío antes de enviar
        await addMember(newMember);
    };
};

// Cerrar el modal
document.getElementById("closeModalBtn").onclick = hideModal;

// Cargar miembros al iniciar
fetchMembers();
