// app.js

document.addEventListener("DOMContentLoaded", () => {

    // CARGAR DATOS DEL STORAGE
    cargarRutasStorage();

    // MOSTRAR RUTAS
    renderizarRutas(rutas);

});