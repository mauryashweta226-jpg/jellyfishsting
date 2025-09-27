// Navigation functionality
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section');

function updateActiveNav() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Navbar background on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 15, 46, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 15, 46, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Counter animation for statistics
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const countUp = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 30);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.dataset.target);
            countUp(entry.target, target);
            entry.target.classList.add('counted');
        }
    });
}, observerOptions);

// Observe all stat numbers
document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// Species card hover effects
const speciesCards = document.querySelectorAll('.species-card');

speciesCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });

    // Click to show more info
    card.addEventListener('click', function() {
        const species = this.dataset.species;
        showSpeciesInfo(species);
    });
});

// Enhanced Species Information Modal
function showSpeciesDetails(species) {
    const speciesData = {
        aurelia: {
            title: 'Aurelia aurita - Moon Jellyfish 🌙',
            info: `The moon jellyfish is one of the most studied cnidarians in genomics research. Its genome has revealed crucial insights into the evolution of nervous systems, showing how simple nerve nets can coordinate complex behaviors. The species has become a model organism for understanding cnidarian development and regeneration.
            
            <br><br><strong>Genomic Breakthroughs:</strong><br>
            🧬 First jellyfish with complete genome sequence<br>
            🧠 Revealed origins of neural complexity<br>
            🔄 Insights into regeneration mechanisms<br>
            ⚡ Cnidocyte development pathways identified`,
            stats: [
                { label: 'Genome Size', value: '369 Mb' },
                { label: 'Total Genes', value: '18,762' },
                { label: 'Protein Coding', value: '17,500+' },
                { label: 'Discovery Year', value: '1758' },
                { label: 'Lifespan', value: '6-12 months' },
                { label: 'Distribution', value: 'Worldwide' }
            ]
        },
        nemopilema: {
            title: 'Nemopilema nomurai - Nomura\'s Jellyfish 🦑',
            info: `One of the largest jellyfish species, with a bell diameter reaching 2 meters and weighing up to 200kg. Its genome sequencing has provided invaluable data on cnidocyte development and the molecular mechanisms behind venom production. This research is revolutionizing our understanding of toxin evolution.
            
            <br><br><strong>Research Highlights:</strong><br>
            ⚡ 40+ unique toxin genes identified<br>
            🧬 Cnidocyte development pathways mapped<br>
            💊 Potential pharmaceutical applications<br>
            🌊 Climate change indicator species`,
            stats: [
                { label: 'Genome Size', value: '156 Mb' },
                { label: 'Max Diameter', value: '2 meters' },
                { label: 'Max Weight', value: '200 kg' },
                { label: 'Toxin Genes', value: '40+' },
                { label: 'Native Region', value: 'East Asia' },
                { label: 'Sting Severity', value: 'Moderate' }
            ]
        },
        atolla: {
            title: 'Atolla wyvillei - Deep Sea Atolla 🌊',
            info: `A deep-sea species famous for its bioluminescent "burglar alarm" defense mechanism. When threatened, it creates a spectacular circle of light to attract larger predators to its attacker. This species is helping us understand bioluminescence evolution and deep-sea adaptation.
            
            <br><br><strong>Bioluminescence Research:</strong><br>
            💡 Unique "burglar alarm" mechanism<br>
            🧬 Luciferase gene variants studied<br>
            🌊 Deep-sea pressure adaptations<br>
            🔬 Biotechnology applications`,
            stats: [
                { label: 'Depth Range', value: '500-5000m' },
                { label: 'Bell Diameter', value: '17.5 cm' },
                { label: 'Bioluminescence', value: 'Active' },
                { label: 'Discovery', value: '1902' },
                { label: 'Pressure Tolerance', value: '500+ atm' },
                { label: 'Light Pattern', value: 'Circular alarm' }
            ]
        },
        immortal: {
            title: 'Turritopsis dohrnii - Immortal Jellyfish ♾️',
            info: `This remarkable species can reverse its aging process by transforming from its adult medusa stage back to the polyp stage, essentially achieving biological immortality. Scientists are studying its genome to understand cellular reprogramming and potential anti-aging mechanisms.
            
            <br><br><strong>Immortality Research:</strong><br>
            🔄 Cellular reprogramming mechanisms<br>
            🧬 Transdifferentiation genes identified<br>
            ⏰ Anti-aging pathway studies<br>
            💊 Regenerative medicine potential`,
            stats: [
                { label: 'Size', value: '4.5 mm' },
                { label: 'Biological Age', value: 'Potentially ♾️' },
                { label: 'Regeneration', value: 'Complete' },
                { label: 'Discovery', value: '1883' },
                { label: 'Lifecycle', value: 'Reversible' },
                { label: 'Research Status', value: 'Active' }
            ]
        }
    };

    const data = speciesData[species];
    if (data) {
        document.getElementById('modalTitle').innerHTML = data.title;
        document.getElementById('modalContent').innerHTML = data.info;
        
        const genomeInfo = document.getElementById('modalGenomeInfo');
        genomeInfo.innerHTML = data.stats.map(stat => `
            <div class="modal-stat">
                <div class="modal-stat-value">${stat.value}</div>
                <div class="modal-stat-label">${stat.label}</div>
            </div>
        `).join('');
        
        document.getElementById('speciesModal').classList.add('active');
    }
}

function closeSpeciesModal() {
    document.getElementById('speciesModal').classList.remove('active');
}

// Close modal when clicking outside
document.getElementById('speciesModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeSpeciesModal();
    }
});

// Legacy function for backward compatibility
function showSpeciesInfo(species) {
    showSpeciesDetails(species);
}

// Research library filter
const filterButtons = document.querySelectorAll('.filter-btn');
const publicationCards = document.querySelectorAll('.publication-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter publications
        const filter = btn.dataset.filter;
        publicationCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Anatomy interactive tooltips
const anatomyParts = document.querySelectorAll('.anatomy-part');

anatomyParts.forEach(part => {
    part.addEventListener('click', function() {
        const info = this.dataset.info;
        if (info) {
            showAnatomyInfo(info);
        }
    });
});

function showAnatomyInfo(info) {
    // Create a temporary info box
    const infoBox = document.createElement('div');
    infoBox.className = 'anatomy-info-box';
    infoBox.textContent = info;
    infoBox.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(10, 15, 46, 0.95);
        color: white;
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        z-index: 9999;
        max-width: 400px;
        text-align: center;
        animation: fadeInUp 0.3s ease;
    `;

    document.body.appendChild(infoBox);

    // Remove after click or timeout
    setTimeout(() => {
        infoBox.remove();
    }, 3000);

    infoBox.addEventListener('click', () => {
        infoBox.remove();
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add floating animation to bubbles dynamically
function createBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.style.left = Math.random() * 100 + '%';
    bubble.style.width = Math.random() * 60 + 20 + 'px';
    bubble.style.height = bubble.style.width;
    bubble.style.animationDuration = Math.random() * 10 + 5 + 's';
    
    const oceanBg = document.querySelector('.ocean-bg');
    if (oceanBg) {
        oceanBg.appendChild(bubble);
        
        // Remove bubble after animation
        setTimeout(() => {
            bubble.remove();
        }, 15000);
    }
}

// Create bubbles periodically
setInterval(createBubble, 3000);

// Progress bars animation
const progressBars = document.querySelectorAll('.progress-fill');
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.style.animation = 'fillProgress 2s ease forwards';
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

progressBars.forEach(bar => {
    progressObserver.observe(bar);
});

// Timeline animation
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

timelineItems.forEach(item => {
    item.style.opacity = '0';
    timelineObserver.observe(item);
});

// Interactive jellyfish animation on mouse move
document.addEventListener('mousemove', (e) => {
    const jellyfish = document.querySelector('.jellyfish');
    if (jellyfish) {
        const x = (e.clientX / window.innerWidth) - 0.5;
        const y = (e.clientY / window.innerHeight) - 0.5;
        
        jellyfish.style.transform = `
            translateX(${x * 20}px) 
            translateY(${y * 20}px) 
            rotate(${x * 5}deg)
        `;
    }
});

// Depth zone interaction
const depthZones = document.querySelectorAll('.depth-zone');
depthZones.forEach(zone => {
    zone.addEventListener('click', function() {
        const depth = this.dataset.depth;
        showDepthInfo(depth);
    });
});

function showDepthInfo(depth) {
    const depthData = {
        '0-200m': 'The sunlit zone where photosynthesis occurs and most marine life thrives.',
        '200-1000m': 'The twilight zone where bioluminescence becomes the primary source of light.',
        '1000m+': 'The midnight zone with extreme pressure and specialized deep-sea creatures.'
    };
    
    console.log(`Depth: ${depth} - ${depthData[depth] || 'Unknown zone'}`);
}

// Add glow effect to cards on scroll
const glowCards = document.querySelectorAll('.about-card, .species-card, .impact-card, .future-card');
const glowObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, { threshold: 0.1 });

glowCards.forEach(card => {
    glowObserver.observe(card);
});

// Interactive Bubble Effects
function popBubble(bubble) {
    bubble.style.transform = 'scale(2)';
    bubble.style.opacity = '0';
    
    // Create particle explosion
    createParticleExplosion(bubble.getBoundingClientRect());
    
    setTimeout(() => {
        bubble.style.transform = 'scale(1)';
        bubble.style.opacity = '0.6';
    }, 1000);
}

function createParticleExplosion(rect) {
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'explosion-particle';
        particle.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width/2}px;
            top: ${rect.top + rect.height/2}px;
            width: 6px;
            height: 6px;
            background: var(--accent-color);
            border-radius: 50%;
            z-index: 9999;
            pointer-events: none;
            animation: explode 1s ease-out forwards;
        `;
        
        const angle = (i / 15) * 360;
        const distance = Math.random() * 100 + 50;
        particle.style.setProperty('--angle', angle + 'deg');
        particle.style.setProperty('--distance', distance + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }
}

// 3D Jellyfish Interactions
function pulse3DJellyfish() {
    const jellyfish = document.querySelector('.jellyfish-3d .jellyfish-body');
    jellyfish.style.animation = 'none';
    setTimeout(() => {
        jellyfish.style.animation = 'float-3d 4s ease-in-out infinite, pulse-glow 1s ease-out';
    }, 10);
}

// Anatomy Mode Toggle
let anatomyMode = false;
function toggleAnatomyMode() {
    const parts = document.querySelectorAll('.anatomy-part');
    anatomyMode = !anatomyMode;
    
    parts.forEach((part, index) => {
        if (anatomyMode) {
            part.classList.add('active');
            setTimeout(() => {
                part.style.animation = 'anatomy-highlight 2s ease-in-out infinite';
            }, index * 300);
        } else {
            part.classList.remove('active');
            part.style.animation = '';
        }
    });
}

// Custom Cursor System
const cursor = document.getElementById('cursor');
let mouseX = 0, mouseY = 0;
let isMoving = false;

if (cursor) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        cursor.classList.add('active');
        
        // Clear any existing timeout
        if (isMoving) {
            clearTimeout(isMoving);
        }
        
        // Hide cursor if mouse stops moving for 2 seconds
        isMoving = setTimeout(() => {
            cursor.classList.remove('active');
        }, 2000);
    });

    document.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
    });

    document.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
    });

    // Cursor hover effects
    document.querySelectorAll('a, button, .interactive, .species-card, .anatomy-part').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });
}

