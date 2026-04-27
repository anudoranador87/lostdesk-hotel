
//1. Crear un array para almacenar los objetos perdidos reportados por los usuarios.
const lostItems = [] // Aquí se almacenarán los objetos perdidos reportados por los usuarios, esto va primero de todo. 
//2 recuperar los objetos perdidos almacenados en LocalStorage.
const storedItems = JSON.parse(localStorage.getItem("lostItems"))
if (storedItems) {
    lostItems.push(...storedItems)
}
// hemos recuperado los objetos perdidos almacenados en localStorage y los hemos agregado al array lostItems para que estén disponibles en la aplicación.

// 3. Traemos los selectores del DOM.

const traerDate = document.getElementById("form-date")
const traerRoom = document.getElementById("form-room")
const traerLocation = document.getElementById("form-location")
const inputDescription = document.getElementById("form-description")
const lostItemsContainer = document.getElementById("objects-list") // Aquí es el contenedor donde se mostrarán los objetos perdidos en la página.   
const addButton = document.getElementById("add-btn") // Aquí es el botón de submit del formulario, aunque también se puede usar el evento submit del formulario en lugar de un botón específico.
const cancelButton = document.getElementById("cancel-btn") // Aquí es el botón de cancelar del formulario, si es que tienes uno, para limpiar los campos del formulario o cerrar el formulario sin enviar datos. 
const closemodalButton = document.getElementById("close-modal") // Aquí es el botón para cerrar el modal del formulario, si es que estás usando un modal para el formulario de reporte de objetos perdidos.
const miModal = document.getElementById("modal") // Aquí es el modal del formulario, si es que estás usando un modal para el formulario de reporte de objetos perdidos.
const emptyMessage = document.getElementById("empty-state") // Aquí es el elemento donde se mostrará un mensaje si no hay objetos perdidos reportados, por ejemplo, "No se encontraron objetos perdidos." o algo similar.


// evento de los botones primero el de cancelar para limpiar los campos del formulario y cerrar el modal si es que estás usando uno.

addButton.addEventListener("click", () => {
    miModal.style.display = "flex"
}   )

cancelButton.addEventListener("click", () => {
    inputDescription.value = "" // Limpia el campo de descripción
    traerDate.value = "" // Limpia el campo de fecha
    traerRoom.value = "" // Limpia el campo de habitación
    traerLocation.value = "" // Limpia el campo de ubicación
    // Aquí también puedes agregar código para cerrar el modal si es que estás usando uno, por ejemplo:
    miModal.style.display = "none"
})

closemodalButton.addEventListener("click", () => {
    
    miModal.style.display = "none"
})  



// 4. Funcion con todo dentro para crear el nuevo objeto perdido a partir de los valores ingresados en el formulario.

function objetoReportado() {
    const description = inputDescription.value
    const date = traerDate.value
    const room = traerRoom.value
    const location = traerLocation.value


    const newItem = {   // Crea un nuevo objeto perdido con los valores ingresados en el formulario
    id: lostItems.length + 1, // Genera un ID único basado en la longitud del array
    estado: "pending",
    date: date,
    room: room,
    description: description,
    location: location
    }
    lostItems.push(newItem) // Agrega el nuevo objeto al array de objetos perdidos
localStorage.setItem("lostItems", JSON.stringify(lostItems)) // Guarda el array actualizado en localStorage

// Limpia los campos del formulario después de enviar
inputDescription.value = ""
traerDate.value = ""
traerRoom.value = ""
traerLocation.value = ""
recorrerLostItems() // Llama a la función para actualizar la lista de objetos perdidos mostrada en la página
}






const miFormulario = document.getElementById("form") // aqui es el boton de submit del formulario.
miFormulario.addEventListener("submit", function(event) {
    event.preventDefault() // para que no se se recarge la página al enviar el formulario
    objetoReportado() // Llama a la función para obtener los valores del formulario y crear el nuevo objeto perdido
})

// traer la lista de  objetos perdidos e insertarlos en el DOM para mostrarlos en la página.


function recorrerLostItems() {
     lostItemsContainer.innerHTML = "" // Limpiar el contenedor antes de mostrar los objetos perdidos actualizados
     lostItems.length > 0 ? emptyMessage.style.display = "none" : emptyMessage.style.display = "flex" // Mostrar u ocultar el mensaje de estado vacío según si hay objetos perdidos o no.
    lostItems.forEach(item => {
   

    const lostItemElement = document.createElement("p") // Aquí puedes crear elementos HTML para mostrar los objetos perdidos en la página, por ejemplo, un div para cada objeto perdido.
    lostItemElement.textContent = `ID: ${item.id}, Estado: ${item.estado}, Fecha: ${item.date}, Hab: ${item.room}, Descripción: ${item.description}, Ubicación: ${item.location}`
    lostItemsContainer.appendChild(lostItemElement)
    })
}


recorrerLostItems() // Llama a la función para mostrar los objetos perdidos almacenados en localStorage cuando se carga la página por primera vez.