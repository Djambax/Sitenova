// ===== NAVIGATION MOBILE =====
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu mobile
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fermer menu quand on clique sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Fermer menu quand on clique en dehors
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// ===== ANIMATIONS AU SCROLL SUPPRIMÉES =====
// Les animations de scroll ont été supprimées pour éviter les bugs

// ===== ANIMATION DES CHIFFRES =====
function animateNumber(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
}

// Observer les stats pour les animer
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                if (!stat.classList.contains('animated')) {
                    const text = stat.textContent;
                    const number = parseInt(text.replace('+', ''));
                    stat.classList.add('animated');
                    animateNumber(stat, number);
                }
            });
        }
    });
}, { threshold: 0.5 });

// Observer les stats
document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.highlight-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// ===== NAVIGATION SMOOTH SCROLL =====
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

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const bars = document.querySelectorAll('.bar');

    // Home uniquement: activer body.scrolled pour le style
    const isHome = document.body.classList.contains('home');

    if (window.scrollY > 100) {
        if (isHome) document.body.classList.add('scrolled');
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        navLinks.forEach(link => { link.style.color = 'var(--black)'; link.style.textShadow = 'none'; });
        bars.forEach(bar => { bar.style.background = 'var(--black)'; });
    } else {
        if (isHome) document.body.classList.remove('scrolled');
        // Pages internes: ne pas rendre transparent, garder blanc
        if (isHome) {
            navbar.style.background = 'transparent';
            navbar.style.boxShadow = 'none';
            navLinks.forEach(link => { link.style.color = '#ffffff'; link.style.textShadow = '0 1px 2px rgba(0,0,0,0.3)'; });
            bars.forEach(bar => { bar.style.background = '#ffffff'; });
        } else {
            navbar.style.background = '#ffffff';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.06)';
            navLinks.forEach(link => { link.style.color = 'var(--black)'; link.style.textShadow = 'none'; });
            bars.forEach(bar => { bar.style.background = 'var(--black)'; });
        }
    }
});

// ===== HOVER EFFECTS AVANCÉS =====
document.addEventListener('DOMContentLoaded', function() {
    // Effet de lift sur les cards
    const cards = document.querySelectorAll('.valeur-card, .formation-card, .prestation-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Effet de glow sur les boutons dorés
    const goldButtons = document.querySelectorAll('.btn-primary');
    
    goldButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 25px rgba(255, 215, 0, 0.5)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 4px 16px rgba(255, 215, 0, 0.3)';
        });
    });
});

// ===== PARALLAX SUBTIL =====
// Effet parallax supprimé pour garder l'image statique
// window.addEventListener('scroll', function() {
//     const scrolled = window.pageYOffset;
//     const parallaxElements = document.querySelectorAll('.hero-image img');
//     
//     parallaxElements.forEach(element => {
//         const speed = 0.5;
//         element.style.transform = `translateY(${scrolled * speed}px)`;
//     });
// });

// ===== ANIMATION DES CHIFFRES =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// ===== LAZY LOADING DES IMAGES =====
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

document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
});

// ===== FORMULAIRE DE CONTACT (pour la page contact) =====
function initContactForm() {
    const form = document.querySelector('#contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Animation de soumission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;
            
            // Simulation d'envoi (à remplacer par votre logique)
            setTimeout(() => {
                submitBtn.textContent = 'Message envoyé !';
                submitBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    form.reset();
                }, 2000);
            }, 1500);
        });
    }
}

// ===== UTILITAIRES =====
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

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initFAQ();
    
    // Ajouter des classes pour les animations
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
    });

    // Typewriter pour le hero (home)
    const tw = document.getElementById('typewriter-target');
    if (tw) {
        tw.textContent = 'de vos ambitions';
    }
});

// ===== FAQ FUNCTIONNALITY =====
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Fermer tous les autres items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Ouvrir/fermer l'item cliqué
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ===== PERFORMANCE - Optimisation des animations =====
const optimizedScrollHandler = debounce(function() {
    // Code optimisé pour le scroll
}, 16);

window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
