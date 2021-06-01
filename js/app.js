// ` - simbolo util

var paginaActual = 1;
var paginaTotal = 0;


const cargarImagen = async() =>{
	let input = document.querySelector("#busqueda").value;
	let divPaginacion = document.querySelector('#paginacion');
	divPaginacion.style.display="none";

	if(input === ' '){
		mostrarError("#msj-error", "Falta Escribir Valor");
		return;
	}

	const imagenesArreglo = 20;
	var API_KEY = '21892669-eabff626d708c7c4a3edc76ea';
	var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+input + "&per_page=" + imagenesArreglo + "&page=" + paginaActual;
	//console.log(URL);

	//Creando el formato JSON
	const respuesta = await fetch(URL);
	const resultado = await respuesta.json();

	//Crea arreglo de imagenes
	let imagenes = resultado.hits;
	console.log(resultado);

	//Creando Cards para las Imagénes
	let imagenesHTML = '';
	imagenes.map(imagen => {
		const{largeImageURL, likes, previewURL, tags, views} = imagen;

		imagenesHTML += `<div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"> 
		<div class="card"> 
		<img src="${previewURL}" alt="${tags}" class="card-img-top"> 
		<div class="card-body"> 
		<p class="card-text">${likes} Me gusta</p> 
		<p class="card-text">${views} Vistas</p>
		</div> 
		<div class="card-footer">
		<a href ="${largeImageURL}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-block">ver Imagen</a>
		</div>
		</div>
		</div>`;
	});

		divListadoImagenes=document.querySelector('#listadoImagenes');

		//Botones Anterior y Siguiente
		let paginaAnterior = (paginaActual === 1)?``:`
		<button type="button" class="btn btn-info" onclick="paginaAnterior()">
		Anterior</button>`;

		let paginaSig = (paginaActual === paginaTotal)?``:`
		<button type="button" class="btn btn-info" onclick="paginaSig()">
		Siguiente</button>`;

		setTimeout(() => {
			divListadoImagenes.innerHTML = imagenesHTML;
			divPaginacion.style.display="block";
			divPaginacion.innerHTML = `${paginaAnterior} ${paginaSig}`
		},1000);

		//Obtener total de paginas para la paginacion
		paginaTotal = Math.ceil(resultado.totalHits / imagenesArreglo);

		//Funcion para que recargue pa pagina
		const jumbotron = document.querySelector(".jumbotron");
		jumbotron.scrollIntoView({behavior:"smooth"});

}


//Funciones de los botones Anterior y Siguiente
const paginaAnterior = () =>{
	paginaActual -- ;
	if(paginaActual === 0){
		return;
	}else{
		cargarImagen();
	}
}

const paginaSig = () =>{
	paginaActual ++ ;
	if(paginaActual > paginaTotal){
		return;
	}else{
		cargarImagen();
	}
}


//FUNCIÓN PARA MOSTRAR MENSAJE DE ERROR
const mostrrError = (elemento, mensaje) => {
	divError = document.querySelector(elemento);
	divError.innerHTML = `<p class="alert alert-primary">${mensaje}</p>`;
	setTimeout(() => { divError.innerHTML = '';}, 2000);
}