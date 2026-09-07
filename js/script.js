/* ========================================
   KESHAV SAINI — PORTFOLIO 2026
   Vanilla JavaScript
   ======================================== */

(function () {
    'use strict';

    /* ---- DOM References ---- */
    var scrollProgress = document.getElementById('scrollProgress');
    var nav = document.getElementById('nav');
    var navToggle = document.getElementById('navToggle');
    var mobileMenu = document.getElementById('mobileMenu');
    var mobileLinks = document.querySelectorAll('.mobile-link');
    var navLinks = document.querySelectorAll('.nav-link');
    var copyEmailBtn = document.querySelector('.btn-copy-email');
    var copyPhoneBtn = document.querySelector('.btn-copy-phone');

    /* ---- Scroll Progress ---- */
    function updateScrollProgress() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    }

    /* ---- Navigation ---- */
    function updateNav() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 10) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    /* ---- Active Nav Link ---- */
    function updateActiveNavLink() {
        var sections = document.querySelectorAll('.section, .hero');
        var scrollTop = window.pageYOffset + window.innerHeight * 0.35;

        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');

            if (scrollTop >= top && scrollTop < top + height) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', function () {
        updateScrollProgress();
        updateNav();
        updateActiveNavLink();
    }, { passive: true });

    /* ---- Mobile Menu ---- */
    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    /* ---- Smooth Scroll ---- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                var offset = target.offsetTop - 64;
                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ---- Scroll Reveal ---- */
    function initReveal() {
        var revealElements = document.querySelectorAll('.reveal-text, .reveal-image');

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.08,
                rootMargin: '0px 0px -40px 0px'
            });

            revealElements.forEach(function (el) {
                observer.observe(el);
            });
        } else {
            revealElements.forEach(function (el) {
                el.classList.add('revealed');
            });
        }
    }

    /* ---- Copy Email ---- */
    if (copyEmailBtn) {
        var emailSvg = copyEmailBtn.innerHTML;
        copyEmailBtn.addEventListener('click', function () {
            var email = this.getAttribute('data-email');
            var btn = this;
            navigator.clipboard.writeText(email).then(function () {
                btn.textContent = 'COPIED!';
                btn.classList.add('copied');
                setTimeout(function () {
                    btn.innerHTML = emailSvg;
                    btn.classList.remove('copied');
                }, 2000);
            });
        });
    }

    /* ---- Copy Phone ---- */
    if (copyPhoneBtn) {
        var phoneSvg = copyPhoneBtn.innerHTML;
        copyPhoneBtn.addEventListener('click', function () {
            var phone = this.getAttribute('data-phone');
            var btn = this;
            navigator.clipboard.writeText(phone).then(function () {
                btn.textContent = 'COPIED!';
                btn.classList.add('copied');
                setTimeout(function () {
                    btn.innerHTML = phoneSvg;
                    btn.classList.remove('copied');
                }, 2000);
            });
        });
    }

    /* ---- Init ---- */
    updateScrollProgress();
    updateNav();
    initReveal();

})();
