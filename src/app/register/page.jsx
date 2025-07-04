'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Register() {
  const router = useRouter()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState(null)

  const handleRegister = () => {
    if (!nome || !email || !senha) {
      setErro("Preencha todos os campos")
      return
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]")
    if (usuarios.find(u => u.email === email)) {
      setErro("Usuário já existe")
      return
    }

    usuarios.push({ nome, email, senha })
    localStorage.setItem("usuarios", JSON.stringify(usuarios))
    router.push("/login")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-white to-blue-50 text-gray-900">
      <h1 className="text-3xl font-bold mb-4">Cadastro</h1>
      <input
        type="text"
        placeholder="Nome"
        className="p-2 mb-2 border border-gray-300 rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
        value={nome}
        onChange={e => setNome(e.target.value)}
      />
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
        onClick={handleRegister}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
      >
        Cadastrar
      </button>

      <p className="mt-4 text-sm text-gray-700">
        Já tem uma conta?{' '}
        <Link href="/login" className="text-blue-600 hover:underline">
          Faça login
        </Link>
      </p>
    </div>
  )
}
