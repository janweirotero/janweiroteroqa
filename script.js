
            // -------- Particles (Canvas) --------
        (function () {
            const canvas = document.getElementById('particles-canvas');
            const ctx = canvas.getContext('2d');
            let w, h;
            const particles = [];
            const COUNT = 70;

            function resize() {
                w = canvas.width = window.innerWidth;
                h = canvas.height = window.innerHeight;
            }
            window.addEventListener('resize', resize);
            resize();

            class Particle {
                constructor() {
                    this.reset();
                }
                reset() {
                    this.x = Math.random() * w;
                    this.y = Math.random() * h;
                    this.size = Math.random() * 2.5 + 0.8;
                    this.speedX = (Math.random() - 0.5) * 0.4;
                    this.speedY = (Math.random() - 0.5) * 0.4;
                    this.opacity = Math.random() * 0.5 + 0.2;
                }
                update() {
                    this.x += this.speedX;
                    this.y += this.speedY;
                    if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) {
                        this.reset();
                    }
                }
                draw() {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(162, 155, 254, ${this.opacity})`;
                    ctx.fill();
                }
            }

            for (let i = 0; i < COUNT; i++) {
                particles.push(new Particle());
            }

            function drawLines() {
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const dx = particles[i].x - particles[j].x;
                        const dy = particles[i].y - particles[j].y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < 140) {
                            const alpha = (1 - dist / 140) * 0.2;
                            ctx.beginPath();
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.strokeStyle = `rgba(162, 155, 254, ${alpha})`;
                            ctx.lineWidth = 0.6;
                            ctx.stroke();
                        }
                    }
                }
            }

            function animate() {
                ctx.clearRect(0, 0, w, h);
                particles.forEach(p => {
                    p.update();
                    p.draw();
                });
                drawLines();
                requestAnimationFrame(animate);
            }
            animate();
        })();

        // -------- Mobile Nav Toggle --------
        const toggle = document.getElementById('navToggle');
        const links = document.getElementById('navLinks');

        toggle.addEventListener('click', () => {
            links.classList.toggle('open');
            toggle.classList.toggle('open');
        });

        // close on link click (mobile)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                links.classList.remove('open');
                toggle.classList.remove('open');
            });
        });

        // -------- Scroll Reveal (Intersection Observer) --------
        const reveals = document.querySelectorAll('.reveal');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        reveals.forEach(el => observer.observe(el));

        // -------- Smooth anchor scroll (no jump) --------
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        document.getElementById('year').textContent = new Date().getFullYear();

        // -------- Open Zoom (Lightbox) --------
        function openZoom(imgElement) {
            const modal = document.getElementById('imageModal');
            const modalImg = document.getElementById('modalImg');
            const caption = document.getElementById('modalCaption');

            modal.style.display = 'block';
            modalImg.src = imgElement.src;
            caption.innerHTML = imgElement.alt || 'Certificate';
        }

        // -------- Close Zoom --------
        function closeZoom() {
            document.getElementById('imageModal').style.display = 'none';
        }

        // -------- Close with ESC Key --------
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closeZoom();
            }
        });

        // -------- Close by clicking outside the image --------
        document.getElementById('imageModal').addEventListener('click', function (event) {
            if (event.target === this) {
                closeZoom();
            }
        });