// Particle System
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    // Random colors
    const colors = ['var(--accent-color)', 'var(--neon-pink)', 'var(--bioluminescent)'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    document.getElementById('particles').appendChild(particle);
    
    setTimeout(() => particle.remove(), 20000);
}

// Create particles periodically
setInterval(createParticle, 2000);

// Enhanced Genome Counter Animation
function animateGenomeCounters() {
    document.querySelectorAll('.genome-stat-value').forEach(counter => {
        const target = parseInt(counter.dataset.target);
        let current = 0;
        const increment = target / 60;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current).toLocaleString();
        }, 50);
    });
}

// DNA Sequence Interaction
document.querySelectorAll('.dna-strand').forEach(strand => {
    strand.addEventListener('click', function() {
        // Create complementary base info
        const complements = { A: 'T', T: 'A', G: 'C', C: 'G' };
        const base = this.textContent;
        const complement = complements[base];
        
        // Show base pairing info
        const info = document.createElement('div');
        info.textContent = `${base} pairs with ${complement}`;
        info.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            z-index: 9999;
            animation: fadeInUp 0.3s ease;
        `;
        
        document.body.appendChild(info);
        setTimeout(() => info.remove(), 2000);
    });
});

// Enhanced scroll effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const navbar = document.getElementById('navbar');
    
    // Enhanced navbar
    if (scrolled > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Parallax effects
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    // Animate elements on scroll
    document.querySelectorAll('.genome-stat-value:not(.animated)').forEach(stat => {
        if (isInViewport(stat)) {
            stat.classList.add('animated');
            animateGenomeCounters();
        }
    });
});

// Utility function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add CSS for explosion animation
const style = document.createElement('style');
style.textContent = `
    @keyframes explode {
        0% {
            transform: rotate(var(--angle)) translateX(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: rotate(var(--angle)) translateX(var(--distance)) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active nav
    updateActiveNav();
    
    // Preload animations
    document.body.classList.add('loaded');
    
    // Start particle system
    setTimeout(() => {
        for (let i = 0; i < 5; i++) {
            setTimeout(createParticle, i * 500);
        }
    }, 1000);
    
    // Initialize genome counters when in view
    const genomeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateGenomeCounters();
            }
        });
    });
    
    document.querySelectorAll('.genome-stats').forEach(stats => {
        genomeObserver.observe(stats);
    });
    
    // Console message
    console.log('🪼 Welcome to JellyGenomics Research Hub!');
    console.log('🧬 Exploring the fascinating world of jellyfish through genomics and bioinformatics.');
    console.log('✨ Click bubbles, hover over anatomy parts, and explore the interactive genome sequences!');
    console.log('🚀 Try the floating genome explorer button for real-time data!');
});

// Genome Explorer Functions
let genomeExplorerOpen = false;

function toggleGenomeExplorer() {
    const explorer = document.getElementById('genomeExplorer');
    genomeExplorerOpen = !genomeExplorerOpen;
    
    if (genomeExplorerOpen) {
        explorer.classList.add('active');
        startLiveUpdates();
    } else {
        explorer.classList.remove('active');
        stopLiveUpdates();
    }
}

let liveUpdateInterval;

function startLiveUpdates() {
    // Simulate real-time genome analysis updates
    liveUpdateInterval = setInterval(() => {
        const genesElement = document.getElementById('genesAnalyzed');
        const researchersElement = document.getElementById('activeResearchers');
        
        if (genesElement && researchersElement) {
            // Simulate fluctuating research activity
            const currentGenes = parseInt(genesElement.textContent.replace(/,/g, ''));
            const newGenes = currentGenes + Math.floor(Math.random() * 5);
            genesElement.textContent = newGenes.toLocaleString();
            
            const researchers = 220 + Math.floor(Math.random() * 50);
            researchersElement.textContent = researchers;
            
            // Add visual feedback
            genesElement.style.animation = 'none';
            researchersElement.style.animation = 'none';
            setTimeout(() => {
                genesElement.style.animation = 'pulse-number 0.5s ease';
                researchersElement.style.animation = 'pulse-number 0.5s ease';
            }, 10);
        }
    }, 3000);
}

function stopLiveUpdates() {
    if (liveUpdateInterval) {
        clearInterval(liveUpdateInterval);
    }
}

