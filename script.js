// ==================== GLOBAL VARIABLES ====================
let currentLanguage = 'en';
let currentTheme = 'light';
let chatOpen = false;

// OpenAI API Configuration
const OPENAI_API_KEY = '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';
const OPENAI_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// ==================== NAVIGATION FUNCTIONS ====================
function toggleNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    
    navbar.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Close navigation when clicking outside
    if (navbar.classList.contains('active')) {
        document.addEventListener('click', closeNavOnClickOutside);
    } else {
        document.removeEventListener('click', closeNavOnClickOutside);
    }
}

function closeNavOnClickOutside(event) {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    
    if (!navbar.contains(event.target) && !navToggle.contains(event.target)) {
        navbar.classList.remove('active');
        navToggle.classList.remove('active');
        document.removeEventListener('click', closeNavOnClickOutside);
    }
}

// ==================== CALCULATOR FUNCTIONS ====================

// Fertilizer Calculator
function calculateFertilizer() {
    const crop = document.getElementById('crop-select').value;
    const area = parseFloat(document.getElementById('area-input').value);
    const resultDiv = document.getElementById('fertilizer-result');
    
    if (!crop || !area || area <= 0) {
        resultDiv.innerHTML = '<p style="color: red;">Please select a crop and enter valid area!</p>';
        resultDiv.classList.add('show');
        return;
    }
    
    // Fertilizer requirements per acre (NPK in kg)
    const fertilizerData = {
        rice: { n: 120, p: 60, k: 40, urea: 260, dap: 130, mop: 67 },
        wheat: { n: 120, p: 60, k: 40, urea: 260, dap: 130, mop: 67 },
        corn: { n: 120, p: 60, k: 40, urea: 260, dap: 130, mop: 67 },
        tomato: { n: 200, p: 100, k: 100, urea: 435, dap: 217, mop: 167 },
        potato: { n: 120, p: 80, k: 100, urea: 260, dap: 174, mop: 167 },
        cotton: { n: 120, p: 60, k: 60, urea: 260, dap: 130, mop: 100 },
        sugarcane: { n: 280, p: 90, k: 140, urea: 608, dap: 196, mop: 233 },
        soybean: { n: 30, p: 80, k: 40, urea: 65, dap: 174, mop: 67 },
        mustard: { n: 80, p: 40, k: 40, urea: 174, dap: 87, mop: 67 },
        groundnut: { n: 25, p: 50, k: 75, urea: 54, dap: 109, mop: 125 },
        onion: { n: 100, p: 50, k: 50, urea: 217, dap: 109, mop: 83 },
        garlic: { n: 100, p: 50, k: 50, urea: 217, dap: 109, mop: 83 },
        chili: { n: 150, p: 75, k: 75, urea: 326, dap: 163, mop: 125 },
        cabbage: { n: 120, p: 80, k: 80, urea: 260, dap: 174, mop: 133 },
        cauliflower: { n: 120, p: 80, k: 80, urea: 260, dap: 174, mop: 133 },
        brinjal: { n: 100, p: 50, k: 50, urea: 217, dap: 109, mop: 83 },
        okra: { n: 100, p: 60, k: 60, urea: 217, dap: 130, mop: 100 },
        carrot: { n: 100, p: 50, k: 100, urea: 217, dap: 109, mop: 167 },
        radish: { n: 60, p: 30, k: 30, urea: 130, dap: 65, mop: 50 },
        spinach: { n: 100, p: 50, k: 50, urea: 217, dap: 109, mop: 83 },
        banana: { n: 200, p: 60, k: 300, urea: 435, dap: 130, mop: 500 },
        mango: { n: 1000, p: 500, k: 1000, urea: 2174, dap: 1087, mop: 1667 },
        orange: { n: 400, p: 200, k: 400, urea: 870, dap: 435, mop: 667 },
        apple: { n: 400, p: 200, k: 400, urea: 870, dap: 435, mop: 667 },
        grapes: { n: 80, p: 40, k: 80, urea: 174, dap: 87, mop: 133 },
        papaya: { n: 200, p: 200, k: 250, urea: 435, dap: 435, mop: 417 },
        guava: { n: 600, p: 200, k: 400, urea: 1304, dap: 435, mop: 667 },
        pomegranate: { n: 400, p: 200, k: 400, urea: 870, dap: 435, mop: 667 },
        chickpea: { n: 20, p: 40, k: 20, urea: 43, dap: 87, mop: 33 },
        lentil: { n: 20, p: 40, k: 20, urea: 43, dap: 87, mop: 33 },
        pigeon_pea: { n: 25, p: 50, k: 25, urea: 54, dap: 109, mop: 42 },
        black_gram: { n: 25, p: 50, k: 25, urea: 54, dap: 109, mop: 42 },
        green_gram: { n: 25, p: 50, k: 25, urea: 54, dap: 109, mop: 42 },
        field_pea: { n: 25, p: 50, k: 25, urea: 54, dap: 109, mop: 42 },
        sesame: { n: 40, p: 20, k: 20, urea: 87, dap: 43, mop: 33 },
        sunflower: { n: 60, p: 60, k: 40, urea: 130, dap: 130, mop: 67 },
        safflower: { n: 60, p: 30, k: 30, urea: 130, dap: 65, mop: 50 },
        castor: { n: 60, p: 30, k: 30, urea: 130, dap: 65, mop: 50 },
        coconut: { n: 500, p: 320, k: 1200, urea: 1087, dap: 696, mop: 2000 },
        arecanut: { n: 100, p: 40, k: 140, urea: 217, dap: 87, mop: 233 },
        cardamom: { n: 75, p: 75, k: 150, urea: 163, dap: 163, mop: 250 },
        black_pepper: { n: 50, p: 50, k: 125, urea: 109, dap: 109, mop: 208 },
        turmeric: { n: 60, p: 30, k: 120, urea: 130, dap: 65, mop: 200 },
        ginger: { n: 75, p: 50, k: 50, urea: 163, dap: 109, mop: 83 },
        coriander: { n: 40, p: 30, k: 20, urea: 87, dap: 65, mop: 33 },
        cumin: { n: 30, p: 15, k: 15, urea: 65, dap: 33, mop: 25 },
        fenugreek: { n: 25, p: 25, k: 25, urea: 54, dap: 54, mop: 42 },
        fennel: { n: 100, p: 50, k: 50, urea: 217, dap: 109, mop: 83 },
        jute: { n: 60, p: 30, k: 30, urea: 130, dap: 65, mop: 50 },
        tea: { n: 150, p: 50, k: 50, urea: 326, dap: 109, mop: 83 },
        coffee: { n: 200, p: 200, k: 200, urea: 435, dap: 435, mop: 333 },
        rubber: { n: 100, p: 40, k: 40, urea: 217, dap: 87, mop: 67 }
    };
    
    const cropData = fertilizerData[crop];
    if (!cropData) {
        resultDiv.innerHTML = '<p style="color: red;">Crop data not available!</p>';
        resultDiv.classList.add('show');
        return;
    }
    
    const totalN = (cropData.n * area).toFixed(1);
    const totalP = (cropData.p * area).toFixed(1);
    const totalK = (cropData.k * area).toFixed(1);
    const totalUrea = (cropData.urea * area).toFixed(1);
    const totalDAP = (cropData.dap * area).toFixed(1);
    const totalMOP = (cropData.mop * area).toFixed(1);
    
    const cost = (totalUrea * 6 + totalDAP * 27 + totalMOP * 17).toFixed(0);
    
    resultDiv.innerHTML = `
        <h4>🧮 Fertilizer Requirements for ${area} acres of ${crop.charAt(0).toUpperCase() + crop.slice(1)}</h4>
        <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 10px 0;">
            <h5>📊 Nutrient Requirements:</h5>
            <p><strong>Nitrogen (N):</strong> ${totalN} kg</p>
            <p><strong>Phosphorus (P):</strong> ${totalP} kg</p>
            <p><strong>Potassium (K):</strong> ${totalK} kg</p>
        </div>
        <div style="background: #fff3e0; padding: 15px; border-radius: 8px; margin: 10px 0;">
            <h5>🛒 Fertilizer Quantities:</h5>
            <p><strong>Urea (46% N):</strong> ${totalUrea} kg</p>
            <p><strong>DAP (18-46-0):</strong> ${totalDAP} kg</p>
            <p><strong>MOP (0-0-60):</strong> ${totalMOP} kg</p>
        </div>
        <div style="background: #f3e5f5; padding: 15px; border-radius: 8px; margin: 10px 0;">
            <h5>💰 Estimated Cost:</h5>
            <p><strong>Total Cost:</strong> ₹${cost}</p>
            <small>*Prices are approximate and may vary by location</small>
        </div>
        <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 10px 0;">
            <h5>💡 Application Tips:</h5>
            <p>• Apply fertilizers in 2-3 splits during the growing season</p>
            <p>• Apply phosphorus at planting time</p>
            <p>• Split nitrogen application for better efficiency</p>
        </div>
    `;
    resultDiv.classList.add('show');
}

