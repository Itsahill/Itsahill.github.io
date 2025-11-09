import hljs from "highlight.js";
function getFormEntries(form) {
  const formData = new FormData(form);
  const entries = {};
  for (const [key, value] of formData.entries()) {
    entries[key] = value instanceof File ? value.name || null : value;
  }
  return entries;
}

function displayJson(container, jsonString) {
  container.innerHTML =
    '<h2>Generated JSON</h2><pre><code class="language-json"></code></pre>';
  container.querySelector("code").textContent = jsonString;
}

function highlightJson(codeEl) {
  const hl = globalThis.hljs;
  if (hl && typeof hl.highlightElement === "function") {
    try {
      hl.highlightElement(codeEl);
    } catch (err) {
      console.warn("hljs highlight error", err);
    }
  } else if (hl && typeof hl.highlightAll === "function") {
    try {
      hl.highlightAll();
    } catch (err) {
      console.warn("hljs highlightAll error", err);
    }
  } else {
    console.info("highlight.js not available");
  }
}

function hideFieldsetsAndButtons() {
  document
    .querySelectorAll("fieldset")
    .forEach((f) => (f.style.display = "none"));
  Array.from(document.querySelectorAll("button[type='button']")).forEach(
    (button) => {
      if (button.id !== "reset") button.style.display = "none";
    }
  );
  const submitBtn = document.querySelector("button[type='submit']");
  if (submitBtn) submitBtn.style.display = "none";
  const h2s = document.getElementsByTagName("h2");
  if (h2s.length > 1) h2s[1].style.display = "none";
  const h3s = document.getElementsByTagName("h3");
  if (h3s.length > 0) h3s[0].style.display = "none";
}
document.addEventListener("DOMContentLoaded", () => {
  function handleWarning(message) {
    console.warn(`generate_json: ${message}`);
  }

  function handleClick(e) {
    try {
      console.log("generate_json: clicked");
      const form = document.querySelector("form");
      if (!form) return handleWarning("form not found");

      if (!form.checkValidity()) {
        form.reportValidity();
        return handleWarning("form invalid");
      }

      const entries = getFormEntries(form);
      const jsonString = JSON.stringify(entries, null, 2);
      const outputContainer = document.getElementById("output-container");
      if (!outputContainer) return handleWarning("#output-container not found");

      displayJson(outputContainer, jsonString);
      highlightJson(outputContainer.querySelector("code"));

      hideFieldsetsAndButtons();
      console.log("generate_json: done");
    } catch (err) {
      console.error("generate_json: unexpected error", err);
    }
  }

  const jsonBtn =
    document.getElementById("json") || document.querySelector('[id="json"]');
  if (!jsonBtn) {
    console.warn("generate_json: #json button not found");
    return;
  }

  jsonBtn.addEventListener("click", handleClick);
});