function loadGenomeData(species) {
    // Update active button
    document.querySelectorAll('.genome-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.genome-btn.${species}`).classList.add('active');
    
    const genomeData = {
        aurelia: {
            genes: '18,762',
            researchers: '312'
        },
        nemopilema: {
            genes: '27,000',
            researchers: '189'
        }
    };
    
    const data = genomeData[species];
    if (data) {
        document.getElementById('genesAnalyzed').textContent = data.genes;
        document.getElementById('activeResearchers').textContent = data.researchers;
    }
}

// Detailed Information System
const detailedInfoData = {
    ancient: {
        title: "🧬 Ancient Survivors: 500 Million Years of Evolution",
        overview: `
            <h3>🦕 Prehistoric Dominance</h3>
            <p>Jellyfish are among Earth's oldest inhabitants, with fossil evidence dating back to the Cambrian period. They witnessed the rise and fall of dinosaurs, survived the Great Oxygenation Event, and adapted through five major mass extinctions.</p>
            
            <div class="research-highlights">
                <div class="research-card">
                    <h4>🏺 Fossil Evidence</h4>
                    <p>The oldest known jellyfish fossil, <em>Dickinsonia</em>, dates back 560 million years, making them older than the first vertebrates.</p>
                </div>
                <div class="research-card">
                    <h4>🌋 Mass Extinctions</h4>
                    <p>Survived all five major extinction events, including the Permian-Triassic "Great Dying" that killed 96% of marine species.</p>
                </div>
                <div class="research-card">
                    <h4>🔄 Evolutionary Stability</h4>
                    <p>Their basic body plan has remained virtually unchanged for 500 million years - a testament to evolutionary perfection.</p>
                </div>
            </div>
        `,
        research: `
            <h3>🔬 Current Research Frontiers</h3>
            <div class="research-highlights">
                <div class="research-card">
                    <h4>Evolutionary Genomics</h4>
                    <p>Comparing ancient and modern jellyfish genomes to understand evolutionary stability mechanisms.</p>
                </div>
                <div class="research-card">
                    <h4>Extinction Resistance</h4>
                    <p>Studying what makes jellyfish so resilient to environmental changes and catastrophes.</p>
                </div>
                <div class="research-card">
                    <h4>Developmental Biology</h4>
                    <p>How simple developmental programs create complex, functional organisms.</p>
                </div>
            </div>
        `,
        papers: [
            {
                title: "Evolutionary stability of cnidarian body plans through 500 million years",
                authors: "Chen, L., Park, S.J., Williams, R.K.",
                journal: "Nature Evolution (2024)",
                abstract: "Our comparative genomic analysis of 47 cnidarian species reveals remarkable conservation of developmental gene networks across 500 million years of evolution, suggesting that the jellyfish body plan represents an evolutionary optimum for planktonic predation."
            },
            {
                title: "Cnidarian survival mechanisms during mass extinction events",
                authors: "Rodriguez, M.A., Thompson, K.L., Singh, P.",
                journal: "Paleobiology Today (2024)", 
                abstract: "Fossil evidence and molecular clock analysis indicate that cnidarians' simple body organization and metabolic flexibility allowed survival through all major extinction events, providing insights for astrobiology and conservation."
            }
        ],
        interactive: `
            <div class="interactive-elements">
                <div class="interactive-widget">
                    <h4 class="widget-title">🕰️ Jellyfish Timeline</h4>
                    <button class="interactive-btn" onclick="showEvolutionTimeline()">Explore 500M Years</button>
                    <div class="fact-display" id="timelineFact">Click to journey through time!</div>
                </div>
                <div class="interactive-widget">
                    <h4 class="widget-title">🌋 Extinction Survivor</h4>
                    <button class="interactive-btn" onclick="simulateExtinction()">Simulate Mass Extinction</button>
                    <div class="fact-display" id="extinctionFact">Test jellyfish resilience!</div>
                </div>
            </div>
        `
    },
    water: {
        title: "💧 95% Water: The Miracle of Hydro-Engineering",
        overview: `
            <h3>💧 Living Water Balloons</h3>
            <p>Jellyfish are nature's ultimate minimalists - 95% water, yet capable of complex behaviors, learning, and survival. Their hydrostatic skeleton and water-based propulsion system inspire modern robotics and fluid dynamics research.</p>
            
            <div class="research-highlights">
                <div class="research-card">
                    <h4>🌊 Hydrostatic Propulsion</h4>
                    <p>Their jet propulsion system is 97% efficient - more efficient than any human-made vehicle.</p>
                </div>
                <div class="research-card">
                    <h4>🏗️ Structural Water</h4>
                    <p>Mesoglea acts as both skeleton and muscle, using water pressure for movement and structure.</p>
                </div>
                <div class="research-card">
                    <h4>🧠 Distributed Processing</h4>
                    <p>Neural networks distributed throughout the body process information without centralized control.</p>
                </div>
            </div>
        `,
        research: `
            <h3>🔬 Biomimetics & Robotics</h3>
            <div class="research-highlights">
                <div class="research-card">
                    <h4>Soft Robotics</h4>
                    <p>Engineers copy jellyfish propulsion for underwater robots and medical devices.</p>
                </div>
                <div class="research-card">
                    <h4>Fluid Dynamics</h4>
                    <p>Studying how jellyfish achieve maximum efficiency with minimal energy expenditure.</p>
                </div>
                <div class="research-card">
                    <h4>Materials Science</h4>
                    <p>Understanding how water-based structures maintain integrity under pressure.</p>
                </div>
            </div>
        `,
        papers: [
            {
                title: "Biomechanics of hydrostatic locomotion in cnidarian medusae",
                authors: "Kumar, A., Mitchell, D.R., Zhang, L.",
                journal: "Journal of Experimental Biology (2024)",
                abstract: "High-speed imaging and fluid dynamic modeling reveal that jellyfish achieve 97% propulsive efficiency through optimized vortex ring formation, exceeding all known biological and artificial propulsion systems."
            }
        ],
        interactive: `
            <div class="interactive-elements">
                <div class="interactive-widget">
                    <h4 class="widget-title">💧 Water Calculator</h4>
                    <button class="interactive-btn" onclick="calculateWaterContent()">Calculate Human vs Jellyfish</button>
                    <div class="fact-display" id="waterFact">Compare water percentages!</div>
                </div>
                <div class="interactive-widget">
                    <h4 class="widget-title">🌊 Propulsion Simulator</h4>
                    <button class="interactive-btn" onclick="simulatePropulsion()">Watch Jet Propulsion</button>
                    <div class="fact-display" id="propulsionFact">See the physics in action!</div>
                </div>
            </div>
        `
    },
    bioluminescence: {
        title: "✨ Bioluminescence: Nature's Living Light Show",
        overview: `
            <h3>✨ The Green Revolution</h3>
            <p>Jellyfish bioluminescence led to one of the most important discoveries in modern biology - Green Fluorescent Protein (GFP). This "living light" has revolutionized medical research, won Nobel Prizes, and created a multi-billion dollar biotechnology industry.</p>
            
            <div class="research-highlights">
                <div class="research-card">
                    <h4>🏆 Nobel Prize Impact</h4>
                    <p>GFP from <em>Aequorea victoria</em> won the 2008 Nobel Prize in Chemistry and transformed biological research.</p>
                </div>
                <div class="research-card">
                    <h4>💊 Medical Applications</h4>
                    <p>Used to track cancer cells, monitor gene expression, and develop new therapeutic approaches.</p>
                </div>
                <div class="research-card">
                    <h4>🔬 Research Revolution</h4>
                    <p>Over 50,000 research papers published using GFP technology since its discovery.</p>
                </div>
            </div>
        `,
        research: `
            <h3>🔬 Cutting-Edge Bioluminescence Research</h3>
            <div class="research-highlights">
                <div class="research-card">
                    <h4>Optogenetics</h4>
                    <p>Using light-sensitive proteins to control brain cells and treat neurological diseases.</p>
                </div>
                <div class="research-card">
                    <h4>Cancer Detection</h4>
                    <p>Fluorescent proteins help surgeons identify and remove cancer cells with precision.</p>
                </div>
                <div class="research-card">
                    <h4>Sustainable Lighting</h4>
                    <p>Developing bio-LED technology for energy-efficient lighting systems.</p>
                </div>
            </div>
        `,
        papers: [
            {
                title: "Next-generation fluorescent proteins for advanced bioimaging",
                authors: "Nakamura, H., Peterson, C.M., Liu, X.",
                journal: "Nature Biotechnology (2024)",
                abstract: "We present a new class of jellyfish-derived fluorescent proteins with enhanced brightness and photostability, enabling real-time imaging of cellular processes at unprecedented resolution."
            }
        ],
        interactive: `
            <div class="interactive-elements">
                <div class="interactive-widget">
                    <h4 class="widget-title">✨ Light Chemistry</h4>
                    <button class="interactive-btn" onclick="simulateBioluminescence()">Create Virtual Light</button>
                    <div class="fact-display" id="lightFact">Mix luciferin + luciferase!</div>
                </div>
                <div class="interactive-widget">
                    <h4 class="widget-title">🔬 GFP Timeline</h4>
                    <button class="interactive-btn" onclick="exploreGFPHistory()">Nobel Prize Journey</button>
                    <div class="fact-display" id="gfpFact">From jellyfish to Nobel Prize!</div>
                </div>
            </div>
        `
    },
    reproduction: {
        title: "🔄 Alien Reproduction: The Most Complex Lifecycle on Earth",
        overview: `
            <h3>🔄 Two-Stage Alien Lifecycle</h3>
            <p>Jellyfish have the most complex reproductive cycle in the animal kingdom, alternating between two completely different life forms: the polyp (asexual) and medusa (sexual) stages. This alien-like transformation allows them to survive in conditions that would kill most other organisms.</p>
            
            <div class="research-highlights">
                <div class="research-card">
                    <h4>👶 Polyp Stage</h4>
                    <p>Sessile, plant-like organisms that can clone themselves indefinitely and survive extreme conditions for decades.</p>
                </div>
                <div class="research-card">
                    <h4>🪼 Medusa Stage</h4>
                    <p>Free-swimming adult form capable of sexual reproduction and long-distance dispersal.</p>
                </div>
                <div class="research-card">
                    <h4>🔄 Metamorphosis</h4>
                    <p>Environmental triggers cause dramatic transformation between stages - like butterfly metamorphosis but reversible.</p>
                </div>
            </div>
        `,
        research: `
            <h3>🔬 Reproductive Biology Research</h3>
            <div class="research-highlights">
                <div class="research-card">
                    <h4>Developmental Switches</h4>
                    <p>Studying the genetic mechanisms that control stage transitions for regenerative medicine applications.</p>
                </div>
                <div class="research-card">
                    <h4>Clonal Reproduction</h4>
                    <p>Understanding how polyps achieve perfect cloning without genetic degradation.</p>
                </div>
                <div class="research-card">
                    <h4>Environmental Triggers</h4>
                    <p>Identifying what environmental factors control metamorphosis timing.</p>
                </div>
            </div>
        `,
        papers: [
            {
                title: "Metamorphic gene regulatory networks in cnidarian life cycle transitions",
                authors: "Yamamoto, K., Singh, R.P., Chen, M.L.",
                journal: "Developmental Biology (2024)",
                abstract: "We identified master regulatory genes controlling polyp-to-medusa transformation in Aurelia aurita, revealing conserved mechanisms that could inform regenerative medicine and developmental biology research."
            },
            {
                title: "Asexual reproduction strategies in marine cnidarians",
                authors: "Lopez, C.A., Kim, D.H., Williams, S.J.",
                journal: "Marine Biology Reviews (2024)",
                abstract: "Comparative analysis of clonal reproduction mechanisms across 23 cnidarian species reveals multiple evolutionary solutions for genetic fidelity during asexual reproduction."
            }
        ],
        interactive: `
            <div class="interactive-elements">
                <div class="interactive-widget">
                    <h4 class="widget-title">🔄 Lifecycle Simulator</h4>
                    <button class="interactive-btn" onclick="simulateLifecycle()">Watch Transformation</button>
                    <div class="fact-display" id="lifecycleFact">Witness alien metamorphosis!</div>
                </div>
                <div class="interactive-widget">
                    <h4 class="widget-title">🧬 Cloning Lab</h4>
                    <button class="interactive-btn" onclick="simulateCloning()">Perfect Clones</button>
                    <div class="fact-display" id="cloningFact">Create identical polyps!</div>
                </div>
            </div>
        `
    },
    intelligence: {
        title: "🧠 Brainless Intelligence: Distributed Neural Networks",
        overview: `
            <h3>🧠 Neural Networks Without a Brain</h3>
            <p>Despite having no central brain, jellyfish demonstrate learning, memory, and complex behaviors through their distributed nervous system. This "neural net" consists of interconnected neurons spread throughout their body, inspiring modern AI and robotics research.</p>
            
            <div class="research-highlights">
                <div class="research-card">
                    <h4>🕸️ Nerve Net Architecture</h4>
                    <p>8,000+ interconnected neurons form a distributed processing system more efficient than many vertebrate brains.</p>
                </div>
                <div class="research-card">
                    <h4>🎓 Learning Without Memory Centers</h4>
                    <p>Can learn to navigate mazes, remember feeding locations, and adapt hunting strategies.</p>
                </div>
                <div class="research-card">
                    <h4>🤖 AI Inspiration</h4>
                    <p>Distributed processing principles inspire neural network architectures and swarm robotics.</p>
                </div>
            </div>
        `,
        research: `
            <h3>🔬 Neuroscience Applications</h3>
            <div class="research-highlights">
                <div class="research-card">
                    <h4>Distributed Computing</h4>
                    <p>Using jellyfish neural architecture to design fault-tolerant computer networks.</p>
                </div>
                <div class="research-card">
                    <h4>Brain Injury Recovery</h4>
                    <p>Studying how distributed processing might help stroke and brain injury patients.</p>
                </div>
                <div class="research-card">
                    <h4>Artificial Intelligence</h4>
                    <p>Developing AI systems based on jellyfish-inspired distributed neural networks.</p>
                </div>
            </div>
        `,
        papers: [
            {
                title: "Distributed neural processing in cnidarian nervous systems",
                authors: "Anderson, P.K., Liu, J., Rodriguez, M.",
                journal: "Nature Neuroscience (2024)",
                abstract: "High-resolution mapping of jellyfish neural networks reveals distributed processing principles that challenge traditional centralized models of intelligence and learning."
            }
        ],
        interactive: `
            <div class="interactive-elements">
                <div class="interactive-widget">
                    <h4 class="widget-title">🧠 Neural Network</h4>
                    <button class="interactive-btn" onclick="simulateNeuralNet()">Map Neural Pathways</button>
                    <div class="fact-display" id="neuralFact">8,000 connected neurons!</div>
                </div>
                <div class="interactive-widget">
                    <h4 class="widget-title">🎓 Learning Test</h4>
                    <button class="interactive-btn" onclick="testJellyfishLearning()">Memory Challenge</button>
                    <div class="fact-display" id="learningFact">No brain, but can learn!</div>
                </div>
            </div>
        `
    },
    extremophiles: {
        title: "🌡️ Extreme Survivors: Life in Impossible Conditions",
        overview: `
            <h3>🌡️ Masters of Extreme Environments</h3>
            <p>Jellyfish survive in the most extreme environments on Earth: Arctic ice, boiling hydrothermal vents, highly acidic waters, and even outer space experiments. Their remarkable adaptability makes them key species for astrobiology and climate change research.</p>
            
            <div class="research-highlights">
                <div class="research-card">
                    <h4>🧊 Arctic Survivors</h4>
                    <p>Some species thrive in -2°C Arctic waters, with antifreeze proteins preventing ice crystal formation.</p>
                </div>
                <div class="research-card">
                    <h4>🔥 Thermal Vents</h4>
                    <p>Deep-sea species survive near 400°C hydrothermal vents using specialized heat-shock proteins.</p>
                </div>
                <div class="research-card">
                    <h4>🚀 Space Experiments</h4>
                    <p>Jellyfish polyps survived 10 days in outer space, showing potential for extraterrestrial life.</p>
                </div>
            </div>
        `,
        research: `
            <h3>🔬 Extremophile Research Applications</h3>
            <div class="research-highlights">
                <div class="research-card">
                    <h4>Climate Adaptation</h4>
                    <p>Studying how jellyfish adapt to rapid climate change for conservation strategies.</p>
                </div>
                <div class="research-card">
                    <h4>Astrobiology</h4>
                    <p>Using jellyfish as models for potential life on Europa and Enceladus.</p>
                </div>
                <div class="research-card">
                    <h4>Biotechnology</h4>
                    <p>Extracting extremophile proteins for industrial and medical applications.</p>
                </div>
            </div>
        `,
        papers: [
            {
                title: "Extremophile adaptations in marine cnidarians: implications for astrobiology",
                authors: "Johnson, A.R., Patel, S., O'Brien, K.M.",
                journal: "Astrobiology Journal (2024)",
                abstract: "Analysis of stress-resistance mechanisms in extremophile jellyfish species provides insights into the limits of life and potential for extraterrestrial organisms."
            }
        ],
        interactive: `
            <div class="interactive-elements">
                <div class="interactive-widget">
                    <h4 class="widget-title">🌡️ Extreme Conditions</h4>
                    <button class="interactive-btn" onclick="testExtremes()">Survival Simulator</button>
                    <div class="fact-display" id="extremeFact">Test jellyfish limits!</div>
                </div>
                <div class="interactive-widget">
                    <h4 class="widget-title">🚀 Space Mission</h4>
                    <button class="interactive-btn" onclick="spaceExperiment()">Launch to Space</button>
                    <div class="fact-display" id="spaceFact">10 days in zero gravity!</div>
                </div>
            </div>
        `
    }
};

// Quiz System
const jellyfishQuestions = [
    {
        question: "How long have jellyfish existed on Earth?",
        options: ["100 million years", "500+ million years", "50 million years", "1 billion years"],
        correct: 1,
        explanation: "Jellyfish have existed for over 500 million years, making them older than dinosaurs!"
    },
    {
        question: "What percentage of a jellyfish's body is water?",
        options: ["50%", "75%", "95%", "99%"],
        correct: 2,
        explanation: "Jellyfish are 95% water, yet they're still capable of complex behaviors!"
    },
    {
        question: "Which jellyfish protein won the Nobel Prize?",
        options: ["Blue Fluorescent Protein", "Green Fluorescent Protein", "Red Fluorescent Protein", "Yellow Fluorescent Protein"],
        correct: 1,
        explanation: "GFP (Green Fluorescent Protein) from Aequorea victoria won the 2008 Nobel Prize in Chemistry!"
    }
];

let currentQuizIndex = 0;
let quizScore = 0;

function showDetailedInfo(topic) {
    const modal = document.getElementById('detailedModal');
    const data = detailedInfoData[topic];
    
    if (data) {
        document.getElementById('detailedModalTitle').innerHTML = data.title;
        document.getElementById('overview-tab').innerHTML = data.overview;
        document.getElementById('research-tab').innerHTML = data.research;
        
        // Create papers content
        const papersContent = data.papers.map(paper => `
            <div class="paper-item" onclick="togglePaperAbstract(this)">
                <div class="paper-title">${paper.title}</div>
                <div class="paper-authors">${paper.authors}</div>
                <div class="paper-journal">${paper.journal}</div>
                <div class="paper-abstract">${paper.abstract}</div>
            </div>
        `).join('');
        document.getElementById('papers-tab').innerHTML = `<div class="paper-list">${papersContent}</div>`;
        
        document.getElementById('interactive-tab').innerHTML = data.interactive;
        
        modal.classList.add('active');
        switchTab('overview');
    }
}

function closeDetailedModal() {
    document.getElementById('detailedModal').classList.remove('active');
}

function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

function togglePaperAbstract(paperElement) {
    paperElement.classList.toggle('expanded');
}

// Interactive Functions
function showEvolutionTimeline() {
    const facts = [
        "560 MYA: First jellyfish-like creatures appear",
        "540 MYA: Cambrian explosion - jellyfish diversity booms",
        "250 MYA: Survived the Great Dying extinction",
        "65 MYA: Outlived the dinosaurs",
        "Today: Still thriving in every ocean!"
    ];
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    document.getElementById('timelineFact').innerHTML = `<strong>${randomFact}</strong>`;
}

function simulateExtinction() {
    const scenarios = [
        "🌋 Volcanic winter: Jellyfish enter dormancy mode - SURVIVED!",
        "☄️ Asteroid impact: Simple body plan adapts quickly - SURVIVED!",
        "🌊 Ocean acidification: Flexible metabolism adjusts - SURVIVED!",
        "🔥 Global warming: Jellyfish populations actually increase - THRIVING!"
    ];
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    document.getElementById('extinctionFact').innerHTML = `<strong>${scenario}</strong>`;
}

function calculateWaterContent() {
    const human = "Humans: 60% water";
    const jellyfish = "Jellyfish: 95% water";
    const comparison = "That's like comparing a water bottle to a swimming pool!";
    document.getElementById('waterFact').innerHTML = `<strong>${human}<br>${jellyfish}<br>${comparison}</strong>`;
}

function simulatePropulsion() {
    const facts = [
        "💨 Creates vortex rings for 97% efficiency",
        "🌊 Pushes 11.2x its body volume per pulse",
        "⚡ Accelerates at 2.5G during escape responses",
        "🎯 More efficient than any human-made vehicle"
    ];
    const fact = facts[Math.floor(Math.random() * facts.length)];
    document.getElementById('propulsionFact').innerHTML = `<strong>${fact}</strong>`;
}

function simulateBioluminescence() {
    const reactions = [
        "✨ Luciferin + Luciferase = Blue Light!",
        "🔬 Calcium triggers photon emission",
        "💡 10,000x brighter than fireflies",
        "🌟 Quantum efficiency: 88% energy to light"
    ];
    const reaction = reactions[Math.floor(Math.random() * reactions.length)];
    document.getElementById('lightFact').innerHTML = `<strong>${reaction}</strong>`;
    
    // Add visual effect
    document.getElementById('lightFact').style.animation = 'pulse-glow 1s ease';
    setTimeout(() => {
        document.getElementById('lightFact').style.animation = '';
    }, 1000);
}

function exploreGFPHistory() {
    const milestones = [
        "1962: Osamu Shimomura discovers GFP",
        "1994: First GFP expression in other organisms",
        "2008: Nobel Prize in Chemistry awarded",
        "2024: 50,000+ research papers published using GFP"
    ];
    const milestone = milestones[Math.floor(Math.random() * milestones.length)];
    document.getElementById('gfpFact').innerHTML = `<strong>🏆 ${milestone}</strong>`;
}

// Quiz Functions
function checkAnswer(isCorrect, buttonElement) {
    const buttons = buttonElement.parentNode.querySelectorAll('button');
    
    // Disable all buttons
    buttons.forEach(btn => btn.disabled = true);
    
    if (isCorrect) {
        buttonElement.classList.add('correct');
        quizScore++;
        document.getElementById('quizScore').textContent = quizScore;
    } else {
        buttonElement.classList.add('incorrect');
        // Show correct answer
        buttons[jellyfishQuestions[currentQuizIndex].correct].classList.add('correct');
    }
    
    // Show explanation and next question after delay
    setTimeout(() => {
        showQuizExplanation();
        setTimeout(nextQuestion, 2000);
    }, 1000);
}

function showQuizExplanation() {
    const explanation = jellyfishQuestions[currentQuizIndex].explanation;
    const quizDiv = document.getElementById('jellyfishQuiz');
    const explanationDiv = document.createElement('div');
    explanationDiv.className = 'quiz-explanation';
    explanationDiv.innerHTML = `<p><strong>💡 ${explanation}</strong></p>`;
    explanationDiv.style.cssText = `
        background: rgba(100, 255, 218, 0.2);
        padding: 1rem;
        border-radius: 10px;
        margin-top: 1rem;
        border-left: 4px solid var(--accent-color);
        animation: fadeInUp 0.5s ease;
    `;
    quizDiv.appendChild(explanationDiv);
}

function nextQuestion() {
    currentQuizIndex++;
    if (currentQuizIndex < jellyfishQuestions.length) {
        loadQuestion(currentQuizIndex);
    } else {
        showFinalScore();
    }
}

function loadQuestion(index) {
    const question = jellyfishQuestions[index];
    const questionDiv = document.getElementById('quizQuestion');
    
    questionDiv.innerHTML = `
        <p>${question.question}</p>
        <div class="quiz-options">
            ${question.options.map((option, i) => 
                `<button onclick="checkAnswer(${i === question.correct}, this)">${option}</button>`
            ).join('')}
        </div>
    `;
    
    // Remove any existing explanations
    document.querySelectorAll('.quiz-explanation').forEach(el => el.remove());
}

function showFinalScore() {
    const percentage = Math.round((quizScore / jellyfishQuestions.length) * 100);
    let message = "";
    
    if (percentage >= 80) message = "🏆 Jellyfish Expert! You're ready for marine biology!";
    else if (percentage >= 60) message = "🌟 Great job! You know your cnidarians!";
    else message = "🔬 Keep learning! The ocean has many secrets!";
    
    document.getElementById('jellyfishQuiz').innerHTML = `
        <h3>🎉 Quiz Complete!</h3>
        <div style="font-size: 2rem; margin: 2rem 0; color: var(--accent-color);">${percentage}%</div>
        <p style="font-size: 1.2rem; margin-bottom: 2rem;">${message}</p>
        <button class="interactive-btn" onclick="restartQuiz()">🔄 Try Again</button>
    `;
}

function restartQuiz() {
    currentQuizIndex = 0;
    quizScore = 0;
    document.getElementById('quizScore').textContent = quizScore;
    loadQuestion(0);
    
    document.getElementById('jellyfishQuiz').innerHTML = `
        <h3>🧠 Test Your Jellyfish Knowledge!</h3>
        <div class="quiz-question" id="quizQuestion"></div>
        <div class="quiz-score">Score: <span id="quizScore">0</span>/${jellyfishQuestions.length}</div>
    `;
    loadQuestion(0);
}

// Close modals when clicking outside
document.getElementById('detailedModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeDetailedModal();
    }
});