// Irrigation Calculator
function calculateIrrigation() {
    const landSize = parseFloat(document.getElementById('land-size').value);
    const crop = document.getElementById('irrigation-crop').value;
    const resultDiv = document.getElementById('irrigation-result');
    
    if (!landSize || !crop || landSize <= 0) {
        resultDiv.innerHTML = '<p style="color: red;">Please enter valid land size and select a crop!</p>';
        resultDiv.classList.add('show');
        return;
    }
    
    // Water requirements in inches per season
    const waterRequirements = {
        rice: { water: 48, frequency: 'Continuous flooding', method: 'Flood irrigation' },
        wheat: { water: 18, frequency: '4-5 irrigations', method: 'Furrow/Sprinkler' },
        corn: { water: 22, frequency: '6-8 irrigations', method: 'Furrow/Drip' },
        cotton: { water: 24, frequency: '8-10 irrigations', method: 'Furrow/Drip' },
        sugarcane: { water: 60, frequency: '15-20 irrigations', method: 'Furrow/Drip' },
        soybean: { water: 20, frequency: '3-4 irrigations', method: 'Sprinkler/Drip' },
        mustard: { water: 12, frequency: '2-3 irrigations', method: 'Furrow' },
        groundnut: { water: 20, frequency: '4-5 irrigations', method: 'Furrow/Sprinkler' },
        tomato: { water: 24, frequency: '15-20 irrigations', method: 'Drip' },
        potato: { water: 16, frequency: '6-8 irrigations', method: 'Sprinkler/Furrow' },
        onion: { water: 20, frequency: '10-12 irrigations', method: 'Drip/Furrow' },
        garlic: { water: 18, frequency: '8-10 irrigations', method: 'Drip/Furrow' },
        chili: { water: 22, frequency: '12-15 irrigations', method: 'Drip' },
        cabbage: { water: 18, frequency: '8-10 irrigations', method: 'Sprinkler/Drip' },
        cauliflower: { water: 18, frequency: '8-10 irrigations', method: 'Sprinkler/Drip' },
        brinjal: { water: 20, frequency: '10-12 irrigations', method: 'Drip' },
        okra: { water: 18, frequency: '8-10 irrigations', method: 'Drip/Furrow' },
        carrot: { water: 16, frequency: '6-8 irrigations', method: 'Sprinkler' },
        radish: { water: 12, frequency: '4-5 irrigations', method: 'Sprinkler' },
        spinach: { water: 10, frequency: '6-8 irrigations', method: 'Sprinkler' },
        banana: { water: 72, frequency: 'Year-round', method: 'Drip' },
        mango: { water: 40, frequency: '8-10 irrigations', method: 'Basin/Drip' },
        orange: { water: 36, frequency: '10-12 irrigations', method: 'Basin/Drip' },
        apple: { water: 30, frequency: '8-10 irrigations', method: 'Sprinkler/Drip' },
        grapes: { water: 24, frequency: '15-20 irrigations', method: 'Drip' },
        papaya: { water: 48, frequency: 'Year-round', method: 'Drip' },
        guava: { water: 36, frequency: '10-12 irrigations', method: 'Basin/Drip' },
        pomegranate: { water: 28, frequency: '12-15 irrigations', method: 'Drip' },
        chickpea: { water: 14, frequency: '2-3 irrigations', method: 'Furrow' },
        lentil: { water: 12, frequency: '2-3 irrigations', method: 'Furrow' },
        pigeon_pea: { water: 16, frequency: '3-4 irrigations', method: 'Furrow' },
        black_gram: { water: 12, frequency: '2-3 irrigations', method: 'Furrow' },
        green_gram: { water: 12, frequency: '2-3 irrigations', method: 'Furrow' },
        field_pea: { water: 14, frequency: '3-4 irrigations', method: 'Furrow' },
        sesame: { water: 14, frequency: '3-4 irrigations', method: 'Furrow' },
        sunflower: { water: 20, frequency: '4-5 irrigations', method: 'Furrow/Sprinkler' },
        safflower: { water: 16, frequency: '3-4 irrigations', method: 'Furrow' },
        castor: { water: 18, frequency: '4-5 irrigations', method: 'Furrow' },
        coconut: { water: 60, frequency: 'Year-round', method: 'Basin/Drip' },
        arecanut: { water: 72, frequency: 'Year-round', method: 'Basin/Drip' },
        cardamom: { water: 80, frequency: 'Year-round', method: 'Sprinkler' },
        black_pepper: { water: 60, frequency: 'Year-round', method: 'Drip' },
        turmeric: { water: 36, frequency: '15-20 irrigations', method: 'Furrow/Drip' },
        ginger: { water: 40, frequency: '15-20 irrigations', method: 'Sprinkler/Drip' },
        coriander: { water: 12, frequency: '4-5 irrigations', method: 'Sprinkler' },
        cumin: { water: 10, frequency: '3-4 irrigations', method: 'Furrow' },
        fenugreek: { water: 12, frequency: '3-4 irrigations', method: 'Furrow' },
        fennel: { water: 16, frequency: '5-6 irrigations', method: 'Furrow' },
        jute: { water: 30, frequency: '8-10 irrigations', method: 'Flood' },
        tea: { water: 60, frequency: 'Year-round', method: 'Sprinkler' },
        coffee: { water: 48, frequency: 'Year-round', method: 'Drip' },
        rubber: { water: 72, frequency: 'Year-round', method: 'Basin' }
    };
    
    const cropData = waterRequirements[crop];
    if (!cropData) {
        resultDiv.innerHTML = '<p style="color: red;">Crop data not available!</p>';
        resultDiv.classList.add('show');
        return;
    }
    
    // Convert inches to liters per acre (1 inch = 27,154 liters per acre)
    const litersPerAcre = cropData.water * 27154;
    const totalLiters = (litersPerAcre * landSize).toFixed(0);
    const totalCubicMeters = (totalLiters / 1000).toFixed(1);
    
    resultDiv.innerHTML = `
        <h4>💧 Irrigation Plan for ${landSize} acres of ${crop.charAt(0).toUpperCase() + crop.slice(1)}</h4>
        <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 10px 0;">
            <h5>📊 Water Requirements:</h5>
            <p><strong>Total Water Needed:</strong> ${totalLiters} liters (${totalCubicMeters} cubic meters)</p>
            <p><strong>Water per Acre:</strong> ${litersPerAcre.toLocaleString()} liters</p>
            <p><strong>Irrigation Depth:</strong> ${cropData.water} inches</p>
        </div>
        <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 10px 0;">
            <h5>🚿 Irrigation Schedule:</h5>
            <p><strong>Frequency:</strong> ${cropData.frequency}</p>
            <p><strong>Recommended Method:</strong> ${cropData.method}</p>
        </div>
        <div style="background: #fff3e0; padding: 15px; border-radius: 8px; margin: 10px 0;">
            <h5>💡 Water Management Tips:</h5>
            <p>• Monitor soil moisture regularly</p>
            <p>• Irrigate early morning or evening</p>
            <p>• Use mulching to reduce water loss</p>
            <p>• Consider drip irrigation for water efficiency</p>
        </div>
        <div style="background: #f3e5f5; padding: 15px; border-radius: 8px; margin: 10px 0;">
            <h5>⚡ Efficiency Tips:</h5>
            <p>• Drip irrigation saves 30-50% water</p>
            <p>• Sprinkler irrigation saves 20-30% water</p>
            <p>• Check for leaks in irrigation system</p>
        </div>
    `;
    resultDiv.classList.add('show');
}

