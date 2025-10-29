let courseCount = 1;

document.getElementsByTagName("form")[0].addEventListener("submit", (e) => {e.preventDefault();});

document.getElementById("add-course-button").addEventListener("click", () => {
    courseCount++;
    const coursesContainer = document.getElementById("courses-container");
    const newCourseInput = document.createElement("fieldset");
    newCourseInput.id = `course${courseCount}`;
    newCourseInput.innerHTML = `
        <label for="department${courseCount}">Department:</label>
        <input type="text" id="department${courseCount}" name="department${courseCount}" placeholder="Enter course department here" required>

        <label for="coursenumber-${courseCount}">Course Number:</label>
        <input type="text" id="coursenumber-${courseCount}" name="coursenumber-${courseCount}" placeholder="Enter course number here" required>

        <label for="reason-${courseCount}">Reason for Taking:</label>
        <input type="text" id="reason-${courseCount}" name="reason-${courseCount}" placeholder="Enter reason for taking course here" required>
        <button type="button" class="remove-course-button">Remove Course</button>
    `;
    coursesContainer.appendChild(newCourseInput);
});

document.querySelector("#courses-container").addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-course-button")) {
        for (let i = Number(e.target.parentElement.id.slice(-1)); i < courseCount; i++) {
            const fieldsetToUpdate = document.getElementById("course" + (1 + i));
            console.log("course" + (1 + i));
            fieldsetToUpdate.id = "course" + i;
            fieldsetToUpdate.querySelector("label[for='department" + (1 + i) + "']").htmlFor = "department" + i;
            fieldsetToUpdate.querySelector("label[for='coursenumber-" + (1 + i) + "']").htmlFor = "coursenumber-" + i;
            fieldsetToUpdate.querySelector("label[for='coursename-" + (1 + i) + "']").htmlFor = "coursename-" + i;
            fieldsetToUpdate.querySelector("label[for='reason-" + (1 + i) + "']").htmlFor = "reason-" + i;
            fieldsetToUpdate.querySelector("input[name='department" + (1 + i) + "']").name = "department" + i;
            fieldsetToUpdate.querySelector("input[name='coursenumber-" + (1 + i) + "']").name = "coursenumber-" + i;
            fieldsetToUpdate.querySelector("input[name='coursename-" + (1 + i) + "']").name = "coursename-" + i;
            fieldsetToUpdate.querySelector("input[name='reason-" + (1 + i) + "']").name = "reason-" + i;
            fieldsetToUpdate.querySelector("input[id='department" + (1 + i) + "']").id = "department" + i;
            fieldsetToUpdate.querySelector("input[id='coursenumber-" + (1 + i) + "']").id = "coursenumber-" + i;
            fieldsetToUpdate.querySelector("input[id='coursename-" + (1 + i) + "']").id = "coursename-" + i;
            fieldsetToUpdate.querySelector("input[id='reason-" + (1 + i) + "']").id = "reason-" + i;
        }
        e.target.parentElement.remove();
        courseCount--;
    }
});

document.getElementById("load-image-btn").addEventListener("click", () => {
    let image = document.getElementById("picture").files[0];
    if (image) {
        let imgElement = document.getElementById("image").getElementsByTagName("img")[0];
        imgElement.src = URL.createObjectURL(image);
    }
});

document.getElementById("clear-button").addEventListener("click", () => {
    Array.from(document.querySelectorAll("input")).forEach((input) => {
        input.value = "";
    });
    Array.from(document.querySelectorAll("textarea")).forEach((textarea) => {
        textarea.value = "";
    });
    let imgElement = document.getElementById("image").getElementsByTagName("img")[0];
    imgElement.src = "images/me-in-alaska.jpg";
});

document.getElementById("reset").addEventListener("click", () => {
    document.getElementById("output-container").innerHTML = "";
    Array.from(document.getElementsByTagName("fieldset ")).forEach((fieldset) => {
        fieldset.style.display = "block";
    });
    document.getElementsByTagName("h2")[0].style.display = "block";
    document.getElementsByTagName("h3")[0].style.display = "block";
    document.getElementById("clear-button").style.display = "inline";
    document.querySelector("button[type='submit']").style.display = "inline";
});

document.getElementById("submit").addEventListener("click", () => {
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
    <h2>Introduction</h2>
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

    Array.from(document.getElementsByTagName("fieldset ")).forEach((fieldset) => {
        fieldset.style.display = "none";
    });
    document.getElementsByTagName("h2")[0].style.display = "none";
    document.getElementsByTagName("h3")[0].style.display = "none";
    document.getElementById("clear-button").style.display = "none";
    document.querySelector("button[type='submit']").style.display = "none";

    document.getElementById("output-container").innerHTML = content;

});

document.querySelector("#submit").addEventListener("click", () => {
    Array.from(document.getElementsByTagName("fieldset")).forEach((fieldset) => {
        fieldset.style.display = "none";
    });
    Array.from(document.querySelectorAll("button[type='button']")).forEach((button) => {
        if (button.id !== "reset") {
            button.style.display = "none";
        }
    });
});

document.querySelector("#reset").addEventListener("click", () => {
    Array.from(document.querySelectorAll("input")).forEach((input) => {
        input.value = "";
    });
    Array.from(document.querySelectorAll("textarea")).forEach((textarea) => {
        textarea.value = "";
    });
    document.getElementById("output-container").innerHTML = "";
    document.getElementsByTagName("h2")[0].style.display = "block";
    document.getElementsByTagName("h3")[0].style.display = "block";
    document.getElementById("clear-button").style.display = "inline";
    document.querySelector("button[type='submit']").style.display = "inline";
    Array.from(document.getElementsByTagName("fieldset")).forEach((fieldset) => {
        fieldset.style.display = "block";
    });
    Array.from(document.querySelectorAll("button[type='button']")).forEach((button) => {
        button.style.display = "inline";
    });
});