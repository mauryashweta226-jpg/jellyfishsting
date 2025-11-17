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

// Enhanced Species Information Modal
function showSpeciesDetails(species) {
    const speciesData = {
        aurelia: {
            title: 'Aurelia aurita - Moon Jellyfish 🌙',
            info: `The moon jellyfish is one of the most studied cnidarians in genomics research. Its genome has revealed crucial insights into the evolution of nervous systems.`,
            stats: [
                { label: 'Genome Size', value: '369 Mb' },
                { label: 'Total Genes', value: '18,762' },
                { label: 'Discovery Year', value: '1758' },
                { label: 'Lifespan', value: '6-12 months' }
            ]
        },
        nemopilema: {
            title: 'Nemopilema nomurai - Nomura\'s Jellyfish 🦑',
            info: `One of the largest jellyfish species, with a bell diameter reaching 2 meters. Its genome sequencing has provided invaluable data on toxin production.`,
            stats: [
                { label: 'Genome Size', value: '156 Mb' },
                { label: 'Max Diameter', value: '2 meters' },
                { label: 'Max Weight', value: '200 kg' },
                { label: 'Native Region', value: 'East Asia' }
            ]
        },
        atolla: {
            title: 'Atolla wyvillei - Deep Sea Atolla 🌊',
            info: `A deep-sea species famous for its bioluminescent "burglar alarm" defense mechanism.`,
            stats: [
                { label: 'Depth Range', value: '500-5000m' },
                { label: 'Bell Diameter', value: '17.5 cm' },
                { label: 'Bioluminescence', value: 'Active' },
                { label: 'Discovery', value: '1902' }
            ]
        },
        immortal: {
            title: 'Turritopsis dohrnii - Immortal Jellyfish ♾️',
            info: `This remarkable species can reverse its aging process by transforming from adult back to polyp stage.`,
            stats: [
                { label: 'Size', value: '4.5 mm' },
                { label: 'Biological Age', value: 'Potentially ♾️' },
                { label: 'Regeneration', value: 'Complete' },
                { label: 'Lifecycle', value: 'Reversible' }
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

// Interactive Bubble Effects
function popBubble(bubble) {
    bubble.style.transform = 'scale(2)';
    bubble.style.opacity = '0';
    
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
        
        if (isMoving) {
            clearTimeout(isMoving);
        }
        
        isMoving = setTimeout(() => {
            cursor.classList.remove('active');
        }, 2000);
    });

    document.querySelectorAll('a, button, .interactive').forEach(el => {
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
    
    const colors = ['var(--accent-color)', 'var(--neon-pink)', 'var(--bioluminescent)'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    document.getElementById('particles').appendChild(particle);
    
    setTimeout(() => particle.remove(), 20000);
}

setInterval(createParticle, 2000);

// Detailed Information System
const detailedInfoData = {
    ancient: {
        title: "🧬 Ancient Survivors: 500 Million Years of Evolution",
        overview: `<h3>🦕 Prehistoric Dominance</h3>
            <p>Jellyfish are among Earth's oldest inhabitants, with fossil evidence dating back to the Cambrian period.</p>`,
        research: `<h3>🔬 Current Research Frontiers</h3>
            <p>Comparing ancient and modern jellyfish genomes to understand evolutionary stability mechanisms.</p>`,
        papers: [],
        interactive: `<div class="interactive-elements">
            <div class="interactive-widget">
                <h4>🕰️ Jellyfish Timeline</h4>
                <button class="interactive-btn" onclick="showEvolutionTimeline()">Explore 500M Years</button>
                <div class="fact-display" id="timelineFact">Click to journey through time!</div>
            </div>
        </div>`
    },
    water: {
        title: "💧 95% Water: The Miracle of Hydro-Engineering",
        overview: `<h3>💧 Living Water Balloons</h3>
            <p>Jellyfish are nature's ultimate minimalists - 95% water, yet capable of complex behaviors.</p>`,
        research: `<h3>🔬 Biomimetics & Robotics</h3>
            <p>Engineers copy jellyfish propulsion for underwater robots and medical devices.</p>`,
        papers: [],
        interactive: `<div class="interactive-elements">
            <div class="interactive-widget">
                <h4>💧 Water Calculator</h4>
                <button class="interactive-btn" onclick="calculateWaterContent()">Calculate Human vs Jellyfish</button>
                <div class="fact-display" id="waterFact">Compare water percentages!</div>
            </div>
        </div>`
    },
    bioluminescence: {
        title: "✨ Bioluminescence: Nature's Living Light Show",
        overview: `<h3>✨ The Green Revolution</h3>
            <p>Jellyfish bioluminescence led to the discovery of GFP, winning the Nobel Prize.</p>`,
        research: `<h3>🔬 Cutting-Edge Bioluminescence Research</h3>
            <p>Using light-sensitive proteins to control brain cells and treat neurological diseases.</p>`,
        papers: [],
        interactive: `<div class="interactive-elements">
            <div class="interactive-widget">
                <h4>✨ Light Chemistry</h4>
                <button class="interactive-btn" onclick="simulateBioluminescence()">Create Virtual Light</button>
                <div class="fact-display" id="lightFact">Mix luciferin + luciferase!</div>
            </div>
        </div>`
    },
    reproduction: {
        title: "🔄 Alien Reproduction: The Most Complex Lifecycle",
        overview: `<h3>🔄 Two-Stage Alien Lifecycle</h3>
            <p>Jellyfish alternate between polyp and medusa stages.</p>`,
        research: `<h3>🔬 Reproductive Biology Research</h3>
            <p>Studying genetic mechanisms that control stage transitions.</p>`,
        papers: [],
        interactive: `<div class="interactive-elements">
            <div class="interactive-widget">
                <h4>🔄 Lifecycle Simulator</h4>
                <button class="interactive-btn" onclick="simulateLifecycle()">Watch Transformation</button>
                <div class="fact-display" id="lifecycleFact">Witness metamorphosis!</div>
            </div>
        </div>`
    },
    intelligence: {
        title: "🧠 Brainless Intelligence: Distributed Neural Networks",
        overview: `<h3>🧠 Neural Networks Without a Brain</h3>
            <p>Despite having no central brain, jellyfish demonstrate learning and memory.</p>`,
        research: `<h3>🔬 Neuroscience Applications</h3>
            <p>Using jellyfish neural architecture to design fault-tolerant computer networks.</p>`,
        papers: [],
        interactive: `<div class="interactive-elements">
            <div class="interactive-widget">
                <h4>🧠 Neural Network</h4>
                <button class="interactive-btn" onclick="simulateNeuralNet()">Map Neural Pathways</button>
                <div class="fact-display" id="neuralFact">8,000 connected neurons!</div>
            </div>
        </div>`
    },
    extremophiles: {
        title: "🌡️ Extreme Survivors: Life in Impossible Conditions",
        overview: `<h3>🌡️ Masters of Extreme Environments</h3>
            <p>Jellyfish survive in Arctic ice, boiling vents, and even outer space experiments.</p>`,
        research: `<h3>🔬 Extremophile Research Applications</h3>
            <p>Studying how jellyfish adapt to rapid climate change.</p>`,
        papers: [],
        interactive: `<div class="interactive-elements">
            <div class="interactive-widget">
                <h4>🌡️ Extreme Conditions</h4>
                <button class="interactive-btn" onclick="testExtremes()">Survival Simulator</button>
                <div class="fact-display" id="extremeFact">Test jellyfish limits!</div>
            </div>
        </div>`
    }
};

function showDetailedInfo(topic) {
    const modal = document.getElementById('detailedModal');
    const data = detailedInfoData[topic];
    
    if (data) {
        document.getElementById('detailedModalTitle').innerHTML = data.title;
        document.getElementById('overview-tab').innerHTML = data.overview;
        document.getElementById('research-tab').innerHTML = data.research;
        document.getElementById('papers-tab').innerHTML = '<p>Research papers coming soon...</p>';
        document.getElementById('interactive-tab').innerHTML = data.interactive;
        
        modal.classList.add('active');
        switchTab('overview');
    }
}

function closeDetailedModal() {
    document.getElementById('detailedModal').classList.remove('active');
}

function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

document.getElementById('detailedModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeDetailedModal();
    }
});

// Quiz System
const jellyfishQuestions = [
    {
        question: "How long have jellyfish existed on Earth?",
        options: ["100 million years", "500+ million years", "50 million years", "1 billion years"],
        correct: 1,
        explanation: "Jellyfish have existed for over 500 million years!"
    }
];

let currentQuizIndex = 0;
let quizScore = 0;

function checkAnswer(isCorrect, buttonElement) {
    const buttons = buttonElement.parentNode.querySelectorAll('button');
    
    buttons.forEach(btn => btn.disabled = true);
    
    if (isCorrect) {
        buttonElement.classList.add('correct');
        quizScore++;
        document.getElementById('quizScore').textContent = quizScore;
    } else {
        buttonElement.classList.add('incorrect');
        buttons[jellyfishQuestions[currentQuizIndex].correct].classList.add('correct');
    }
}

// Interactive Functions
function showEvolutionTimeline() {
    const facts = [
        "560 MYA: First jellyfish-like creatures appear",
        "540 MYA: Cambrian explosion - jellyfish diversity booms",
        "Today: Still thriving in every ocean!"
    ];
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    document.getElementById('timelineFact').innerHTML = `<strong>${randomFact}</strong>`;
}

function calculateWaterContent() {
    const human = "Humans: 60% water";
    const jellyfish = "Jellyfish: 95% water";
    document.getElementById('waterFact').innerHTML = `<strong>${human}<br>${jellyfish}</strong>`;
}

function simulateBioluminescence() {
    const reactions = [
        "✨ Luciferin + Luciferase = Blue Light!",
        "🔬 Calcium triggers photon emission"
    ];
    const reaction = reactions[Math.floor(Math.random() * reactions.length)];
    document.getElementById('lightFact').innerHTML = `<strong>${reaction}</strong>`;
}

function simulateLifecycle() {
    const facts = [
        "🪼 Polyp transforms into medusa in 48 hours",
        "🔄 Can switch between stages based on environment"
    ];
    const fact = facts[Math.floor(Math.random() * facts.length)];
    document.getElementById('lifecycleFact').innerHTML = `<strong>${fact}</strong>`;
}

function simulateNeuralNet() {
    const facts = [
        "🕸️ 8,000 neurons form distributed network",
        "⚡ Signals travel at 0.15 m/s through net"
    ];
    const fact = facts[Math.floor(Math.random() * facts.length)];
    document.getElementById('neuralFact').innerHTML = `<strong>${fact}</strong>`;
}

function testExtremes() {
    const conditions = [
        "🧊 Arctic: -2°C - SURVIVED!",
        "🔥 Hydrothermal vents: 80°C - SURVIVED!"
    ];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    document.getElementById('extremeFact').innerHTML = `<strong>${condition}</strong>`;
}

// Ecology Section Functions
function showDepthDetails(zone) {
    const zoneData = {
        surface: {
            title: "🌞 Sunlit Epipelagic Zone",
            details: "Home to 60% of jellyfish species. Rich in phytoplankton."
        },
        twilight: {
            title: "🌅 Mysterious Mesopelagic Zone", 
            details: "The twilight zone where 80% of species are bioluminescent."
        },
        deep: {
            title: "🌑 Alien Bathypelagic Zone",
            details: "Eternal darkness, crushing pressure up to 300x surface pressure."
        }
    };
    
    const data = zoneData[zone];
    if (data) {
        const modal = document.createElement('div');
        modal.className = 'ecology-modal';
        modal.innerHTML = `
            <div class="ecology-modal-content">
                <button class="modal-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
                <h2>${data.title}</h2>
                <p>${data.details}</p>
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

function showEcologyFact(factType) {
    const facts = {
        species: {
            title: "📢 Species Diversity",
            content: "Over 4,000 known jellyfish species exist!"
        },
        distribution: {
            title: "🌍 Global Distribution", 
            content: "Jellyfish are found in every ocean on Earth!"
        },
        biomass: {
            title: "⚖️ Biomass Production",
            content: "Annual jellyfish biomass exceeds 500 million tons!"
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
            description: "Rising ocean temperatures accelerate jellyfish reproduction cycles."
        },
        overfishing: {
            title: "🎣 Overfishing Consequences",
            description: "Removing fish creates ecological niches that jellyfish rapidly fill."
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
    
    document.getElementById('tempValue').textContent = temp + '°C';
    document.getElementById('fishValue').textContent = fish + '%';
    
    let jellyfishPop = 50;
    jellyfishPop += (temp - 20) * 2;
    jellyfishPop += (100 - fish) * 0.8;
    jellyfishPop = Math.max(10, Math.min(100, jellyfishPop));
    
    document.getElementById('jellyfishPop').style.width = jellyfishPop + '%';
    
    let status = "Balanced";
    if (jellyfishPop > 80) status = "🚨 BLOOM ALERT!";
    else if (jellyfishPop < 30) status = "📉 Low Population";
    
    document.getElementById('ecosystemPrediction').textContent = "Ecosystem status: " + status;
}

// Human Impact Functions  
function showHumanImpact(impactType) {
    const impacts = {
        medical: {
            title: "💊 Medical Revolution",
            content: "GFP revolutionized cell biology and won the Nobel Prize."
        },
        environmental: {
            title: "🌊 Environmental Impact",
            content: "Jellyfish blooms signal warming oceans and ecosystem changes."
        },
        technology: {
            title: "🚀 Technology Revolution",
            content: "Jellyfish-inspired soft robots and propulsion systems."
        }
    };
    
    const impact = impacts[impactType];
    if (impact) {
        const modal = document.createElement('div');
        modal.className = 'impact-modal';
        modal.innerHTML = `
            <div class="impact-modal-content">
                <button class="modal-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
                <h2>${impact.title}</h2>
                <p>${impact.content}</p>
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

// Case Study Functions
let currentCase = 'gfp';

function switchCaseStudy(caseType) {
    currentCase = caseType;
}

function showTimelineDetail(event) {
    const details = {
        discovery: {
            title: "🔬 The Accidental Discovery of GFP (1962)",
            story: "Osamu Shimomura discovered GFP while studying jellyfish bioluminescence.",
            links: [
                { text: "Nobel Prize Lecture", url: "https://www.nobelprize.org/prizes/chemistry/2008/shimomura/lecture/" },
                { text: "Discovery History", url: "https://press.asimov.com/brief-history-of-gfp" }
            ]
        },
        nobel: {
            title: "🏆 Nobel Prize Recognition (2008)",
            story: "The 2008 Nobel Prize in Chemistry was awarded for the discovery of GFP.",
            links: [
                { text: "Nobel Prize Summary", url: "https://www.nobelprize.org/prizes/chemistry/2008/summary/" }
            ]
        }
    };
    
    const detail = details[event];
    if (detail) {
        const modal = document.createElement('div');
        modal.className = 'timeline-detail-modal';
        modal.innerHTML = `
            <div class="timeline-detail-content">
                <button class="modal-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
                <h2>${detail.title}</h2>
                <p class="timeline-story">${detail.story}</p>
                <div class="timeline-links">
                    <h3>📚 Research Links:</h3>
                    ${detail.links.map(link => `
                        <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="timeline-link">
                            📄 ${link.text}
                        </a>
                    `).join('')}
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

function showMetricDetail(metric) {
    const metrics = {
        papers: {
            title: "📄 Research Papers",
            content: "Over 75,000 research papers have been published using GFP technology.",
            links: [
                { text: "PMC: GFP Research", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4383682/" }
            ]
        },
        market: {
            title: "💰 Market Value",
            content: "The GFP technology market has grown to $4.2 billion annually.",
            links: [
                { text: "Industry Analysis", url: "https://www.nobelprize.org/prizes/chemistry/2008/summary/" }
            ]
        }
    };
    
    const data = metrics[metric];
    if (data) {
        const modal = document.createElement('div');
        modal.className = 'metric-detail-modal';
        modal.innerHTML = `
            <div class="metric-detail-content">
                <button class="modal-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
                <h2>${data.title}</h2>
                <p class="metric-description">${data.content}</p>
                <div class="metric-links">
                    <h3>🔗 Learn More:</h3>
                    ${data.links.map(link => `
                        <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="metric-link">
                            📄 ${link.text}
                        </a>
                    `).join('')}
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
    liveUpdateInterval = setInterval(() => {
        const genesElement = document.getElementById('genesAnalyzed');
        const researchersElement = document.getElementById('activeResearchers');
        
        if (genesElement && researchersElement) {
            const currentGenes = parseInt(genesElement.textContent.replace(/,/g, ''));
            const newGenes = currentGenes + Math.floor(Math.random() * 5);
            genesElement.textContent = newGenes.toLocaleString();
            
            const researchers = 220 + Math.floor(Math.random() * 50);
            researchersElement.textContent = researchers;
            
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

// Library filters
const filterButtons = document.querySelectorAll('.filter-btn');
const publicationCards = document.querySelectorAll('.publication-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        publicationCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Add CSS for animations
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
    
    @keyframes pulse-number {
        0% { transform: scale(1); color: var(--accent-color); }
        50% { transform: scale(1.1); color: var(--neon-pink); }
        100% { transform: scale(1); color: var(--accent-color); }
    }
`;
document.head.appendChild(style);

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNav();
    document.body.classList.add('loaded');
    
    setTimeout(() => {
        for (let i = 0; i < 5; i++) {
            setTimeout(createParticle, i * 500);
        }
    }, 1000);
    
    const genomeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
            }
        });
    });
    
    document.querySelectorAll('.genome-stats').forEach(stats => {
        genomeObserver.observe(stats);
    });
    
    setTimeout(() => {
        if (document.getElementById('species1')) {
            updateComparison();
        }
    }, 100);
    
    console.log('🪼 Welcome to JellyGenomics Research Hub!');
    console.log('🧬 Exploring the fascinating world of jellyfish through genomics and bioinformatics.');
});