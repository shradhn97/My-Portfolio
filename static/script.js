// Load header and footer dynamically
document.addEventListener("DOMContentLoaded", () => {
  // Load Header
  fetch("/static/header.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("header").innerHTML = data;
    });

  // Load Footer
  fetch("/static/footer.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("footer").innerHTML = data;
    });

  // ✅ Load Projects
  fetch("/projects")
    .then(res => res.json())
    .then(data => {
      const projectList = document.getElementById("project-list");
      data.projects.forEach(p => {
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");
        projectCard.innerHTML = `
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <a href="${p.link}" target="_blank">🔗 View Project</a>
        `;
        projectList.appendChild(projectCard);
      });
    });
});

// Handle contact form
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const response = await fetch("/contact", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          message: document.getElementById("message").value
        })
      });

      const result = await response.json();
      document.getElementById("response").innerText = result.message;
    });
  }
});
