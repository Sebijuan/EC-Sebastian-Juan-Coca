import React, { useState } from 'react';
import './CreateMember.css';

const CreateMember = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        userId: '',
        username: '',
        level: '',
        ilvl: '',
        characterRole: '',
        guildRole: '',
        mainArchetype: '',
        secondaryArchetype: '',
        grandmasterProfessionOne: '',
        grandmasterProfessionTwo: ''
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.userId) newErrors.userId = 'User ID is required';
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.level) newErrors.level = 'Level is required';
        if (!formData.ilvl) newErrors.ilvl = 'Item Level is required';
        if (!formData.characterRole) newErrors.characterRole = 'Character Role is required';
        if (!formData.guildRole) newErrors.guildRole = 'Guild Role is required';
        if (!formData.mainArchetype) newErrors.mainArchetype = 'Main Archetype is required';
        if (!formData.secondaryArchetype) newErrors.secondaryArchetype = 'Secondary Archetype is required';
        if (!formData.grandmasterProfessionOne) newErrors.grandmasterProfessionOne = 'Grandmaster Profession One is required';
        if (!formData.grandmasterProfessionTwo) newErrors.grandmasterProfessionTwo = 'Grandmaster Profession Two is required';
        return newErrors;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            setSuccessMessage('Member created successfully!');
            // Add member creation logic here
        }
    };

    return (
        <div className="create-member">
            <h2>Create Member</h2>
            {successMessage && <div className="success-message">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <div className="error">{errors.name}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <div className="error">{errors.email}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="userId">User ID:</label>
                    <input
                        type="text"
                        id="userId"
                        value={formData.userId}
                        onChange={handleChange}
                    />
                    {errors.userId && <div className="error">{errors.userId}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {errors.username && <div className="error">{errors.username}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="level">Level:</label>
                    <input
                        type="number"
                        id="level"
                        value={formData.level}
                        onChange={handleChange}
                    />
                    {errors.level && <div className="error">{errors.level}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="ilvl">Item Level:</label>
                    <input
                        type="number"
                        id="ilvl"
                        value={formData.ilvl}
                        onChange={handleChange}
                    />
                    {errors.ilvl && <div className="error">{errors.ilvl}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="characterRole">Character Role:</label>
                    <select
                        id="characterRole"
                        value={formData.characterRole}
                        onChange={handleChange}
                    >
                        <option value="">Select Role</option>
                        <option value="TANK">TANK</option>
                        <option value="HEALER">HEALER</option>
                        <option value="DAMAGE">DAMAGE</option>
                        <option value="SUPPORT">SUPPORT</option>
                    </select>
                    {errors.characterRole && <div className="error">{errors.characterRole}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="guildRole">Guild Role:</label>
                    <select
                        id="guildRole"
                        value={formData.guildRole}
                        onChange={handleChange}
                    >
                        <option value="">Select Role</option>
                        <option value="LIDER">LIDER</option>
                        <option value="GERENTE SENIOR">GERENTE SENIOR</option>
                        <option value="GERENTE">GERENTE</option>
                        <option value="GERENTE A2">GERENTE A2</option>
                        <option value="ALPHA 2">ALPHA 2</option>
                        <option value="MEMBER">MEMBER</option>
                    </select>
                    {errors.guildRole && <div className="error">{errors.guildRole}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="mainArchetype">Main Archetype:</label>
                    <select
                        id="mainArchetype"
                        value={formData.mainArchetype}
                        onChange={handleChange}
                    >
                        <option value="">Select Archetype</option>
                        <option value="BARD">BARD</option>
                        <option value="CLERIC">CLERIC</option>
                        <option value="FIGHTER">FIGHTER</option>
                        <option value="MAGE">MAGE</option>
                        <option value="RANGER">RANGER</option>
                        <option value="ROGUE">ROGUE</option>
                        <option value="SUMMONER">SUMMONER</option>
                        <option value="TANK">TANK</option>
                    </select>
                    {errors.mainArchetype && <div className="error">{errors.mainArchetype}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="secondaryArchetype">Secondary Archetype:</label>
                    <select
                        id="secondaryArchetype"
                        value={formData.secondaryArchetype}
                        onChange={handleChange}
                    >
                        <option value="">Select Archetype</option>
                        <option value="BARD">BARD</option>
                        <option value="CLERIC">CLERIC</option>
                        <option value="FIGHTER">FIGHTER</option>
                        <option value="MAGE">MAGE</option>
                        <option value="RANGER">RANGER</option>
                        <option value="ROGUE">ROGUE</option>
                        <option value="SUMMONER">SUMMONER</option>
                        <option value="TANK">TANK</option>
                    </select>
                    {errors.secondaryArchetype && <div className="error">{errors.secondaryArchetype}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="grandmasterProfessionOne">Grandmaster Profession One:</label>
                    <select
                        id="grandmasterProfessionOne"
                        value={formData.grandmasterProfessionOne}
                        onChange={handleChange}
                    >
                        <option value="">Select Profession</option>
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
                    </select>
                    {errors.grandmasterProfessionOne && <div className="error">{errors.grandmasterProfessionOne}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="grandmasterProfessionTwo">Grandmaster Profession Two:</label>
                    <select
                        id="grandmasterProfessionTwo"
                        value={formData.grandmasterProfessionTwo}
                        onChange={handleChange}
                    >
                        <option value="">Select Profession</option>
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
                    </select>
                    {errors.grandmasterProfessionTwo && <div className="error">{errors.grandmasterProfessionTwo}</div>}
                </div>
                <button type="submit" className="create-member-button">Create Member</button>
            </form>
        </div>
    );
};

export default CreateMember;
