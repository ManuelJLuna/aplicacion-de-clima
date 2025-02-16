const urlBase = `https://api.openweathermap.org/data/2.5/weather`
const API_KEY = 'YOUR_API_KEY'
const diffKelvin = 273.15

document.getElementById("buscar").addEventListener("click", () => {
    const city = document.getElementById("ciudad").value
    if (city) {
        document.getElementById("error").style.display = "none"
        document.getElementById("ciudad").style.border = "1px solid #93dceb"
        document.getElementById("ciudad").style.backgroundColor = "#bae4f2"
        fetchWheater(city)
    } else {
        document.getElementById("ciudad").style.border = "3px solid red"
        document.getElementById("ciudad").style.backgroundColor = "#f2baba"
        document.getElementById("error").style.display = "block"
    }
})

function fetchWheater(city) {
    fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`)
        .then(data => data.json())
        .then(data => showWheaterData(data))
}

function showWheaterData(data) {
    const divRes = document.getElementById("res")
    divRes.innerHTML = ""

    const ciudad = data.name
    const pais = data.sys.country
    const temperatura = data.main.temp
    const sensacion = data.main.feels_like
    const min = data.main.temp_min
    const max = data.main.temp_max
    const humedad = data.main.humidity
    const cielo = data.weather[0].description.slice(0, 1).toUpperCase() + data.weather[0].description.slice(1)
    const icono = data.weather[0].icon

    const ubicacion = document.createElement("h2")
    ubicacion.id = "ubicacion"
    ubicacion.textContent = `${ciudad}, ${pais}`

    const iconoInfo = document.createElement("img")
    iconoInfo.id = "icono"
    iconoInfo.src = `https://openweathermap.org/img/wn/${icono}@2x.png`

    const cieloInfo = document.createElement("h3")
    cieloInfo.id = "cielo"
    cieloInfo.textContent = cielo

    const tempInfo = document.createElement("p")
    tempInfo.id = "temperatura"
    tempInfo.textContent = `La temperatura es de ${Math.floor(temperatura - diffKelvin)}ºC`

    const sensacionInfo = document.createElement("p")
    sensacionInfo.id = "sensacion"
    sensacionInfo.textContent = `La sensacion térmica es de ${Math.floor(sensacion - diffKelvin)}ºC`

    const minInfo = document.createElement("p")
    minInfo.id = "min"
    minInfo.textContent = `Min: ${Math.floor(min - diffKelvin)}ºC`

    const maxInfo = document.createElement("p")
    maxInfo.id = "max"
    maxInfo.textContent = `Max: ${Math.floor(max - diffKelvin)}ºC`

    const humedadInfo = document.createElement("p")
    humedadInfo.id = "humedad"
    humedadInfo.textContent = `La humedad es del ${humedad}%`

    divRes.appendChild(ubicacion)
    divRes.appendChild(iconoInfo)
    divRes.appendChild(cieloInfo)
    divRes.appendChild(tempInfo)
    divRes.appendChild(sensacionInfo)
    divRes.appendChild(minInfo)
    divRes.appendChild(maxInfo)
    divRes.appendChild(humedadInfo)

}