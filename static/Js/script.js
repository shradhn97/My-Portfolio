document.addEventListener("DOMContentLoaded", () => {
  // Load Header
  fetch("/static/header.html")
    .then(res => res.ok ? res.text() : Promise.reject("Failed to load header"))
    .then(data => {
      document.getElementById("header").innerHTML = data;

      // Make navbar logo clickable
      const logo = document.querySelector(".logo a");
      if (logo) {
        logo.addEventListener("click", (e) => {
          e.preventDefault();
          window.location.href = "/index.html";
        });
      }
    })
    .catch(err => console.error(err));

  // Load Footer
  fetch("/static/footer.html")
    .then(res => res.ok ? res.text() : Promise.reject("Failed to load footer"))
    .then(data => document.getElementById("footer").innerHTML = data)
    .catch(err => console.error(err));

  // Load Projects
  fetch("/projects")
    .then(res => res.ok ? res.json() : Promise.reject("Failed to load projects"))
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
    })
    .catch(err => console.error(err));

  // Handle contact form
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      try {
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
      } catch (err) {
        console.error(err);
        document.getElementById("response").innerText = "Failed to send message.";
      }
    });
  }
});
