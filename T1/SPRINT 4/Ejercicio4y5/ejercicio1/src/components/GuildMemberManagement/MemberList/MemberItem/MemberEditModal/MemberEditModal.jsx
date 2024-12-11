import React, { useState, useEffect } from "react";
import './MemberEditModal.css';
import ConfirmationDialog from '../../../../general/ConfirmationDialog/ConfirmationDialog';
import NotificationSystem from '../../../../general/NotificationSystem/NotificationSystem';
import ValidationSystem from '../../../../general/ValidationSystem/ValidationSystem';
import { fetchTeam, updateMember } from '../../../../../services/guildmember_API';

const MemberEditModal = ({ member, onSave, onClose }) => {
  const [editedMember, setEditedMember] = useState(member);
  const [showDialog, setShowDialog] = useState(false);
  const [notification, setNotification] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const loadTeam = async () => {
      try {
        const data = await fetchTeam();
        setTeam(data);
      } catch (err) {
        setNotification({ message: "Error al obtener la lista de miembros", type: "error" });
      }
    };

    loadTeam();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedMember({
      ...editedMember,
      [name]: value,
    });
  };

  const handleSave = async () => {
    setShowDialog(true)
  };

  const handleCancel = () => {
    setShowDialog(false);
  };

  const handleConfirm = async () => {

    if (validationErrors.length > 0) {
      setNotification({ message: validationErrors.join(' '), type: 'error' });
      return;
    }

    try {
      const updatedMember = await updateMember(member.user_id, editedMember);
      onSave(updatedMember);
    } catch (error) {
      console.error("Error al actualizar el miembro:", error);
      setNotification({ message: 'No se pudieron guardar los cambios. Intentalo nuevamente', type: 'error' });
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Miembro</h2>
        {validationErrors.length > 0 && (
          <div className="error">
            {validationErrors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        <form>
        <label>
              User ID:
              <input
                type="number"
                name="user_id"
                value={editedMember.user_id}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={editedMember.username}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Nivel:
              <input
                type="number"
                name="level"
                value={editedMember.level}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              iLvl:
              <input
                type="number"
                name="ilvl"
                value={editedMember.ilvl}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Character Role:
              <select
                name="character_role"
                value={editedMember.character_role}
                onChange={handleInputChange}
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
                value={editedMember.guild_role}
                onChange={handleInputChange}
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
                value={editedMember.main_archetype}
                onChange={handleInputChange}
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
                value={editedMember.secondary_archetype}
                onChange={handleInputChange}
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
                value={editedMember.grandmaster_profession_one}
                onChange={handleInputChange}
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
                value={editedMember.grandmaster_profession_two}
                onChange={handleInputChange}
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
        </form>
        <button onClick={handleSave} disabled={validationErrors.length > 0}>Guardar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
      {showDialog && (
        <ConfirmationDialog
          message="¿Estás seguro que quieres editar este miembro?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
      {notification && (
        <NotificationSystem
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <ValidationSystem
          member={editedMember}
          team={team}
          originalMember={member}
          onValidation={setValidationErrors}
        />
    </div>
  );
};

export default MemberEditModal;