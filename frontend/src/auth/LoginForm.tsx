import { useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import {loginRequest} from "@/config/AuthConfig";

const LoginForm = () => {
    const { instance, inProgress } = useMsal();

    const handleLogin = async () => {
        if (inProgress === InteractionStatus.None) {
            try {
                await instance.loginRedirect(loginRequest);
            } catch (error) {
                // @ts-ignore
                if (error.errorCode !== 'interaction_in_progress') {
                    console.error("Login failed:", error);
                }
            }
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <button
                className="btn btn-outline-primary btn-lg"
                onClick={handleLogin}
                disabled={inProgress !== InteractionStatus.None}
            >
                {inProgress === InteractionStatus.None ? "Sign in with SSO" : "Logging in..."}
            </button>
        </div>
    );
};

export default LoginForm;