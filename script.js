// Page Loader Functionality
class PageLoader {
    constructor() {
        this.loader = document.getElementById('page-loader');
        this.percentageElement = document.querySelector('.loader-percentage');
        this.statusElement = document.querySelector('.loader-status');
        this.progressCircle = document.querySelector('.progress-ring-circle');
        this.circumference = 2 * Math.PI * 52; // 2 * π * r

        this.currentProgress = 0;
        this.targetProgress = 0;
        this.animationFrame = null;

        this.init();
    }

    init() {
        // Set initial state
        this.progressCircle.style.strokeDasharray = this.circumference;
        this.progressCircle.style.strokeDashoffset = this.circumference;

        // Start loading simulation
        this.simulateLoading();

        // Listen for page load
        window.addEventListener('load', () => {
            this.completeLoading();
        });

        // Fallback timeout (in case load event doesn't fire)
        setTimeout(() => {
            if (!this.loader.classList.contains('loaded')) {
                this.completeLoading();
            }
        }, 10000);
    }

    simulateLoading() {
        const loadingSteps = [
            { progress: 10, status: 'Inicjalizacja...', delay: 200 },
            { progress: 25, status: 'Ładowanie zasobów...', delay: 400 },
            { progress: 45, status: 'Przygotowywanie interfejsu...', delay: 600 },
            { progress: 70, status: 'Ładowanie animacji...', delay: 800 },
            { progress: 85, status: 'Finalizacja...', delay: 1000 },
            { progress: 95, status: 'Prawie gotowe...', delay: 1200 }
        ];

        let currentStep = 0;

        const processStep = () => {
            if (currentStep < loadingSteps.length) {
                const step = loadingSteps[currentStep];
                this.setProgress(step.progress, step.status);

                setTimeout(() => {
                    currentStep++;
                    processStep();
                }, step.delay);
            }
        };

        processStep();
    }

    setProgress(progress, status = null) {
        this.targetProgress = Math.min(progress, 95); // Max 95% until fully loaded

        if (status) {
            this.statusElement.textContent = status;
        }

        this.animateProgress();
    }

    animateProgress() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }

        const animate = () => {
            const diff = this.targetProgress - this.currentProgress;
            const step = diff * 0.1; // Smooth animation

            if (Math.abs(diff) > 0.1) {
                this.currentProgress += step;
                this.updateDisplay();
                this.animationFrame = requestAnimationFrame(animate);
            } else {
                this.currentProgress = this.targetProgress;
                this.updateDisplay();
            }
        };

        animate();
    }

    updateDisplay() {
        // Update percentage text
        this.percentageElement.textContent = Math.round(this.currentProgress) + '%';

        // Update progress circle
        const offset = this.circumference - (this.currentProgress / 100) * this.circumference;
        this.progressCircle.style.strokeDashoffset = offset;
    }

    completeLoading() {
        // Set to 100%
        this.setProgress(100, 'Gotowe!');

        // Wait a bit then hide loader
        setTimeout(() => {
            this.loader.classList.add('loaded');

            // Remove loader from DOM after animation
            setTimeout(() => {
                this.loader.style.display = 'none';
            }, 800);
        }, 500);
    }
}

// Initialize page loader immediately
document.addEventListener('DOMContentLoaded', () => {
    new PageLoader();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    // Use touchstart for better mobile support
    navToggle.addEventListener('touchstart', (e) => {
        e.preventDefault();
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Also keep click for desktop
    navToggle.addEventListener('click', (e) => {
        e.preventDefault();
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Add mousedown for better compatibility
    navToggle.addEventListener('mousedown', (e) => {
        e.preventDefault();
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Desktop dropdown toggle
const moreLink = document.querySelector('.more-link');
const dropdownMenu = document.querySelector('.dropdown-menu');

if (moreLink && dropdownMenu) {
    // Use touchstart for mobile, click for desktop
    const eventType = 'ontouchstart' in window ? 'touchstart' : 'click';
    moreLink.addEventListener(eventType, (e) => {
        e.preventDefault();
        moreLink.classList.toggle('active');
        dropdownMenu.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener(eventType, (e) => {
        if (!moreLink.contains(e.target) && !dropdownMenu.contains(e.target)) {
            moreLink.classList.remove('active');
            dropdownMenu.classList.remove('active');
        }
    });
}

// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';

if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'theme_change', {
                'theme': newTheme
            });
        }
    });
}

// Header background on scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Basic validation
        if (!name || !email || !message) {
            alert('Proszę wypełnić wszystkie pola formularza.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Proszę podać prawidłowy adres email.');
            return;
        }

        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        alert('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.');

        // Reset form
        contactForm.reset();
    });
}

// Newsletter form handling
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('newsletterEmail').value;
        const consent = document.getElementById('newsletterConsent').checked;

        // Validation
        if (!email) {
            alert('Proszę podać adres email.');
            return;
        }

        if (!consent) {
            alert('Proszę wyrazić zgodę na przetwarzanie danych osobowych.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Proszę podać prawidłowy adres email.');
            return;
        }

        // Here you would typically send the email to your newsletter service
        // For now, we'll store it locally and show success message
        const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
        
        if (subscribers.includes(email)) {
            alert('Ten adres email jest już zapisany do newslettera.');
            return;
        }

        subscribers.push(email);
        localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));

        alert('Dziękujemy za zapisanie się do newslettera! Będziesz otrzymywać informacje o naszych promocjach.');

        // Reset form
        newsletterForm.reset();

        // Track event in Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'newsletter_signup', {
                'method': 'website_form'
            });
        }
    });
}

