export default function WeatherCard({ dados }) {
  const { location, current, forecast } = dados

  return (
    <div className="bg-white p-6 rounded shadow-md text-center max-w-md w-full">
      <h2 className="text-xl font-bold text-gray-900">{location.name}, {location.region}</h2>
      <p className="text-gray-500">{location.localtime}</p>
      <img src={current.condition.icon} alt={current.condition.text} className="mx-auto my-4" />
      <p className="text-2xl font-semibold text-gray-900">{current.temp_c}°C</p>
      <p className="text-gray-700">{current.condition.text}</p>
      <p className="text-sm text-gray-600">Vento: {current.wind_kph} km/h</p>
      <p className="text-sm text-gray-600">Umidade: {current.humidity}%</p>

      <div className="mt-6">
        <h3 className="text-lg font-bold mb-2 text-gray-900">Próximos 3 dias</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {forecast.forecastday.map((dia, i) => (
            <div key={i} className="bg-gray-100 p-2 rounded">
              <p className="font-semibold text-gray-900">{new Date(dia.date).toLocaleDateString()}</p>
              <img src={dia.day.condition.icon} alt={dia.day.condition.text} className="mx-auto" />
              <p className="text-gray-900">{dia.day.avgtemp_c}°C</p>
              <p className="text-gray-700">{dia.day.condition.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
