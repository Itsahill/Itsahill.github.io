import hljs from 'highlight.js';

document.getElementById("json").addEventListener("click", () => {
    const requiredInput = document.querySelectorAll("input[required]");
    for (let input of requiredInput) {
        if (!input.value) {
            alert("Please fill out all required fields.");
            return;
        }
    }
    const formData = new FormData(document.getElementsByTagName("form")[0]);
    const entries = {};
    formData.forEach((value, key) => {
        entries[key] = value;
    });
    const jsonString = JSON.stringify(entries, null, 2);
    const outputContainer = document.getElementById("output-container");
    outputContainer.innerHTML = "<h2>Generated JSON</h2><pre><code class='>" + jsonString + "</code></pre>";

    
    Array.from(document.getElementsByTagName("fieldset")).forEach((fieldset) => {
        fieldset.style.display = "none";
    });
    Array.from(document.querySelectorAll("button[type='button']")).forEach((button) => {
        if (button.id !== "reset") {
            button.style.display = "none";
        }
    });
    document.querySelector("button[type='submit']").style.display = "none";
    document.getElementsByTagName("h2")[1].style.display = "none";
    document.getElementsByTagName("h3")[0].style.display = "none";
});