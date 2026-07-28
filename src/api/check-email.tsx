const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const checkEmail = async (email: string) => {
    try {
        const response = await fetch(`${API_URL}/auth/check-email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        const result = await response.json();

        return {
            success: response.ok,
            exists: result.exists,
            message:
                result.message ??
                (response.ok ? "Email checked" : "Email check failed"),
            data: result,
        };
    } catch (error) {
        console.error("Check email error:", error);

        return {
            success: false,
            exists: false,
            message: "Unable to connect to server",
            data: null,
        };
    }
};