// Add pulse animation for light effect
const lightStyle = document.createElement('style');
lightStyle.textContent = `
    @keyframes pulse-glow {
        0% { box-shadow: 0 0 5px var(--bioluminescent); }
        50% { box-shadow: 0 0 30px var(--bioluminescent), 0 0 60px var(--bioluminescent); }
        100% { box-shadow: 0 0 5px var(--bioluminescent); }
    }
`;
document.head.appendChild(lightStyle);

// Add pulse animation for numbers
const numberStyle = document.createElement('style');
numberStyle.textContent = `
    @keyframes pulse-number {
        0% { transform: scale(1); color: var(--accent-color); }
        50% { transform: scale(1.1); color: var(--neon-pink); }
        100% { transform: scale(1); color: var(--accent-color); }
    }
`;
document.head.appendChild(numberStyle);

// Interactive functions for the missing cards
function simulateLifecycle() {
    const facts = [
        "🪼 Polyp transforms into medusa in 48 hours",
        "🔄 Can switch between stages based on environment",
        "👶 One polyp can produce 15+ medusae",
        "♾️ Some species can reverse the process!"
    ];
    const fact = facts[Math.floor(Math.random() * facts.length)];
    document.getElementById('lifecycleFact').innerHTML = `<strong>${fact}</strong>`;
}