// Booking modal functions
function openBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Focus management
    const firstInput = document.getElementById('bookingName');
    if (firstInput) firstInput.focus();
    
    // Track event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'booking_modal_open', {
            'source': 'hero_button'
        });
    }
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeBookingModal();
    }
});

// Close modal on outside click
document.getElementById('bookingModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'bookingModal') {
        closeBookingModal();
    }
});

// Booking form handling
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('bookingName').value,
            email: document.getElementById('bookingEmail').value,
            phone: document.getElementById('bookingPhone').value,
            date: document.getElementById('bookingDate').value,
            time: document.getElementById('bookingTime').value,
            guests: document.getElementById('bookingGuests').value,
            message: document.getElementById('bookingMessage').value,
            consent: document.getElementById('bookingConsent').checked,
            timestamp: new Date().toISOString()
        };

        // Validation
        const requiredFields = ['name', 'email', 'phone', 'date', 'time', 'guests'];
        for (const field of requiredFields) {
            if (!formData[field]) {
                alert(`Proszę wypełnić pole: ${field === 'name' ? 'Imię i nazwisko' : 
                                             field === 'email' ? 'Email' :
                                             field === 'phone' ? 'Telefon' :
                                             field === 'date' ? 'Data' :
                                             field === 'time' ? 'Godzina' :
                                             'Liczba osób'}`);
                return;
            }
        }

        if (!formData.consent) {
            alert('Proszę wyrazić zgodę na przetwarzanie danych osobowych.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Proszę podać prawidłowy adres email.');
            return;
        }

        // Phone validation (basic)
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{9,}$/;
        if (!phoneRegex.test(formData.phone)) {
            alert('Proszę podać prawidłowy numer telefonu.');
            return;
        }

        // Store booking locally (in production, send to server)
        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        bookings.push(formData);
        localStorage.setItem('bookings', JSON.stringify(bookings));

        alert(`Dziękujemy za rezerwację, ${formData.name}! Potwierdzenie wysłaliśmy na adres ${formData.email}. Skontaktujemy się wkrótce.`);

        // Reset form and close modal
        bookingForm.reset();
        closeBookingModal();

        // Track conversion
        if (typeof gtag !== 'undefined') {
            gtag('event', 'booking_complete', {
                'date': formData.date,
                'guests': formData.guests
            });
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.about-item, .service-card, .pricing-card').forEach(el => {
    observer.observe(el);
});

// Floating buttons animation
const floatingButtons = document.querySelector('.floating-buttons');
if (floatingButtons) {
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            floatingButtons.style.transform = 'translateY(100px)';
        } else {
            // Scrolling up
            floatingButtons.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}

// Preloader (if needed)
window.addEventListener('load', () => {
    // Remove preloader if exists
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }
});

// Lazy loading for images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Prevent right-click on images (optional)
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

window.addEventListener('scroll', debounce(setActiveLink, 10));

// FAQ functionality
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        // Close other open FAQ items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle current item
        item.classList.toggle('active');
    });
});

// Comments tabs functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const reviewsContents = document.querySelectorAll('.reviews-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all tabs
        tabBtns.forEach(b => b.classList.remove('active'));
        reviewsContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked tab
        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(`${tabId}-reviews`).classList.add('active');
    });
});

