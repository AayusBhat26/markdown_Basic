const API_URL = process.env.REACT_APP_API_URL || 'https://markdown-basic-backend.vercel.app/api/auth';

const login = async (userData) => {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || 'Error logging in');
  return data;
};

const register = async (userData) => {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || 'Error registering');
  return data;
};

const authService = { login, register };

export default authService;
