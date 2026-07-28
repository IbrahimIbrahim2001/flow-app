const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    return {
      success: result.success,
      message:
        result.message ?? (response.ok ? 'Login successful' : 'Login failed'),
      data: result,
    };
  } catch (error) {
    console.error('Login error:', error);

    return {
      success: false,
      message: 'Unable to connect to server',
      data: null,
    };
  }
};