// Seed Quality Checker
function checkSeedQuality() {
    const seedType = document.getElementById('seed-select').value;
    const resultDiv = document.getElementById('seed-quality-result');
    
    if (!seedType) {
        resultDiv.innerHTML = '<p style="color: red;">Please select a seed type!</p>';
        resultDiv.classList.add('show');
        return;
    }
    
    const seedTests = {
        wheat: {
            tests: [
                'Physical Purity Test: Remove broken, damaged, and foreign seeds',
                'Germination Test: 100 seeds in wet cloth for 7 days (>85% should germinate)',
                'Moisture Test: Should be below 12% for storage',
                'Weight Test: 1000 seed weight should be 35-45g'
            ],
            tips: [
                'Seeds should be uniform in size and color',
                'No fungal growth or bad smell',
                'Store in dry, cool place',
                'Use certified seeds from authorized dealers'
            ]
        },
        rice: {
            tests: [
                'Physical Purity Test: Remove chaff, broken grains, and weeds',
                'Germination Test: 100 seeds in petri dish for 14 days (>80% germination)',
                'Moisture Test: Should be below 14% for storage',
                'Float Test: Good seeds sink in water, damaged ones float'
            ],
            tips: [
                'Seeds should be plump and heavy',
                'Golden yellow color for most varieties',
                'No black or discolored grains',
                'Treat seeds with fungicide before sowing'
            ]
        },
        corn: {
            tests: [
                'Physical Purity Test: Remove broken kernels and foreign matter',
                'Germination Test: 100 seeds in sand/soil for 7 days (>90% germination)',
                'Moisture Test: Should be below 14% for storage',
                'Size Grading: Uniform kernel size'
            ],
            tips: [
                'Kernels should be bright and shiny',
                'No insect damage or mold',
                'Store in moisture-proof containers',
                'Check for genetic purity'
            ]
        },
        cotton: {
            tests: [
                'Physical Purity Test: Remove lint, broken seeds, and debris',
                'Germination Test: 400 seeds in sand for 10 days (>75% germination)',
                'Moisture Test: Should be below 12% for storage',
                'Acid Delinting: For better germination'
            ],
            tips: [
                'Seeds should be dark gray to black',
                'No cracked or damaged seeds',
                'Delinted seeds germinate better',
                'Use only certified hybrid seeds'
            ]
        },
        mustard: {
            tests: [
                'Physical Purity Test: Remove small seeds and foreign matter',
                'Germination Test: 100 seeds in blotter paper for 7 days (>85% germination)',
                'Moisture Test: Should be below 9% for storage',
                'Oil Content Test: Higher oil content indicates quality'
            ],
            tips: [
                'Seeds should be round and reddish-brown',
                'No shriveled or immature seeds',
                'Store in airtight containers',
                'Avoid seeds with bitter taste'
            ]
        },
        soybean: {
            tests: [
                'Physical Purity Test: Remove broken beans and foreign seeds',
                'Germination Test: 100 seeds in sand for 7 days (>85% germination)',
                'Moisture Test: Should be below 12% for storage',
                'Protein Test: Higher protein content preferred'
            ],
            tips: [
                'Seeds should be cream to yellow colored',
                'No wrinkled or cracked beans',
                'Uniform size and shape',
                'Inoculate with Rhizobium before sowing'
            ]
        },
        groundnut: {
            tests: [
                'Physical Purity Test: Remove broken pods and kernels',
                'Germination Test: 100 kernels in sand for 10 days (>70% germination)',
                'Moisture Test: Should be below 10% for storage',
                'Kernel Test: Remove shriveled kernels'
            ],
            tips: [
                'Kernels should be pink to red colored',
                'No rancid smell or oil stains',
                'Store in cool, dry place',
                'Check for aflatoxin contamination'
            ]
        },
        sugarcane: {
            tests: [
                'Bud Viability Test: Check for healthy, prominent buds',
                'Node Test: 3-4 nodes per sett recommended',
                'Disease Test: No red rot or other diseases',
                'Age Test: 8-10 month old cane preferred'
            ],
            tips: [
                'Setts should be from disease-free mother plants',
                'Buds should be plump and healthy',
                'Treat setts with fungicide',
                'Plant immediately after cutting'
            ]
        },
        pulses: {
            tests: [
                'Physical Purity Test: Remove broken and immature seeds',
                'Germination Test: 100 seeds in sand for 10 days (>80% germination)',
                'Moisture Test: Should be below 12% for storage',
                'Hard Seed Test: Scarify hard seeds for better germination'
            ],
            tips: [
                'Seeds should be uniform in color',
                'No insect holes or damage',
                'Inoculate with specific Rhizobium',
                'Store in insect-proof containers'
            ]
        },
        vegetables: {
            tests: [
                'Physical Purity Test: Remove chaff and foreign matter',
                'Germination Test: 100 seeds in petri dish (varies by crop)',
                'Moisture Test: Should be below 8-12% depending on crop',
                'Vigor Test: Check seedling growth rate'
            ],
            tips: [
                'Buy from reputable seed companies',
                'Check expiry date on packets',
                'Store in cool, dry conditions',
                'Test germination before large scale sowing'
            ]
        }
    };
    
    const seedData = seedTests[seedType];
    if (!seedData) {
        resultDiv.innerHTML = '<p style="color: red;">Seed data not available!</p>';
        resultDiv.classList.add('show');
        return;
    }
    
    let testsHtml = seedData.tests.map((test, index) => 
        `<p><strong>${index + 1}.</strong> ${test}</p>`
    ).join('');
    
    let tipsHtml = seedData.tips.map(tip => 
        `<p>• ${tip}</p>`
    ).join('');
    
    resultDiv.innerHTML = `
        <h4>🌱 Seed Quality Tests for ${seedType.charAt(0).toUpperCase() + seedType.slice(1)}</h4>
        <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 10px 0;">
            <h5>🧪 Quality Tests:</h5>
            ${testsHtml}
        </div>
        <div style="background: #fff3e0; padding: 15px; border-radius: 8px; margin: 10px 0;">
            <h5>💡 Quality Tips:</h5>
            ${tipsHtml}
        </div>
        <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 10px 0;">
            <h5>⚠️ Important Notes:</h5>
            <p>• Always buy certified seeds from authorized dealers</p>
            <p>• Conduct germination test before sowing</p>
            <p>• Store seeds properly to maintain viability</p>
            <p>• Use recommended seed treatment</p>
        </div>
    `;
    resultDiv.classList.add('show');
}

