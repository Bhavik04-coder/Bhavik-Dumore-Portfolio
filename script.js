document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('#navbar ul');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('show');
            }
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Disable submit button to prevent multiple submissions
        submitBtn.disabled = true;
        formStatus.style.display = 'block';
        formStatus.textContent = 'Sending message...';
        formStatus.style.color = '#333';
        formStatus.style.backgroundColor = '#f8f9fa';
        
        const formData = new FormData();
        formData.append('_subject', `New Contact Form Submission: ${contactForm.subject.value}`);
        formData.append('name', contactForm.name.value);
        formData.append('email', contactForm.email.value);
        formData.append('subject', contactForm.subject.value || 'No Subject');
        formData.append('message', contactForm.message.value);
        formData.append('_next', window.location.href);
        
        fetch('https://formsubmit.co/ajax/bhavikdumore309@gmail.com', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
            formStatus.style.color = 'white';
            formStatus.style.backgroundColor = '#28a745';
            contactForm.reset();
            submitBtn.disabled = false;
            
            // Hide status message after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        })
        .catch(error => {
            console.error('Error:', error);
            formStatus.textContent = 'There was an error sending your message. Please try again.';
            formStatus.style.color = 'white';
            formStatus.style.backgroundColor = '#dc3545';
            submitBtn.disabled = false;
        });
    });
    
    // Update year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
});