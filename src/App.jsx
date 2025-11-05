import { ThemeProvider } from "@/components/theme-provider";
import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

const RegisterUser = lazy(() => import("./pages/register.jsx"));
const Game = lazy(() => import("./pages/game.jsx"));
const Login = lazy(() => import("./pages/login.jsx"));
const Leaderboard = lazy(() => import("./pages/leaderboard.jsx"));

function App() {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="/login" replace />}
                    />
                    <Route path="/register" element={<RegisterUser />} />
                    <Route path="/game" element={<Game />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />

                </Routes>
            </Suspense>
        </ThemeProvider>
    );
}

export default App;
