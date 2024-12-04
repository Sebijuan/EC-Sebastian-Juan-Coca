const BASE_URL = 'http://localhost:3000/partyfinder';

export const createParty = async (partySize, partyData) => {
  const response = await fetch(`${BASE_URL}/${partySize}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(partyData)
  });
  return response.json();
};

export const getPartyDetails = async (partySize, partyId) => {
  const response = await fetch(`${BASE_URL}/${partySize}/${partyId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  });
  return response.json();
};

export const addMemberToParty = async (partySize, partyId, memberData) => {
  const response = await fetch(`${BASE_URL}/${partySize}/${partyId}/addMember`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(memberData)
  });
  return response.json();
};

export const removeMemberFromParty = async (partySize, partyId, memberId) => {
  const response = await fetch(`${BASE_URL}/${partySize}/${partyId}/removeMember`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ user_id: memberId })
  });
  return response.json();
};

export const updateMemberRole = async (partySize, partyId, memberData) => {
  const response = await fetch(`${BASE_URL}/update-role/${partySize}/${partyId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(memberData)
  });
  return response.json();
};

export const deleteParty = async (partySize, partyId, userId) => {
  const response = await fetch(`${BASE_URL}/${partySize}/${partyId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ user_id: userId })
  });
  return response.json();
};