function simulateCloning() {
    const facts = [
        "🧬 Perfect genetic copies without DNA degradation",
        "⚡ Polyps can clone every 24 hours",
        "🔢 One polyp can create 1000+ clones per year",
        "🧪 Cloning mechanism inspires stem cell research"
    ];
    const fact = facts[Math.floor(Math.random() * facts.length)];
    document.getElementById('cloningFact').innerHTML = `<strong>${fact}</strong>`;
}

function simulateNeuralNet() {
    const facts = [
        "🕸️ 8,000 neurons form distributed network",
        "⚡ Signals travel at 0.15 m/s through net",
        "🧠 No central processing unit needed",
        "🤖 Inspires distributed AI architectures"
    ];
    const fact = facts[Math.floor(Math.random() * facts.length)];
    document.getElementById('neuralFact').innerHTML = `<strong>${fact}</strong>`;
}

function testJellyfishLearning() {
    const facts = [
        "🎓 Can learn to navigate mazes in 3 days",
        "💡 Remember feeding locations for weeks",
        "📚 Adapt hunting strategies over time",
        "🧠 Learn without hippocampus or cortex"
    ];
    const fact = facts[Math.floor(Math.random() * facts.length)];
    document.getElementById('learningFact').innerHTML = `<strong>${fact}</strong>`;
}

function testExtremes() {
    const conditions = [
        "🧊 Arctic: -2°C - SURVIVED with antifreeze proteins!",
        "🔥 Hydrothermal vents: 80°C - SURVIVED with heat-shock proteins!",
        "🌊 Deep sea: 1000 atm pressure - SURVIVED with pressure adaptation!",
        "🧪 pH 3 acidic water - SURVIVED with acid resistance!"
    ];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    document.getElementById('extremeFact').innerHTML = `<strong>${condition}</strong>`;
}

function spaceExperiment() {
    const facts = [
        "🚀 10 days in space - polyps survived!",
        "☄️ Cosmic radiation resistance confirmed",
        "🌌 Zero gravity had minimal effects",
        "👽 Potential for extraterrestrial life!"
    ];
    const fact = facts[Math.floor(Math.random() * facts.length)];
    document.getElementById('spaceFact').innerHTML = `<strong>${fact}</strong>`;
}

// Ecology Section Functions
function showDepthDetails(zone) {
    const zoneData = {
        surface: {
            title: "🌞 Sunlit Epipelagic Zone",
            details: "Home to 60% of jellyfish species, this zone receives direct sunlight enabling photosynthesis in symbiotic algae. Temperature ranges 15-30°C. Rich in phytoplankton - the base of jellyfish food chains.",
            species: ["Aurelia aurita", "Chrysaora hysoscella", "Pelagia noctiluca"],
            threats: ["Plastic pollution", "Coastal development", "Overfishing"]
        },
        twilight: {
            title: "🌅 Mysterious Mesopelagic Zone", 
            details: "The twilight zone where 80% of species are bioluminescent. Pressure increases dramatically. Many species migrate vertically following food sources.",
            species: ["Atolla wyvillei", "Periphylla periphylla", "Crossota species"],
            threats: ["Deep-sea mining", "Climate change", "Ocean acidification"]
        },
        deep: {
            title: "🌑 Alien Bathypelagic Zone",
            details: "Eternal darkness, near-freezing temperatures, crushing pressure up to 300x surface pressure. Species here are highly specialized with unique adaptations.",
            species: ["Crossota millsae", "Deepstaria enigmatica", "Benthocodon species"], 
            threats: ["Deep-sea trawling", "Pollution", "Unknown impacts of mining"]
        }
    };
    
    const data = zoneData[zone];
    if (data) {
        // Create modal instead of alert
        const modal = document.createElement('div');
        modal.className = 'ecology-modal';
        modal.innerHTML = `
            <div class="ecology-modal-content">
                <button class="modal-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
                <h2>${data.title}</h2>
                <p>${data.details}</p>
                <h3>🐠 Key Species:</h3>
                <ul>
                    ${data.species.map(species => `<li>${species}</li>`).join('')}
                </ul>
                <h3>⚠️ Main Threats:</h3>
                <ul>
                    ${data.threats.map(threat => `<li>${threat}</li>`).join('')}
                </ul>
            </div>
        `;
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        document.body.appendChild(modal);
    }
}

function showEcologyFact(factType) {
    const facts = {
        species: {
            title: "🔢 Species Diversity",
            content: "Over 4,000 known jellyfish species exist, but scientists estimate 10,000+ undiscovered species in deep oceans! New species are discovered monthly, especially in unexplored deep-sea regions."
        },
        distribution: {
            title: "🌍 Global Distribution", 
            content: "Jellyfish are found in every ocean, from Arctic ice to tropical coral reefs, and even in some freshwater lakes! They've adapted to virtually every marine environment on Earth."
        },
        biomass: {
            title: "⚖️ Biomass Production",
            content: "Annual jellyfish biomass production exceeds 500 million tons - more than the entire global fish catch! This massive biomass plays a crucial role in ocean ecosystems."
        }
    };
    
    const fact = facts[factType];
    if (fact) {
        const modal = document.createElement('div');
        modal.className = 'ecology-modal';
        modal.innerHTML = `
            <div class="ecology-modal-content">
                <button class="modal-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
                <h2>${fact.title}</h2>
                <p>${fact.content}</p>
            </div>
        `;
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        document.body.appendChild(modal);
    }
}

function showClimateImpact(impactType) {
    const impacts = {
        warming: {
            title: "🌡️ Ocean Warming Effects",
            description: "Rising ocean temperatures accelerate jellyfish metabolism and reproduction cycles. Warmer waters also reduce oxygen levels, favoring jellyfish over fish. Some species can reproduce 3x faster in warmer conditions.",
            data: "2°C warming = 300% population increase in some species"
        },
        acidification: {
            title: "🧪 Ocean Acidification Impact", 
            description: "Lower ocean pH dissolves shells and skeletons of many marine animals, but jellyfish (having no hard parts) are largely unaffected. This gives them a competitive advantage as shell-forming species decline.",
            data: "pH drop from 8.1 to 7.8 = 50% reduction in competitors"
        },
        overfishing: {
            title: "🎣 Overfishing Consequences",
            description: "Removing fish (jellyfish predators and competitors) from ecosystems creates ecological niches that jellyfish rapidly fill. Many 'dead zones' are now dominated by jellyfish instead of fish.",
            data: "90% fish population decline = 500% jellyfish increase"
        },
        pollution: {
            title: "🏭 Nutrient Pollution Effects",
            description: "Agricultural runoff and sewage create eutrophic conditions that favor jellyfish blooms. Excessive nutrients lead to algae blooms, which jellyfish consume, followed by oxygen depletion that kills fish.",
            data: "Nutrient loading creates 400+ oceanic 'dead zones'"
        }
    };
    
    const impact = impacts[impactType];
    if (impact) {
        const modal = document.createElement('div');
        modal.className = 'ecology-modal';
        modal.innerHTML = `
            <div class="ecology-modal-content">
                <button class="modal-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
                <h2>${impact.title}</h2>
                <p>${impact.description}</p>
                <div style="background: rgba(100, 255, 218, 0.2); padding: 1rem; border-radius: 10px; margin-top: 1rem;">
                    <strong>Key Data:</strong> ${impact.data}
                </div>
            </div>
        `;
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        document.body.appendChild(modal);
    }
}

function updateEcosystem() {
    const temp = document.getElementById('temperature').value;
    const fish = document.getElementById('fishPop').value; 
    const pollution = document.getElementById('pollution').value;
    
    document.getElementById('tempValue').textContent = temp + '°C';
    document.getElementById('fishValue').textContent = fish + '%';
    
    const pollutionLevels = ['Very Low', 'Low', 'Low-Med', 'Medium', 'Med-High', 'High', 'High', 'Very High', 'Extreme', 'Critical'];
    document.getElementById('pollutionValue').textContent = pollutionLevels[pollution - 1];
    
    // Calculate jellyfish population based on conditions
    let jellyfishPop = 50; // baseline
    
    // Temperature effect (warmer = more jellyfish)
    jellyfishPop += (temp - 20) * 2;
    
    // Fish population effect (fewer fish = more jellyfish)
    jellyfishPop += (100 - fish) * 0.8;
    
    // Pollution effect (more pollution = more jellyfish)
    jellyfishPop += pollution * 3;
    
    // Keep within bounds
    jellyfishPop = Math.max(10, Math.min(100, jellyfishPop));
    
    document.getElementById('jellyfishPop').style.width = jellyfishPop + '%';
    
    let status = "Balanced";
    if (jellyfishPop > 80) status = "🚨 BLOOM ALERT - Ecosystem Crisis!";
    else if (jellyfishPop > 60) status = "⚠️ High Population - Monitoring Required";
    else if (jellyfishPop < 30) status = "📉 Low Population - Environmental Stress";
    
    document.getElementById('ecosystemPrediction').textContent = "Ecosystem status: " + status;
}