// WhatsApp form functionality
const whatsappBtn = document.getElementById('whatsappBtn');
if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Basic validation
        if (!name || !email || !message) {
            alert('Proszę wypełnić wszystkie pola formularza przed wysłaniem przez WhatsApp.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Proszę podać prawidłowy adres email.');
            return;
        }

        // Create WhatsApp message
        const whatsappMessage = `Cześć! Nazywam się ${name}.\n\nEmail: ${email}\n\nWiadomość: ${message}\n\nKontakt z Wesołego Zakątka - Park Trampolin`;

        // Encode message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // Open WhatsApp with pre-filled message
        const whatsappUrl = `https://wa.me/48602191473?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    });
}

// AI Chatbot functionality
class AIChatbot {
    constructor() {
        this.chatMessages = document.querySelector('.chat-messages');
        this.chatInput = document.querySelector('.chat-input input');
        this.sendButton = document.querySelector('.chat-input button');
        this.quickButtons = document.querySelectorAll('.quick-btn');

        this.responses = {
            'Ile kosztuje wejście?': 'Ceny wejścia zależą od wybranego pakietu czasowego:\n\n• 30 minut: 25 zł\n• 1 godzina: 40 zł\n• 2 godziny: 70 zł\n• Bez limitu czasowego: 90 zł\n\nDzieci do 3 lat wstęp bezpłatny!',
            'Jakie atrakcje są dostępne?': 'W naszym parku rozrywki znajdziesz:\n\n🏀 Park trampolin z różnymi poziomami trudności\n🐒 Małpi Gaj z bezpiecznymi przeszkodami\n🎈 Strefa kreatywna z kolorowymi zabawami\n🎪 Pokój z balonami i dmuchawcami\n\nWszystkie atrakcje są bezpieczne i dostosowane do wieku dzieci!',
            'Czy potrzebna jest rezerwacja?': 'Rezerwacja nie jest obowiązkowa, ale zalecamy ją szczególnie w weekendy i święta.\n\nMożesz zarezerwować miejsce:\n📞 Telefon: +48 123 456 789\n💬 WhatsApp: +48 123 456 789\n📧 Email: kontakt@wesolyzakatek.pl\n\nRezerwacja gwarantuje dostęp do wszystkich atrakcji!',
            'Jakie są godziny otwarcia?': 'Godziny otwarcia naszego parku:\n\nPoniedziałek - Piątek: 10:00 - 19:00\nSobota - Niedziela: 9:00 - 20:00\nŚwięta: 10:00 - 18:00\n\nZapraszamy rodziny z dziećmi w każdym wieku!',
            'Czy są zniżki dla grup?': 'Tak! Oferujemy atrakcyjne zniżki dla grup:\n\n• Grupy zorganizowane (min. 10 osób): 15% zniżki\n• Rodzinne pakiety (2+ dzieci): 10% zniżki\n• Karta stałego klienta: 20% zniżki od 5. wizyty\n\nSkontaktuj się z nami po szczegóły!',
            'Czy atrakcje są bezpieczne?': 'Bezpieczeństwo dzieci jest naszym priorytetem!\n\n✅ Wszystkie atrakcje posiadają certyfikaty bezpieczeństwa\n✅ Wyposażenie jest regularnie sprawdzane\n✅ Personel przeszkolony w pierwszej pomocy\n✅ Strefy podzielone wg wieku dzieci\n✅ Bezpłatny nadzór opiekunów\n\nDbamy o uśmiech i bezpieczeństwo Twojego dziecka!',
            'Gdzie jesteście położeni?': 'Znajdujemy się w samym sercu Warszawy:\n\n📍 ul. Wesoła 15, 00-001 Warszawa\n🚇 Metro: Stacja Centrum (5 min pieszo)\n🚌 Autobusy: 107, 111, 116, 128, 175\n🚗 Parking: Bezpłatny parking na miejscu\n\nŁatwy dojazd komunikacją miejską!',
            'Czy można przynieść własne jedzenie?': 'Tak, możesz przynieść własne przekąski i picie dla dziecka.\n\nW naszym parku znajduje się również:\n🍕 Kącik gastronomiczny z zdrowymi przekąskami\n🥤 Automaty z napojami i słodyczami\n🍼 Pokój dla mam z kuchenką mikrofalową\n\nWszystko w przystępnych cenach!'
        };

        this.init();
    }

    init() {
        if (this.sendButton && this.chatInput) {
            this.sendButton.addEventListener('click', () => this.sendMessage());
            this.chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }

        this.quickButtons.forEach(button => {
            button.addEventListener('click', () => {
                const question = button.textContent;
                this.sendMessage(question);
            });
        });

        // Add welcome message
        setTimeout(() => {
            this.addMessage('Cześć! 👋 Jestem AI asystentem Wesołego Zakątka. Jak mogę Ci pomóc? Wybierz szybkie pytanie poniżej lub zadaj własne!', 'ai');
        }, 1000);
    }

    sendMessage(message = null) {
        const userMessage = message || this.chatInput.value.trim();
        if (!userMessage) return;

        this.addMessage(userMessage, 'user');
        this.chatInput.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Simulate AI response delay
        setTimeout(() => {
            this.hideTypingIndicator();
            this.generateResponse(userMessage);
        }, 1500 + Math.random() * 1000);
    }

    addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;

        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';

        const avatarImg = document.createElement('img');
        avatarImg.src = type === 'ai' ?
            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face' :
            'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face';
        avatarImg.alt = type === 'ai' ? 'AI Assistant' : 'User';

        avatarDiv.appendChild(avatarImg);

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';

        const contentP = document.createElement('p');
        contentP.textContent = content;

        contentDiv.appendChild(contentP);

        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);

        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face" alt="AI Assistant">
            </div>
            <div class="message-content">
                <p>AI pisze<span class="typing-dots"><span></span><span></span><span></span></span></p>
            </div>
        `;
        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    generateResponse(userMessage) {
        // Check for exact matches first
        if (this.responses[userMessage]) {
            this.addMessage(this.responses[userMessage], 'ai');
            return;
        }

        // Check for partial matches
        const lowerMessage = userMessage.toLowerCase();
        for (const [question, answer] of Object.entries(this.responses)) {
            if (lowerMessage.includes(question.toLowerCase().split('?')[0])) {
                this.addMessage(answer, 'ai');
                return;
            }
        }

        // Default response
        const defaultResponses = [
            'Świetne pytanie! 😊 Pozwól, że sprawdzę to dla Ciebie. Czy możesz sprecyzować o co dokładnie pytasz?',
            'Dziękuję za pytanie! 🤔 Staram się pomóc jak najlepiej. Spróbuj wybrać jedno z szybkich pytań powyżej lub zadaj pytanie inaczej.',
            'Interesujące pytanie! 🎈 W Wesołym Zakątku dbamy o to, żeby każde dziecko znalazło coś dla siebie. Czy mogę pomóc w czymś konkretnym?',
            'Dzięki za kontakt! 🌟 Jeśli masz pytania dotyczące cen, atrakcji lub rezerwacji, sprawdź szybkie pytania powyżej. Jeśli to coś innego, napisz proszę!'
        ];

        const randomResponse = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
        this.addMessage(randomResponse, 'ai');
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
}

