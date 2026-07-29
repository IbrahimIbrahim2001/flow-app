const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const register = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const result = await response.json();
    return {
      success: result.success,
      message:
        result.message ??
        (response.ok ? 'Registration successful' : 'Registration failed'),
      data: result,
    };
  } catch (error) {
    console.error('Registration error:', error);

    return {
      success: false,
      message: 'Unable to connect to server',
      data: null,
    };
  }
};