// Disease Search Function
function searchDisease() {
    const crop = document.getElementById('disease-crop-select').value;
    const searchTerm = document.getElementById('disease-search').value.toLowerCase();
    const resultDiv = document.getElementById('disease-result');
    
    if (!crop || !searchTerm) {
        resultDiv.innerHTML = '<p style="color: red;">Please select a crop and enter disease name or symptoms!</p>';
        resultDiv.classList.add('show');
        return;
    }
    
    const diseaseDatabase = {
        rice: {
            'blast': {
                symptoms: 'Diamond-shaped lesions on leaves, neck rot, panicle blast',
                cause: 'Fungal disease (Magnaporthe oryzae)',
                treatment: 'Spray Tricyclazole or Carbendazim',
                prevention: 'Use resistant varieties, avoid excess nitrogen'
            },
            'brown spot': {
                symptoms: 'Brown oval spots on leaves and grains',
                cause: 'Fungal disease (Bipolaris oryzae)',
                treatment: 'Spray Mancozeb or Propiconazole',
                prevention: 'Seed treatment, balanced fertilization'
            },
            'bacterial blight': {
                symptoms: 'Water-soaked lesions, yellowing of leaves',
                cause: 'Bacterial disease (Xanthomonas oryzae)',
                treatment: 'Spray Streptocycline or Copper oxychloride',
                prevention: 'Use certified seeds, avoid flooding'
            }
        },
        wheat: {
            'rust': {
                symptoms: 'Orange-red pustules on leaves and stems',
                cause: 'Fungal disease (Puccinia species)',
                treatment: 'Spray Propiconazole or Tebuconazole',
                prevention: 'Use resistant varieties, timely sowing'
            },
            'powdery mildew': {
                symptoms: 'White powdery growth on leaves',
                cause: 'Fungal disease (Blumeria graminis)',
                treatment: 'Spray Sulfur or Triadimefon',
                prevention: 'Avoid dense planting, proper ventilation'
            },
            'loose smut': {
                symptoms: 'Black powdery mass replacing grains',
                cause: 'Fungal disease (Ustilago nuda)',
                treatment: 'Seed treatment with Vitavax',
                prevention: 'Use certified seeds, seed treatment'
            }
        },
        corn: {
            'blight': {
                symptoms: 'Large brown lesions on leaves',
                cause: 'Fungal disease (Exserohilum turcicum)',
                treatment: 'Spray Mancozeb or Carbendazim',
                prevention: 'Crop rotation, resistant varieties'
            },
            'rust': {
                symptoms: 'Orange pustules on leaves',
                cause: 'Fungal disease (Puccinia sorghi)',
                treatment: 'Spray Propiconazole',
                prevention: 'Use resistant hybrids'
            }
        },
        cotton: {
            'wilt': {
                symptoms: 'Yellowing and wilting of plants',
                cause: 'Fungal disease (Fusarium oxysporum)',
                treatment: 'Soil treatment with Carbendazim',
                prevention: 'Crop rotation, resistant varieties'
            },
            'bollworm': {
                symptoms: 'Holes in bolls, caterpillar damage',
                cause: 'Insect pest (Helicoverpa armigera)',
                treatment: 'Spray Bt or synthetic pyrethroids',
                prevention: 'Bt cotton, pheromone traps'
            }
        },
        sugarcane: {
            'red rot': {
                symptoms: 'Red discoloration of internodes',
                cause: 'Fungal disease (Colletotrichum falcatum)',
                treatment: 'Use resistant varieties',
                prevention: 'Sett treatment, roguing'
            }
        },
        vegetables: {
            'damping off': {
                symptoms: 'Seedling collapse at soil level',
                cause: 'Fungal disease (Pythium, Rhizoctonia)',
                treatment: 'Soil drenching with Metalaxyl',
                prevention: 'Seed treatment, proper drainage'
            },
            'powdery mildew': {
                symptoms: 'White powdery coating on leaves',
                cause: 'Fungal disease (Erysiphe cichoracearum)',
                treatment: 'Spray Sulfur or Myclobutanil',
                prevention: 'Proper spacing, avoid overhead irrigation'
            }
        },
        fruits: {
            'anthracnose': {
                symptoms: 'Dark sunken spots on fruits',
                cause: 'Fungal disease (Colletotrichum species)',
                treatment: 'Spray Carbendazim or Mancozeb',
                prevention: 'Proper pruning, fruit bagging'
            }
        }
    };
    
    const cropDiseases = diseaseDatabase[crop];
    if (!cropDiseases) {
        resultDiv.innerHTML = '<p style="color: red;">Disease database not available for this crop!</p>';
        resultDiv.classList.add('show');
        return;
    }
    
    // Search for disease
    let foundDisease = null;
    let diseaseName = '';
    
    for (const [disease, data] of Object.entries(cropDiseases)) {
        if (disease.includes(searchTerm) || 
            data.symptoms.toLowerCase().includes(searchTerm) ||
            data.cause.toLowerCase().includes(searchTerm)) {
            foundDisease = data;
            diseaseName = disease;
            break;
        }
    }
    
    if (!foundDisease) {
        resultDiv.innerHTML = `
            <h4>🔍 Search Results</h4>
            <p style="color: orange;">No specific disease found for "${searchTerm}" in ${crop}.</p>
            <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 10px 0;">
                <h5>💡 General Recommendations:</h5>
                <p>• Consult local agriculture extension officer</p>
                <p>• Take photos and visit nearest KVK</p>
                <p>• Use disease identification apps</p>
                <p>• Contact agriculture helpline: 1800-180-1551</p>
            </div>
        `;
        resultDiv.classList.add('show');
        return;
    }
    
    resultDiv.innerHTML = `
        <h4>🦠 Disease Information: ${diseaseName.charAt(0).toUpperCase() + diseaseName.slice(1)}</h4>
        <div style="background: #ffebee; padding: 15px; border-radius: 8px; margin: 10px 0;">
            <h5>🔍 Symptoms:</h5>
            <p>${foundDisease.symptoms}</p>
        </div>
        <div style="background: #fff3e0; padding: 15px; border-radius: 8px; margin: 10px 0;">
            <h5>🧬 Cause:</h5>
            <p>${foundDisease.cause}</p>
        </div>
        <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 10px 0;">
            <h5>💊 Treatment:</h5>
            <p>${foundDisease.treatment}</p>
        </div>
        <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 10px 0;">
            <h5>🛡️ Prevention:</h5>
            <p>${foundDisease.prevention}</p>
        </div>
        <div style="background: #f3e5f5; padding: 15px; border-radius: 8px; margin: 10px 0;">
            <h5>⚠️ Important:</h5>
            <p>• Always read pesticide labels carefully</p>
            <p>• Follow recommended dosage and safety measures</p>
            <p>• Consult agricultural expert for severe infestations</p>
        </div>
    `;
    resultDiv.classList.add('show');
}