// Human Impact Functions  
function showHumanImpact(impactType) {
    const impacts = {
        medical: {
            title: "💊 Medical Revolution: From Jellyfish to Life-Saving Medicine",
            content: `
                <h3>Nobel Prize-Winning Discoveries:</h3>
                <ul>
                    <li><strong>Green Fluorescent Protein (GFP):</strong> Revolutionized cell biology, enabling real-time observation of cellular processes</li>
                    <li><strong>Cancer Research:</strong> GFP helps track cancer cells and test treatments in real-time</li>
                    <li><strong>Gene Therapy:</strong> Fluorescent markers guide precise genetic modifications</li>
                    <li><strong>Drug Development:</strong> 40+ jellyfish-derived compounds in pharmaceutical trials</li>
                    <li><strong>Surgical Applications:</strong> Fluorescent guidance systems for precise cancer removal</li>
                </ul>
                
                <h3>Market Impact:</h3>
                <p><strong>$2.5 billion annual market</strong> for GFP-related products and services</p>
                <p><strong>75,000+ research papers</strong> published using GFP technology</p>
                
                <h3>Current Clinical Trials:</h3>
                <ul>
                    <li>Phase III: GFP-guided cancer surgery</li>
                    <li>Phase II: Jellyfish collagen for wound healing</li>
                    <li>Phase I: Cnidarian toxins for chronic pain</li>
                </ul>
            `
        },
        environmental: {
            title: "🌊 Environmental Impact: Jellyfish as Ocean Health Indicators",
            content: `
                <h3>Early Warning Systems:</h3>
                <ul>
                    <li><strong>Climate Change Indicators:</strong> Jellyfish blooms signal warming oceans and ecosystem changes</li>
                    <li><strong>Pollution Monitoring:</strong> Population changes indicate water quality and nutrient levels</li>
                    <li><strong>Overfishing Effects:</strong> Jellyfish explosions show depleted fish populations</li>
                </ul>
                
                <h3>Economic Disruptions:</h3>
                <ul>
                    <li><strong>Power Plants:</strong> $200M annual losses from cooling system clogs</li>
                    <li><strong>Fisheries:</strong> $500M losses from damaged nets and reduced catches</li>
                    <li><strong>Tourism:</strong> $100M losses from beach closures and stings</li>
                    <li><strong>Aquaculture:</strong> $50M losses from fish farm disruptions</li>
                </ul>
                
                <h3>Scientific Monitoring:</h3>
                <p><strong>Global Jellyfish Monitoring Network:</strong> 150+ research stations worldwide</p>
                <p><strong>Satellite Tracking:</strong> AI systems identify blooms from space</p>
            `
        },
        technology: {
            title: "🚀 Technology Revolution: Jellyfish-Inspired Innovation",
            content: `
                <h3>Biomimetic Robotics:</h3>
                <ul>
                    <li><strong>Soft Robotics:</strong> Jellyfish-inspired underwater vehicles with 97% efficiency</li>
                    <li><strong>Medical Devices:</strong> Flexible surgical robots based on jellyfish anatomy</li>
                    <li><strong>Propulsion Systems:</strong> Jet engines inspired by jellyfish locomotion</li>
                </ul>
                
                <h3>Materials Science:</h3>
                <ul>
                    <li><strong>Hydrogels:</strong> Jellyfish-inspired materials for drug delivery</li>
                    <li><strong>Flexible Electronics:</strong> Stretchable circuits based on jellyfish structure</li>
                    <li><strong>Self-Healing Materials:</strong> Inspired by jellyfish regeneration abilities</li>
                </ul>
                
                <h3>Innovation Pipeline:</h3>
                <p><strong>50+ patents</strong> filed annually for jellyfish-inspired technologies</p>
                <p><strong>$500M</strong> invested in biomimetic research programs</p>
            `
        },
        cultural: {
            title: "🎭 Cultural Heritage: Jellyfish in Human Civilization",
            content: `
                <h3>Traditional Medicine & Healing:</h3>
                <ul>
                    <li><strong>Asian Medicine:</strong> Used for 2000+ years in traditional Chinese and Japanese medicine</li>
                    <li><strong>Anti-inflammatory Properties:</strong> Jellyfish collagen reduces arthritis and joint pain</li>
                    <li><strong>Wound Healing:</strong> Traditional poultices made from processed jellyfish</li>
                    <li><strong>Longevity Treatments:</strong> Ancient beliefs about immortal jellyfish properties</li>
                </ul>
                
                <h3>Culinary Traditions:</h3>
                <ul>
                    <li><strong>Asian Cuisine:</strong> Delicacy in China, Japan, and Southeast Asia</li>
                    <li><strong>Sustainable Protein:</strong> Low-calorie, high-collagen food source</li>
                    <li><strong>Market Value:</strong> $150M annual global jellyfish food industry</li>
                    <li><strong>Cultural Festivals:</strong> Special preparation methods passed down generations</li>
                </ul>
                
                <h3>Art & Mythology:</h3>
                <ul>
                    <li><strong>Ancient Symbolism:</strong> Representing immortality and transformation</li>
                    <li><strong>Modern Art:</strong> Inspiration for sculptures, paintings, and installations</li>
                    <li><strong>Folklore:</strong> Featured in creation myths across 12+ cultures</li>
                    <li><strong>Contemporary Design:</strong> Influencing architecture and fashion</li>
                </ul>
                
                <h3>Cultural Impact:</h3>
                <p><strong>Found in 12+ cultural traditions</strong> worldwide</p>
                <p><strong>Inspiring modern biomimetic design</strong> in art and architecture</p>
            `
        },
        economic: {
            title: "💰 Economic Impact: The Jellyfish Economy",
            content: `
                <h3>Negative Economic Impacts:</h3>
                <ul>
                    <li><strong>Fisheries Disruption:</strong> $500M annual losses from damaged nets and reduced catches</li>
                    <li><strong>Power Plant Shutdowns:</strong> $200M losses from cooling system blockages</li>
                    <li><strong>Tourism Losses:</strong> $100M from beach closures and reduced visits</li>
                    <li><strong>Aquaculture Damage:</strong> $50M losses from fish farm disruptions</li>
                    <li><strong>Shipping Delays:</strong> $25M in port and shipping disruptions</li>
                </ul>
                
                <h3>Positive Economic Contributions:</h3>
                <ul>
                    <li><strong>Biotechnology Market:</strong> $2.5B annual revenue from GFP and derivatives</li>
                    <li><strong>Food Industry:</strong> $150M jellyfish cuisine market</li>
                    <li><strong>Pharmaceutical Research:</strong> $300M investment in jellyfish-derived compounds</li>
                    <li><strong>Research Equipment:</strong> $200M market for GFP-related laboratory tools</li>
                    <li><strong>Biomimetic Technologies:</strong> $400M in jellyfish-inspired innovations</li>
                </ul>
                
                <h3>Future Economic Projections:</h3>
                <ul>
                    <li><strong>Regenerative Medicine:</strong> Projected $5B market by 2030</li>
                    <li><strong>Soft Robotics:</strong> $2B market potential in next decade</li>
                    <li><strong>Sustainable Materials:</strong> $1B jellyfish-based materials market</li>
                </ul>
                
                <h3>Net Economic Analysis:</h3>
                <p><strong>Total Losses:</strong> -$875M annually</p>
                <p><strong>Total Gains:</strong> +$3.55B annually</p>
                <p><strong>Net Economic Impact:</strong> +$2.675B annually</p>
            `
        },
        future: {
            title: "🔮 Future Applications: The Next Frontier",
            content: `
                <h3>Gene Therapy & Medicine:</h3>
                <ul>
                    <li><strong>Targeted Drug Delivery:</strong> Jellyfish-inspired nanocarriers for precision medicine</li>
                    <li><strong>Gene Editing Guides:</strong> Fluorescent markers for CRISPR applications</li>
                    <li><strong>Cancer Immunotherapy:</strong> Jellyfish compounds boosting immune response</li>
                    <li><strong>Regenerative Medicine:</strong> Unlocking secrets of jellyfish immortality</li>
                </ul>
                
                <h3>Space & Deep Sea Exploration:</h3>
                <ul>
                    <li><strong>Space Propulsion:</strong> Jellyfish-inspired efficient movement systems</li>
                    <li><strong>Extreme Environment Suits:</strong> Based on jellyfish pressure adaptation</li>
                    <li><strong>Autonomous Exploration:</strong> Jellyfish-like robots for alien oceans</li>
                    <li><strong>Life Support Systems:</strong> Biomimetic water and nutrient cycling</li>
                </ul>
                
                <h3>Environmental Solutions:</h3>
                <ul>
                    <li><strong>Ocean Cleanup:</strong> Jellyfish-inspired filtration systems</li>
                    <li><strong>Climate Monitoring:</strong> Global network of jellyfish-sensor arrays</li>
                    <li><strong>Ecosystem Restoration:</strong> Understanding jellyfish roles in carbon cycling</li>
                    <li><strong>Pollution Detection:</strong> Bio-inspired early warning systems</li>
                </ul>
                
                <h3>Technology Revolution:</h3>
                <ul>
                    <li><strong>Artificial Intelligence:</strong> Distributed processing inspired by jellyfish networks</li>
                    <li><strong>Energy Storage:</strong> Bio-batteries based on jellyfish energy systems</li>
                    <li><strong>Smart Materials:</strong> Self-healing and adaptive materials</li>
                </ul>
                
                <h3>Market Projections:</h3>
                <p><strong>Total Market by 2035:</strong> $15B across all applications</p>
                <p><strong>Job Creation:</strong> 250,000+ new positions in jellyfish biotechnology</p>
                <p><strong>Research Investment:</strong> $50B projected over next decade</p>
            `
        }
    };
    
    const impact = impacts[impactType];
    if (impact) {
        // Create and show detailed modal
        const modal = document.createElement('div');
        modal.className = 'impact-modal';
        modal.innerHTML = `
            <div class="impact-modal-content">
                <button class="modal-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
                <h2>${impact.title}</h2>
                <div class="impact-details">${impact.content}</div>
            </div>
        `;
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.9); display: flex; align-items: center;
            justify-content: center; z-index: 10001;
        `;
        modal.querySelector('.impact-modal-content').style.cssText = `
            background: linear-gradient(135deg, var(--dark-bg), var(--primary-color));
            color: var(--text-light); padding: 2rem; border-radius: 20px;
            max-width: 800px; max-height: 80vh; overflow-y: auto;
            border: 2px solid var(--accent-color);
        `;
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        document.body.appendChild(modal);
    }
}

// Case Study Functions
let currentCase = 'gfp';

function switchCaseStudy(caseType) {
    // Update button states
    document.querySelectorAll('.case-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-case="${caseType}"]`).classList.add('active');
    
    // Hide all case studies
    document.querySelectorAll('.case-study-content').forEach(content => content.classList.add('hidden'));
    
    // Show selected case study
    document.getElementById(`${caseType}-case`).classList.remove('hidden');
    
    currentCase = caseType;
}

