function consultarClima(){
  const ciudad = document.getElementById("ciudad").value;
  const API_KEY = "c7587ed047943ff7cc32365afa3a7ec8";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}`;
  
  fetch(url).then(response =>{ return response.json()})
    .then(data => {
      if (data.cod === "404") {
        mostrarMensajeError("Ingresa una ciudad valida");
      } else {
      

      const tablaClima = document.getElementById('tabla-clima').getElementsByTagName('tbody')[0];
        
        const fila = tablaClima.insertRow();

        const nombreCiudad = fila.insertCell();
        nombreCiudad.textContent = data.name;

        const temperatura = fila.insertCell();
        temperatura.textContent = (data.main.temp - 273.15).toFixed(1) + "°C";

        const descripcion = fila.insertCell();
        descripcion.textContent = data.weather[0].description;

        const icono = fila.insertCell();
        const icon = document.createElement("img");
        icon.src = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${data.weather[0]["icon"]}.svg`;
        icono.appendChild(icon);

        const humedad = fila.insertCell();
        humedad.textContent = data.main.humidity+"%";

        const viento = fila.insertCell();
        viento.textContent = data.wind.speed+"m/s";

        
      }
      });
    }
    function mostrarMensajeError(mensaje) {
      const tablaClima = document.getElementById('tabla-clima').getElementsByTagName('tbody')[0];
      tablaClima.innerHTML = "";
      const fila = tablaClima.insertRow();
      const errorCell = fila.insertCell();
      errorCell.colSpan = 5;
      errorCell.textContent = mensaje;
    }

   
// Código para buscar el clima de varias ciudades a la vez
function consultarClimas(){
  const ciudades = document.getElementById("ciudades").value.split(",");
  const API_KEY = "c7587ed047943ff7cc32365afa3a7ec8";

  Promise.all(ciudades.map(ciudad => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}`;
    return fetch(url).then(response => response.json());
  }))
    .then(results => {

      
      const tablaClima = document.getElementById("tabla-clima");
    

      results.forEach(data => {
        if (data.cod === "404") {
          mostrarMensajeError("Verifica que esté bien escrito ejemplo: tokyo, canada, seoul");
        } else {

        const fila = tablaClima.insertRow();

        const nombreCiudad = fila.insertCell();
        nombreCiudad.textContent = data.name;

        const temperatura = fila.insertCell();
        temperatura.textContent = (data.main.temp - 273.15).toFixed(1) + "°C";

        const descripcion = fila.insertCell();
        descripcion.textContent = data.weather[0].description;

        const icono = fila.insertCell();
        const icon = document.createElement("img");
        icon.src = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${data.weather[0]["icon"]}.svg`;
        icono.appendChild(icon);

        
        const humedad = fila.insertCell();
        humedad.textContent = data.main.humidity+"%";

        const viento = fila.insertCell();
        viento.textContent = data.wind.speed+"m/s";
        }
      });
    });
}

function mostrarMensajeError(mensaje) {
  const tablaClima = document.getElementById("tabla-clima");
  tablaClima.innerHTML = "";
  const fila = tablaClima.insertRow();
  const errorCell = fila.insertCell();
  errorCell.colSpan = 5;
  errorCell.textContent = mensaje;
}

function limpiarTabla() {
  const tablaClima = document.getElementById("tabla-clima");
  tablaClima.innerHTML = "";
  document.getElementById("ciudad, ciudades").value = "";
}
