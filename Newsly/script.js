        gsap.registerPlugin(ScrollTrigger);

        // Create floating particles
        function createParticles() {
            const particlesContainer = document.querySelector('.particles');
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
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

        // Enhanced hero animations with stagger
        const heroTl = gsap.timeline();
        heroTl
            .to(".logo", {
                duration: 2,
                opacity: 1,
                y: 0,
                scale: 1,
                ease: "elastic.out(1, 0.8)",
                rotation: 360
            })
            .to(".tagline", {
                duration: 1.5,
                opacity: 1,
                y: 0,
                ease: "power3.out",
                letterSpacing: "3px"
            }, "-=1")
            .to(".hero-cta", {
                duration: 1.2,
                opacity: 1,
                y: 0,
                ease: "power3.out"
            }, "-=0.8");

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

        // Advanced phone mockup animations with 3D effects
        gsap.utils.toArray(".phone-mockup").forEach(phone => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: phone,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
            
            tl.fromTo(phone, 
                {
                    opacity: 0, 
                    y: 100, 
                    rotationY: 45,
                    rotationX: 20,
                    scale: 0.8
                },
                {
                    opacity: 1, 
                    y: 0, 
                    rotationY: 0,
                    rotationX: 0,
                    scale: 1,
                    duration: 2,
                    ease: "power3.out"
                }
            )
            .to(phone, {
                y: -10,
                duration: 2,
                ease: "power1.inOut",
                yoyo: true,
                repeat: -1
            });
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
