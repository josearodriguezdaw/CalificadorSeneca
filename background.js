/**
 * Obtención de los instrumentos y subtipo de calificaciones.
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "updateInstrumentos") {
        chrome.storage.local.set({ instrumentos: message.data });
    } else if (message.action === "updateSubtipos") {
        chrome.storage.local.set({ subtipos: message.data });
    }
});