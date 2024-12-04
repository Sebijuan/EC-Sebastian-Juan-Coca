const BASE_URL = 'http://localhost:3000/guildmembers';

export const getAllMembers = async () => {
  const response = await fetch(BASE_URL);
  return response.json();
};

export const getMemberById = async (userId) => {
  const response = await fetch(`${BASE_URL}/${userId}`);
  return response.json();
};

export const createMember = async (memberData) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(memberData)
  });
  return response.json();
};

export const updateMember = async (userId, memberData) => {
  const response = await fetch(`${BASE_URL}/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(memberData)
  });
  return response.json();
};

export const deleteMember = async (userId) => {
  const response = await fetch(`${BASE_URL}/${userId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json'
    }
  });
  return response.json();
};

export const updateDKP1 = async (userId, value) => {
  const response = await fetch(`${BASE_URL}/${userId}/updateDKP1`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ value })
  });
  return response.json();
};

export const updateDKP2 = async (userId, value) => {
  const response = await fetch(`${BASE_URL}/${userId}/updateDKP2`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ value })
  });
  return response.json();
};

export const getNotifications = async (userId) => {
  const response = await fetch(`${BASE_URL}/${userId}/notifications`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  });
  return response.json();
};

export const updateNotifications = async (userId, notifications) => {
  const response = await fetch(`${BASE_URL}/${userId}/notifications`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(notifications)
  });
  return response.json();
};