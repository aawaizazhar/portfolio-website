document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("mobile-menu");
  const navLinks = document.querySelector(".nav-links");
  const navLinksItems = document.querySelectorAll(".nav-links li");

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
      navLinksItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
      });
    } else {
      navLinksItems.forEach((item) => {
        item.style.transitionDelay = "0s";
      });
    }
  });

  navLinksItems.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  const navbar = document.querySelector(".navbar");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 100) {
      navbar.classList.remove("sticky");
      return;
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
      // Scrolling down
      navbar.classList.add("sticky");
    } else if (currentScroll < lastScroll) {
      // Scrolling up
      navbar.classList.add("sticky");
    }

    lastScroll = currentScroll;
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80; // Height of your navbar
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  const sections = document.querySelectorAll("section");

  function highlightNav() {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.pageYOffset >= sectionTop - 200) {
        current = `#${section.getAttribute("id")}`;
      }
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === current) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", highlightNav);
  highlightNav();
});
