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

    /* ---- Scroll Event ---- */
    var ticking = false;

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(function () {
                updateScrollProgress();
                updateNav();
                updateActiveNavLink();
                updateParallax();
                updateFloatingSymbols();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

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

    /* ========================================
       HERO CHARACTER SPLIT ANIMATION
       ======================================== */
    function initHeroChars() {
        var heading = document.querySelector('.hero-heading-line');
        if (!heading) return;

        var text = heading.textContent;
        heading.innerHTML = '';
        heading.setAttribute('aria-label', text);

        var chars = text.split('');
        chars.forEach(function (char, i) {
            var span = document.createElement('span');
            span.className = 'hero-char';
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.transitionDelay = (i * 0.04) + 's';
            heading.appendChild(span);
        });

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var spans = heading.querySelectorAll('.hero-char');
                        spans.forEach(function (span) {
                            span.classList.add('revealed');
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });

            observer.observe(heading);
        } else {
            heading.querySelectorAll('.hero-char').forEach(function (span) {
                span.classList.add('revealed');
            });
        }
    }

    /* ========================================
       PARALLAX SCROLL EFFECTS
       ======================================== */
    var heroContent = document.querySelector('.hero-content');
    var heroVisual = document.querySelector('.hero-visual');
    var sectionHeadings = document.querySelectorAll('.section-heading');
    var parallaxImages = document.querySelectorAll('.project-visual, .about-image-wrapper, .achievements-visual, .github-graph-wrapper');

    function updateParallax() {
        var scrollTop = window.pageYOffset;

        /* Hero parallax — content and visual move at different speeds */
        if (heroContent) {
            var heroOffset = scrollTop * 0.3;
            heroContent.style.transform = 'translateY(' + heroOffset + 'px)';
            heroContent.style.opacity = Math.max(0, 1 - scrollTop / 600);
        }
        if (heroVisual) {
            var visualOffset = scrollTop * 0.15;
            heroVisual.style.transform = 'translateY(' + visualOffset + 'px)';
        }

        /* Section heading parallax */
        sectionHeadings.forEach(function (heading) {
            var rect = heading.getBoundingClientRect();
            var windowHeight = window.innerHeight;
            if (rect.top < windowHeight && rect.bottom > 0) {
                var progress = (windowHeight - rect.top) / (windowHeight + rect.height);
                var offset = (progress - 0.5) * 30;
                heading.style.transform = 'translateY(' + offset + 'px)';
            }
        });

        /* Image parallax */
        parallaxImages.forEach(function (img) {
            var rect = img.getBoundingClientRect();
            var windowHeight = window.innerHeight;
            if (rect.top < windowHeight && rect.bottom > 0) {
                var progress = (windowHeight - rect.top) / (windowHeight + rect.height);
                var offset = (progress - 0.5) * 15;
                img.style.transform = 'translateY(' + offset + 'px)';
            }
        });
    }

    /* ========================================
       FLOATING SYMBOLS SCROLL DRIFT
       ======================================== */
    var heroSymbols = document.querySelectorAll('.hero-symbol');

    function updateFloatingSymbols() {
        var scrollTop = window.pageYOffset;
        if (scrollTop > window.innerHeight) return;

        heroSymbols.forEach(function (symbol, i) {
            var speed = 0.05 + (i * 0.03);
            var yOffset = scrollTop * speed;
            var xOffset = Math.sin(scrollTop * 0.002 + i) * 5;
            symbol.style.transform = 'translate(' + xOffset + 'px, ' + yOffset + 'px)';
        });
    }

    /* ========================================
       SCROLL REVEAL (Enhanced)
       ======================================== */
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

    /* ========================================
       ABOUT SECTION SLIDE-IN
       ======================================== */
    function initAboutReveal() {
        var imageCol = document.querySelector('.about-image-col');
        var contentCol = document.querySelector('.about-content-col');

        if (!imageCol || !contentCol) return;

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        imageCol.classList.add('revealed');
                        contentCol.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 });

            observer.observe(imageCol.closest('.about-grid'));
        } else {
            imageCol.classList.add('revealed');
            contentCol.classList.add('revealed');
        }
    }

    /* ========================================
       PROJECT DIRECTIONAL REVEALS
       ======================================== */
    function initProjectReveals() {
        var projects = document.querySelectorAll('.project');

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var content = entry.target.querySelector('.project-content');
                        var visual = entry.target.querySelector('.project-visual');
                        if (content) content.classList.add('revealed');
                        if (visual) visual.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

            projects.forEach(function (project) {
                observer.observe(project);
            });
        } else {
            projects.forEach(function (project) {
                var content = project.querySelector('.project-content');
                var visual = project.querySelector('.project-visual');
                if (content) content.classList.add('revealed');
                if (visual) visual.classList.add('revealed');
            });
        }
    }

    /* ========================================
       TIMELINE LINE DRAW + ITEMS
       ======================================== */
    function initTimeline() {
        var timelineLine = document.querySelector('.timeline-line');
        var timelineItems = document.querySelectorAll('.timeline-item');

        if (!timelineLine) return;

        if ('IntersectionObserver' in window) {
            var lineObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        timelineLine.classList.add('revealed');
                        lineObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            lineObserver.observe(timelineLine.closest('.achievements-timeline'));

            var itemObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        itemObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2, rootMargin: '0px 0px -30px 0px' });

            timelineItems.forEach(function (item) {
                itemObserver.observe(item);
            });
        } else {
            timelineLine.classList.add('revealed');
            timelineItems.forEach(function (item) {
                item.classList.add('revealed');
            });
        }
    }

    /* ========================================
       SKILL CATEGORY STAGGER
       ======================================== */
    function initSkillReveals() {
        var skillCategories = document.querySelectorAll('.skill-category');

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

            skillCategories.forEach(function (cat) {
                observer.observe(cat);
            });
        } else {
            skillCategories.forEach(function (cat) {
                cat.classList.add('revealed');
            });
        }
    }

    /* ========================================
       STATS COUNTER ANIMATION
       ======================================== */
    function animateCounter(el, target, suffix) {
        var duration = 1800;
        var start = 0;
        var startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = Math.floor(eased * target);
            el.textContent = current.toLocaleString() + (suffix || '');
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target.toLocaleString() + (suffix || '');
            }
        }

        requestAnimationFrame(step);
    }

    function initCounters() {
        var stats = document.querySelectorAll('.stat-number');

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var el = entry.target;
                        var text = el.textContent.trim();
                        var match = text.match(/^([\d,]+)\+?$/);
                        if (match) {
                            var num = parseInt(match[1].replace(/,/g, ''), 10);
                            var hasPlus = text.indexOf('+') !== -1;
                            animateCounter(el, num, hasPlus ? '+' : '');
                        }
                        observer.unobserve(el);
                    }
                });
            }, { threshold: 0.5 });

            stats.forEach(function (stat) {
                observer.observe(stat);
            });
        }
    }

    /* ========================================
       CONTACT TYPEWRITER HEADING
       ======================================== */
    function initContactTypewriter() {
        var heading = document.querySelector('.contact-heading');
        if (!heading) return;

        var text = heading.innerHTML;
        heading.setAttribute('aria-label', heading.textContent);

        /* Parse HTML and wrap each character */
        var result = '';
        var inTag = false;
        for (var i = 0; i < text.length; i++) {
            if (text[i] === '<') {
                inTag = true;
                result += text[i];
            } else if (text[i] === '>') {
                inTag = false;
                result += text[i];
            } else if (inTag) {
                result += text[i];
            } else if (text[i] === ' ') {
                result += '<span class="char">\u00A0</span>';
            } else if (text[i] === '\n') {
                result += '<br>';
            } else {
                result += '<span class="char">' + text[i] + '</span>';
            }
        }
        heading.innerHTML = result;

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var chars = heading.querySelectorAll('.char');
                        chars.forEach(function (char, idx) {
                            char.style.transitionDelay = (idx * 0.025) + 's';
                            char.classList.add('revealed');
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });

            observer.observe(heading);
        } else {
            heading.querySelectorAll('.char').forEach(function (char) {
                char.classList.add('revealed');
            });
        }
    }

    /* ========================================
       ABOUT STATS STAGGER
       ======================================== */
    function initAboutStats() {
        var stats = document.querySelectorAll('.about-stats .stat');

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });

            stats.forEach(function (stat) {
                observer.observe(stat);
            });
        } else {
            stats.forEach(function (stat) {
                stat.classList.add('revealed');
            });
        }
    }

    /* ========================================
       ACHIEVEMENTS VISUAL REVEAL
       ======================================== */
    function initAchievementsVisual() {
        var visual = document.querySelector('.achievements-visual');
        if (!visual) return;

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

            observer.observe(visual);
        } else {
            visual.classList.add('revealed');
        }
    }

    /* ========================================
       COPY EMAIL
       ======================================== */
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

    /* ========================================
       COPY PHONE
       ======================================== */
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

    /* ========================================
       INIT ALL
       ======================================== */
    updateScrollProgress();
    updateNav();
    initHeroChars();
    initReveal();
    initAboutReveal();
    initProjectReveals();
    initTimeline();
    initSkillReveals();
    initCounters();
    initContactTypewriter();
    initAboutStats();
    initAchievementsVisual();

})();
