document.addEventListener("DOMContentLoaded", () => {
    const piezaForm = document.getElementById("pieza-form");
    const inventoryBody = document.getElementById("inventory-body");

    // Función para agregar una pieza al inventario
    function addPieza(name, quantity, unit, price) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${name}</td>
            <td>
                <span class="quantity-text">${quantity}</span>
                <input type="number" class="quantity-input" value="${quantity}" min="1" style="display: none;">
            </td>
            <td>${unit}</td>
            <td>$${price.toFixed(2)}</td>
            <td>
                <button onclick="editPieza(this)">Editar</button>
                <button onclick="savePieza(this)" style="display: none;">Guardar</button>
                <button onclick="removePieza(this)">Eliminar</button>
            </td>
        `;

        inventoryBody.appendChild(row);
    }

    // Función para eliminar una pieza del inventario
    window.removePieza = (button) => {
        const row = button.parentElement.parentElement;
        inventoryBody.removeChild(row);
    };

    // Función para editar la cantidad de una pieza
    window.editPieza = (button) => {
        const row = button.parentElement.parentElement;
        const quantityText = row.querySelector(".quantity-text");
        const quantityInput = row.querySelector(".quantity-input");
        const saveButton = button.nextElementSibling;

        quantityText.style.display = "none";
        quantityInput.style.display = "inline";
        button.style.display = "none";
        saveButton.style.display = "inline";
    };

    // Función para guardar la cantidad editada
    window.savePieza = (button) => {
        const row = button.parentElement.parentElement;
        const quantityText = row.querySelector(".quantity-text");
        const quantityInput = row.querySelector(".quantity-input");
        const editButton = button.previousElementSibling;

        const newQuantity = quantityInput.value;
        quantityText.textContent = newQuantity;

        quantityText.style.display = "inline";
        quantityInput.style.display = "none";
        button.style.display = "none";
        editButton.style.display = "inline";
    };

    // Manejo del evento de submit del formulario
    piezaForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("nombre").value.trim();
        const quantity = parseInt(document.getElementById("cantidad").value);
        const unit = document.getElementById("unidad").value;
        const price = parseFloat(document.getElementById("precio").value);

        if (name && quantity > 0 && price >= 0) {
            addPieza(name, quantity, unit, price);
            piezaForm.reset();
        }
    });
});
