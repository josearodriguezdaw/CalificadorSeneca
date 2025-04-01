/** 
 * Función que optiene los valores del campo X_INSEVAFP_0_1, que contiene los tipos de intrumentos.
 */
(function () {
    let elemento = document.getElementById("X_INSEVAFP_0_1");
    if (elemento) {
        let opciones = Array.from(elemento.options).map(option => ({
            value: option.value,
            text: option.textContent
        }));
        chrome.runtime.sendMessage({ action: "updateInstrumentos", data: opciones });
    }
})();

/** 
 * Función que optiene los valores del campo X_SUBCALFP_0_1, que contiene los subtipos de calificaciones.
 */
(function () {
    let elemento = document.getElementById("X_SUBCALFP_0_1");
    if (elemento) {
        let opciones = Array.from(elemento.options).map(option => ({
            value: option.value,
            text: option.textContent
        }));

        chrome.runtime.sendMessage({ action: "updateSubtipos", data: opciones });
    }
})();

/**
 * Este código escucha el mensaje enviado por popup.js y actualiza los campos en la página web.
 */
window.addEventListener("message", (event) => {
    if (event.source !== window || !event.data || event.data.action !== "setNotas") return;

    let { notas, numeroNota,instrumento,subtipo } = event.data.datos;
    notas.forEach((nota, index) => {
        let Y = numeroNota - 1; // El valor de Y es "Nº nota - 1"
        let X = index + 1; // El valor de X es el índice de la línea
        let campo_nota = document.getElementById(`N_NOTA_${Y}_${X}`); // Crear el identificador N_NOTA_Y_X
        let campo_instrumento =  document.getElementById(`X_INSEVAFP_${Y}_${X}`)
        let campo_subtipo = document.getElementById(`X_SUBCALFP_${Y}_${X}`)
       
        let valorNota = parseFloat(nota.replace(",", ".")); // Convertir a número (permitiendo coma decimal)


        if (campo_nota) {
            campo_nota.value = valorNota; // Asignar la línea del textarea a la fila correspondiente
        }
        if (campo_instrumento) {
            campo_instrumento.value = instrumento;
        }
        if (campo_subtipo) {
            campo_subtipo.value = subtipo;
        }
    });
    inyectarScript();
});


function inyectarScript() {
    let script = document.createElement("script");
    script.src = chrome.runtime.getURL("inject.js"); // Carga el script desde la extensión
    script.onload = function () {
        this.remove(); // Elimina el script después de ejecutarlo
    };
    document.documentElement.appendChild(script);
}