// ==================== AI CHAT FUNCTIONS ====================

// Toggle Chat Widget
function toggleChatWidget() {
    const chatWidget = document.getElementById('chat-widget');
    const chatButton = document.getElementById('chat-button');
    
    if (chatOpen) {
        chatWidget.style.display = 'none';
        chatWidget.classList.remove('chat-open');
        chatButton.style.display = 'flex';
        chatOpen = false;
    } else {
        chatWidget.style.display = 'flex';
        setTimeout(() => {
            chatWidget.classList.add('chat-open');
        }, 10);
        chatButton.style.display = 'none';
        chatOpen = true;
        
        // Focus on input
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            setTimeout(() => chatInput.focus(), 300);
        }
    }
}

// Add message to chat
function addMessage(message, isUser = false) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = isUser ? 'user-message' : 'bot-message';
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = isUser ? 'message-avatar user-avatar' : 'message-avatar';
    avatarDiv.innerHTML = isUser ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = `<p>${message}</p>`;
    
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    
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
    const chatMessages = document.getElementById('chat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'bot-message typing-indicator';
    typingDiv.id = 'typing-indicator';
    
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
    
    setTimeout(() => {
        typingDiv.style.opacity = '1';
        typingDiv.style.transform = 'translateY(0)';
    }, 100);
}

