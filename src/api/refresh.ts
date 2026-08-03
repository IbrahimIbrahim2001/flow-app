const API_URL = process.env.EXPO_PUBLIC_API_URL;

type RefreshResponse = {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

export const refreshTokens = async (
  refreshToken: string,
): Promise<{
  success: boolean;
  message: string;
  data: RefreshResponse['data'] | null;
}> => {
  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    const result = (await response.json()) as RefreshResponse;
    return {
      success: result.success,
      message: result.message,
      data: result.success ? result.data : null,
    };
  } catch (error) {
    console.error('Refresh error:', error);
    return {
      success: false,
      message: 'Unable to connect to server',
      data: null,
    };
  }
};
