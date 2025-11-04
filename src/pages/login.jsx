import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import bcrypt from "bcryptjs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function Login() {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(e) {
        setLoading(true);
        try {
            e.preventDefault();
            const q = query(
                collection(db, "users"),
                where("phone", "==", phone)
            );
            const snap = await getDocs(q);
            if (snap.empty) {
                toast.error("Invalid phone number or password!");
                return;
            }
            const user = snap.docs[0].data();
            const isPasswordValid = await bcrypt.compare(
                password,
                user.password
            );
            if (!isPasswordValid) {
                toast.error("Invalid phone number or password!");
                return;
            }

            localStorage.setItem("uid", snap.docs[0].id);
            toast.success("Login successful!");
            setTimeout(() => {
                window.location.href = "/game";
            }, 1500);
            setPhone("");
            setPassword("");
        } catch (error) {
            console.error("Error during login:", error);
            toast.error("An error occurred during login. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    function alreadyLoggedIn() {
        const userId = localStorage.getItem("uid");
        return !!userId;
    }

    useEffect(() => {
        if (alreadyLoggedIn()) {
            window.location.href = "/game";
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-white-50">
            <Card className="w-[400px] shadow-lg ">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-semibold">
                        Login Account
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="pl-3">
                                Phone Number
                            </Label>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder=""
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="pl-3">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Log In"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