// Remove typing indicator
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Send message to OpenAI API
async function sendToAI(message) {
    try {
        const response = await fetch(OPENAI_API_URL), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'HTTP-Referer': window.location.origin,
                'X-Title': 'Farmer Genius AI Assistant'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: `You are FarmersGenius 🌱 — an AI farming expert for Indian farmers working on the "Farmer Genius" platform.

IMPORTANT GUIDELINES:
- Always try to give farmers practical advice, even if you don't have database access
- If the exact info is not available, give your best general farming advice
- Never say "I am not connected to a database." Instead, suggest safe practices or recommend contacting local agricultural offices for detailed data
- Always provide practical, actionable advice for Indian farming conditions
- Include specific crop varieties, fertilizer names, and local solutions when possible
- Mention government schemes (PM-KISAN, PMFBY, etc.) when relevant
- Use simple language that farmers can understand
- Include cost estimates in Indian Rupees when discussing inputs
- Suggest local resources like KVKs, agriculture extension officers
- Always prioritize farmer safety and sustainable practices
- Keep responses concise but informative (max 200 words)
- Include relevant emojis to make responses engaging

TOPICS YOU EXCEL IN:
- Crop selection and planning
- Fertilizer and pesticide recommendations
- Irrigation and water management
- Pest and disease identification
- Soil health and testing
- Government schemes and subsidies
- Market prices and selling strategies
- Weather-based farming advice
- Organic farming practices
- Farm mechanization

Always end responses with a helpful tip or suggestion for the farmer.`
                    },
                    {
                        role: 'user',
                        content: message
                    }
                ],
                max_tokens: 300,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('AI API Error:', error);
        return `I apologize, but I'm having trouble connecting to my knowledge base right now. 🤖

Here are some quick farming tips while I get back online:

🌱 **General Farming Advice:**
• Test your soil pH regularly (ideal: 6.0-7.5)
• Apply organic manure before chemical fertilizers
• Water crops early morning or evening
• Monitor weather forecasts for planning

📞 **Get Help:**
• Contact your local KVK (Krishi Vigyan Kendra)
• Call agriculture helpline: 1800-180-1551
• Visit nearest agriculture extension office

💡 **Tip:** Keep a farming diary to track what works best for your land!`;
    }
}