// Gallery Functionality
class GalleryManager {
    constructor() {
        this.uploadArea = document.getElementById('uploadArea');
        this.fileInput = document.getElementById('fileInput');
        this.uploadBtn = document.getElementById('uploadBtn');
        this.galleryGrid = document.getElementById('galleryGrid');
        this.modal = document.getElementById('galleryModal');
        this.modalImage = document.getElementById('modalImage');
        this.modalClose = document.getElementById('modalClose');
        this.modalPrev = document.getElementById('modalPrev');
        this.modalNext = document.getElementById('modalNext');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalDescription = document.getElementById('modalDescription');

        this.images = [];
        this.currentImageIndex = 0;

        this.init();
    }

    init() {
        // Event listeners
        this.uploadArea.addEventListener('click', () => this.fileInput.click());
        this.uploadBtn.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));

        // Drag and drop
        this.uploadArea.addEventListener('dragover', (e) => this.handleDragOver(e));
        this.uploadArea.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        this.uploadArea.addEventListener('drop', (e) => this.handleDrop(e));

        // Modal events
        this.modalClose.addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });
        this.modalPrev.addEventListener('click', () => this.showPrevImage());
        this.modalNext.addEventListener('click', () => this.showNextImage());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.modal.style.display === 'block') {
                if (e.key === 'Escape') this.closeModal();
                if (e.key === 'ArrowLeft') this.showPrevImage();
                if (e.key === 'ArrowRight') this.showNextImage();
            }
        });

        // Load existing images from localStorage
        this.loadFromStorage();
    }

    handleDragOver(e) {
        e.preventDefault();
        this.uploadArea.classList.add('dragover');
    }

    handleDragLeave(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('dragover');
    }

    handleDrop(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('dragover');

        const files = Array.from(e.dataTransfer.files);
        this.processFiles(files);
    }

    handleFileSelect(e) {
        const files = Array.from(e.target.files);
        this.processFiles(files);
    }

    processFiles(files) {
        const imageFiles = files.filter(file => {
            if (!file.type.startsWith('image/')) {
                this.showNotification('Tylko pliki obrazów są dozwolone!', 'error');
                return false;
            }
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                this.showNotification('Plik jest za duży! Maksymalny rozmiar to 5MB.', 'error');
                return false;
            }
            return true;
        });

        if (imageFiles.length === 0) return;

        if (this.images.length + imageFiles.length > 10) {
            this.showNotification('Możesz dodać maksymalnie 10 zdjęć!', 'error');
            return;
        }

        imageFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageData = {
                    id: Date.now() + Math.random(),
                    src: e.target.result,
                    file: file,
                    title: `Zdjęcie ${this.images.length + 1}`,
                    description: `Przesłane ${new Date().toLocaleDateString('pl-PL')}`,
                    uploadDate: new Date().toISOString()
                };

                this.images.push(imageData);
                this.renderGallery();
                this.saveToStorage();
                this.showNotification('Zdjęcie zostało dodane!', 'success');
            };
            reader.readAsDataURL(file);
        });
    }

    renderGallery() {
        this.galleryGrid.innerHTML = '';

        this.images.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <img src="${image.src}" alt="${image.title}" loading="lazy">
                <div class="gallery-item-info">
                    <h4>${image.title}</h4>
                    <p>${image.description}</p>
                </div>
            `;

            galleryItem.addEventListener('click', () => this.openModal(index));
            this.galleryGrid.appendChild(galleryItem);
        });
    }

    openModal(index) {
        this.currentImageIndex = index;
        const image = this.images[index];

        this.modalImage.src = image.src;
        this.modalTitle.textContent = image.title;
        this.modalDescription.textContent = image.description;

        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // Update navigation buttons
        this.updateModalNavigation();
    }

    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    showPrevImage() {
        if (this.images.length === 0) return;
        this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
        this.updateModalImage();
    }

    showNextImage() {
        if (this.images.length === 0) return;
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        this.updateModalImage();
    }

    updateModalImage() {
        const image = this.images[this.currentImageIndex];
        this.modalImage.src = image.src;
        this.modalTitle.textContent = image.title;
        this.modalDescription.textContent = image.description;
        this.updateModalNavigation();
    }

    updateModalNavigation() {
        const hasMultipleImages = this.images.length > 1;
        this.modalPrev.style.display = hasMultipleImages ? 'block' : 'none';
        this.modalNext.style.display = hasMultipleImages ? 'block' : 'none';
    }

    saveToStorage() {
        try {
            localStorage.setItem('galleryImages', JSON.stringify(this.images));
        } catch (e) {
            console.warn('Nie można zapisać do localStorage:', e);
        }
    }

    loadFromStorage() {
        try {
            const saved = localStorage.getItem('galleryImages');
            if (saved) {
                this.images = JSON.parse(saved);
                this.renderGallery();
            }
        } catch (e) {
            console.warn('Nie można wczytać z localStorage:', e);
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `gallery-notification ${type}`;
        notification.textContent = message;

        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '10px',
            color: 'white',
            fontWeight: '600',
            zIndex: '10001',
            animation: 'slideInRight 0.3s ease',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
        });

        // Set background color based on type
        if (type === 'success') {
            notification.style.background = 'rgba(0, 255, 128, 0.9)';
        } else if (type === 'error') {
            notification.style.background = 'rgba(255, 0, 128, 0.9)';
        } else {
            notification.style.background = 'rgba(0, 212, 255, 0.9)';
        }

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Add notification animations to CSS dynamically
const notificationStyles = `
@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutRight {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Google Maps Integration
class GoogleMapsManager {
    constructor() {
        this.map = null;
        this.marker = null;
        this.mapElement = document.getElementById('googleMap');
        this.init();
    }

    init() {
        if (!this.mapElement) return;

        // Check if Google Maps API is loaded
        if (typeof google === 'undefined') {
            console.warn('Google Maps API not loaded. Using placeholder map.');
            this.createPlaceholderMap();
            return;
        }

        this.initMap();
    }

    initMap() {
        // Coordinates for Warsaw, Poland (placeholder - replace with actual location)
        const location = { lat: 52.2297, lng: 21.0122 };

        // Create map
        this.map = new google.maps.Map(this.mapElement, {
            zoom: 15,
            center: location,
            styles: this.getMapStyles(),
            disableDefaultUI: false,
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: true,
            streetViewControl: true,
            rotateControl: false,
            fullscreenControl: true,
            gestureHandling: 'cooperative'
        });

        // Add marker
        this.marker = new google.maps.Marker({
            position: location,
            map: this.map,
            title: 'Wesoły Zakątek - Park Trampolin',
            animation: google.maps.Animation.DROP,
            icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(this.getCustomMarker()),
                scaledSize: new google.maps.Size(40, 40),
                anchor: new google.maps.Point(20, 40)
            }
        });

        // Add info window
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div style="max-width: 250px; font-family: 'Poppins', sans-serif;">
                    <h3 style="color: #00d4ff; margin: 0 0 8px 0; font-size: 16px;">Wesoły Zakątek</h3>
                    <p style="margin: 0 0 8px 0; color: #333;">Park Trampolin i Małpi Gaj</p>
                    <p style="margin: 0 0 8px 0; font-size: 14px;">ul. Przyszłości 42, Warszawa 00-001</p>
                    <p style="margin: 0 0 8px 0; font-size: 14px;">📞 +48 602 191 473</p>
                    <p style="margin: 0; font-size: 14px;">🕒 Pon-Pt: 9:00-18:00 | Sob-Ndz: 10:00-20:00</p>
                </div>
            `
        });

        // Open info window on marker click
        this.marker.addListener('click', () => {
            infoWindow.open(this.map, this.marker);
        });

        // Add some visual enhancements
        this.addMapOverlays();
    }

    getMapStyles() {
        return [
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#00d4ff' }, { lightness: 20 }]
            },
            {
                featureType: 'landscape',
                elementType: 'geometry',
                stylers: [{ color: '#f5f5f5' }]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{ color: '#ffffff' }]
            },
            {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [{ color: '#e0e0e0' }]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{ color: '#00d4ff' }, { lightness: 30 }]
            }
        ];
    }

    getCustomMarker() {
        return `
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="#00d4ff" stroke="#ffffff" stroke-width="3"/>
                <circle cx="20" cy="15" r="6" fill="#ffffff"/>
                <path d="M14 25 Q20 22 26 25" stroke="#ffffff" stroke-width="3" fill="none" stroke-linecap="round"/>
                <circle cx="16" cy="12" r="1.5" fill="#00d4ff"/>
                <circle cx="24" cy="12" r="1.5" fill="#00d4ff"/>
            </svg>
        `;
    }

    addMapOverlays() {
        // Add a subtle overlay effect
        const overlay = new google.maps.Rectangle({
            strokeColor: '#00d4ff',
            strokeOpacity: 0.1,
            strokeWeight: 2,
            fillColor: '#00d4ff',
            fillOpacity: 0.05,
            map: this.map,
            bounds: {
                north: 52.235,
                south: 52.225,
                east: 21.02,
                west: 21.005
            }
        });
    }

    createPlaceholderMap() {
        console.log('Creating placeholder map...');
        // Create a placeholder when Google Maps API is not available
        this.mapElement.classList.add('placeholder');
        this.mapElement.innerHTML = `
            <div class="map-placeholder-content">
                <div class="map-icon">🗺️</div>
                <h3>Mapa lokalizacji</h3>
                <p>Wesoły Zakątek</p>
                <p>ul. Przyszłości 42<br>Warszawa 00-001</p>
                <div class="map-note">
                    Mapa niedostępna - sprawdź połączenie internetowe
                </div>
            </div>
        `;
        console.log('Placeholder map created');
    }
}

// Initialize gallery when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Add any initialization code here
    console.log('Wesoły Zakątek - strona załadowana pomyślnie!');

    // Initialize AI Chatbot
    new AIChatbot();

    // Initialize Gallery
    new GalleryManager();

    // Initialize Google Maps
    new GoogleMapsManager();
});