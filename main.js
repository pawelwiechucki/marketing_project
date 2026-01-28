/**
 * FamilyGuardAngel - Landing Page JavaScript
 * Handles i18n, animations, form validation, and interactivity
 */

(function() {
    'use strict';

    // ========================================
    // Configuration
    // ========================================
    const CONFIG = {
        defaultLang: 'pl',
        supportedLangs: ['pl', 'en'],
        storageKey: 'fga-language',
        animationThreshold: 0.1
    };

    // ========================================
    // State
    // ========================================
    let currentLang = CONFIG.defaultLang;
    let translations = {};

    // ========================================
    // Utility Functions
    // ========================================

    /**
     * Get nested object value by dot notation path
     */
    function getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : null;
        }, obj);
    }

    /**
     * Detect browser language
     */
    function detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const shortLang = browserLang.split('-')[0];
        return CONFIG.supportedLangs.includes(shortLang) ? shortLang : CONFIG.defaultLang;
    }

    /**
     * Get language from URL parameter
     */
    function getUrlLanguage() {
        const urlParams = new URLSearchParams(window.location.search);
        const lang = urlParams.get('lang');
        return CONFIG.supportedLangs.includes(lang) ? lang : null;
    }

    /**
     * Get saved language preference
     */
    function getSavedLanguage() {
        try {
            const saved = localStorage.getItem(CONFIG.storageKey);
            return CONFIG.supportedLangs.includes(saved) ? saved : null;
        } catch (e) {
            return null;
        }
    }

    /**
     * Save language preference
     */
    function saveLanguage(lang) {
        try {
            localStorage.setItem(CONFIG.storageKey, lang);
        } catch (e) {
            // localStorage not available
        }
    }

    /**
     * Determine initial language
     */
    function determineInitialLanguage() {
        // Priority: URL > localStorage > browser detection > default
        return getUrlLanguage() || getSavedLanguage() || detectBrowserLanguage();
    }

    // ========================================
    // Translation System
    // ========================================

    /**
     * Load translations for a language
     */
    async function loadTranslations(lang) {
        try {
            const response = await fetch(`locales/${lang}/translation.json`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(`Failed to load translations for ${lang}:`, error);
            return null;
        }
    }

    /**
     * Apply translations to the page
     */
    function applyTranslations(lang) {
        const trans = translations[lang];
        if (!trans) return;

        document.body.classList.add('lang-switching');

        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const value = getNestedValue(trans, key);

            if (value) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = value;
                } else if (element.tagName === 'META') {
                    element.setAttribute('content', value);
                } else if (element.tagName === 'OPTION') {
                    element.textContent = value;
                } else {
                    element.textContent = value;
                }
            }
        });

        // Update document language
        document.documentElement.lang = lang;

        // Update page title
        if (trans.meta && trans.meta.title) {
            document.title = trans.meta.title;
        }

        // Update language toggle buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        setTimeout(() => {
            document.body.classList.remove('lang-switching');
        }, 150);
    }

    /**
     * Switch to a different language
     */
    async function switchLanguage(lang) {
        if (!CONFIG.supportedLangs.includes(lang)) return;
        if (lang === currentLang) return;

        // Load translations if not already loaded
        if (!translations[lang]) {
            const trans = await loadTranslations(lang);
            if (trans) {
                translations[lang] = trans;
            } else {
                return;
            }
        }

        currentLang = lang;
        saveLanguage(lang);
        applyTranslations(lang);

        // Update URL without reload
        const url = new URL(window.location);
        url.searchParams.set('lang', lang);
        window.history.replaceState({}, '', url);
    }

    // ========================================
    // Navigation
    // ========================================

    /**
     * Initialize navigation functionality
     */
    function initNavigation() {
        const header = document.getElementById('header');
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        // Header scroll effect
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            header.classList.toggle('scrolled', currentScroll > 50);
            lastScroll = currentScroll;
        });

        // Mobile menu toggle
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close menu on link click
            navMenu.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ========================================
    // Scroll Animations
    // ========================================

    /**
     * Initialize scroll-triggered animations
     */
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: CONFIG.animationThreshold,
                rootMargin: '0px 0px -50px 0px'
            });

            animatedElements.forEach(el => observer.observe(el));
        } else {
            // Fallback for older browsers
            animatedElements.forEach(el => el.classList.add('visible'));
        }
    }

    // ========================================
    // Counter Animation
    // ========================================

    /**
     * Animate counter numbers
     */
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.dataset.target, 10);
                    const duration = 2000;
                    const startTime = performance.now();

                    function updateCounter(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const easeOut = 1 - Math.pow(1 - progress, 3);
                        const current = Math.floor(target * easeOut);
                        counter.textContent = current;

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    }

                    requestAnimationFrame(updateCounter);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    // ========================================
    // Form Handling
    // ========================================

    /**
     * Initialize contact form
     */
    function initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', handleFormSubmit);

        // Real-time validation
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.closest('.form-group').classList.contains('error')) {
                    validateField(input);
                }
            });
        });
    }

    /**
     * Validate a form field
     */
    function validateField(field) {
        const formGroup = field.closest('.form-group');
        let isValid = true;

        if (field.required && !field.value.trim()) {
            isValid = false;
        }

        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(field.value);
        }

        formGroup.classList.toggle('error', !isValid);
        return isValid;
    }

    /**
     * Handle form submission
     */
    function handleFormSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formGroups = form.querySelectorAll('.form-group');
        let isValid = true;

        // Validate all required fields
        formGroups.forEach(group => {
            const input = group.querySelector('input, select');
            if (input && !validateField(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            // Simulate form submission
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            console.log('Form submitted:', data);

            // Show success message
            const successMessage = form.querySelector('.form-success');
            if (successMessage) {
                successMessage.classList.remove('hidden');
                form.querySelector('.form-actions').style.display = 'none';
                formGroups.forEach(group => group.style.display = 'none');
            }

            // Reset form after delay (for demo purposes)
            setTimeout(() => {
                form.reset();
                if (successMessage) {
                    successMessage.classList.add('hidden');
                    form.querySelector('.form-actions').style.display = 'flex';
                    formGroups.forEach(group => group.style.display = 'block');
                }
            }, 5000);
        }
    }

    /**
     * Handle schedule meeting button
     */
    function initScheduleButton() {
        const scheduleBtn = document.querySelector('.btn-secondary[data-i18n="cta.buttons.schedule"]');
        if (scheduleBtn) {
            scheduleBtn.addEventListener('click', () => {
                // Placeholder for calendar integration
                alert(currentLang === 'pl'
                    ? 'Integracja z kalendarzem wkrótce dostępna. Skontaktuj się z nami przez email.'
                    : 'Calendar integration coming soon. Please contact us via email.');
            });
        }
    }

    // ========================================
    // Cookie Consent
    // ========================================

    /**
     * Initialize cookie consent banner
     */
    function initCookieConsent() {
        const banner = document.getElementById('cookie-banner');
        const acceptBtn = document.getElementById('cookie-accept');

        if (!banner || !acceptBtn) return;

        // Check if already accepted
        try {
            if (localStorage.getItem('fga-cookies-accepted')) {
                banner.classList.add('hidden');
                return;
            }
        } catch (e) {
            // localStorage not available
        }

        // Show banner
        banner.classList.remove('hidden');

        // Handle accept
        acceptBtn.addEventListener('click', () => {
            banner.classList.add('hidden');
            try {
                localStorage.setItem('fga-cookies-accepted', 'true');
            } catch (e) {
                // localStorage not available
            }
        });
    }

    // ========================================
    // Language Toggle
    // ========================================

    /**
     * Initialize language toggle buttons
     */
    function initLanguageToggle() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                switchLanguage(lang);
            });
        });
    }

    // ========================================
    // Chart Animations
    // ========================================

    /**
     * Animate donut charts on scroll
     */
    function initChartAnimations() {
        const charts = document.querySelectorAll('.donut-chart');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const segment = entry.target.querySelector('.donut-segment');
                    if (segment) {
                        segment.style.strokeDasharray = segment.getAttribute('stroke-dasharray');
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        charts.forEach(chart => observer.observe(chart));
    }

    // ========================================
    // Revenue Streams Animation
    // ========================================

    /**
     * Animate revenue stream bars
     */
    function initStreamBars() {
        const streamItems = document.querySelectorAll('.stream-item');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target.querySelector('.stream-bar');
                    if (bar) {
                        const width = getComputedStyle(bar).getPropertyValue('--width');
                        bar.style.width = '0';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 100);
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        streamItems.forEach(item => observer.observe(item));
    }

    // ========================================
    // Initialization
    // ========================================

    /**
     * Initialize all functionality
     */
    async function init() {
        // Determine language
        currentLang = determineInitialLanguage();

        // Load translations for current language
        const trans = await loadTranslations(currentLang);
        if (trans) {
            translations[currentLang] = trans;
            applyTranslations(currentLang);
        }

        // Preload other language
        const otherLang = currentLang === 'pl' ? 'en' : 'pl';
        loadTranslations(otherLang).then(trans => {
            if (trans) translations[otherLang] = trans;
        });

        // Initialize components
        initNavigation();
        initLanguageToggle();
        initScrollAnimations();
        animateCounters();
        initContactForm();
        initScheduleButton();
        initCookieConsent();
        initChartAnimations();
        initStreamBars();
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
