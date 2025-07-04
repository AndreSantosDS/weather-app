'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState(null)

  const handleLogin = () => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]")
    const usuario = usuarios.find(u => u.email === email && u.senha === senha)

    if (!usuario) {
      setErro("Email ou senha inválidos")
      return
    }

    localStorage.setItem("usuarioLogado", JSON.stringify(usuario))
    router.push("/")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-white to-blue-50 text-gray-900">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <input
        type="email"
        placeholder="Email"
        className="p-2 mb-2 border border-gray-300 rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        className="p-2 mb-2 border border-gray-300 rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
        value={senha}
        onChange={e => setSenha(e.target.value)}
      />
      {erro && <p className="text-red-500 mb-2">{erro}</p>}
      <button
        onClick={handleLogin}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow mb-4"
      >
        Entrar
      </button>

      <p className="text-sm text-gray-700">
        Não tem uma conta?{' '}
        <Link href="/register" className="text-blue-600 hover:underline">
          Cadastre-se aqui
        </Link>
      </p>
    </div>
  )
}