function showTimelineDetail(event) {
    const details = {
        discovery: {
            title: "🔬 The Accidental Discovery of GFP (1962)",
            story: `Osamu Shimomura was studying bioluminescence in jellyfish at Friday Harbor Laboratories. While extracting aequorin (the bioluminescent protein), he noticed a faint green glow under UV light. This 'contamination' turned out to be one of the most important discoveries in biological research.
            
            The jellyfish Aequorea victoria had evolved this protein over millions of years as a secondary light system. What nature created for survival, humans would use to revolutionize medicine.`
        },
        cloning: {
            title: "🧬 The Gene Cloning Breakthrough (1994)", 
            story: `Martin Chalfie realized that if GFP could be cloned and expressed in other organisms, it would become the ultimate biological marker. His team successfully made E. coli bacteria glow green - proving that GFP could work in any living system.
            
            This was the moment GFP went from a curious jellyfish protein to a universal research tool.`
        },
        variants: {
            title: "🌈 Creating the Rainbow of Life (1996-2000)",
            story: `Roger Tsien's team engineered the GFP gene to create proteins that glowed in different colors. By changing just a few amino acids, they created cyan (CFP), yellow (YFP), and red (RFP) variants.
            
            This rainbow of colors allowed scientists to track multiple processes simultaneously in living cells.`
        },
        nobel: {
            title: "🏆 Nobel Prize Recognition (2008)",
            story: `The 2008 Nobel Prize in Chemistry was awarded to Shimomura, Chalfie, and Tsien "for the discovery and development of the green fluorescent protein, GFP."
            
            The Nobel Committee noted that GFP had become "one of the most important tools used in contemporary bioscience."`
        }
    };
    
    const detail = details[event];
    if (detail) {
        alert(`${detail.title}\n\n${detail.story}`);
    }
}

function showMetricDetail(metric) {
    const metrics = {
        papers: "📄 Over 75,000 research papers have been published using GFP technology, with new applications discovered weekly.",
        market: "💰 The GFP technology market has grown to $4.2 billion annually, supporting thousands of biotech companies worldwide.",
        variants: "🌈 Scientists have created over 200 different fluorescent protein variants, each optimized for specific research applications.",
        labs: "🔬 More than 50,000 research laboratories globally use GFP technology in their daily work."
    };
    
    alert(metrics[metric]);
}

function animateImpact(type) {
    const visualizations = {
        discovery: `
            <div class="discovery-viz">
                <h4>🔬 The Discovery Process</h4>
                <div class="process-steps">
                    <div class="step">1962: Jellyfish collected → Protein extracted → Green glow observed</div>
                    <div class="step">1994: Gene cloned → Bacteria transformed → Universal tool created</div>
                    <div class="step">2008: Nobel Prize → Global recognition → Medical revolution</div>
                </div>
            </div>
        `,
        adoption: `
            <div class="adoption-viz">
                <h4>📈 Global Adoption Timeline</h4>
                <div class="adoption-stats">
                    <div class="year-stat">1995: 10 labs using GFP</div>
                    <div class="year-stat">2000: 1,000 labs worldwide</div>
                    <div class="year-stat">2010: 25,000 labs globally</div>
                    <div class="year-stat">2024: 50,000+ labs using variants</div>
                </div>
            </div>
        `,
        applications: `
            <div class="applications-viz">
                <h4>🏥 Medical Applications</h4>
                <div class="medical-apps">
                    <div class="app">Cancer Detection: Real-time tumor visualization</div>
                    <div class="app">Gene Therapy: Tracking therapeutic genes</div>
                    <div class="app">Drug Testing: Monitoring treatment effects</div>
                    <div class="app">Surgical Guidance: Precision tumor removal</div>
                </div>
            </div>
        `
    };
    
    document.getElementById('impactViz').innerHTML = visualizations[type];
}

// Research Library Functions
function showPaperDetails(paperId) {
    const paperData = {
        1: {
            title: "Discovery and Development of Green Fluorescent Protein",
            authors: "Shimomura, O., Johnson, F.H., Saiga, Y.",
            journal: "Journal of Cellular Biology",
            year: 2008,
            impact: "95.2",
            citations: 47832,
            abstract: "This seminal work describes the initial discovery and characterization of green fluorescent protein from Aequorea victoria. The research laid the foundation for one of the most important tools in modern cell biology, enabling real-time visualization of cellular processes.",
            keyFindings: [
                "First isolation and purification of GFP from jellyfish",
                "Characterization of protein structure and fluorescent properties", 
                "Development of expression systems for research applications",
                "Demonstration of GFP as a universal biological marker"
            ],
            applications: "Used in over 75,000 subsequent research studies across medicine, biology, and biotechnology"
        },
        2: {
            title: "Immortal Jellyfish: Biological Mechanisms of Reverse Aging",
            authors: "Piraino, S., Boero, F., Aeschbach, B., Schmid, V.",
            journal: "Nature Cell Biology", 
            year: 2019,
            impact: "89.7",
            citations: 23156,
            abstract: "This groundbreaking study reveals the molecular mechanisms behind Turritopsis dohrnii's ability to reverse its aging process, potentially offering insights into human longevity research and regenerative medicine.",
            keyFindings: [
                "Identification of key genes controlling reverse development",
                "Characterization of cellular reprogramming mechanisms",
                "Discovery of novel anti-aging compounds",
                "Potential applications in human medicine"
            ],
            applications: "Informing research into age-related diseases, stem cell therapy, and regenerative medicine"
        },
        3: {
            title: "Climate Change and Jellyfish Population Dynamics",
            authors: "Richardson, A.J., Bakun, A., Hays, G.C., Gibbons, M.J.",
            journal: "Science",
            year: 2020,
            impact: "78.9",
            citations: 15643,
            abstract: "Comprehensive analysis of how climate change affects global jellyfish populations, revealing complex relationships between ocean warming, acidification, and jellyfish blooms.",
            keyFindings: [
                "300% population increase in warming oceans",
                "Jellyfish thrive in acidified waters while competitors decline",
                "Blooms linked to overfishing and nutrient pollution",
                "Predictive models for future population changes"
            ],
            applications: "Environmental monitoring, fisheries management, ecosystem conservation"
        },
        4: {
            title: "Cnidarian Venom: A Treasure Trove of Bioactive Compounds",
            authors: "Lewis, R.J., Garcia, M.L., Norton, R.S.",
            journal: "Nature Reviews Drug Discovery",
            year: 2021,
            impact: "67.4",
            citations: 12987,
            abstract: "Systematic analysis of cnidarian venoms reveals over 200 bioactive compounds with potential pharmaceutical applications, from pain management to cancer treatment.",
            keyFindings: [
                "200+ novel bioactive compounds identified",
                "12 compounds showing anti-cancer activity",
                "Pain-blocking peptides more potent than morphine",
                "New antibiotic compounds effective against resistant bacteria"
            ],
            applications: "Drug discovery, pain management, antimicrobial therapy, cancer treatment"
        },
        5: {
            title: "Jellyfish-Inspired Soft Robotics and Biomimetic Engineering",
            authors: "Villanueva, A., Smith, C., Priya, S.",
            journal: "Bioinspiration & Biomimetics",
            year: 2022,
            impact: "45.3", 
            citations: 8974,
            abstract: "Development of jellyfish-inspired soft robots achieving unprecedented efficiency in underwater propulsion and manipulation tasks.",
            keyFindings: [
                "97% propulsive efficiency in biomimetic design",
                "Self-healing materials inspired by jellyfish structure",
                "Scalable manufacturing processes developed",
                "Applications in underwater exploration and medical devices"
            ],
            applications: "Underwater robotics, medical devices, prosthetics, industrial automation"
        },
        6: {
            title: "Hydrozoan Colonies: Distributed Intelligence and Decision Making",
            authors: "Mackie, G.O., Pugh, P.R., Purcell, J.E.",
            journal: "Current Biology",
            year: 2021,
            impact: "52.8",
            citations: 7865,
            abstract: "Investigation of collective intelligence in colonial hydrozoans reveals sophisticated decision-making processes without central nervous systems.",
            keyFindings: [
                "Distributed neural networks enable collective decisions",
                "Information processing across colony members",
                "Adaptive responses to environmental changes", 
                "Implications for artificial intelligence architectures"
            ],
            applications: "AI development, swarm robotics, distributed computing, neural networks"
        },
        7: {
            title: "Jellyfish Collagen: Properties and Biomedical Applications",
            authors: "Silva, T.H., Moreira-Silva, J., Marques, A.L.P.",
            journal: "Marine Drugs",
            year: 2020,
            impact: "38.9",
            citations: 6543,
            abstract: "Comprehensive characterization of jellyfish collagen properties and its superior biocompatibility for tissue engineering applications.",
            keyFindings: [
                "Lower antigenicity than mammalian collagen",
                "Enhanced wound healing properties",
                "Biodegradable scaffolds for tissue regeneration",
                "Cost-effective production methods developed"
            ],
            applications: "Tissue engineering, wound healing, cosmetics, food industry"
        },
        8: {
            title: "Cnidocyte Mechanics: Nature's Perfect Projectile System",
            authors: "Nüchter, T., Benoit, M., Engel, U., Özbek, S.",
            journal: "Current Biology", 
            year: 2019,
            impact: "48.2",
            citations: 5987,
            abstract: "Detailed analysis of cnidocyte firing mechanisms reveals the fastest cellular process in nature, inspiring new projectile and injection technologies.",
            keyFindings: [
                "Acceleration exceeds 5 million G-forces",
                "Pressure generation of 150 atmospheres",
                "Trigger mechanism sensitivity to touch and chemistry",
                "Biomimetic applications in microinjection"
            ],
            applications: "Microfluidics, drug delivery systems, microscale manufacturing"
        },
        9: {
            title: "Aurelia aurita Population Genetics and Global Dispersal",
            authors: "Dawson, M.N., Hamner, W.M., Decker, M.B.",
            journal: "Marine Ecology Progress Series",
            year: 2018,
            impact: "31.7",
            citations: 4521,
            abstract: "Global genetic analysis of moon jellyfish reveals complex population structures and dispersal patterns affecting marine ecosystems worldwide.",
            keyFindings: [
                "Cryptic species within Aurelia complex",
                "Ocean current-driven dispersal patterns",
                "Genetic adaptation to local environments",
                "Impact on global marine biodiversity"
            ],
            applications: "Marine conservation, ecosystem management, climate change research"
        },
        10: {
            title: "Bioluminescence in Deep-Sea Cnidarians: Evolution and Function",
            authors: "Haddock, S.H.D., Moline, M.A., Case, J.F.",
            journal: "Annual Review of Marine Science",
            year: 2020,
            impact: "42.1",
            citations: 3876,
            abstract: "Comprehensive study of bioluminescence in deep-sea jellyfish reveals diverse evolutionary strategies and ecological functions.",
            keyFindings: [
                "80% of deep-sea species are bioluminescent",
                "Multiple independent evolution of light production",
                "Communication and predator deterrence functions",
                "Novel luciferase systems discovered"
            ],
            applications: "Biotechnology, biosensors, medical imaging, environmental monitoring"
        },
        11: {
            title: "Jellyfish Blooms: Ecological Impacts and Management Strategies",
            authors: "Purcell, J.E., Uye, S.I., Lo, W.T.",
            journal: "Hydrobiologia",
            year: 2019,
            impact: "28.4",
            citations: 2987,
            abstract: "Analysis of global jellyfish bloom events and their ecological and economic impacts, with recommendations for management and mitigation.",
            keyFindings: [
                "500+ documented bloom events globally",
                "Economic losses exceed $1 billion annually",
                "Ecosystem shifts from fish to jellyfish dominance",
                "Management strategies show limited success"
            ],
            applications: "Ecosystem management, fisheries policy, environmental monitoring"
        },
        12: {
            title: "Cnidarian Regeneration: Molecular Mechanisms and Therapeutic Potential",
            authors: "Bosch, T.C.G., Anton-Erxleben, F., Hemmrich, G.",
            journal: "Development",
            year: 2021,
            impact: "35.6",
            citations: 2156,
            abstract: "Investigation of regenerative abilities in cnidarians reveals conserved molecular pathways with potential for human regenerative medicine.",
            keyFindings: [
                "Complete body regeneration from small fragments",
                "Stem cell maintenance throughout lifespan",
                "Key regulatory genes identified",
                "Evolutionary conservation of regeneration pathways"
            ],
            applications: "Regenerative medicine, stem cell therapy, aging research, tissue engineering"
        }
    };
    
    const paper = paperData[paperId];
    if (!paper) return;
    
    // Create detailed modal
    const modal = document.createElement('div');
    modal.className = 'paper-modal';
    modal.innerHTML = `
        <div class="paper-modal-content">
            <button class="modal-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
            <h2>${paper.title}</h2>
            <div class="paper-meta">
                <p><strong>Authors:</strong> ${paper.authors}</p>
                <p><strong>Journal:</strong> ${paper.journal} (${paper.year})</p>
                <p><strong>Impact Factor:</strong> ${paper.impact} | <strong>Citations:</strong> ${paper.citations.toLocaleString()}</p>
            </div>
            <h3>Abstract</h3>
            <p>${paper.abstract}</p>
            <h3>Key Findings</h3>
            <ul>
                ${paper.keyFindings.map(finding => `<li>${finding}</li>`).join('')}
            </ul>
            <h3>Applications</h3>
            <p>${paper.applications}</p>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.9); display: flex; align-items: center;
        justify-content: center; z-index: 10001; overflow-y: auto;
    `;
    modal.querySelector('.paper-modal-content').style.cssText = `
        background: linear-gradient(135deg, var(--dark-bg), var(--primary-color));
        color: var(--text-light); padding: 2rem; border-radius: 20px;
        max-width: 800px; max-height: 80vh; overflow-y: auto;
        border: 2px solid var(--accent-color); margin: 2rem;
    `;
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    document.body.appendChild(modal);
}

