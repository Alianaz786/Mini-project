// =======================
// Dark Mode Toggle
// =======================
const themeBtn = document.getElementById("themeBtn");
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
  });

  // Load saved theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️";
  }
}

// =======================
// Scroll to Top Button
// =======================
const scrollBtn = document.getElementById("scrollBtn");
if (scrollBtn) {
  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// =======================
// Modal for Project Cards
// =======================
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const closeBtn = document.querySelector(".close-btn");

if (modal && modalImg && modalTitle && modalDesc) {
  const projectsData = [
    {
      img: "weather.jpg",
      title: "Weather App",
      desc: "A responsive weather app that provides real-time updates using a weather API."
    },
    {
      img: "ecommerce.jpg",
      title: "E-Commerce Store",
      desc: "A full-featured online store with product listings, cart, and checkout."
    },
    {
      img: "chatapp.jpg",
      title: "Chat Application",
      desc: "A live chat application built with WebSocket technology for real-time communication."
    }
  ];

  const viewButtons = document.querySelectorAll(".viewBtn");
  viewButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const project = projectsData[index];
      modalImg.src = project.img;
      modalTitle.textContent = project.title;
      modalDesc.textContent = project.desc;
      modal.style.display = "flex"; // FIX: Use flex to center
    });
  });

  // Close modal
  closeBtn.addEventListener("click", () => (modal.style.display = "none"));
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
}

// =======================
// Contact Form Submission
// =======================
const contactForm = document.getElementById("contactForm");
const thankMsg = document.getElementById("thankMsg");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    contactForm.style.display = "none";
    thankMsg.style.display = "block";
  });
}

// =======================
// CV Download (Force JPG Download)
// =======================
const downloadCvBtn = document.getElementById("downloadCvBtn");
if (downloadCvBtn) {
  downloadCvBtn.addEventListener("click", function () {
    const cvUrl = "CV.jpg"; // Exact file name (case-sensitive)

    fetch(cvUrl)
      .then(response => {
        if (!response.ok) throw new Error("File not found");
        return response.blob();
      })
      .then(blob => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "My_CV.jpg"; // File name for download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
      })
      .catch(err => {
        console.error("Download failed:", err);
        alert("Sorry, the CV file could not be downloaded.");
      });
  });
}
