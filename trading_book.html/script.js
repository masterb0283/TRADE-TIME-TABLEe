const textarea = document.getElementById("pageContent");
const saveBtn = document.getElementById("saveBtn");

// Load saved content from localStorage
textarea.value = localStorage.getItem("tradingBook") || "";

// Save only when the Save button is clicked
saveBtn.addEventListener("click", saveWithTimestamp);

// Also save when leaving the page
window.addEventListener("beforeunload", saveWithTimestamp);

/* ----------------------------------------------------
        TIMESTAMP
---------------------------------------------------- */
function makeTimestamp() {
    const d = new Date();
    return `[${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} `
         + `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}]`;
}

/* ----------------------------------------------------
        SAVE FUNCTION WITH LINE NUMBERS AND TIMESTAMP
---------------------------------------------------- */
function saveWithTimestamp() {
    const lines = textarea.value.split("\n");

    const updatedLines = lines.map((line, index) => {
        // Skip empty lines
        if (line.trim().length === 0) return '';

        // Remove previous numbering and timestamp if exists
        let cleanLine = line.replace(/^\d+\.\s*/, '').replace(/\s*\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}\]$/, '');

        // Add number + timestamp at the end of the line (after last full stop)
        if (cleanLine.includes('.')) {
            const lastDotIndex = cleanLine.lastIndexOf('.');
            return `${index + 1}. ${cleanLine.slice(0, lastDotIndex + 1)} ${makeTimestamp()}${cleanLine.slice(lastDotIndex + 1)}`;
        } else {
            // If no full stop, append timestamp at end
            return `${index + 1}. ${cleanLine} ${makeTimestamp()}`;
        }
    });

    textarea.value = updatedLines.join("\n");
    localStorage.setItem("tradingBook", textarea.value);
    alert("Document saved ✅");
}
