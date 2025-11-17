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
            info: `The moon jellyfish is one of the most studied cnidarians in genomics research. Its genome has revealed crucial insights into the evolution of nervous systems with 27,000 protein-coding genes and 792 neural-related genes.`,
            stats: [
                { label: 'Genome Size', value: '397 Mb' },
                { label: 'Total Genes', value: '27,000' },
                { label: 'Neural Genes', value: '792' },
                { label: 'Lifespan', value: '6-12 months' }
            ]
        },
        nemopilema: {
            title: 'Nemopilema nomurai - Nomura\'s Jellyfish 🦑',
            info: `One of the largest jellyfish species with a 2.0 Gb genome containing ~18,000 genes. Its genome sequencing revealed 67 nematocyst formation genes and 14 novel toxin genes, explaining the exceptional potency of its sting.`,
            stats: [
                { label: 'Genome Size', value: '2.0 Gb' },
                { label: 'Total Genes', value: '18,000' },
                { label: 'Max Diameter', value: '2 meters' },
                { label: 'Max Weight', value: '200 kg' }
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
            info: `This remarkable species can reverse its aging process by transforming from adult back to polyp stage through cellular transdifferentiation.`,
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
            <p>Jellyfish are among Earth's oldest inhabitants, with fossil evidence dating back to the Cambrian period. They survived five mass extinction events including the Permian-Triassic extinction (252 million years ago) and the Cretaceous-Paleogene extinction (66 million years ago) that wiped out the dinosaurs. Their remarkably simple yet effective body plan has remained largely unchanged for hundreds of millions of years.</p>
            <p>The evolutionary success of jellyfish lies in their adaptability and minimal resource requirements. They can survive in oxygen-depleted waters, extreme temperatures, and changing ocean chemistry - conditions that would be fatal to most marine life.</p>`,
        research: `<h3>🔬 Current Research Frontiers</h3>
            <p>Scientists are comparing ancient jellyfish fossils with modern genomes to understand what makes these organisms so resilient. Recent studies focus on:</p>
            <ul style="margin-left: 2rem; line-height: 1.8;">
                <li>Heat shock proteins that protect against temperature extremes</li>
                <li>DNA repair mechanisms that maintain genetic stability over millennia</li>
                <li>Metabolic flexibility allowing survival in varied conditions</li>
            </ul>`,
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
            <p>Jellyfish are nature's ultimate minimalists - composed of 95% water yet capable of complex behaviors. The mesoglea (middle jelly layer) is a sophisticated hydrogel that provides structure, buoyancy, and protection while requiring minimal metabolic maintenance.</p>
            <p>This water-based design makes jellyfish incredibly energy-efficient swimmers. They use 48% less oxygen per distance traveled than any other swimming animal, making them the most efficient swimmers on Earth.</p>`,
        research: `<h3>🔬 Biomimetics & Robotics</h3>
            <p>Engineers are copying jellyfish propulsion systems for:</p>
            <ul style="margin-left: 2rem; line-height: 1.8;">
                <li>Soft underwater robots for ocean exploration</li>
                <li>Medical devices like artificial hearts and drug delivery systems</li>
                <li>Energy-efficient vehicle designs</li>
            </ul>`,
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
            <p>Over 80% of deep-sea jellyfish species produce their own light through bioluminescence. In 1962, Osamu Shimomura discovered Green Fluorescent Protein (GFP) in the jellyfish Aequorea victoria - a discovery that revolutionized cell biology and earned him the 2008 Nobel Prize in Chemistry.</p>
            <p>GFP allows scientists to tag and track proteins, cells, and genes in living organisms, leading to breakthroughs in cancer research, neuroscience, and developmental biology.</p>`,
        research: `<h3>🔬 Cutting-Edge Bioluminescence Research</h3>
            <p>Modern applications include:</p>
            <ul style="margin-left: 2rem; line-height: 1.8;">
                <li>Optogenetics: Using light-sensitive proteins to control brain cells</li>
                <li>Real-time visualization of cancer metastasis</li>
                <li>Tracking stem cell differentiation</li>
                <li>Developing new fluorescent proteins in all colors of the spectrum</li>
            </ul>`,
        interactive: `<div class="interactive-elements">
            <div class="interactive-widget">
                <h4>✨ Light Chemistry</h4>
                <button class="interactive-btn" onclick="simulateBioluminescence()">Create Virtual Light</button>
                <div class="fact-display" id="lightFact">Mix luciferin + luciferase!</div>
            </div>
        </div>`
    },
    reproduction: {
        title: "🔄 Complex Lifecycle: The Most Alien Reproduction",
        overview: `<h3>🔄 Two-Stage Alien Lifecycle</h3>
            <p>Jellyfish alternate between two completely different body forms: the sessile polyp (attached to surfaces) and the free-swimming medusa (the familiar jellyfish form). This metagenesis is controlled by complex gene regulatory networks including Wnt, TGF-β, and Hox genes.</p>
            <p>Environmental triggers like temperature, food availability, and day length can cause polyps to bud off multiple medusae simultaneously - creating sudden jellyfish blooms.</p>`,
        research: `<h3>🔬 Reproductive Biology Research</h3>
            <p>Scientists study jellyfish reproduction to understand:</p>
            <ul style="margin-left: 2rem; line-height: 1.8;">
                <li>Developmental plasticity and environmental adaptation</li>
                <li>Asexual vs sexual reproduction trade-offs</li>
                <li>Gene expression changes during metamorphosis</li>
                <li>Climate change impacts on bloom dynamics</li>
            </ul>`,
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
            <p>Despite having no central brain, jellyfish possess a sophisticated distributed nervous system with over 8,000 neurons arranged in a nerve net. The Aurelia aurita genome revealed 792 neural-related genes including ion channels, neurotransmitter receptors, and synaptic proteins.</p>
            <p>Recent research shows jellyfish can learn from experience, remember feeding locations, and demonstrate sleep-like states - challenging our definitions of consciousness and intelligence.</p>`,
        research: `<h3>🔬 Neuroscience Applications</h3>
            <p>Jellyfish neural architecture is inspiring:</p>
            <ul style="margin-left: 2rem; line-height: 1.8;">
                <li>Decentralized AI systems with no single point of failure</li>
                <li>Fault-tolerant computer networks</li>
                <li>Understanding the minimal requirements for learning</li>
                <li>Evolution of consciousness and sensory processing</li>
            </ul>`,
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
            <p>Jellyfish thrive in conditions that would kill most organisms: Arctic waters at -2°C, hydrothermal vents at 80°C, deep ocean trenches with pressure 300x atmospheric pressure, and oxygen-depleted dead zones. Some species have even survived simulated space conditions on the International Space Station.</p>
            <p>Their survival mechanisms include specialized proteins, flexible metabolism, and the ability to enter dormant states during unfavorable conditions.</p>`,
        research: `<h3>🔬 Extremophile Research Applications</h3>
            <p>Understanding jellyfish adaptations helps us:</p>
            <ul style="margin-left: 2rem; line-height: 1.8;">
                <li>Predict and track climate change impacts on marine ecosystems</li>
                <li>Develop stress-resistant crops and organisms</li>
                <li>Create materials that function in extreme environments</li>
                <li>Study evolution of life on other planets</li>
            </ul>`,
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
        "560 MYA: First jellyfish-like creatures appear in Ediacaran period",
        "540 MYA: Cambrian explosion - jellyfish diversity booms",
        "252 MYA: Survived Permian-Triassic extinction (96% species died)",
        "66 MYA: Survived Cretaceous-Paleogene extinction (dinosaurs extinct)",
        "Today: Still thriving in every ocean with minimal evolutionary changes!"
    ];
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    document.getElementById('timelineFact').innerHTML = `<strong>${randomFact}</strong>`;
}

function calculateWaterContent() {
    const comparison = `
        <strong>Humans: 60% water</strong><br>
        <strong>Jellyfish: 95% water</strong><br>
        <em>Jellyfish are 158% more water than humans!</em>
    `;
    document.getElementById('waterFact').innerHTML = comparison;
}

function simulateBioluminescence() {
    const reactions = [
        "✨ Luciferin + Luciferase + O₂ = Blue-Green Light at 509nm!",
        "🔬 Calcium ions trigger photon emission in milliseconds",
        "💡 Energy efficiency: 88% of energy converts to light (vs 10% in bulbs)"
    ];
    const reaction = reactions[Math.floor(Math.random() * reactions.length)];
    document.getElementById('lightFact').innerHTML = `<strong>${reaction}</strong>`;
}

function simulateLifecycle() {
    const facts = [
        "🪼 Polyp → Medusa transformation in 48-72 hours",
        "🔄 Single polyp can bud off 40+ medusae",
        "🌡️ Temperature rise of 2°C triggers metamorphosis",
        "🧬 Wnt genes control body plan reorganization"
    ];
    const fact = facts[Math.floor(Math.random() * facts.length)];
    document.getElementById('lifecycleFact').innerHTML = `<strong>${fact}</strong>`;
}

function simulateNeuralNet() {
    const facts = [
        "🕸️ 8,000 neurons form distributed network with no center",
        "⚡ Signals travel at 0.15 m/s through nerve net",
        "🧠 792 neural genes despite having zero brain cells",
        "💡 Can learn and remember without hippocampus or cortex"
    ];
    const fact = facts[Math.floor(Math.random() * facts.length)];
    document.getElementById('neuralFact').innerHTML = `<strong>${fact}</strong>`;
}

function testExtremes() {
    const conditions = [
        "🧊 Arctic: -2°C - SURVIVED for months!",
        "🔥 Hydrothermal vents: 80°C - SURVIVED!",
        "🌊 Deep ocean: 11,000m depth, 1,100x pressure - SURVIVED!",
        "🚀 ISS Space experiments: Microgravity - ADAPTED!"
    ];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    document.getElementById('extremeFact').innerHTML = `<strong>${condition}</strong>`;
}

// Ecology Section Functions
function showDepthDetails(zone) {
    const zoneData = {
        surface: {
            title: "🌞 Sunlit Epipelagic Zone",
            details: "Home to 60% of jellyfish species including Moon Jellies and Lion's Mane. Rich in phytoplankton providing abundant food. Temperature ranges 15-30°C depending on latitude."
        },
        twilight: {
            title: "🌅 Mysterious Mesopelagic Zone", 
            details: "The twilight zone where 80% of species are bioluminescent. Home to Atolla jellyfish with their famous 'burglar alarm' defense. Pressure increases to 100x atmospheric."
        },
        deep: {
            title: "🌑 Alien Bathypelagic Zone",
            details: "Eternal darkness, crushing pressure up to 300x surface pressure. Deep-sea jellyfish have adapted with transparent bodies, efficient metabolism, and extreme pressure tolerance."
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
            title: "🔢 Species Diversity",
            content: "Over 4,000 known jellyfish species exist, but scientists estimate there may be 10,000+ undiscovered species in deep oceans!"
        },
        distribution: {
            title: "🌍 Global Distribution", 
            content: "Jellyfish are found in every ocean on Earth, from surface waters to 11,000m depth in the Mariana Trench!"
        },
        biomass: {
            title: "⚖️ Biomass Production",
            content: "Annual jellyfish biomass exceeds 500 million tons globally - more than all commercially fished species combined!"
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
            description: "Rising ocean temperatures accelerate jellyfish reproduction cycles by 15-30%. Warmer waters also reduce oxygen levels, creating dead zones where jellyfish thrive but fish cannot survive."
        },
        overfishing: {
            title: "🎣 Overfishing Consequences",
            description: "Removing predatory fish creates ecological niches that jellyfish rapidly fill. Some blooms reach 100 million individuals, clogging fishing nets and power plant intakes."
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
    if (jellyfishPop > 80) status = "🚨 BLOOM ALERT! Mass jellyfish event predicted!";
    else if (jellyfishPop > 65) status = "⚠
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