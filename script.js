gsap.registerPlugin(ScrollTrigger);

        // Create enhanced floating particles with Apple-like aesthetics
        function createParticles() {
            const particlesContainer = document.querySelector('.particles');
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
                
                // Add variety to particles
                const size = Math.random() * 3 + 1;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                
                // Add subtle color variations
                const hue = Math.random() * 40 + 200; // Blue to purple range
                const opacity = Math.random() * 0.3 + 0.1;
                particle.style.backgroundColor = `hsla(${hue}, 100%, 70%, ${opacity})`;
                particle.style.boxShadow = `0 0 ${size * 2}px hsla(${hue}, 100%, 70%, ${opacity})`;
                
                particlesContainer.appendChild(particle);
            }
        }
        createParticles();

        // Advanced scroll progress with glow effect
        gsap.to(".scroll-progress", {
            width: "100%",
            ease: "none",
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
                onUpdate: (self) => {
                    const progress = self.progress;
                    document.querySelector('.scroll-progress').style.boxShadow = 
                        `0 0 ${20 * progress}px rgba(255,255,255,${0.5 + progress * 0.5})`;
                }
            }
        });

        // Apple-style hero animations with refined timing and effects
        const heroTl = gsap.timeline();
        
        // Animate company logo first
        heroTl
            .to(".company-logo", {
                duration: 1.2,
                opacity: 1,
                y: 0,
                ease: "power3.out"
            })
            // Then animate the main logo with a subtle reveal
            .to(".heart-pulse", {
                duration: 1.8,
                opacity: 1,
                y: 0,
                scale: 1,
                ease: "power2.out"
            }, "-=0.5")
            // Animate app name
            .to(".app-name", {
                duration: 1.2,
                opacity: 1,
                y: 0,
                scale: 1,
                ease: "power2.out"
            }, "-=1.0")
            // Animate tagline with a subtle blur effect
            .to(".tagline", {
                duration: 1.2,
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                ease: "power3.out",
                letterSpacing: "5px"
            }, "-=1.2")
            // Animate hero CTA with a word-by-word reveal
            .to(".hero-cta", {
                duration: 1.5,
                opacity: 1,
                y: 0,
                ease: "power2.out"
            }, "-=0.8");
            
        // Add subtle parallax effect to hero section
        gsap.to(".hero .container", {
            y: -80,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // Advanced section titles with line animation
        gsap.utils.toArray(".section-title").forEach(title => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: title,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
            
            tl.fromTo(title, 
                {opacity: 0, y: 50, scale: 0.9},
                {
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    duration: 1.5,
                    ease: "power3.out"
                }
            )
            .to(title.querySelector('::after') || title, {
                opacity: 1,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.5");
        });

        // Subtitle animations with blur effect
        gsap.utils.toArray(".section-subtitle").forEach(subtitle => {
            gsap.fromTo(subtitle, 
                {opacity: 0, y: 30, filter: "blur(10px)"},
                {
                    opacity: 1, 
                    y: 0, 
                    filter: "blur(0px)",
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: subtitle,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Apple-style iPhone 15 mockup animations with dynamic 3D effects
        gsap.utils.toArray(".phone-mockup").forEach((phone, index) => {
            const screen = phone.querySelector('.phone-screen');
            const notch = phone.querySelector('.phone-notch');
            const image = phone.querySelector('img');
            
            // Create a more sophisticated entrance animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: phone,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
            
            // Initial state - phone is rotated and scaled down
            tl.fromTo(phone, 
                {
                    opacity: 0, 
                    y: 100, 
                    rotationY: 30,
                    rotationX: 15,
                    scale: 0.8,
                    filter: "brightness(0.5) blur(10px)"
                },
                {
                    opacity: 1, 
                    y: 0, 
                    rotationY: 0,
                    rotationX: 0,
                    scale: 1,
                    filter: "brightness(1) blur(0px)",
                    duration: 1.8,
                    ease: "power3.out"
                }
            )
            // Animate the notch with a subtle glow effect
            .fromTo(notch, 
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
                "-=1.4"
            )
            // Animate the screen content with a subtle scale and brightness effect
            .fromTo(image, 
                { opacity: 0, scale: 1.1, filter: "brightness(0.7)" },
                { opacity: 1, scale: 1, filter: "brightness(1)", duration: 1.2, ease: "power2.out" },
                "-=1.2"
            )
            // Add a subtle floating animation
            .to(phone, {
                y: "-=15",
                duration: 2.5,
                ease: "power1.inOut",
                yoyo: true,
                repeat: -1
            });
            
            // Add interactive rotation on mouse movement for each phone
            const section = phone.closest('.section');
            if (section) {
                section.addEventListener('mousemove', (e) => {
                    const rect = section.getBoundingClientRect();
                    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
                    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
                    
                    gsap.to(phone, {
                        rotationY: mouseX * 10,
                        rotationX: -mouseY * 10,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                });
                
                section.addEventListener('mouseleave', () => {
                    gsap.to(phone, {
                        rotationY: 0,
                        rotationX: 0,
                        duration: 1,
                        ease: "elastic.out(1, 0.75)"
                    });
                });
            }
        });

        // Mockup content with typewriter effect
        gsap.utils.toArray(".mockup-content").forEach(content => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: content,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
            
            tl.fromTo(content, 
                {opacity: 0, x: -100, filter: "blur(5px)"},
                {
                    opacity: 1, 
                    x: 0, 
                    filter: "blur(0px)",
                    duration: 1.5,
                    ease: "power3.out"
                }
            );
            
            // Animate list items individually
            const listItems = content.querySelectorAll('.mockup-features li');
            listItems.forEach((item, index) => {
                tl.fromTo(item,
                    {opacity: 0, x: -30},
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        ease: "power2.out"
                    },
                    `-=${0.8 - index * 0.1}`
                );
            });
        });

        // Enhanced feature cards with advanced hover effects
        gsap.utils.toArray(".feature-card").forEach((card, index) => {
            const icon = card.querySelector('.feature-icon');
            const title = card.querySelector('.feature-title');
            const desc = card.querySelector('.feature-desc');
            
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    end: "bottom 15%",
                    toggleActions: "play none none reverse"
                }
            });
            
            tl.fromTo(card, 
                {opacity: 0, y: 80, scale: 0.8},
                {
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    delay: index * 0.1
                }
            )
            .fromTo(icon,
                {opacity: 0, y: 20, scale: 0.5},
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "elastic.out(1, 0.75)"
                },
                "-=0.8"
            )
            .fromTo(title,
                {opacity: 0, y: 20},
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out"
                },
                "-=0.4"
            )
            .fromTo(desc,
                {opacity: 0, y: 20},
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out"
                },
                "-=0.2"
            );
            
            // Advanced hover animations
            card.addEventListener("mouseenter", () => {
                gsap.to(card, {
                    duration: 0.4, 
                    y: -20, 
                    scale: 1.05, 
                    rotationY: 5,
                    boxShadow: "0 30px 80px rgba(255,255,255,0.1)",
                    ease: "power2.out"
                });
                gsap.to(icon, {
                    duration: 0.4,
                    scale: 1.2,
                    rotation: 10,
                    ease: "power2.out"
                });
            });
            
            card.addEventListener("mouseleave", () => {
                gsap.to(card, {
                    duration: 0.4, 
                    y: 0, 
                    scale: 1, 
                    rotationY: 0,
                    boxShadow: "none",
                    ease: "power2.out"
                });
                gsap.to(icon, {
                    duration: 0.4,
                    scale: 1,
                    rotation: 0,
                    ease: "power2.out"
                });
            });
        });

        // Advanced stats animations with counter effect
        gsap.utils.toArray(".stat-item").forEach((item, index) => {
            const number = item.querySelector('.stat-number');
            const originalText = number.textContent;
            
            gsap.fromTo(item, 
                {opacity: 0, y: 50, scale: 0.8},
                {
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    duration: 1.5,
                    ease: "power3.out",
                    delay: index * 0.2,
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse",
                        onStart: () => {
                            // Counter animation
                            if (originalText.includes('+') || originalText.includes('%') || originalText.includes('★')) {
                                const numValue = parseFloat(originalText);
                                gsap.fromTo({value: 0}, 
                                    {value: numValue},
                                    {
                                        duration: 2,
                                        ease: "power2.out",
                                        onUpdate: function() {
                                            number.textContent = Math.floor(this.targets()[0].value) + originalText.replace(/[\d.]/g, '');
                                        },
                                        onComplete: () => {
                                            number.textContent = originalText;
                                        }
                                    }
                                );
                            }
                        }
                    }
                }
            );
            
            gsap.fromTo(number, 
                {opacity: 0, scale: 0.3},
                {
                    opacity: 1, 
                    scale: 1,
                    duration: 2,
                    ease: "elastic.out(1, 0.75)",
                    scrollTrigger: {
                        trigger: number,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Enhanced CTA button with magnetic effect
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            gsap.fromTo(ctaButton, 
                {opacity: 0, y: 50, scale: 0.8},
                {
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    duration: 1.5,
                    ease: "elastic.out(1, 0.75)",
                    scrollTrigger: {
                        trigger: ctaButton,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
            
            // Magnetic hover effect
            ctaButton.addEventListener('mousemove', (e) => {
                const rect = ctaButton.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                gsap.to(ctaButton, {
                    duration: 0.3,
                    x: x * 0.3,
                    y: y * 0.3,
                    ease: "power2.out"
                });
            });
            
            ctaButton.addEventListener('mouseleave', () => {
                gsap.to(ctaButton, {
                    duration: 0.5,
                    x: 0,
                    y: 0,
                    ease: "elastic.out(1, 0.75)"
                });
            });
        }

        // Advanced parallax effects
        gsap.utils.toArray(".phone-mockup").forEach(phone => {
            gsap.to(phone, {
                y: -100,
                ease: "none",
                scrollTrigger: {
                    trigger: phone,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 2
                }
            });
        });

        // Intersection Observer for advanced animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -10% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                } else {
                    entry.target.classList.remove('animate-in');
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });

        // Smooth scroll enhancement
        document.documentElement.style.scrollBehavior = 'smooth';
        
        // Add loading states
        window.addEventListener('load', () => {
            gsap.to('body', {opacity: 1, duration: 0.5});
        });

        // New Enhanced Sections Animations

        // Animate AI Brain
        gsap.to(".brain-core", {
            rotation: 360,
            duration: 15,
            repeat: -1,
            ease: "none"
        });

        // Animate neural nodes
        gsap.utils.toArray(".neural-node").forEach((node, i) => {
            gsap.to(node, {
                scale: 1.5,
                opacity: 0.8,
                duration: 2,
                repeat: -1,
                yoyo: true,
                delay: i * 0.3,
                ease: "power2.inOut"
            });
        });

        // Animate data streams
        gsap.utils.toArray(".stream").forEach((stream, i) => {
            gsap.to(stream, {
                opacity: 1,
                duration: 2,
                repeat: -1,
                yoyo: true,
                delay: i * 0.7,
                ease: "power2.inOut"
            });
        });

        // Animate vision cards
        gsap.utils.toArray(".vision-card-new").forEach((card, i) => {
            gsap.fromTo(card, {
                x: i % 2 === 0 ? -100 : 100,
                opacity: 0,
                scale: 0.8
            }, {
                x: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Animate advantage cards with stats
        gsap.utils.toArray(".advantage-card-new").forEach((card, i) => {
            const stat = card.querySelector('.advantage-stat');

            gsap.fromTo(card, {
                y: 80,
                opacity: 0,
                scale: 0.9
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1,
                delay: i * 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });

            // Animate stat numbers
            if (stat) {
                gsap.fromTo(stat, {
                    scale: 0,
                    rotation: -180
                }, {
                    scale: 1,
                    rotation: 0,
                    duration: 1.5,
                    delay: i * 0.15 + 0.5,
                    ease: "elastic.out(1, 0.75)",
                    scrollTrigger: {
                        trigger: stat,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                });
            }
        });

        // Animate innovative features with hover effects
        gsap.utils.toArray(".feature-card-new").forEach((card, i) => {
            gsap.fromTo(card, {
                y: 100,
                opacity: 0,
                rotationY: 20
            }, {
                y: 0,
                opacity: 1,
                rotationY: 0,
                duration: 1.2,
                delay: i * 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Animate market stats with counter effect
        gsap.utils.toArray(".stat-number-new").forEach((number, i) => {
            const targetValue = parseFloat(number.getAttribute('data-target'));

            gsap.fromTo({value: 0}, {
                value: targetValue,
                duration: 2.5,
                delay: i * 0.3,
                ease: "power2.out",
                onUpdate: function() {
                    number.textContent = Math.floor(this.targets()[0].value * 10) / 10;
                },
                onComplete: () => {
                    number.textContent = targetValue;
                },
                scrollTrigger: {
                    trigger: number,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Animate chart bars
        gsap.utils.toArray(".chart-bar").forEach((bar, i) => {
            const fill = bar.querySelector('.bar-fill');
            const height = bar.getAttribute('data-height');

            gsap.fromTo(fill, {
                height: '0%'
            }, {
                height: height + '%',
                duration: 2,
                delay: i * 0.3,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: bar,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Animate expansion phases
        gsap.utils.toArray(".phase-new").forEach((phase, i) => {
            gsap.fromTo(phase, {
                x: -100,
                opacity: 0
            }, {
                x: 0,
                opacity: 1,
                duration: 1,
                delay: i * 0.4,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: phase,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Animate metric cards
        gsap.utils.toArray(".metric-card").forEach((card, i) => {
            gsap.fromTo(card, {
                y: 50,
                opacity: 0,
                scale: 0.9
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                delay: i * 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Animate benefit stat cards
        gsap.utils.toArray(".benefit-stat-card").forEach((card, i) => {
            gsap.fromTo(card, {
                y: 100,
                opacity: 0,
                rotationY: 15
            }, {
                y: 0,
                opacity: 1,
                rotationY: 0,
                duration: 1.2,
                delay: i * 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Animate scale bars
        gsap.utils.toArray(".scale-bar").forEach((bar, i) => {
            const scale = bar.getAttribute('data-scale');

            gsap.fromTo(bar, {
                width: '0%'
            }, {
                width: scale + '%',
                duration: 2,
                delay: i * 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: bar,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Animate holographic buildings
        gsap.utils.toArray(".holo-building").forEach((building, i) => {
            gsap.to(building, {
                y: -20,
                duration: 3 + i * 0.5,
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut"
            });
        });

        // Animate floating elements
        gsap.utils.toArray(".float-element").forEach((element, i) => {
            gsap.to(element, {
                y: -30,
                rotation: 5,
                duration: 4 + i,
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut"
            });
        });

        // Animate conclusion text
        gsap.fromTo(".conclusion-title-new", {
            y: 80,
            opacity: 0,
            scale: 0.8
        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".conclusion-title-new",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        gsap.fromTo(".conclusion-subtitle-new", {
            y: 50,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            delay: 0.3,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".conclusion-subtitle-new",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        gsap.fromTo(".conclusion-description-new", {
            y: 40,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.6,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".conclusion-description-new",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        gsap.fromTo(".cta-button-new", {
            y: 50,
            opacity: 0,
            scale: 0.8
        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            delay: 0.9,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: ".cta-button-new",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        // Redesigned Sections Animations

        // Future of News Hero Animations
        gsap.utils.toArray(".future-stat-card").forEach((card, i) => {
            gsap.fromTo(card, {
                y: 100,
                opacity: 0,
                scale: 0.8
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                delay: i * 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Animate future stats counter
        gsap.utils.toArray(".stat-number-future").forEach((number, i) => {
            const targetValue = parseFloat(number.getAttribute('data-target'));

            gsap.fromTo({value: 0}, {
                value: targetValue,
                duration: 3,
                delay: i * 0.3,
                ease: "power2.out",
                onUpdate: function() {
                    if (targetValue >= 100) {
                        number.textContent = Math.floor(this.targets()[0].value);
                    } else {
                        number.textContent = (Math.floor(this.targets()[0].value * 10) / 10).toFixed(1);
                    }
                },
                onComplete: () => {
                    number.textContent = targetValue;
                },
                scrollTrigger: {
                    trigger: number,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Animate progress rings in future stats
        gsap.utils.toArray(".progress-fill").forEach((circle, i) => {
            const progress = circle.getAttribute('data-progress');
            const circumference = 2 * Math.PI * 35;
            const offset = circumference - (progress / 100) * circumference;

            gsap.fromTo(circle, {
                strokeDashoffset: circumference
            }, {
                strokeDashoffset: offset,
                duration: 2,
                delay: i * 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: circle,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Expansion Roadmap Timeline Progress
        gsap.to(".timeline-progress", {
            width: "100%",
            duration: 3,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".timeline-container",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        // Animate timeline nodes
        gsap.utils.toArray(".timeline-node").forEach((node, i) => {
            gsap.fromTo(node, {
                scale: 0,
                opacity: 0
            }, {
                scale: 1,
                opacity: 1,
                duration: 0.8,
                delay: i * 0.3,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: node,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Expansion Roadmap Quarter Cards
        gsap.utils.toArray(".quarter-card").forEach((card, i) => {
            gsap.fromTo(card, {
                y: 150,
                opacity: 0,
                scale: 0.8
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.5,
                delay: i * 0.3,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Animate quarter stats counter
        gsap.utils.toArray(".stat-number-quarter").forEach((number, i) => {
            const targetValue = parseFloat(number.getAttribute('data-target'));

            gsap.fromTo({value: 0}, {
                value: targetValue,
                duration: 2.5,
                delay: i * 0.4,
                ease: "power2.out",
                onUpdate: function() {
                    if (targetValue >= 100) {
                        number.textContent = Math.floor(this.targets()[0].value);
                    } else {
                        number.textContent = (Math.floor(this.targets()[0].value * 10) / 10).toFixed(1);
                    }
                },
                onComplete: () => {
                    number.textContent = targetValue;
                },
                scrollTrigger: {
                    trigger: number,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Animate quarter progress bars
        gsap.utils.toArray(".progress-fill").forEach((progress, i) => {
            const progressValue = progress.getAttribute('data-progress');

            gsap.fromTo(progress, {
                width: "0%"
            }, {
                width: progressValue + "%",
                duration: 2,
                delay: i * 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: progress,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });



        // Floating elements animation
        gsap.utils.toArray(".float-element").forEach((element, i) => {
            gsap.to(element, {
                y: -30,
                duration: 3,
                delay: i * 0.5,
                ease: "power2.inOut",
                yoyo: true,
                repeat: -1
            });
        });

        // Screen content animations
        gsap.utils.toArray(".data-stream, .news-feed, .analytics-chart").forEach((stream, i) => {
            gsap.to(stream, {
                x: "100%",
                duration: 2,
                delay: i * 0.3,
                ease: "none",
                repeat: -1
            });
        });

        // Hologram lines animation
        gsap.utils.toArray(".hologram-line").forEach((line, i) => {
            gsap.to(line, {
                scaleX: 1.2,
                opacity: 0.8,
                duration: 2,
                delay: i * 0.5,
                ease: "power2.inOut",
                yoyo: true,
                repeat: -1
            });
        });

        // AI assistant pulse animation
        gsap.to(".ai-pulse", {
            scale: 2,
            opacity: 0,
            duration: 3,
            ease: "power2.out",
            repeat: -1
        });

        // Digital globe rotation
        gsap.to(".digital-globe", {
            rotation: 360,
            duration: 30,
            ease: "none",
            repeat: -1
        });

        // Data points pulse animation
        gsap.utils.toArray(".data-point").forEach((point, i) => {
            gsap.to(point, {
                scale: 1.5,
                opacity: 1,
                duration: 1.5,
                delay: i * 0.6,
                ease: "power2.inOut",
                yoyo: true,
                repeat: -1
            });
        });



        // Market Opportunity Statistics Analysis Animations
        gsap.utils.toArray(".stat-analysis-card").forEach((card, i) => {
            gsap.fromTo(card, {
                y: 120,
                opacity: 0,
                rotationY: 20
            }, {
                y: 0,
                opacity: 1,
                rotationY: 0,
                duration: 1.5,
                delay: i * 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Animate statistics numbers
        gsap.utils.toArray(".stat-number").forEach((number, i) => {
            const targetValue = parseFloat(number.getAttribute('data-target'));

            gsap.fromTo({value: 0}, {
                value: targetValue,
                duration: 3,
                delay: i * 0.3,
                ease: "power2.out",
                onUpdate: function() {
                    if (targetValue >= 100) {
                        number.textContent = Math.floor(this.targets()[0].value);
                    } else {
                        number.textContent = (Math.floor(this.targets()[0].value * 10) / 10).toFixed(1);
                    }
                },
                onComplete: () => {
                    number.textContent = targetValue;
                },
                scrollTrigger: {
                    trigger: number,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Animate chart bars
        gsap.utils.toArray(".chart-bar").forEach((bar, i) => {
            const height = bar.style.height;
            
            gsap.fromTo(bar, {
                height: 0
            }, {
                height: height,
                duration: 1.5,
                delay: i * 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: bar,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Animate line charts
        gsap.utils.toArray(".line-path").forEach((path, i) => {
            gsap.fromTo(path, {
                strokeDasharray: "0 1000"
            }, {
                strokeDasharray: "1000 0",
                duration: 2,
                delay: i * 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: path,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Animate pie charts
        gsap.utils.toArray(".pie-chart").forEach((pie, i) => {
            gsap.fromTo(pie, {
                transform: "rotate(0deg) scale(0)"
            }, {
                transform: "rotate(360deg) scale(1)",
                duration: 2,
                delay: i * 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: pie,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Animate area charts
        gsap.utils.toArray(".area-path, .area-line").forEach((area, i) => {
            gsap.fromTo(area, {
                strokeDasharray: "0 1000",
                fillOpacity: 0
            }, {
                strokeDasharray: "1000 0",
                fillOpacity: 1,
                duration: 2,
                delay: i * 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: area,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Animate segmentation cards
        gsap.utils.toArray(".segment-card").forEach((card, i) => {
            gsap.fromTo(card, {
                x: i % 2 === 0 ? -100 : 100,
                opacity: 0,
                scale: 0.9
            }, {
                x: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                delay: i * 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Animate enhanced insights
        gsap.utils.toArray(".insight-card.primary, .insight-card.secondary").forEach((card, i) => {
            gsap.fromTo(card, {
                y: 80,
                opacity: 0,
                scale: 0.9
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                delay: i * 0.3,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Animate dashboard header
        gsap.fromTo(".stats-dashboard-header", {
            y: -50,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".stats-dashboard-header",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        // Animate analysis header
        gsap.fromTo(".analysis-header", {
            y: 50,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".analysis-header",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        // New Hero Branding Animations
        gsap.to(".company-branding", {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.5,
            ease: "power3.out"
        });



        // Impact Statistics Animations
        gsap.utils.toArray(".impact-stat-card").forEach((card, i) => {
            gsap.fromTo(card, {
                y: 100,
                opacity: 0,
                scale: 0.8
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                delay: i * 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Impact Numbers Counter Animation
        gsap.utils.toArray(".impact-number").forEach((number, i) => {
            const targetValue = parseFloat(number.getAttribute('data-target'));

            gsap.fromTo({value: 0}, {
                value: targetValue,
                duration: 2.5,
                delay: i * 0.3,
                ease: "power2.out",
                onUpdate: function() {
                    if (targetValue === 4.8) {
                        number.textContent = (Math.floor(this.targets()[0].value * 10) / 10).toFixed(1);
                    } else if (targetValue === 2.5) {
                        number.textContent = (Math.floor(this.targets()[0].value * 10) / 10).toFixed(1);
                    } else if (targetValue === 99.2) {
                        number.textContent = (Math.floor(this.targets()[0].value * 10) / 10).toFixed(1);
                    } else {
                        number.textContent = Math.floor(this.targets()[0].value).toLocaleString();
                    }
                },
                onComplete: () => {
                    if (targetValue === 4.8) {
                        number.textContent = "4.8";
                    } else if (targetValue === 2.5) {
                        number.textContent = "2.5";
                    } else if (targetValue === 99.2) {
                        number.textContent = "99.2";
                    } else {
                        number.textContent = targetValue.toLocaleString();
                    }
                },
                scrollTrigger: {
                    trigger: number,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Pricing Comparison Animations
        gsap.utils.toArray(".plan-card").forEach((card, i) => {
            gsap.fromTo(card, {
                y: 80,
                opacity: 0,
                scale: 0.9
            }, {
                y: 0,
                opacity: 1,
                scale: card.classList.contains('featured') ? 1.05 : 1,
                duration: 1.2,
                delay: i * 0.3,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Privacy Features Animation
        gsap.utils.toArray(".privacy-feature").forEach((feature, i) => {
            gsap.fromTo(feature, {
                y: 60,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 1,
                delay: i * 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: feature,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Chart Bars Animation
        gsap.utils.toArray(".chart-bar").forEach((bar, i) => {
            const height = bar.getAttribute('data-height');

            gsap.fromTo(bar, {
                height: '0%'
            }, {
                height: height + '%',
                duration: 1.5,
                delay: i * 0.3,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: bar,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Solution Cards Animation
        gsap.utils.toArray(".solution-card").forEach((card, i) => {
            gsap.fromTo(card, {
                y: 80,
                opacity: 0,
                rotationY: 15
            }, {
                y: 0,
                opacity: 1,
                rotationY: 0,
                duration: 1.2,
                delay: i * 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Thank You Section Animation
        gsap.fromTo(".thank-you-title", {
            y: 80,
            opacity: 0,
            scale: 0.8
        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".thank-you-title",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        gsap.fromTo(".final-cta-button", {
            y: 50,
            opacity: 0,
            scale: 0.8
        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            delay: 0.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: ".final-cta-button",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        // Interactive World Map Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize map markers
    initializeMapMarkers();
    
    // Add scroll animations for map section
    initializeMapScrollAnimations();
});

function initializeMapMarkers() {
    const markers = document.querySelectorAll('.country-marker');
    
    markers.forEach(marker => {
        const popup = marker.querySelector('.country-popup');
        
        // Show popup on hover
        marker.addEventListener('mouseenter', function() {
            // Hide all other popups first
            document.querySelectorAll('.country-popup').forEach(p => {
                p.style.opacity = '0';
                p.style.visibility = 'hidden';
            });
            
            // Show current popup
            popup.style.opacity = '1';
            popup.style.visibility = 'visible';
            popup.style.transform = 'translateX(-50%) translateY(10px)';
        });
        
        // Hide popup on mouse leave
        marker.addEventListener('mouseleave', function() {
            popup.style.opacity = '0';
            popup.style.visibility = 'hidden';
            popup.style.transform = 'translateX(-50%) translateY(0)';
        });
        
        // Add click functionality for mobile
        marker.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                
                // Toggle popup visibility on mobile
                const isVisible = popup.style.opacity === '1';
                
                if (isVisible) {
                    popup.style.opacity = '0';
                    popup.style.visibility = 'hidden';
                } else {
                    // Hide all other popups
                    document.querySelectorAll('.country-popup').forEach(p => {
                        p.style.opacity = '0';
                        p.style.visibility = 'hidden';
                    });
                    
                    // Show current popup
                    popup.style.opacity = '1';
                    popup.style.visibility = 'visible';
                }
            }
        });
    });
}

function initializeMapScrollAnimations() {
    // Animate map elements on scroll
    const mapSection = document.querySelector('.world-map-section');
    const mapImage = document.querySelector('.world-map-image');
    const summaryCards = document.querySelectorAll('.summary-card');
    
    if (!mapSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate map image
                if (mapImage) {
                    gsap.fromTo(mapImage, 
                        { opacity: 0, scale: 0.8, y: 50 },
                        { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power2.out" }
                    );
                }
                
                // Animate summary cards with stagger
                if (summaryCards.length > 0) {
                    gsap.fromTo(summaryCards,
                        { opacity: 0, y: 30 },
                        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
                    );
                }
                
                // Animate markers with delay
                const markers = document.querySelectorAll('.country-marker');
                markers.forEach((marker, index) => {
                    gsap.fromTo(marker,
                        { opacity: 0, scale: 0 },
                        { opacity: 1, scale: 1, duration: 0.6, delay: 0.5 + (index * 0.1), ease: "back.out(1.7)" }
                    );
                });
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(mapSection);
}

// Add smooth scrolling for map section
function scrollToMapSection() {
    const mapSection = document.querySelector('.world-map-section');
    if (mapSection) {
        mapSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Export function for potential external use
window.scrollToMapSection = scrollToMapSection;
        

        // Interactive World Map Functionality
        function initializeWorldMap() {
            const countryMarkers = document.querySelectorAll('.country-marker');
            const mapContainer = document.querySelector('.map-container');
            
            if (!countryMarkers.length || !mapContainer) return;

            // Mobile detection
            const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
            
            // Country data for launch phases
            const countryData = {
                egypt: {
                    name: 'Egypt',
                    flag: '🇪🇬',
                    phase: 'Phase 1 - Q1 2025',
                    population: '104M',
                    mobile: '85%',
                    market: '$12B',
                    color: '#007bff'
                },
                jordan: {
                    name: 'Jordan', 
                    flag: '🇯🇴',
                    phase: 'Phase 1 - Q1 2025',
                    population: '11M',
                    mobile: '92%',
                    market: '$3.2B',
                    color: '#007bff'
                },
                italy: {
                    name: 'Italy',
                    flag: '🇮🇹', 
                    phase: 'Phase 2 - Q2 2025',
                    population: '60M',
                    mobile: '88%',
                    market: '$18B',
                    color: '#28a745'
                },
                france: {
                    name: 'France',
                    flag: '🇫🇷',
                    phase: 'Phase 2 - Q2 2025', 
                    population: '67M',
                    mobile: '91%',
                    market: '$22B',
                    color: '#28a745'
                },
                england: {
                    name: 'United Kingdom',
                    flag: '🇬🇧',
                    phase: 'Phase 2 - Q2 2025',
                    population: '67M', 
                    mobile: '95%',
                    market: '$25B',
                    color: '#28a745'
                }
            };

            // Animate markers on scroll
            countryMarkers.forEach((marker, index) => {
                const countryKey = marker.getAttribute('data-country');
                const data = countryData[countryKey];
                
                if (data) {
                    // Set marker color based on phase
                    const markerDot = marker.querySelector('.marker-dot');
                    const markerPulse = marker.querySelector('.marker-pulse');
                    
                    if (markerDot) {
                        markerDot.style.background = `linear-gradient(135deg, ${data.color}, ${data.color}dd)`;
                        markerDot.style.boxShadow = `0 0 20px ${data.color}66`;
                    }
                    
                    if (markerPulse) {
                        markerPulse.style.borderColor = data.color;
                    }
                }

                // Animate marker entrance
                gsap.fromTo(marker, {
                    scale: 0,
                    opacity: 0
                }, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: '.world-map-section',
                        start: 'top 60%',
                        end: 'bottom 40%',
                        toggleActions: 'play none none reverse'
                    }
                });
            });

            // Mobile-friendly interactions
            if (isMobile) {
                // Touch interactions for mobile
                countryMarkers.forEach(marker => {
                    const popup = marker.querySelector('.country-popup');
                    let isPopupVisible = false;
                    
                    // Touch start event
                    marker.addEventListener('touchstart', (e) => {
                        e.preventDefault();
                        
                        // Hide all other popups
                        countryMarkers.forEach(otherMarker => {
                            if (otherMarker !== marker) {
                                const otherPopup = otherMarker.querySelector('.country-popup');
                                if (otherPopup) {
                                    gsap.to(otherPopup, {
                                        opacity: 0,
                                        visibility: 'hidden',
                                        y: 10,
                                        duration: 0.2
                                    });
                                }
                            }
                        });
                        
                        // Toggle current popup
                        if (!isPopupVisible) {
                            gsap.to(popup, {
                                opacity: 1,
                                visibility: 'visible',
                                y: 0,
                                duration: 0.3,
                                ease: 'power2.out'
                            });
                            isPopupVisible = true;
                        } else {
                            gsap.to(popup, {
                                opacity: 0,
                                visibility: 'hidden',
                                y: 10,
                                duration: 0.2
                            });
                            isPopupVisible = false;
                        }
                    });
                    
                    // Reset popup visibility state when touched outside
                    marker.addEventListener('touchend', () => {
                        setTimeout(() => {
                            isPopupVisible = false;
                        }, 100);
                    });
                });
                
                // Close popups when touching outside
                document.addEventListener('touchstart', (e) => {
                    if (!e.target.closest('.country-marker')) {
                        countryMarkers.forEach(marker => {
                            const popup = marker.querySelector('.country-popup');
                            if (popup) {
                                gsap.to(popup, {
                                    opacity: 0,
                                    visibility: 'hidden',
                                    y: 10,
                                    duration: 0.2
                                });
                            }
                        });
                    }
                });
                
            } else {
                // Desktop hover interactions
                countryMarkers.forEach(marker => {
                    const popup = marker.querySelector('.country-popup');
                    
                    marker.addEventListener('mouseenter', () => {
                        gsap.to(popup, {
                            opacity: 1,
                            visibility: 'visible',
                            y: 0,
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                        
                        gsap.to(marker, {
                            scale: 1.1,
                            duration: 0.2,
                            ease: 'power2.out'
                        });
                    });
                    
                    marker.addEventListener('mouseleave', () => {
                        gsap.to(popup, {
                            opacity: 0,
                            visibility: 'hidden',
                            y: 10,
                            duration: 0.2
                        });
                        
                        gsap.to(marker, {
                            scale: 1,
                            duration: 0.2,
                            ease: 'power2.out'
                        });
                    });
                });
            }

            // Animate launch legend
            gsap.fromTo('.launch-legend', {
                y: 50,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 1,
                delay: 0.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.launch-legend',
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            });

            // Animate market summary cards
            gsap.utils.toArray('.summary-card').forEach((card, index) => {
                gsap.fromTo(card, {
                    y: 60,
                    opacity: 0,
                    scale: 0.9
                }, {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    }
                });
            });

            // Animate summary numbers with counter effect
            gsap.utils.toArray('.summary-number').forEach(numberEl => {
                const finalText = numberEl.textContent;
                const isNumeric = /^[\d.]+/.test(finalText);
                
                if (isNumeric) {
                    const finalNumber = parseFloat(finalText.replace(/[^\d.]/g, ''));
                    const unit = finalText.replace(/[\d.]/g, '');
                    
                    gsap.fromTo(numberEl, {
                        textContent: 0
                    }, {
                        textContent: finalNumber,
                        duration: 2,
                        ease: 'power2.out',
                        snap: { textContent: 0.1 },
                        onUpdate: function() {
                            const current = parseFloat(this.targets()[0].textContent);
                            numberEl.textContent = current.toFixed(1) + unit;
                        },
                        scrollTrigger: {
                            trigger: numberEl,
                            start: 'top 80%',
                            end: 'bottom 20%',
                            toggleActions: 'play none none reverse'
                        }
                    });
                }
            });
        }

        // Responsive map adjustments
        function adjustMapForDevice() {
            const mapContainer = document.querySelector('.map-container');
            const worldMapBg = document.querySelector('.world-map-bg');
            
            if (!mapContainer || !worldMapBg) return;
            
            const handleResize = () => {
                const isMobile = window.innerWidth <= 768;
                const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
                
                // Adjust map height based on device
                if (isMobile) {
                    worldMapBg.style.height = window.innerWidth < 480 ? '300px' : '400px';
                } else if (isTablet) {
                    worldMapBg.style.height = '500px';
                } else {
                    worldMapBg.style.height = '600px';
                }
                
                // Reinitialize interactions on resize
                initializeWorldMap();
            };
            
            // Initial adjustment
            handleResize();
            
            // Listen for resize events (debounced)
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(handleResize, 250);
            });
        }

        // Initialize map when DOM is ready
        document.addEventListener('DOMContentLoaded', () => {
            initializeWorldMap();
            adjustMapForDevice();
        });

        // Also initialize if already loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                initializeWorldMap();
                adjustMapForDevice();
            });
        } else {
            initializeWorldMap();
            adjustMapForDevice();
        }


        // Floating elements animation
        gsap.utils.toArray(".float-element").forEach((element, i) => {
            gsap.to(element, {
                y: -30,
                duration: 3,
                delay: i * 0.5,
                ease: "power2.inOut",
                yoyo: true,
                repeat: -1
            });
        });

        // Screen content animations
        gsap.utils.toArray(".data-stream, .news-feed, .analytics-chart").forEach((stream, i) => {
            gsap.to(stream, {
                x: "100%",
                duration: 2,
                delay: i * 0.3,
                ease: "none",
                repeat: -1
            });
        });

        // Hologram lines animation
        gsap.utils.toArray(".hologram-line").forEach((line, i) => {
            gsap.to(line, {
                scaleX: 1.2,
                opacity: 0.8,
                duration: 2,
                delay: i * 0.5,
                ease: "power2.inOut",
                yoyo: true,
                repeat: -1
            });
        });

        // AI assistant pulse animation
        gsap.to(".ai-pulse", {
            scale: 2,
            opacity: 0,
            duration: 3,
            ease: "power2.out",
            repeat: -1
        });

        // Digital globe rotation
        gsap.to(".digital-globe", {
            rotation: 360,
            duration: 30,
            ease: "none",
            repeat: -1
        });

        // Data points pulse animation
        gsap.utils.toArray(".data-point").forEach((point, i) => {
            gsap.to(point, {
                scale: 1.5,
                opacity: 1,
                duration: 1.5,
                delay: i * 0.6,
                ease: "power2.inOut",
                yoyo: true,
                repeat: -1
            });
        });



        // Market Opportunity Statistics Analysis Animations
        gsap.utils.toArray(".stat-analysis-card").forEach((card, i) => {
            gsap.fromTo(card, {
                y: 120,
                opacity: 0,
                rotationY: 20
            }, {
                y: 0,
                opacity: 1,
                rotationY: 0,
                duration: 1.5,
                delay: i * 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Animate statistics numbers
        gsap.utils.toArray(".stat-number").forEach((number, i) => {
            const targetValue = parseFloat(number.getAttribute('data-target'));

            gsap.fromTo({value: 0}, {
                value: targetValue,
                duration: 3,
                delay: i * 0.3,
                ease: "power2.out",
                onUpdate: function() {
                    if (targetValue >= 100) {
                        number.textContent = Math.floor(this.targets()[0].value);
                    } else {
                        number.textContent = (Math.floor(this.targets()[0].value * 10) / 10).toFixed(1);
                    }
                },
                onComplete: () => {
                    number.textContent = targetValue;
                },
                scrollTrigger: {
                    trigger: number,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Animate chart bars
        gsap.utils.toArray(".chart-bar").forEach((bar, i) => {
            const height = bar.style.height;
            
            gsap.fromTo(bar, {
                height: 0
            }, {
                height: height,
                duration: 1.5,
                delay: i * 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: bar,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Animate line charts
        gsap.utils.toArray(".line-path").forEach((path, i) => {
            gsap.fromTo(path, {
                strokeDasharray: "0 1000"
            }, {
                strokeDasharray: "1000 0",
                duration: 2,
                delay: i * 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: path,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Animate pie charts
        gsap.utils.toArray(".pie-chart").forEach((pie, i) => {
            gsap.fromTo(pie, {
                transform: "rotate(0deg) scale(0)"
            }, {
                transform: "rotate(360deg) scale(1)",
                duration: 2,
                delay: i * 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: pie,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Animate area charts
        gsap.utils.toArray(".area-path, .area-line").forEach((area, i) => {
            gsap.fromTo(area, {
                strokeDasharray: "0 1000",
                fillOpacity: 0
            }, {
                strokeDasharray: "1000 0",
                fillOpacity: 1,
                duration: 2,
                delay: i * 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: area,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Animate segmentation cards
        gsap.utils.toArray(".segment-card").forEach((card, i) => {
            gsap.fromTo(card, {
                x: i % 2 === 0 ? -100 : 100,
                opacity: 0,
                scale: 0.9
            }, {
                x: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                delay: i * 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Animate enhanced insights
        gsap.utils.toArray(".insight-card.primary, .insight-card.secondary").forEach((card, i) => {
            gsap.fromTo(card, {
                y: 80,
                opacity: 0,
                scale: 0.9
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                delay: i * 0.3,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Animate dashboard header
        gsap.fromTo(".stats-dashboard-header", {
            y: -50,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".stats-dashboard-header",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        // Animate analysis header
        gsap.fromTo(".analysis-header", {
            y: 50,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".analysis-header",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        // New Hero Branding Animations
        gsap.to(".company-branding", {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.5,
            ease: "power3.out"
        });



        // Impact Statistics Animations
        gsap.utils.toArray(".impact-stat-card").forEach((card, i) => {
            gsap.fromTo(card, {
                y: 100,
                opacity: 0,
                scale: 0.8
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                delay: i * 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Impact Numbers Counter Animation
        gsap.utils.toArray(".impact-number").forEach((number, i) => {
            const targetValue = parseFloat(number.getAttribute('data-target'));

            gsap.fromTo({value: 0}, {
                value: targetValue,
                duration: 2.5,
                delay: i * 0.3,
                ease: "power2.out",
                onUpdate: function() {
                    if (targetValue === 4.8) {
                        number.textContent = (Math.floor(this.targets()[0].value * 10) / 10).toFixed(1);
                    } else if (targetValue === 2.5) {
                        number.textContent = (Math.floor(this.targets()[0].value * 10) / 10).toFixed(1);
                    } else if (targetValue === 99.2) {
                        number.textContent = (Math.floor(this.targets()[0].value * 10) / 10).toFixed(1);
                    } else {
                        number.textContent = Math.floor(this.targets()[0].value).toLocaleString();
                    }
                },
                onComplete: () => {
                    if (targetValue === 4.8) {
                        number.textContent = "4.8";
                    } else if (targetValue === 2.5) {
                        number.textContent = "2.5";
                    } else if (targetValue === 99.2) {
                        number.textContent = "99.2";
                    } else {
                        number.textContent = targetValue.toLocaleString();
                    }
                },
                scrollTrigger: {
                    trigger: number,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Pricing Comparison Animations
        gsap.utils.toArray(".plan-card").forEach((card, i) => {
            gsap.fromTo(card, {
                y: 80,
                opacity: 0,
                scale: 0.9
            }, {
                y: 0,
                opacity: 1,
                scale: card.classList.contains('featured') ? 1.05 : 1,
                duration: 1.2,
                delay: i * 0.3,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Privacy Features Animation
        gsap.utils.toArray(".privacy-feature").forEach((feature, i) => {
            gsap.fromTo(feature, {
                y: 60,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 1,
                delay: i * 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: feature,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Chart Bars Animation
        gsap.utils.toArray(".chart-bar").forEach((bar, i) => {
            const height = bar.getAttribute('data-height');

            gsap.fromTo(bar, {
                height: '0%'
            }, {
                height: height + '%',
                duration: 1.5,
                delay: i * 0.3,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: bar,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Solution Cards Animation
        gsap.utils.toArray(".solution-card").forEach((card, i) => {
            gsap.fromTo(card, {
                y: 80,
                opacity: 0,
                rotationY: 15
            }, {
                y: 0,
                opacity: 1,
                rotationY: 0,
                duration: 1.2,
                delay: i * 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Thank You Section Animation
        gsap.fromTo(".thank-you-title", {
            y: 80,
            opacity: 0,
            scale: 0.8
        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".thank-you-title",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        gsap.fromTo(".final-cta-button", {
            y: 50,
            opacity: 0,
            scale: 0.8
        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            delay: 0.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: ".final-cta-button",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        
