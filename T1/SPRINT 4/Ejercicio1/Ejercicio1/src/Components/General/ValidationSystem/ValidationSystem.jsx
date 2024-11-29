const validateMember = (member) => {
    if (!member.name) {
      return 'Member name is required';
    }
    if (!member.role) {
      return 'Member role is required';
    }
    return null;
  };
  
  const validateTeamComposition = (team) => {
    const roles = team.members.map(member => member.role);
    if (!roles.includes('Leader')) {
      return 'Team must have at least one Leader';
    }
    if (roles.filter(role => role === 'Developer').length < 2) {
      return 'Team must have at least two Developers';
    }
    return null;
  };
  
  export { validateMember, validateTeamComposition };