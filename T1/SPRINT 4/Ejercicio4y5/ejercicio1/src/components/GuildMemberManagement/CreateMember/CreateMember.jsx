import React, { useState, useEffect } from "react";
import "./CreateMember.css"
import NotificationSystem from "../../general/NotificationSystem/NotificationSystem";
import ValidationSystem from "../../general/ValidationSystem/ValidationSystem";

const CreateMember = ({ isOpen, onClose, onMemberAdded }) => {
  const [formData, setFormData] = useState({
    user_id: "",
    username: "",
    level: "",
    ilvl: "",
    character_role: "",
    guild_role: "",
    main_archetype: "",
    secondary_archetype: "",
    grandmaster_profession_one: "",
    grandmaster_profession_two: "",
  });
  const [validationErrors, setValidationErrors] = useState([]);
  const [team, setTeam] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch("http://localhost:3000/guildmembers");
        if (!response.ok) {
          throw new Error("Error al obtener la lista de miembros.");
        }
        const data = await response.json();
        setTeam(data);
      } catch (err) {
        setNotification({ message: "Error al obtener la lista de miembros", type: "error" });
      }
    };

    fetchTeam();
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validationErrors.length > 0) {
      setNotification({ message: validationErrors.join(' '), type: 'error' });
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/guildmembers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al agregar el miembro.");
      }

      const newMember = await response.json();
      onMemberAdded(newMember); // Actualizar la lista de miembros
      
      onClose(); // Cerrar el modal
    } catch (err) {
      setNotification({ message: "Error al agregar el miembro", type: "error" });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Añadir Nuevo Miembro</h2>
        {validationErrors.length > 0 && (
          <div className="error">
            {validationErrors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <label>
            User ID:
            <input
              type="number"
              name="user_id"
              value={formData.user_id}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Nivel:
            <input
              type="number"
              name="level"
              value={formData.level}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            iLvl:
            <input
              type="number"
              name="ilvl"
              value={formData.ilvl}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Character Role:
            <select
              name="character_role"
              value={formData.character_role}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un rol</option>
              <option value="TANK">TANK</option>
              <option value="HEALER">HEALER</option>
              <option value="DAMAGE">DAMAGE</option>
              <option value="SUPPORT">SUPPORT</option>
            </select>
          </label>
          <label>
            Guild Role:
            <select
              name="guild_role"
              value={formData.guild_role}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un rol</option>
              <option value="LIDER">LIDER</option>
              <option value="GERENTE SENIOR">GERENTE SENIOR</option>
              <option value="GERENTE">GERENTE</option>
              <option value="GERENTE A2">GERENTE A2</option>
              <option value="ALPHA 2">ALPHA 2</option>
              <option value="MEMBER">MEMBER</option>
            </select>
          </label>
          <label>
            Main Archetype:
            <select
              name="main_archetype"
              value={formData.main_archetype}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un arquetipo</option>
              <option value="BARD">BARD</option>
              <option value="CLERIC">CLERIC</option>
              <option value="FIGHTER">FIGHTER</option>
              <option value="MAGE">MAGE</option>
              <option value="RANGER">RANGER</option>
              <option value="ROGUE">ROGUE</option>
              <option value="SUMMONER">SUMMONER</option>
              <option value="TANK">TANK</option>
            </select>
          </label>
          <label>
            Secondary Archetype:
            <select
              name="secondary_archetype"
              value={formData.secondary_archetype}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un arquetipo</option>
              <option value="BARD">BARD</option>
              <option value="CLERIC">CLERIC</option>
              <option value="FIGHTER">FIGHTER</option>
              <option value="MAGE">MAGE</option>
              <option value="RANGER">RANGER</option>
              <option value="ROGUE">ROGUE</option>
              <option value="SUMMONER">SUMMONER</option>
              <option value="TANK">TANK</option>
            </select>
          </label>
          <label>
            Grandmaster Profession One:
            <select
              name="grandmaster_profession_one"
              value={formData.grandmaster_profession_one}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona una profesión</option>
              <option value="FISHING">FISHING</option>
              <option value="HERBALISM">HERBALISM</option>
              <option value="HUNTING">HUNTING</option>
              <option value="LUMBERJACKING">LUMBERJACKING</option>
              <option value="MINING">MINING</option>
              <option value="ALCHEMY">ALCHEMY</option>
              <option value="ANIMALHUSBANDRY">ANIMALHUSBANDRY</option>
              <option value="COOKING">COOKING</option>
              <option value="FARMING">FARMING</option>
              <option value="LUMBERMILLING">LUMBERMILLING</option>
              <option value="METALWORKING">METALWORKING</option>
              <option value="STONECUTTING">STONECUTTING</option>
              <option value="TANNING">TANNING</option>
              <option value="WEAVING">WEAVING</option>
              <option value="ARCANEENGINEERING">ARCANEENGINEERING</option>
              <option value="ARMORSMITHING">ARMORSMITHING</option>
              <option value="CARPENTRY">CARPENTRY</option>
              <option value="JEWELCUTTING">JEWELCUTTING</option>
              <option value="LEATHERWORKING">LEATHERWORKING</option>
              <option value="SCRIBE">SCRIBE</option>
              <option value="TAILORING">TAILORING</option>
              <option value="WEAPONSMITHING">WEAPONSMITHING</option>
              <option value="LUMBERJACKING">LUMBERJACKING</option>
              
            </select>
          </label>
          <label>
            Grandmaster Profession Two:
            <select
              name="grandmaster_profession_two"
              value={formData.grandmaster_profession_two}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona una profesión</option>
              <option value="FISHING">FISHING</option>
              <option value="HERBALISM">HERBALISM</option>
              <option value="HUNTING">HUNTING</option>
              <option value="LUMBERJACKING">LUMBERJACKING</option>
              <option value="MINING">MINING</option>
              <option value="ALCHEMY">ALCHEMY</option>
              <option value="ANIMALHUSBANDRY">ANIMALHUSBANDRY</option>
              <option value="COOKING">COOKING</option>
              <option value="FARMING">FARMING</option>
              <option value="LUMBERMILLING">LUMBERMILLING</option>
              <option value="METALWORKING">METALWORKING</option>
              <option value="STONECUTTING">STONECUTTING</option>
              <option value="TANNING">TANNING</option>
              <option value="WEAVING">WEAVING</option>
              <option value="ARCANEENGINEERING">ARCANEENGINEERING</option>
              <option value="ARMORSMITHING">ARMORSMITHING</option>
              <option value="CARPENTRY">CARPENTRY</option>
              <option value="JEWELCUTTING">JEWELCUTTING</option>
              <option value="LEATHERWORKING">LEATHERWORKING</option>
              <option value="SCRIBE">SCRIBE</option>
              <option value="TAILORING">TAILORING</option>
              <option value="WEAPONSMITHING">WEAPONSMITHING</option>
              <option value="LUMBERJACKING">LUMBERJACKING</option>
              {/* Agrega más opciones aquí */}
            </select>
          </label>
          <button type="submit" disabled={validationErrors.length > 0}>
            Añadir Miembro
          </button>
        </form>
        <ValidationSystem
          member={formData}
          team={team}
          onValidation={setValidationErrors}
          originalMember={team}
        />
      </div>
      {notification && (
        <NotificationSystem
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default CreateMember;