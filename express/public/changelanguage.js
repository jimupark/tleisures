// Open the language modal
function openModal() {
    document.getElementById("languageModal").style.display = "block";
}

// Close the language modal
function closeModal() {
    document.getElementById("languageModal").style.display = "none";
}

// Event listener for the language button
document.getElementById("languageBtn").addEventListener("click", openModal);
