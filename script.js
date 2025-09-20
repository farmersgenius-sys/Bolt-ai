// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const rightNav = document.getElementById('right-nav');
const navOverlay = document.getElementById('nav-overlay');
const navClose = document.getElementById('nav-close');

// Right side navigation functionality
if (navToggle && rightNav && navOverlay && navClose) {
    navToggle.addEventListener('click', () => {
        rightNav.classList.add('active');
        navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    navClose.addEventListener('click', closeNav);
    navOverlay.addEventListener('click', closeNav);

    function closeNav() {
        rightNav.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close nav when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            closeNav();
            
            // Update active link
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && rightNav.classList.contains('active')) {
            closeNav();
        }
    });
}

// Smooth scrolling for navigation links
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

// Update active navigation link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.tool-card, .scheme-card, .modern-card, .stat-card, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for statistics
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        let formattedNumber = Math.floor(current);
        if (element.textContent.includes('K')) {
            formattedNumber = (formattedNumber / 1000).toFixed(0) + 'K';
        } else if (element.textContent.includes('Cr')) {
            formattedNumber = '₹' + (formattedNumber / 100).toFixed(0) + ' Cr';
        } else if (element.textContent.includes('%')) {
            formattedNumber = formattedNumber + '%';
        } else {
            formattedNumber = formattedNumber.toLocaleString();
        }
        
        element.textContent = formattedNumber;
    }, 16);
}

// Animate counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            animateCounter(entry.target);
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
    }
});

// Add floating animation to chat button
document.addEventListener('DOMContentLoaded', () => {
    const chatButton = document.getElementById('chat-button');
    if (chatButton) {
        // Add pulse animation every 10 seconds
        setInterval(() => {
            chatButton.classList.add('pulse-animation');
            setTimeout(() => {
                chatButton.classList.remove('pulse-animation');
            }, 1500);
        }, 10000);
    }
});

