import React, { useEffect } from 'react';

const ValidationSystem = ({ member, team, originalMember, onValidation }) => {
  const validateMember = (member, team) => {
    const errors = [];

    // Validaciones de campos obligatorios
    if (!member.user_id) {
      errors.push('El ID de usuario es obligatorio.');
    } else if (team.some(m => m.user_id === member.user_id && m.user_id !== originalMember.user_id)) {
      errors.push('El ID de usuario ya existe.');
    }

    if (!member.username) {
      errors.push('El nombre de usuario es obligatorio.');
    } else if (team.some(m => m.username === member.username && m.username !== originalMember.username)) {
      errors.push('El nombre de usuario ya existe.');
    }

    if (member.role && !['LIDER', 'GERENTE SENIOR', 'GERENTE', 'GERENTE A2', 'ALPHA 2', 'MEMBER'].includes(member.role)) {
      errors.push('El rol del miembro no es válido.');
    }

    return errors;
  };

  const validateTeamComposition = (team) => {
    const errors = [];
    const roleCounts = team.reduce((acc, member) => {
      acc[member.role] = (acc[member.role] || 0) + 1;
      return acc;
    }, {});

    // Validaciones de composición de equipo
    if (roleCounts['LIDER'] > 1) {
      errors.push('Solo puede haber un LIDER en el equipo.');
    }
    if (roleCounts['GERENTE SENIOR'] > 2) {
      errors.push('Solo puede haber hasta dos GERENTE SENIOR en el equipo.');
    }

    return errors;
  };

  useEffect(() => {
    const memberErrors = validateMember(member, team);
    const teamErrors = validateTeamComposition(team);

    const allErrors = [...memberErrors, ...teamErrors];
    onValidation(allErrors);
  }, [member, team, onValidation]);

  return null; // Este componente no renderiza nada
};

export default ValidationSystem;