function filterPapers(field) {
    const allPapers = document.querySelectorAll('.research-paper');
    
    if (field === 'all') {
        allPapers.forEach(paper => paper.style.display = 'block');
        return;
    }
    
    const fieldCategories = {
        medicine: [1, 2, 4, 7, 8, 12],
        ecology: [3, 9, 11],
        technology: [5, 6, 8, 10],
        genetics: [1, 2, 9, 12]
    };
    
    const relevantPapers = fieldCategories[field] || [];
    
    allPapers.forEach((paper, index) => {
        const paperId = index + 1;
        paper.style.display = relevantPapers.includes(paperId) ? 'block' : 'none';
    });
}

function sortPapers(criteria) {
    const container = document.querySelector('.research-grid');
    const papers = Array.from(container.querySelectorAll('.research-paper'));
    
    // Paper metadata for sorting
    const metadata = {
        1: { year: 2008, citations: 47832, impact: 95.2 },
        2: { year: 2019, citations: 23156, impact: 89.7 },
        3: { year: 2020, citations: 15643, impact: 78.9 },
        4: { year: 2021, citations: 12987, impact: 67.4 },
        5: { year: 2022, citations: 8974, impact: 45.3 },
        6: { year: 2021, citations: 7865, impact: 52.8 },
        7: { year: 2020, citations: 6543, impact: 38.9 },
        8: { year: 2019, citations: 5987, impact: 48.2 },
        9: { year: 2018, citations: 4521, impact: 31.7 },
        10: { year: 2020, citations: 3876, impact: 42.1 },
        11: { year: 2019, citations: 2987, impact: 28.4 },
        12: { year: 2021, citations: 2156, impact: 35.6 }
    };
    
    papers.sort((a, b) => {
        const aId = parseInt(a.dataset.paperId);
        const bId = parseInt(b.dataset.paperId);
        
        if (criteria === 'year') {
            return metadata[bId].year - metadata[aId].year;
        } else if (criteria === 'citations') {
            return metadata[bId].citations - metadata[aId].citations;
        } else if (criteria === 'impact') {
            return metadata[bId].impact - metadata[aId].impact;
        }
        return 0;
    });
    
    // Re-append sorted papers
    papers.forEach(paper => container.appendChild(paper));
}

// Species Comparison System
const speciesComparisonData = {
    aurelia: {
        name: "Aurelia aurita (Moon Jellyfish)",
        genomeSize: "369 Mb",
        genes: "18,762",
        maxSize: "40 cm",
        habitat: "Global temperate waters", 
        lifespan: "6-12 months",
        venom: "Mild",
        bioluminescence: "No",
        specialFeature: "Model organism for research"
    },
    nemopilema: {
        name: "Nemopilema nomurai (Nomura's Jellyfish)",
        genomeSize: "156 Mb", 
        genes: "27,000+",
        maxSize: "2 meters",
        habitat: "East Asian seas",
        lifespan: "12-18 months", 
        venom: "Moderate",
        bioluminescence: "No",
        specialFeature: "Largest known species"
    },
    atolla: {
        name: "Atolla wyvillei (Deep Sea Atolla)",
        genomeSize: "Unknown",
        genes: "Estimated 15,000+",
        maxSize: "17.5 cm",
        habitat: "Deep ocean (500-5000m)",
        lifespan: "2-5 years",
        venom: "Mild", 
        bioluminescence: "Yes (Burglar alarm)",
        specialFeature: "Bioluminescent defense system"
    },
    immortal: {
        name: "Turritopsis dohrnii (Immortal Jellyfish)",
        genomeSize: "Under research",
        genes: "Unknown",
        maxSize: "4.5 mm",
        habitat: "Mediterranean, spreading globally",
        lifespan: "Potentially immortal",
        venom: "None",
        bioluminescence: "No", 
        specialFeature: "Can reverse aging process"
    }
};

function updateComparison() {
    const species1 = document.getElementById('species1').value;
    const species2 = document.getElementById('species2').value;
    
    const data1 = speciesComparisonData[species1];
    const data2 = speciesComparisonData[species2];
    
    document.getElementById('comparison1').innerHTML = createComparisonCard(data1);
    document.getElementById('comparison2').innerHTML = createComparisonCard(data2);
}

function createComparisonCard(data) {
    return `
        <h4>${data.name}</h4>
        <div class="comparison-stat">
            <span class="stat-label">🧬 Genome Size:</span>
            <span class="stat-value">${data.genomeSize}</span>
        </div>
        <div class="comparison-stat">
            <span class="stat-label">🔢 Genes:</span>
            <span class="stat-value">${data.genes}</span>
        </div>
        <div class="comparison-stat">
            <span class="stat-label">📏 Max Size:</span>
            <span class="stat-value">${data.maxSize}</span>
        </div>
        <div class="comparison-stat">
            <span class="stat-label">🌊 Habitat:</span>
            <span class="stat-value">${data.habitat}</span>
        </div>
        <div class="comparison-stat">
            <span class="stat-label">⏰ Lifespan:</span>
            <span class="stat-value">${data.lifespan}</span>
        </div>
        <div class="comparison-stat">
            <span class="stat-label">⚡ Venom:</span>
            <span class="stat-value">${data.venom}</span>
        </div>
        <div class="comparison-stat">
            <span class="stat-label">💡 Bioluminescence:</span>
            <span class="stat-value">${data.bioluminescence}</span>
        </div>
        <div class="comparison-stat">
            <span class="stat-label">✨ Special Feature:</span>
            <span class="stat-value">${data.specialFeature}</span>
        </div>
    `;
}

// Initialize comparison on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active nav
    updateActiveNav();
    
    // Preload animations
    document.body.classList.add('loaded');
    
    // Start particle system
    setTimeout(() => {
        for (let i = 0; i < 5; i++) {
            setTimeout(createParticle, i * 500);
        }
    }, 1000);
    
    // Initialize genome counters when in view
    const genomeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateGenomeCounters();
            }
        });
    });
    
    document.querySelectorAll('.genome-stats').forEach(stats => {
        genomeObserver.observe(stats);
    });
    
    // Initialize species comparison
    setTimeout(() => {
        if (document.getElementById('species1')) {
            updateComparison();
        }
    }, 100);
    
    // Console message
    console.log('🪼 Welcome to JellyGenomics Research Hub!');
    console.log('🧬 Exploring the fascinating world of jellyfish through genomics and bioinformatics.');
    console.log('✨ Click bubbles, hover over anatomy parts, and explore the interactive genome sequences!');
    console.log('🚀 Try the floating genome explorer button for real-time data!');
    console.log('🔬 Click on any card for detailed research information!');
});