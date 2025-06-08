import { useEffect, useState } from "react";
import { Footer } from "../layouts/Footer";
import { Header } from "../layouts/Header";
import { Input } from "../components/Forms";
import { sendEmailContact } from "../api/email.api";
import { showErrorToast, showSuccessToast } from "../components/ToastUtils";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/user.atom";

export const Contact = () => {
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [loading, setLoading] = useState(false);
    const [user] = useAtom(userAtom);

    useEffect(() => {
        if (user && user.email) {
            setEmail(user.email);
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !subject || !message) {
            showErrorToast("Por favor, completa todos los campos.");
            return;
        }
        setLoading(true);
        try {
            await sendEmailContact(email, subject, message);
            showSuccessToast("¡Mensaje enviado correctamente!");
            setEmail("");
            setSubject("");
            setMessage("");
        } catch (error) {
            console.error("Error sending contact email:", error);
            showErrorToast("Error al enviar el mensaje. Inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-4 text-amber-400">Contacto</h1>
                <p className="mb-6 text-neutral-50 text-center">
                    ¿Tienes alguna pregunta o sugerencia? ¡Escríbenos!
                </p>
                <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white rounded-lg shadow p-6 flex flex-col gap-4">
                    <Input
                        label="Tu email"
                        id="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="tu@email.com"
                    />
                    <Input
                        label="Asunto"
                        id="subject"
                        type="text"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        placeholder="Asunto de tu mensaje"
                    />
                    <Input
                        label="Mensaje"
                        id="message"
                        type="textarea"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        placeholder="Escribe tu mensaje aquí..."
                    />
                    <button
                        type="submit"
                        className="bg-amber-600 hover:bg-amber-500 text-white font-semibold py-2 px-4 rounded transition-colors disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? "Enviando..." : "Enviar"}
                    </button>
                </form>
            </main>
            <Footer />
        </div>
    );
};