// Tool card hover effects
document.addEventListener('DOMContentLoaded', () => {
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Navbar scroll effect (keeping for compatibility)
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Legacy hamburger functionality (keeping for other pages)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// ============== CALCULATOR FUNCTIONS ==============

// Fertilizer Calculator
function calculateFertilizer() {
    const crop = document.getElementById('crop-select')?.value;
    const area = parseFloat(document.getElementById('area-input')?.value);
    const resultDiv = document.getElementById('fertilizer-result');
    
    if (!crop || !area || area <= 0) {
        if (resultDiv) {
            resultDiv.innerHTML = '<p style="color: #ff6b6b;">Please select a crop and enter valid area.</p>';
            resultDiv.classList.add('show');
        }
        return;
    }

    // Fertilizer recommendations (NPK in kg per acre)
    const fertilizers = {
        rice: { n: 120, p: 60, k: 40, organic: 'Apply 10-12 tons FYM per acre' },
        wheat: { n: 120, p: 60, k: 40, organic: 'Apply 8-10 tons FYM per acre' },
        corn: { n: 120, p: 60, k: 40, organic: 'Apply 10 tons FYM per acre' },
        tomato: { n: 200, p: 100, k: 100, organic: 'Apply 15-20 tons FYM per acre' },
        potato: { n: 120, p: 80, k: 100, organic: 'Apply 15 tons FYM per acre' },
        cotton: { n: 120, p: 60, k: 60, organic: 'Apply 10 tons FYM per acre' },
        sugarcane: { n: 280, p: 92, k: 140, organic: 'Apply 25 tons FYM per acre' },
        soybean: { n: 30, p: 80, k: 40, organic: 'Apply 5 tons FYM per acre' },
        mustard: { n: 80, p: 40, k: 40, organic: 'Apply 8 tons FYM per acre' },
        groundnut: { n: 25, p: 50, k: 75, organic: 'Apply 10 tons FYM per acre' },
        onion: { n: 100, p: 50, k: 50, organic: 'Apply 15 tons FYM per acre' },
        garlic: { n: 100, p: 50, k: 50, organic: 'Apply 12 tons FYM per acre' },
        chili: { n: 150, p: 75, k: 75, organic: 'Apply 15 tons FYM per acre' },
        cabbage: { n: 150, p: 75, k: 75, organic: 'Apply 20 tons FYM per acre' },
        cauliflower: { n: 150, p: 75, k: 75, organic: 'Apply 20 tons FYM per acre' },
        brinjal: { n: 150, p: 75, k: 75, organic: 'Apply 15 tons FYM per acre' },
        okra: { n: 100, p: 50, k: 50, organic: 'Apply 12 tons FYM per acre' },
        carrot: { n: 100, p: 50, k: 75, organic: 'Apply 15 tons FYM per acre' },
        radish: { n: 80, p: 40, k: 60, organic: 'Apply 10 tons FYM per acre' },
        spinach: { n: 100, p: 50, k: 50, organic: 'Apply 10 tons FYM per acre' },
        banana: { n: 200, p: 60, k: 300, organic: 'Apply 25 tons FYM per acre' },
        mango: { n: 100, p: 50, k: 100, organic: 'Apply 20 tons FYM per tree' },
        orange: { n: 120, p: 60, k: 120, organic: 'Apply 15 tons FYM per acre' },
        apple: { n: 120, p: 60, k: 120, organic: 'Apply 20 tons FYM per acre' },
        grapes: { n: 120, p: 60, k: 120, organic: 'Apply 15 tons FYM per acre' },
        papaya: { n: 200, p: 200, k: 400, organic: 'Apply 20 tons FYM per acre' },
        guava: { n: 100, p: 50, k: 100, organic: 'Apply 15 tons FYM per acre' },
        pomegranate: { n: 120, p: 60, k: 120, organic: 'Apply 15 tons FYM per acre' },
        chickpea: { n: 25, p: 50, k: 25, organic: 'Apply 5 tons FYM per acre' },
        lentil: { n: 25, p: 50, k: 25, organic: 'Apply 5 tons FYM per acre' },
        pigeon_pea: { n: 25, p: 50, k: 25, organic: 'Apply 8 tons FYM per acre' },
        black_gram: { n: 25, p: 50, k: 25, organic: 'Apply 5 tons FYM per acre' },
        green_gram: { n: 25, p: 50, k: 25, organic: 'Apply 5 tons FYM per acre' },
        field_pea: { n: 25, p: 50, k: 25, organic: 'Apply 5 tons FYM per acre' },
        sesame: { n: 40, p: 20, k: 20, organic: 'Apply 5 tons FYM per acre' },
        sunflower: { n: 60, p: 40, k: 40, organic: 'Apply 8 tons FYM per acre' },
        safflower: { n: 60, p: 30, k: 30, organic: 'Apply 6 tons FYM per acre' },
        castor: { n: 60, p: 30, k: 30, organic: 'Apply 8 tons FYM per acre' },
        coconut: { n: 120, p: 60, k: 140, organic: 'Apply 50 kg FYM per tree' },
        arecanut: { n: 100, p: 40, k: 140, organic: 'Apply 25 kg FYM per tree' },
        cardamom: { n: 75, p: 75, k: 150, organic: 'Apply 10 tons FYM per acre' },
        black_pepper: { n: 50, p: 50, k: 120, organic: 'Apply 10 kg FYM per vine' },
        turmeric: { n: 60, p: 50, k: 120, organic: 'Apply 15 tons FYM per acre' },
        ginger: { n: 75, p: 50, k: 50, organic: 'Apply 20 tons FYM per acre' },
        coriander: { n: 40, p: 30, k: 20, organic: 'Apply 8 tons FYM per acre' },
        cumin: { n: 30, p: 20, k: 20, organic: 'Apply 6 tons FYM per acre' },
        fenugreek: { n: 25, p: 25, k: 25, organic: 'Apply 5 tons FYM per acre' },
        fennel: { n: 100, p: 50, k: 60, organic: 'Apply 10 tons FYM per acre' },
        jute: { n: 60, p: 30, k: 30, organic: 'Apply 8 tons FYM per acre' },
        tea: { n: 150, p: 50, k: 50, organic: 'Apply 15 tons FYM per acre' },
        coffee: { n: 120, p: 60, k: 100, organic: 'Apply 20 tons FYM per acre' },
        rubber: { n: 100, p: 40, k: 60, organic: 'Apply 15 tons FYM per acre' }
    };

    const cropData = fertilizers[crop];
    if (!cropData) {
        if (resultDiv) {
            resultDiv.innerHTML = '<p style="color: #ff6b6b;">Crop data not available.</p>';
            resultDiv.classList.add('show');
        }
        return;
    }

    const totalN = (cropData.n * area).toFixed(1);
    const totalP = (cropData.p * area).toFixed(1);
    const totalK = (cropData.k * area).toFixed(1);

    // Calculate fertilizer quantities (approximate)
    const urea = (totalN / 0.46).toFixed(1); // Urea is 46% N
    const dap = (totalP / 0.46).toFixed(1); // DAP is 46% P2O5
    const mop = (totalK / 0.60).toFixed(1); // MOP is 60% K2O

    if (resultDiv) {
        resultDiv.innerHTML = `
            <h4>📊 Fertilizer Recommendation for ${area} acres of ${crop.charAt(0).toUpperCase() + crop.slice(1)}</h4>
            <div style="margin: 15px 0;">
                <p><strong>🌱 NPK Requirements:</strong></p>
                <p>• Nitrogen (N): ${totalN} kg</p>
                <p>• Phosphorus (P): ${totalP} kg</p>
                <p>• Potassium (K): ${totalK} kg</p>
            </div>
            <div style="margin: 15px 0;">
                <p><strong>🥤 Fertilizer Quantities:</strong></p>
                <p>• Urea: ${urea} kg</p>
                <p>• DAP: ${dap} kg</p>
                <p>• MOP: ${mop} kg</p>
            </div>
            <div style="margin: 15px 0; padding: 10px; background: #e8f5e8; border-radius: 5px;">
                <p><strong>🌿 Organic Recommendation:</strong></p>
                <p>${cropData.organic}</p>
            </div>
            <p style="font-size: 0.9em; color: #666; margin-top: 10px;">
                💡 <em>Apply fertilizers in split doses for better efficiency. Consult local agricultural extension officer for soil-specific recommendations.</em>
            </p>
        `;
        resultDiv.classList.add('show');
    }
}

// Irrigation Calculator
function calculateIrrigation() {
    const landSize = parseFloat(document.getElementById('land-size')?.value);
    const crop = document.getElementById('irrigation-crop')?.value;
    const resultDiv = document.getElementById('irrigation-result');
    
    if (!landSize || !crop || landSize <= 0) {
        if (resultDiv) {
            resultDiv.innerHTML = '<p style="color: #ff6b6b;">Please enter valid land size and select a crop.</p>';
            resultDiv.classList.add('show');
        }
        return;
    }

    // Water requirements (liters per day per acre)
    const waterRequirements = {
        rice: { daily: 50000, total: 6000000, season: '120 days', method: 'Flood irrigation' },
        wheat: { daily: 15000, total: 2250000, season: '150 days', method: 'Furrow/Sprinkler' },
        corn: { daily: 20000, total: 2400000, season: '120 days', method: 'Drip/Sprinkler' },
        cotton: { daily: 25000, total: 5000000, season: '200 days', method: 'Drip/Furrow' },
        sugarcane: { daily: 40000, total: 14600000, season: '365 days', method: 'Furrow/Drip' },
        soybean: { daily: 18000, total: 2160000, season: '120 days', method: 'Sprinkler/Drip' },
        mustard: { daily: 12000, total: 1440000, season: '120 days', method: 'Furrow irrigation' },
        groundnut: { daily: 15000, total: 1800000, season: '120 days', method: 'Drip/Sprinkler' },
        tomato: { daily: 30000, total: 2700000, season: '90 days', method: 'Drip irrigation' },
        potato: { daily: 20000, total: 2400000, season: '120 days', method: 'Sprinkler/Furrow' },
        onion: { daily: 25000, total: 3750000, season: '150 days', method: 'Drip/Furrow' },
        garlic: { daily: 20000, total: 3000000, season: '150 days', method: 'Drip irrigation' },
        chili: { daily: 25000, total: 3750000, season: '150 days', method: 'Drip irrigation' },
        cabbage: { daily: 30000, total: 2700000, season: '90 days', method: 'Sprinkler irrigation' },
        cauliflower: { daily: 30000, total: 2700000, season: '90 days', method: 'Sprinkler irrigation' },
        brinjal: { daily: 25000, total: 3750000, season: '150 days', method: 'Drip irrigation' },
        okra: { daily: 20000, total: 2400000, season: '120 days', method: 'Drip/Sprinkler' },
        carrot: { daily: 20000, total: 1800000, season: '90 days', method: 'Sprinkler irrigation' },
        radish: { daily: 15000, total: 900000, season: '60 days', method: 'Sprinkler irrigation' },
        spinach: { daily: 15000, total: 675000, season: '45 days', method: 'Sprinkler irrigation' },
        banana: { daily: 50000, total: 18250000, season: '365 days', method: 'Drip irrigation' },
        mango: { daily: 30000, total: 10950000, season: '365 days', method: 'Drip/Basin' },
        orange: { daily: 35000, total: 12775000, season: '365 days', method: 'Drip irrigation' },
        apple: { daily: 25000, total: 9125000, season: '365 days', method: 'Drip/Sprinkler' },
        grapes: { daily: 30000, total: 7300000, season: '243 days', method: 'Drip irrigation' },
        papaya: { daily: 40000, total: 14600000, season: '365 days', method: 'Drip irrigation' },
        guava: { daily: 25000, total: 9125000, season: '365 days', method: 'Drip/Basin' },
        pomegranate: { daily: 20000, total: 7300000, season: '365 days', method: 'Drip irrigation' },
        chickpea: { daily: 10000, total: 1200000, season: '120 days', method: 'Furrow irrigation' },
        lentil: { daily: 8000, total: 960000, season: '120 days', method: 'Furrow irrigation' },
        pigeon_pea: { daily: 12000, total: 2160000, season: '180 days', method: 'Furrow irrigation' },
        black_gram: { daily: 10000, total: 900000, season: '90 days', method: 'Furrow irrigation' },
        green_gram: { daily: 10000, total: 750000, season: '75 days', method: 'Furrow irrigation' },
        field_pea: { daily: 12000, total: 1080000, season: '90 days', method: 'Furrow irrigation' },
        sesame: { daily: 8000, total: 720000, season: '90 days', method: 'Furrow irrigation' },
        sunflower: { daily: 15000, total: 1350000, season: '90 days', method: 'Drip/Sprinkler' },
        safflower: { daily: 10000, total: 1200000, season: '120 days', method: 'Furrow irrigation' },
        castor: { daily: 12000, total: 2160000, season: '180 days', method: 'Furrow irrigation' },
        coconut: { daily: 40000, total: 14600000, season: '365 days', method: 'Basin/Drip' },
        arecanut: { daily: 35000, total: 12775000, season: '365 days', method: 'Basin irrigation' },
        cardamom: { daily: 30000, total: 10950000, season: '365 days', method: 'Sprinkler irrigation' },
        black_pepper: { daily: 25000, total: 9125000, season: '365 days', method: 'Drip irrigation' },
        turmeric: { daily: 20000, total: 4800000, season: '240 days', method: 'Furrow/Drip' },
        ginger: { daily: 25000, total: 6000000, season: '240 days', method: 'Sprinkler/Drip' },
        coriander: { daily: 10000, total: 900000, season: '90 days', method: 'Sprinkler irrigation' },
        cumin: { daily: 8000, total: 960000, season: '120 days', method: 'Furrow irrigation' },
        fenugreek: { daily: 10000, total: 900000, season: '90 days', method: 'Furrow irrigation' },
        fennel: { daily: 12000, total: 1800000, season: '150 days', method: 'Furrow irrigation' },
        jute: { daily: 20000, total: 2400000, season: '120 days', method: 'Flood irrigation' },
        tea: { daily: 30000, total: 10950000, season: '365 days', method: 'Sprinkler irrigation' },
        coffee: { daily: 25000, total: 9125000, season: '365 days', method: 'Drip irrigation' },
        rubber: { daily: 20000, total: 7300000, season: '365 days', method: 'Basin irrigation' }
    };

    const cropData = waterRequirements[crop];
    if (!cropData) {
        if (resultDiv) {
            resultDiv.innerHTML = '<p style="color: #ff6b6b;">Water requirement data not available for this crop.</p>';
            resultDiv.classList.add('show');
        }
        return;
    }

    const dailyWater = (cropData.daily * landSize).toLocaleString();
    const totalWater = (cropData.total * landSize).toLocaleString();
    const dailyWaterCubicMeters = (cropData.daily * landSize / 1000).toFixed(1);
    const totalWaterCubicMeters = (cropData.total * landSize / 1000).toFixed(1);

    if (resultDiv) {
        resultDiv.innerHTML = `
            <h4>💧 Irrigation Plan for ${landSize} acres of ${crop.charAt(0).toUpperCase() + crop.slice(1)}</h4>
            <div style="margin: 15px 0;">
                <p><strong>🌱 Growing Season:</strong> ${cropData.season}</p>
                <p><strong>🚿 Recommended Method:</strong> ${cropData.method}</p>
            </div>
            <div style="margin: 15px 0;">
                <p><strong>💦 Water Requirements:</strong></p>
                <p>• Daily: ${dailyWater} liters (${dailyWaterCubicMeters} cubic meters)</p>
                <p>• Total Season: ${totalWater} liters (${totalWaterCubicMeters} cubic meters)</p>
            </div>
            <div style="margin: 15px 0; padding: 10px; background: #e3f2fd; border-radius: 5px;">
                <p><strong>💡 Water Saving Tips:</strong></p>
                <p>• Use drip irrigation to save 30-50% water</p>
                <p>• Apply mulch to reduce evaporation</p>
                <p>• Water during early morning or evening</p>
                <p>• Monitor soil moisture regularly</p>
            </div>
            <p style="font-size: 0.9em; color: #666; margin-top: 10px;">
                📊 <em>Water requirements may vary based on soil type, climate, and rainfall. Adjust irrigation schedule accordingly.</em>
            </p>
        `;
        resultDiv.classList.add('show');
    }
}

// Seed Quality Checker
function checkSeedQuality() {
    const seedType = document.getElementById('seed-select')?.value;
    const resultDiv = document.getElementById('seed-quality-result');
    
    if (!seedType) {
        if (resultDiv) {
            resultDiv.innerHTML = '<p style="color: #ff6b6b;">Please select a seed type.</p>';
            resultDiv.classList.add('show');
        }
        return;
    }

    const qualityTests = {
        wheat: {
            tests: [
                'Physical Purity: Check for broken grains, foreign matter',
                'Germination Test: 90% seeds should germinate in 7 days',
                'Moisture Content: Should be below 12%',
                'Weight Test: 1000 grain weight should be 35-45g'
            ],
            tips: 'Store in dry place, use certified seeds, check for fungal infection'
        },
        rice: {
            tests: [
                'Physical Purity: Remove chaff, broken grains, stones',
                'Germination Test: 85% seeds should germinate in 5-7 days',
                'Moisture Content: Should be below 14%',
                'Float Test: Good seeds sink in water, damaged ones float'
            ],
            tips: 'Treat seeds with fungicide, maintain proper storage temperature'
        },
        corn: {
            tests: [
                'Physical Purity: Check for damaged kernels, foreign matter',
                'Germination Test: 90% seeds should germinate in 5-7 days',
                'Moisture Content: Should be below 14%',
                'Size Uniformity: Seeds should be uniform in size'
            ],
            tips: 'Store in moisture-proof containers, check for insect damage'
        },
        cotton: {
            tests: [
                'Physical Purity: Remove lint, broken seeds, foreign matter',
                'Germination Test: 70% seeds should germinate in 10 days',
                'Moisture Content: Should be below 12%',
                'Acid Delinting: Check if seeds are properly delinted'
            ],
            tips: 'Use acid-delinted seeds, treat with fungicide before sowing'
        },
        mustard: {
            tests: [
                'Physical Purity: Remove damaged seeds, foreign matter',
                'Germination Test: 85% seeds should germinate in 5 days',
                'Moisture Content: Should be below 9%',
                'Oil Content: Check for rancidity by smell test'
            ],
            tips: 'Store in cool, dry place, avoid exposure to sunlight'
        },
        soybean: {
            tests: [
                'Physical Purity: Check for cracked, discolored seeds',
                'Germination Test: 85% seeds should germinate in 7 days',
                'Moisture Content: Should be below 12%',
                'Seed Coat: Should be intact without cracks'
            ],
            tips: 'Handle carefully to avoid mechanical damage, use rhizobium inoculant'
        },
        groundnut: {
            tests: [
                'Physical Purity: Remove broken, shriveled seeds',
                'Germination Test: 80% seeds should germinate in 7-10 days',
                'Moisture Content: Should be below 10%',
                'Kernel Test: Kernels should be plump and healthy'
            ],
            tips: 'Store in gunny bags, check for aflatoxin contamination'
        },
        sugarcane: {
            tests: [
                'Node Quality: Each sett should have 2-3 healthy buds',
                'Physical Condition: No pest damage, disease symptoms',
                'Age: Use 8-10 month old cane for planting',
                'Variety: Use recommended varieties for your region'
            ],
            tips: 'Treat setts with fungicide, plant immediately after cutting'
        },
        pulses: {
            tests: [
                'Physical Purity: Remove broken, discolored seeds',
                'Germination Test: 80% seeds should germinate in 7-10 days',
                'Moisture Content: Should be below 12%',
                'Insect Damage: Check for weevil holes'
            ],
            tips: 'Store with neem leaves, use rhizobium inoculant for better yield'
        },
        vegetables: {
            tests: [
                'Physical Purity: Seeds should be clean, uniform',
                'Germination Test: 85% seeds should germinate in 5-10 days',
                'Moisture Content: Should be below 8%',
                'Viability: Check seed packet date, use fresh seeds'
            ],
            tips: 'Store in refrigerator, use hybrid seeds for better yield'
        }
    };

    const seedData = qualityTests[seedType];
    if (!seedData) {
        if (resultDiv) {
            resultDiv.innerHTML = '<p style="color: #ff6b6b;">Quality test data not available for this seed type.</p>';
            resultDiv.classList.add('show');
        }
        return;
    }

    if (resultDiv) {
        resultDiv.innerHTML = `
            <h4>🔍 Quality Tests for ${seedType.charAt(0).toUpperCase() + seedType.slice(1)} Seeds</h4>
            <div style="margin: 15px 0;">
                <p><strong>🧪 Essential Tests:</strong></p>
                ${seedData.tests.map(test => `<p>• ${test}</p>`).join('')}
            </div>
            <div style="margin: 15px 0; padding: 10px; background: #fff3e0; border-radius: 5px;">
                <p><strong>💡 Storage & Handling Tips:</strong></p>
                <p>${seedData.tips}</p>
            </div>
            <div style="margin: 15px 0; padding: 10px; background: #e8f5e8; border-radius: 5px;">
                <p><strong>🌱 Simple Germination Test at Home:</strong></p>
                <p>1. Take 100 seeds randomly</p>
                <p>2. Place on wet cloth/paper</p>
                <p>3. Keep in warm, dark place</p>
                <p>4. Count germinated seeds after specified days</p>
                <p>5. Calculate germination percentage</p>
            </div>
        `;
        resultDiv.classList.add('show');
    }
}

// Disease Search Function
function searchDisease() {
    const crop = document.getElementById('disease-crop-select')?.value;
    const searchTerm = document.getElementById('disease-search')?.value.toLowerCase();
    const resultDiv = document.getElementById('disease-result');
    
    if (!crop || !searchTerm) {
        if (resultDiv) {
            resultDiv.innerHTML = '<p style="color: #ff6b6b;">Please select a crop and enter disease name or symptoms.</p>';
            resultDiv.classList.add('show');
        }
        return;
    }

    const diseases = {
        rice: {
            'blast': {
                symptoms: 'Diamond-shaped spots on leaves, neck rot',
                cause: 'Fungal infection (Magnaporthe oryzae)',
                treatment: 'Spray Tricyclazole or Carbendazim',
                prevention: 'Use resistant varieties, avoid excess nitrogen'
            },
            'brown spot': {
                symptoms: 'Brown oval spots on leaves and grains',
                cause: 'Fungal infection (Bipolaris oryzae)',
                treatment: 'Spray Mancozeb or Propiconazole',
                prevention: 'Seed treatment, balanced fertilization'
            },
            'bacterial blight': {
                symptoms: 'Water-soaked lesions, yellowing of leaves',
                cause: 'Bacterial infection (Xanthomonas oryzae)',
                treatment: 'Spray Streptocycline or Copper oxychloride',
                prevention: 'Use certified seeds, avoid overhead irrigation'
            }
        },
        wheat: {
            'rust': {
                symptoms: 'Orange/brown pustules on leaves and stems',
                cause: 'Fungal infection (Puccinia species)',
                treatment: 'Spray Propiconazole or Tebuconazole',
                prevention: 'Use resistant varieties, timely sowing'
            },
            'powdery mildew': {
                symptoms: 'White powdery growth on leaves',
                cause: 'Fungal infection (Blumeria graminis)',
                treatment: 'Spray Sulfur or Triadimefon',
                prevention: 'Avoid dense planting, ensure air circulation'
            },
            'loose smut': {
                symptoms: 'Black powdery mass replacing grains',
                cause: 'Fungal infection (Ustilago nuda)',
                treatment: 'Seed treatment with Carboxin',
                prevention: 'Use certified seeds, hot water treatment'
            }
        },
        corn: {
            'blight': {
                symptoms: 'Large brown lesions on leaves',
                cause: 'Fungal infection (Exserohilum turcicum)',
                treatment: 'Spray Mancozeb or Azoxystrobin',
                prevention: 'Crop rotation, resistant varieties'
            },
            'rust': {
                symptoms: 'Orange pustules on leaves',
                cause: 'Fungal infection (Puccinia sorghi)',
                treatment: 'Spray Propiconazole',
                prevention: 'Use resistant hybrids'
            }
        },
        cotton: {
            'wilt': {
                symptoms: 'Yellowing and wilting of plants',
                cause: 'Fungal infection (Fusarium oxysporum)',
                treatment: 'Soil drenching with Carbendazim',
                prevention: 'Crop rotation, resistant varieties'
            },
            'bollworm': {
                symptoms: 'Holes in bolls, caterpillar damage',
                cause: 'Insect pest (Helicoverpa armigera)',
                treatment: 'Spray Bt or Spinosad',
                prevention: 'Use Bt cotton, pheromone traps'
            }
        },
        sugarcane: {
            'red rot': {
                symptoms: 'Red discoloration of internodes',
                cause: 'Fungal infection (Colletotrichum falcatum)',
                treatment: 'Remove affected plants, spray Carbendazim',
                prevention: 'Use resistant varieties, avoid waterlogging'
            },
            'smut': {
                symptoms: 'Black whip-like structures from growing points',
                cause: 'Fungal infection (Sporisorium scitamineum)',
                treatment: 'Remove affected plants immediately',
                prevention: 'Use healthy setts, avoid mechanical injury'
            }
        },
        vegetables: {
            'damping off': {
                symptoms: 'Seedling collapse at soil level',
                cause: 'Fungal infection (Pythium, Rhizoctonia)',
                treatment: 'Drench with Metalaxyl or Captan',
                prevention: 'Seed treatment, well-drained soil'
            },
            'powdery mildew': {
                symptoms: 'White powdery coating on leaves',
                cause: 'Fungal infection (Erysiphe cichoracearum)',
                treatment: 'Spray Sulfur or Myclobutanil',
                prevention: 'Avoid overhead watering, ensure ventilation'
            },
            'aphids': {
                symptoms: 'Small green insects on leaves, curling',
                cause: 'Insect pest (Aphid species)',
                treatment: 'Spray Imidacloprid or Neem oil',
                prevention: 'Use yellow sticky traps, encourage beneficial insects'
            }
        },
        fruits: {
            'anthracnose': {
                symptoms: 'Dark sunken spots on fruits',
                cause: 'Fungal infection (Colletotrichum species)',
                treatment: 'Spray Mancozeb or Azoxystrobin',
                prevention: 'Proper pruning, avoid fruit injury'
            },
            'fruit fly': {
                symptoms: 'Maggots in fruits, premature fruit drop',
                cause: 'Insect pest (Bactrocera species)',
                treatment: 'Use protein baits, spray Malathion',
                prevention: 'Fruit bagging, pheromone traps'
            }
        }
    };

    const cropDiseases = diseases[crop];
    if (!cropDiseases) {
        if (resultDiv) {
            resultDiv.innerHTML = '<p style="color: #ff6b6b;">Disease database not available for this crop.</p>';
            resultDiv.classList.add('show');
        }
        return;
    }

    // Search for matching diseases
    const matchingDiseases = Object.keys(cropDiseases).filter(disease => 
        disease.includes(searchTerm) || 
        cropDiseases[disease].symptoms.toLowerCase().includes(searchTerm) ||
        cropDiseases[disease].cause.toLowerCase().includes(searchTerm)
    );

    if (matchingDiseases.length === 0) {
        if (resultDiv) {
            resultDiv.innerHTML = `
                <p style="color: #ff6b6b;">No matching diseases found for "${searchTerm}" in ${crop}.</p>
                <div style="margin-top: 15px; padding: 10px; background: #f0f0f0; border-radius: 5px;">
                    <p><strong>Available diseases for ${crop}:</strong></p>
                    ${Object.keys(cropDiseases).map(disease => `<p>• ${disease.charAt(0).toUpperCase() + disease.slice(1)}</p>`).join('')}
                </div>
            `;
            resultDiv.classList.add('show');
        }
        return;
    }

    const diseaseInfo = matchingDiseases.map(disease => {
        const info = cropDiseases[disease];
        return `
            <div style="margin: 15px 0; padding: 15px; background: #f9f9f9; border-radius: 8px; border-left: 4px solid #4caf50;">
                <h5 style="color: #2d8f47; margin-bottom: 10px;">🦠 ${disease.charAt(0).toUpperCase() + disease.slice(1)}</h5>
                <p><strong>🔍 Symptoms:</strong> ${info.symptoms}</p>
                <p><strong>🧬 Cause:</strong> ${info.cause}</p>
                <p><strong>💊 Treatment:</strong> ${info.treatment}</p>
                <p><strong>🛡️ Prevention:</strong> ${info.prevention}</p>
            </div>
        `;
    }).join('');

    if (resultDiv) {
        resultDiv.innerHTML = `
            <h4>🔬 Disease Information for ${crop.charAt(0).toUpperCase() + crop.slice(1)}</h4>
            ${diseaseInfo}
            <div style="margin: 15px 0; padding: 10px; background: #fff3e0; border-radius: 5px;">
                <p><strong>⚠️ Important Notes:</strong></p>
                <p>• Always read pesticide labels before use</p>
                <p>• Consult local agricultural extension officer</p>
                <p>• Use integrated pest management (IPM) approach</p>
                <p>• Maintain proper field hygiene</p>
            </div>
        `;
        resultDiv.classList.add('show');
    }
}

// ============== AI CHAT FUNCTIONS ==============

let chatWidget = null;
let chatButton = null;
let chatMessages = null;
let chatInput = null;

// Initialize chat elements when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    chatWidget = document.getElementById('chat-widget');
    chatButton = document.getElementById('chat-button');
    chatMessages = document.getElementById('chat-messages');
    chatInput = document.getElementById('chat-input');
    
    // Add enter key listener for chat input
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});

