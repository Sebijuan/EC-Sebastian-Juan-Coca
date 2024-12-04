const validateMember = (member) => {
    if (!member.name) {
      return 'Error: Member name is required.';
    }
    if (!member.role) {
      return 'Error: Member role is required.';
    }
    return null;
  };
  
  const validateTeamComposition = (team) => {
    const roles = team.members.map(member => member.role);
    if (!roles.includes('Leader')) {
      return 'Error: Team must have at least one Leader.';
    }
    if (roles.filter(role => role === 'Developer').length < 2) {
      return 'Error: Team must have at least two Developers.';
    }
    return null;
  };
  
  export { validateMember, validateTeamComposition };