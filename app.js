
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
const statTotal = document.getElementById("stat-total")
const statPending = document.getElementById("stat-pending")
const statClaimed = document.getElementById("stat-claimed")
const traerType = document.getElementById("form-type")
const traerStatus = document.getElementById("form-status")

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

    
    if (!description || !date) { // vamos a validar para que al menos se ingrese una descripción y una fecha, ya que son campos importantes para reportar un objeto perdido. Puedes ajustar esta validación según tus necesidades, por ejemplo, si quieres que también se requiera la habitación o la ubicación, puedes agregar esas condiciones aquí.
        alert("Por favor, rellena al menos la descripción y la fecha.")
        return 
    }

const newItem = {
    id: Date.now(),
    estado: traerStatus.value,
    tipo: traerType.value,
    date: date,
    room: room,
    description: description,
    location: location
}
    lostItems.push(newItem) // Agrega el nuevo objeto al array de objetos perdidos
localStorage.setItem("lostItems", JSON.stringify(lostItems)) // Guarda el array actualizado en localStorage

// Limpiamos los campos del formulario después de enviar
inputDescription.value = ""
traerDate.value = ""
traerRoom.value = ""
traerLocation.value = ""
traerType.value = "loose"
traerStatus.value = "Pendiente"
recorrerLostItems() // Llama a la función para actualizar la lista de objetos perdidos mostrada en la página
}






const miFormulario = document.getElementById("form") 
miFormulario.addEventListener("submit", function(event) {
    event.preventDefault() // para que no se se recarge la página al enviar el formulario
    objetoReportado() // Llama a la función para obtener los valores del formulario y crear el nuevo objeto perdido
})




function recorrerLostItems() {
    lostItemsContainer.innerHTML = ""
    lostItems.length > 0 ? emptyMessage.style.display = "none" : emptyMessage.style.display = "flex"
    

    statTotal.textContent = lostItems.length
    const pendingCount = lostItems.filter(item => item.estado === "Pendiente").length
    statPending.textContent = pendingCount
    const claimedCount = lostItems.filter(item => item.estado === "Reclamado").length
    statClaimed.textContent = claimedCount

    lostItems.forEach(item => {
        const lostItemElement = document.createElement("div")
        lostItemElement.innerHTML = `
    <div class="item-header">
        <span class="item-room">🏨 Hab. ${item.room}</span>
        <span class="item-estado ${item.estado}">${item.estado}</span>
    </div>
    <div class="item-body">
        <p class="item-description">${item.description}</p>
        <div class="item-meta">
            <span>📅 ${item.date}</span>
            <span>📦 ${item.location}</span>
            <span>🏷️ ${item.tipo || "Sin tipo"}</span>
        </div>
    </div>
`
              
       
       
       
        const cancelBtn = document.createElement("button")
        cancelBtn.textContent = "Cancelar Reporte"
        cancelBtn.addEventListener("click", () => {
            cancelarItem(item.id)
        })
        const modificarBtn = document.createElement("button")
modificarBtn.textContent = "Modificar Estado"




modificarBtn.addEventListener("click", () => {
    const selectExistente = lostItemElement.querySelector("select")
if (selectExistente) { // verificamos si ya existe un select dentro
    selectExistente.remove() // si existe, lo eliminamos para evitar duplicados
}
    const selectedStatus = document.createElement("select")
    const options = ["Pendiente", "Reclamado", "Cancelado", "Entregado"]
    options.forEach(status => {
        const option = document.createElement("option")
        option.value = status
      option.textContent = status.charAt(0).toUpperCase() + status.slice(1) // Capitaliza la primera letra
        selectedStatus.appendChild(option)
    })
    selectedStatus.value = item.estado // Establece el valor seleccionado al estado actual del item
    lostItemElement.appendChild(selectedStatus)
    selectedStatus.addEventListener("change", () => {
        item.estado = selectedStatus.value // Actualiza el estado del item con el valor seleccionado
        localStorage.setItem("lostItems", JSON.stringify(lostItems)) // Guarda el array actualizado en localStorage
        recorrerLostItems() // Actualiza la lista de objetos perdidos mostrada en la página
    })
})

lostItemElement.appendChild(modificarBtn)
        lostItemElement.appendChild(cancelBtn)
        lostItemsContainer.appendChild(lostItemElement)
    })
}

function cancelarItem(id) {
    const confirmar = confirm("¿Seguro que quieres eliminar este reporte? Esta acción no se puede deshacer.")
    if (!confirmar) return
    
    const index = lostItems.findIndex(item => item.id === id)
    lostItems.splice(index, 1)
    localStorage.setItem("lostItems", JSON.stringify(lostItems))
    recorrerLostItems()
}



