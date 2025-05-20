
    let index = 0;
    setInterval(() => {
        index = (index + 1) % images.length;
        slider.src = images[index];
    }, 3000);

    // Form validation
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();
            if (!name || !email || !message) {
                alert("All fields are required!");
                e.preventDefault();
            }
        });
    }
});

   
       
