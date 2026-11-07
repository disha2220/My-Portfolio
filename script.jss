
// Wait until the HTML page is fully loaded
document.addEventListener("DOMContentLoaded", function () {

    // 1. Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");
            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    // 2. Reveal sections when scrolling
    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");

                // Stop observing after the section appears
                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.12
    });

    document.querySelectorAll(".section, .stats").forEach(section => {
        section.classList.add("reveal");
        observer.observe(section);
    });


    // 3. Highlight active navigation link
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    function updateActiveLink() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 130;

            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + currentSection) {
                link.classList.add("active");
            }

        });
    }

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();


    // 4. Update footer year automatically
    const footerYear = document.querySelector("#year");

    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }


    // 5. Contact links open safely in a new tab
    document.querySelectorAll('.social-link').forEach(link => {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
    });

});
