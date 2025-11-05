import FinalAnswerPopup from "@/components/finish";
import OceanScene from "@/components/OceanScene";
import { useEffect } from "react";
import { logoutUser, submitScore } from "@/firebase/utils.js";

function Game() {
    function alreadyLoggedIn() {
        const userId = localStorage.getItem("uid");
        return !!userId;
    }

    async function handleSubmit() {
        const timeTaken = 100; // Example time taken
        const penalty = 10; // Example penalty
        const success = await submitScore(timeTaken, penalty);
        if (success) {
            setTimeout(() => {
                logoutUser();
            }, 2000);
        }
    }

    // commented out for dev purpose. uncomment in production
    // useEffect(() => {
    //     if (!alreadyLoggedIn()) {
    //         window.location.href = "/login";
    //     }
    // }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <OceanScene />
            <FinalAnswerPopup />
        </main>
    );
}

export default Game;