// Toggle chat widget
function toggleChatWidget() {
    if (!chatWidget || !chatButton) return;
    
    if (chatWidget.style.display === 'none' || chatWidget.style.display === '') {
        chatWidget.style.display = 'flex';
        chatButton.style.display = 'none';
        setTimeout(() => {
            chatWidget.classList.add('chat-open');
        }, 10);
    } else {
        chatWidget.classList.remove('chat-open');
        setTimeout(() => {
            chatWidget.style.display = 'none';
            chatButton.style.display = 'flex';
        }, 300);
    }
}

// Send message function
function sendMessage() {
    if (!chatInput || !chatMessages) return;
    
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    chatInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Simulate AI response after delay
    setTimeout(() => {
        hideTypingIndicator();
        const response = generateAIResponse(message);
        addMessage(response, 'bot');
    }, 1500);
}

// Add message to chat
function addMessage(message, sender) {
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `${sender}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = sender === 'user' ? 'message-avatar user-avatar' : 'message-avatar';
    avatar.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    content.innerHTML = `<p>${message}</p>`;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    
    chatMessages.appendChild(messageDiv);
    
    // Animate message appearance
    setTimeout(() => {
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    }, 100);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    if (!chatMessages) return;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'bot-message typing-indicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Hide typing indicator
function hideTypingIndicator() {
    if (!chatMessages) return;
    
    const typingIndicator = chatMessages.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Quick question function
function askQuickQuestion(question) {
    if (!chatInput) return;
    
    chatInput.value = question;
    sendMessage();
}

// Generate AI response (simplified simulation)
function generateAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Farming-related responses
    if (lowerMessage.includes('wheat') || lowerMessage.includes('गेहूं')) {
        return "🌾 Wheat is best planted in November-December in India. It requires well-drained soil with pH 6.0-7.5. For 1 acre, you need 40-50 kg seeds. Apply 120 kg Nitrogen, 60 kg Phosphorus, and 40 kg Potassium per acre. Water requirement is about 4-6 irrigations depending on rainfall.";
    }
    
    if (lowerMessage.includes('rice') || lowerMessage.includes('धान')) {
        return "🍚 Rice cultivation: Best time for transplanting is June-July. Use 15-20 kg seeds per acre for nursery. Maintain 2-3 cm water level in field. Apply 120:60:40 NPK kg/acre. Harvest when 80% grains turn golden yellow, usually after 120-140 days.";
    }
    
    if (lowerMessage.includes('fertilizer') || lowerMessage.includes('खाद')) {
        return "🧪 For fertilizer calculation, I recommend using our Fertilizer Calculator tool. Generally, apply fertilizers in 2-3 splits: 1/2 at sowing, 1/4 at tillering, 1/4 at flowering. Always do soil testing first for accurate recommendations.";
    }
    
    if (lowerMessage.includes('water') || lowerMessage.includes('irrigation') || lowerMessage.includes('पानी')) {
        return "💧 Water management is crucial! Use drip irrigation to save 30-50% water. Water early morning or evening to reduce evaporation. Check soil moisture at 6-inch depth. Most crops need 1-2 inches water per week including rainfall.";
    }
    
    if (lowerMessage.includes('pest') || lowerMessage.includes('disease') || lowerMessage.includes('कीट')) {
        return "🐛 For pest and disease management: 1) Use IPM approach 2) Regular field monitoring 3) Use pheromone traps 4) Encourage beneficial insects 5) Apply pesticides only when needed 6) Rotate crops to break pest cycles. What specific pest problem are you facing?";
    }
    
    if (lowerMessage.includes('soil') || lowerMessage.includes('मिट्टी')) {
        return "🌱 Soil health is foundation of good farming! Get soil tested every 2-3 years. Ideal pH for most crops is 6.0-7.5. Add organic matter like FYM, compost. Practice crop rotation. Avoid over-tillage. Use cover crops to improve soil structure.";
    }
    
    if (lowerMessage.includes('organic') || lowerMessage.includes('जैविक')) {
        return "🌿 Organic farming tips: Use FYM, compost, vermicompost. Apply neem oil for pest control. Use bio-fertilizers like Rhizobium, PSB. Practice crop rotation with legumes. Maintain biodiversity. Get organic certification for premium prices.";
    }
    
    if (lowerMessage.includes('weather') || lowerMessage.includes('मौसम')) {
        return "🌤️ Weather monitoring is important! Use apps like Meghdoot, Damini for weather updates. Plan farming activities based on weather forecast. Protect crops during extreme weather. Use weather-based agro-advisories from IMD.";
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('market') || lowerMessage.includes('बाजार')) {
        return "📈 For better prices: 1) Use e-NAM platform 2) Form farmer groups for collective selling 3) Add value to produce 4) Direct marketing 5) Contract farming 6) Store produce when prices are low 7) Check mandi prices regularly.";
    }
    
    if (lowerMessage.includes('loan') || lowerMessage.includes('credit') || lowerMessage.includes('ऋण')) {
        return "💳 Agricultural credit options: 1) Kisan Credit Card (KCC) - 7% interest 2) PM-KISAN scheme - ₹6000/year 3) Crop loans from banks 4) Self-Help Group loans 5) Microfinance. Visit nearest bank branch with land documents.";
    }
    
    if (lowerMessage.includes('subsidy') || lowerMessage.includes('scheme') || lowerMessage.includes('योजना')) {
        return "🏛️ Major schemes: 1) PM-KISAN - ₹6000/year 2) Crop insurance (PMFBY) 3) Drip irrigation subsidy 4) Farm mechanization 5) Soil health card 6) Organic farming support. Visit agriculture office or check government portals.";
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('नमस्ते')) {
        return "🙏 Hello! I'm your AI farming assistant. I can help you with crop cultivation, fertilizers, irrigation, pest management, government schemes, and more. What farming question do you have today?";
    }
    
    if (lowerMessage.includes('thank') || lowerMessage.includes('धन्यवाद')) {
        return "😊 You're welcome! I'm always here to help with your farming questions. Feel free to ask anything about crops, fertilizers, irrigation, or farming techniques. Happy farming! 🌱";
    }
    
    // Default response
    return "🤖 I understand you're asking about farming. I can help with crop cultivation, fertilizers, irrigation, pest management, soil health, government schemes, and market information. Could you please be more specific about what you'd like to know? You can also use our farming tools for calculations!";
}