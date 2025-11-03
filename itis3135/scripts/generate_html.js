

document.getElementById('html').addEventListener('click', function() {
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
    let content = `
    <h2>Generated HTML</h2>
    <p>I acknowledge that any information I post here is publicly visible. -${entries['initials']} ${entries['date']}</p>
    <h3>${entries['first-name']} ${entries['middle-name']} ${entries['preferred-name']} ${entries['last-name']} ${entries['divider']} ${entries['mascot-adjective']} ${entries['mascot-animal']}</h3>
    <figure>
        ${document.getElementById("image").innerHTML}
        <figcaption>${entries['picture-caption']}</figcaption>
    </figure>
    <ul>
        <li><b>Personal Background:</b> ${entries['personal-background']}</li>
        <li><b>Professional Background:</b> ${entries['professional-background']}</li>
        <li><b>Academic Background:</b> ${entries['academic-background']}</li>
        <li><b>Courses I'm Taking This Semester:</b>
            <ul>
    `;
    document.querySelectorAll("#courses-container fieldset").forEach((fieldset) => {
        let idx = fieldset.id.slice(-1);
        const department = entries[`department${idx}`];
        const courseNumber = entries[`coursenumber-${idx}`];
        const reason = entries[`reason-${idx}`];
        content += `<li><b>${department} ${courseNumber}</b>: ${reason}</li>`;
    }
    );
    content += `
            </ul>
        </li>
    `;
    if (entries['funny-item'] !== undefined && entries['funny-item'] !== "" && entries['funny-item'] !== null) {
        content += `
        <li><b>Funny/Interesting Item:</b> ${entries['funny-item']}</li>
        `;
    }
    if (entries['share'] !== undefined && entries['share'] !== "" && entries['share'] !== null) {
        content += `
        <li><b>Something I would like to share about me:</b> ${entries['share']}</li>
        `;
    }
    content += `
        </ul>
        <blockquote><i>${entries['quote']}</i></blockquote>
        <p>- ${entries['quote-author']}</p>
    `;
    const outputContainer = document.getElementById("output-container");
    outputContainer.innerHTML = "<h2>Generated HTML</h2><pre><code class='html'>" + escapeHtml(content) + "</code></pre>";

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

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }