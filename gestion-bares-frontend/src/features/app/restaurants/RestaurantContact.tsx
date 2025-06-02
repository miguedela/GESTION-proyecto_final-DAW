import { useState } from "react";

export const RestaurantContact = () => {
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
    };

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-900">
            <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-4 text-amber-600">Contacto</h1>
                <p className="mb-6 text-neutral-700 dark:text-neutral-200 text-center">
                    ¿Tienes alguna pregunta o sugerencia? ¡Escríbenos!
                </p>
                <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white dark:bg-neutral-800 rounded-lg shadow p-6 flex flex-col gap-4">
                    <label className="font-semibold text-neutral-700 dark:text-neutral-200">
                        Tu email
                        <input
                            type="email"
                            className="mt-1 w-full rounded border border-neutral-300 dark:border-neutral-700 px-3 py-2 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label className="font-semibold text-neutral-700 dark:text-neutral-200">
                        Mensaje
                        <textarea
                            className="mt-1 w-full rounded border border-neutral-300 dark:border-neutral-700 px-3 py-2 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 min-h-[100px]"
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            required
                        />
                    </label>
                    <button
                        type="submit"
                        className="bg-amber-600 hover:bg-amber-500 text-white font-semibold py-2 px-4 rounded transition-colors"
                    >
                        Enviar
                    </button>
                    {sent && (
                        <p className="text-green-600 dark:text-green-400 mt-2">¡Mensaje enviado correctamente!</p>
                    )}
                </form>
            </main>
        </div>
    );
};