// Send message function
async function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessage(message, true);
    chatInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        // Get AI response
        const aiResponse = await sendToAI(message);
        
        // Remove typing indicator and add AI response
        removeTypingIndicator();
        addMessage(aiResponse);
    } catch (error) {
        removeTypingIndicator();
        addMessage("I'm sorry, I'm having trouble processing your request right now. Please try again in a moment. 🤖");
    }
}

// Quick question function
async function askQuickQuestion(question) {
    const chatInput = document.getElementById('chat-input');
    chatInput.value = question;
    await sendMessage();
}

// Handle Enter key in chat input
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});

// ==================== SETTINGS FUNCTIONS ====================

// Apply language changes
function applyLanguage(lang) {
    currentLanguage = lang;
    const elements = document.querySelectorAll('[data-en]');
    
    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.textContent = text;
        }
    });
    
    // Update placeholders
    const placeholderElements = document.querySelectorAll('[data-en-placeholder]');
    placeholderElements.forEach(element => {
        const placeholder = element.getAttribute(`data-${lang}-placeholder`);
        if (placeholder) {
            element.placeholder = placeholder;
        }
    });
    
    localStorage.setItem('farmer-genius-language', lang);
}

// Apply theme changes
function applyTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('farmer-genius-theme', theme);
}

