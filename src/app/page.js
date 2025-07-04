"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import WeatherCard from "../components/WeatherCard";

export default function Home() {
  const router = useRouter();
  const [cidade, setCidade] = useState("");
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState(null);
  const [favoritos, setFavoritos] = useState([]);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!user) {
      router.push("/login");
    } else {
      setUsuario(user);
      const fav = JSON.parse(
        localStorage.getItem(`favoritos_${user.email}`) || "[]"
      );
      setFavoritos(fav);
    }
  }, []);

  const buscarClima = async (cidadeParam) => {
    const cidadeBuscar = cidadeParam || cidade;
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=77b86dc7e9c8457f987213107251306&q=${cidadeBuscar}&lang=pt&days=7`
      );
      const data = await response.json();
      if (data.error) {
        setErro(data.error.message);
        setDados(null);
      } else {
        setDados(data);
        setErro(null);
      }
    } catch {
      setErro("Erro ao buscar dados");
    }
  };

  const toggleFavorito = () => {
    if (!cidade) return;
    let atualizados;
    if (favoritos.includes(cidade)) {
      atualizados = favoritos.filter((c) => c !== cidade);
    } else {
      atualizados = [...favoritos, cidade];
    }
    setFavoritos(atualizados);
    localStorage.setItem(
      `favoritos_${usuario.email}`,
      JSON.stringify(atualizados)
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    router.push("/login");
  };

  return (
    <main className="flex flex-col items-center p-6 min-h-screen bg-gradient-to-b from-white to-blue-50 text-gray-900">
      <div className="w-full max-w-3xl flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Olá, {usuario?.nome} 👋</h2>
        <button
          onClick={handleLogout}
          className="text-sm text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Sair
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-6">Previsão do Tempo</h1>

      <div className="flex flex-col sm:flex-row gap-2 mb-4 w-full max-w-3xl">
        <input
          type="text"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          placeholder="Digite a cidade"
          className="p-2 rounded border border-gray-300 text-gray-900 placeholder-gray-500 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={() => buscarClima()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Buscar
        </button>
        <button
          onClick={toggleFavorito}
          className={`px-4 py-2 rounded border ${
            favoritos.includes(cidade)
              ? "bg-yellow-300 text-black border-yellow-400"
              : "bg-gray-200 text-gray-700 border-gray-300"
          }`}
        >
          {favoritos.includes(cidade) ? "★ Favorito" : "☆ Favoritar"}
        </button>
      </div>

      {erro && <p className="text-red-600">{erro}</p>}
      {dados && <WeatherCard dados={dados} />}

      <div className="mt-8 w-full max-w-3xl">
        <h3 className="text-lg font-bold mb-2">Cidades Favoritas:</h3>
        <div className="flex flex-wrap gap-2">
          {favoritos.map((cidadeFav, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCidade(cidadeFav);
                buscarClima(cidadeFav);
              }}
              className="bg-white px-3 py-1 rounded shadow hover:bg-blue-100"
            >
              {cidadeFav}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
