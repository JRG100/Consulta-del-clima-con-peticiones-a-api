
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
})




function buscarClima(e) {
    e.preventDefault();
    const ciudad = document.querySelector('#ciudad').value
    const pais = document.querySelector('#pais').value

    console.log(ciudad);
    console.log(pais);

    if(ciudad === '' || pais === '') {
        // Hubo un error
        mostrarError('Ambos campos son obligatorios')

        return;
    }
    consultarAPI(ciudad, pais );
}

function mostrarError(mensaje) {
  const alerta = document.querySelector('.bg-red-100');
  if(!alerta) {
      const alerta = document.createElement('div');

      alerta.classList.add( 'alert-danger','text-center' );

      alerta.innerHTML = `
          <strong class="font-bold">¡Error!</strong>
          <span class="block sm:inline">${mensaje}</span>
      `;

      container.appendChild(alerta);
      setTimeout(() => {
          alerta.remove();
      }, 3000);
  }
}

function consultarAPI(ciudad, pais ) {
        // Consultar la API e imprimir el Resultado...

    // leer la url  y agregar el API key
    const appId = '4f4b6b76ca77c20fd17b983523737d8f';
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    Spinner();

    // query con fetch api
    fetch(url)
      .then(respuesta => {
        return respuesta.json();
      })
      .then(datos => {
        console.log(datos);
        limpiarHTML();
        if(datos.cod === "404") {
          mostrarError('Ciudad no encontrada')
        } else {
          mostrarClima(datos)
        }
      })
      .catch(error => {
        console.log(error)
      });
}

function mostrarClima(datos) {

  // Formatear el Clima...

  const { name, main: { temp, temp_max, temp_min } } = datos;


  const grados = KelvinACentigrados(temp);
  const max = KelvinACentigrados(temp_max);
  const min = KelvinACentigrados(temp_min);

  const nombreCiudad = document.createElement('p');
  nombreCiudad.innerHTML = `Clima en: ${name}`;
  nombreCiudad.classList.add('h1')

  const actual = document.createElement('p');
  actual.innerHTML = `${grados} &#8451;`;
  actual.classList.add('display-1')

  const tempMaxima = document.createElement('p');
  tempMaxima.innerHTML = `Max: ${max} &#8451;`;
  tempMaxima.classList.add('h1')


  const tempMinima = document.createElement('p');
  tempMinima.innerHTML = `Min: ${min} &#8451;`;
  tempMinima.classList.add('h1')


  const resultadoDiv = document.createElement('div');
  resultadoDiv.classList.add('text-center', 'text-white')
  resultadoDiv.appendChild(nombreCiudad);
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(tempMaxima);
  resultadoDiv.appendChild(tempMinima);

  resultado.appendChild(resultadoDiv)
}

function KelvinACentigrados(grados) {
  return parseInt( grados - 273.15);
}

function limpiarHTML() {
  while(resultado.firstChild) {
      resultado.removeChild(resultado.firstChild);
  }
}

function Spinner() {

  limpiarHTML();

  const divSpinner = document.createElement('div');
  divSpinner.classList.add('sk-fading-circle');

  divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
  `;
  resultado.appendChild(divSpinner);
}