import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        userId: "",
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        avatarURL: "",
        role: [""],
        loggedIn: true,
        accessToken: "",
        isActive: undefined,
        progress: [
            {
                quizId: "",
                attemptsCount: 1,
                bestScore: 50,
                lastScore: 30,
                questions: [
                    {
                        correctQuestions: [""],
                        wrongQuestions: [""]
                    },
                ],
            },
        ]
    });

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
