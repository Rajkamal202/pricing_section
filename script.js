document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                this.querySelector('span:nth-child(1)').style.transform = 'rotate(45deg) translate(5px, 5px)';
                this.querySelector('span:nth-child(2)').style.opacity = '0';
                this.querySelector('span:nth-child(3)').style.transform = 'rotate(-45deg) translate(7px, -7px)';
            } else {
                this.querySelector('span:nth-child(1)').style.transform = 'none';
                this.querySelector('span:nth-child(2)').style.opacity = '1';
                this.querySelector('span:nth-child(3)').style.transform = 'none';
            }
        });
    }
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
                const icon = faqItem.querySelector('.toggle-icon i');
                icon.className = 'fas fa-plus';
            });
            
            // If the clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                const icon = item.querySelector('.toggle-icon i');
                icon.className = 'fas fa-times';
            }
        });
    });
    
    // Testimonial Slider
    const track = document.querySelector('.testimonial-track');
    const slides = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (track && slides.length > 0) {
        let currentIndex = 0;
        
        // Set initial position
        updateSlider();
        
        // Next button click
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        });
        
        // Previous button click
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlider();
        });
        
        // Dot click
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
            });
        });
        
        function updateSlider() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        
        // Auto slide
        let interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        }, 5000);
        
        // Pause on hover
        track.addEventListener('mouseenter', () => {
            clearInterval(interval);
        });
        
        track.addEventListener('mouseleave', () => {
            interval = setInterval(() => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateSlider();
            }, 5000);
        });
    }
    
    // Pricing toggle
    const billingToggle = document.querySelector('.billing-toggle input');
    const prices = document.querySelectorAll('.price .amount');
    const originalPrices = Array.from(prices).map(price => price.textContent);
    
    if (billingToggle) {
        billingToggle.addEventListener('change', function() {
            if (this.checked) {
                // Yearly pricing (default)
                prices.forEach((price, index) => {
                    price.textContent = originalPrices[index];
                });
                document.querySelectorAll('.period').forEach(period => {
                    period.textContent = '/year';
                });
            } else {
                // Monthly pricing (20% more)
                prices.forEach((price, index) => {
                    const yearlyPrice = parseInt(originalPrices[index]);
                    const monthlyPrice = Math.round(yearlyPrice / 12 * 1.2);
                    price.textContent = monthlyPrice;
                });
                document.querySelectorAll('.period').forEach(period => {
                    period.textContent = '/month';
                });
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation on scroll
    const animateElements = document.querySelectorAll('[data-aos]');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.8) {
                element.classList.add('aos-animate');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        [data-aos] {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        [data-aos].aos-animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        [data-aos-delay="100"] {
            transition-delay: 0.1s;
        }
        
        [data-aos-delay="200"] {
            transition-delay: 0.2s;
        }
    `;
    document.head.appendChild(style);
});