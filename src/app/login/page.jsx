"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ContainerInner, ContainerOuter } from '@/components/Container';


function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    const correctPassword = "contrasenabebelinda123"; // Defina aqui a senha correta

    if (password === correctPassword) {
      sessionStorage.setItem("isLoggedIn", "true");
      router.push("/admin"); // Redireciona para a página de admin após o login
    } else {
      setError("Senha incorreta, tente novamente.");
    }
  };

  return (
    <div>
            <ContainerOuter>
        <div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
          <ContainerInner>
          <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-50 text-sm font-bold mb-2" htmlFor="password">
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm"
              placeholder="Digite sua senha"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
          </ContainerInner>
    </div>

          </ContainerOuter>
    </div>

  );
}

export default LoginPage;