// Save settings function
function saveSettings() {
    const selectedTheme = document.querySelector('input[name="theme"]:checked')?.value || 'light';
    const selectedLanguage = document.querySelector('input[name="language"]:checked')?.value || 'en';
    
    // Apply theme
    applyTheme(selectedTheme);
    
    // Apply language
    applyLanguage(selectedLanguage);
    
    // Save notification preferences
    const weatherAlerts = document.getElementById('weather-alerts')?.checked || false;
    const schemeUpdates = document.getElementById('scheme-updates')?.checked || false;
    const farmingTips = document.getElementById('farming-tips')?.checked || false;
    
    localStorage.setItem('farmer-genius-notifications', JSON.stringify({
        weather: weatherAlerts,
        schemes: schemeUpdates,
        tips: farmingTips
    }));
    
    // Show success message
    alert('Settings saved successfully! 🎉');
}

// Reset settings function
function resetSettings() {
    if (confirm('Are you sure you want to reset all settings to default?')) {
        // Reset theme
        document.querySelector('input[value="light"]').checked = true;
        applyTheme('light');
        
        // Reset language
        document.querySelector('input[value="en"]').checked = true;
        applyLanguage('en');
        
        // Reset notifications
        document.getElementById('weather-alerts').checked = true;
        document.getElementById('scheme-updates').checked = true;
        document.getElementById('farming-tips').checked = true;
        
        // Clear localStorage
        localStorage.removeItem('farmer-genius-theme');
        localStorage.removeItem('farmer-genius-language');
        localStorage.removeItem('farmer-genius-notifications');
        
        alert('Settings reset to default! 🔄');
    }
}

// Load saved settings on page load
function loadSettings() {
    // Load theme
    const savedTheme = localStorage.getItem('farmer-genius-theme') || 'light';
    const themeRadio = document.querySelector(`input[value="${savedTheme}"]`);
    if (themeRadio) {
        themeRadio.checked = true;
        applyTheme(savedTheme);
    }
    
    // Load language
    const savedLanguage = localStorage.getItem('farmer-genius-language') || 'en';
    const languageRadio = document.querySelector(`input[value="${savedLanguage}"]`);
    if (languageRadio) {
        languageRadio.checked = true;
        applyLanguage(savedLanguage);
    }
    
    // Load notifications
    const savedNotifications = localStorage.getItem('farmer-genius-notifications');
    if (savedNotifications) {
        const notifications = JSON.parse(savedNotifications);
        const weatherCheckbox = document.getElementById('weather-alerts');
        const schemesCheckbox = document.getElementById('scheme-updates');
        const tipsCheckbox = document.getElementById('farming-tips');
        
        if (weatherCheckbox) weatherCheckbox.checked = notifications.weather;
        if (schemesCheckbox) schemesCheckbox.checked = notifications.schemes;
        if (tipsCheckbox) tipsCheckbox.checked = notifications.tips;
    }
}

// ==================== INITIALIZATION ====================

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Load saved settings
    loadSettings();
    
    // Add smooth scrolling to navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close navigation on mobile
                const navbar = document.getElementById('navbar');
                const navToggle = document.getElementById('navToggle');
                navbar.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
    
    // Add loading animation to tool cards
    const toolCards = document.querySelectorAll('.tool-card, .scheme-card, .feature-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loading');
            }
        });
    }, observerOptions);
    
    toolCards.forEach(card => {
        observer.observe(card);
    });
    
    // Add pulse animation to chat button periodically
    const chatButton = document.getElementById('chat-button');
    if (chatButton) {
        setInterval(() => {
            if (!chatOpen) {
                chatButton.classList.add('pulse-animation');
                setTimeout(() => {
                    chatButton.classList.remove('pulse-animation');
                }, 1500);
            }
        }, 10000); // Pulse every 10 seconds
    }
    
    console.log('🌾 Farmer Genius initialized successfully!');
    console.log('🤖 AI Assistant ready with OpenRouter API');
});

// Handle page visibility change to manage chat state
document.addEventListener('visibilitychange', function() {
    if (document.hidden && chatOpen) {
        // Page is hidden, could pause chat or save state
        console.log('Page hidden, chat state preserved');
    } else if (!document.hidden && chatOpen) {
        // Page is visible again, restore chat focus
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            setTimeout(() => chatInput.focus(), 100);
        }
    }
});
