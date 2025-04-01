/**
 * Carga los valores de los instrumentos de Séneca.
 */
document.addEventListener("DOMContentLoaded", function () {
    chrome.storage.local.get("instrumentos", function (data) {
        let select = document.getElementById("instrumento");
        if (data.instrumentos) {
            select.innerHTML = ""; // Limpiar opciones previas
            data.instrumentos.forEach(opcion => {
                let option = document.createElement("option");
                option.value = opcion.value;
                option.textContent = opcion.text;
                select.appendChild(option);
            });
        }
    });
/**
 * Carga los valores de los subtipos de categorías.
 */
     chrome.storage.local.get("subtipos", function (data) {
        let selectSubtipo = document.getElementById("subtipo");
        if (data.subtipos) {
            selectSubtipo.innerHTML = ""; // Limpiar opciones previas
            data.subtipos.forEach(opcion => {
                let option = document.createElement("option");
                option.value = opcion.value;
                option.textContent = opcion.text;
                selectSubtipo.appendChild(option);
            });
        }
    });
});



/**
 * Le añadimos funcionalidad al botón addNotes. Se obtienen los valores del textarea y se modifica el DOM de la página.
 */
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("addNotes").addEventListener("click", function () {
        let notas = document.getElementById("notas").value.split("\n"); // Obtener líneas del textarea
        let numeroNota = parseInt(document.getElementById("nota").value, 10); // Obtener el valor de "Nº nota"
        let instrumento = document.getElementById("instrumento").value.split("\n"); // Obtener el valor de "Instrumento"
        let subtipo = document.getElementById("subtipo").value.split("\n"); // Obtener el valor de "Subtipo"

        // Enviar las notas y el número de nota al script de contenido
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                
                func: (notas, numeroNota,instrumento,subtipo) => {
                    window.postMessage({ action: "setNotas", datos: { notas, numeroNota,instrumento,subtipo } }, "*");
                },
                args: [notas, numeroNota,instrumento,subtipo]
            });
        });
    });
});

