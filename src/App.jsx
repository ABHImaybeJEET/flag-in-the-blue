import FinalAnswerPopup from "./components/finish";

import OceanScene from "./components/OceanScene";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <main className="flex min-h-screen flex-col items-center justify-center">
                <OceanScene />
                <FinalAnswerPopup />
            </main>
        </ThemeProvider>
    );
}

export default App;
