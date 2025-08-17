let skillsCrops = {
    tierLegacy: [
        {
            id: 'greenThumb',
            name: 'Green Thumb',
            descricao: {
                ingles: '+5% more coins when selling crops (Seed Shop)',
                portugues: '+5% de coins ao vender colheitas (Loja de Sementes)'
            },
            tipoDeCrop: 'todas',
            afeta: 'vendaCoins',
            sinal: 'x',
            buff: 1.05,
            possui: false
        },
        {
            id: 'seedSpecialist',
            name: 'Seed Specialist',
            descricao: {
                ingles: '-10% on crop growth time',
                portugues: '-10% no tempo das Crops'
            },
            tipoDeCrop: 'todas',
            afeta: 'tempo',
            sinal: 'x',
            buff: 0.9,
            possui: false
        },
        {
            id: 'coder',
            name: 'Coder',
            descricao: {
                ingles: '+20% on crop harvest',
                portugues: '+20% na colheita de Crops'
            },
            tipoDeCrop: 'todas',
            afeta: 'quantidade',
            sinal: 'x',
            buff: 1.2,
            possui: false
        }
    ],
    tier1: [
        {
            id: 'greenThumb2',
            name: 'Green Thumb',
            descricao: {
                ingles: '-5% in the time of Crops',
                portugues: '-5% no tempo das Crops'
            },
            tipoDeCrop: 'todas',
            afeta: 'tempo',
            sinal: 'x',
            pontosNecessários: 1,
            buff: 0.95,
            possui: false
        },
        {
            id: 'youngFarmer',
            name: 'Young Farmer',
            descricao: {
                ingles: '+0.1 Basic Crop Yield',
                portugues: '+0.1 Basic Crop Yield'
            },
            tipoDeCrop: 'basic',
            afeta: 'quantidade',
            sinal: '+',
            pontosNecessários: 1,
            buff: 0.1,
            possui: false
        },
        {
            id: 'experiencedFarmer',
            name: 'Experienced Farmer',
            descricao: {
                ingles: '+0.1 Medium Crop Yield',
                portugues: '+0.1 Medium Crop Yield'
            },
            tipoDeCrop: 'medium',
            afeta: 'quantidade',
            sinal: '+',
            pontosNecessários: 1,
            buff: 0.1,
            possui: false
        },
        {
            id: 'oldFarmer',
            name: 'Old Farmer',
            descricao: {
                ingles: '+0.1 Advanced Crop Yield',
                portugues: '+0.1 Advanced Crop Yield'
            },
            tipoDeCrop: 'advanced',
            afeta: 'quantidade',
            sinal: '+',
            pontosNecessários: 1,
            buff: 0.1,
            possui: false
        },
        {
            id: 'bettysFriend',
            name: 'Betty\'s Friend',
            descricao: {
                ingles: 'Delivery of "Betty" Coin increased by 30%',
                portugues: 'Delivery da \'Betty\' Coin aumentou 30%'
            },
            tipoDeCrop: 'todas',
            afeta: 'delivery',
            sinal: 'x',
            pontosNecessários: 1,
            buff: 1.3,
            possui: false
        },
        {
            id: 'chonkyScarecrow',
            name: 'Chonky Scarecrow',
            descricao: {
                ingles: 'Increases Basic Scarecrow\'s area of effect (AOE) to a 7x7 area; Additional -10% basic crop growth time',
                portugues: 'Aumenta a área de efeito (AOE) do Basic Scarecrow\'s para uma área de 7x7; Adicionalmente, reduz em 10% o tempo de crescimento das crops basicas.'
            },
            tipoDeCrop: 'NFT', //rever dps
            afeta: 'tempo',
            sinal: '+',
            pontosNecessários: 1,
            buff: 49,
            possui: false
        }

    ],
    tier2: [
        {
            id: 'strongRoots',
            name: 'Strong Roots',
            descricao: {
                ingles: '10% reduction in the time of Advanced Crops',
                portugues: '10% de redução no tempo das Advanced Crops'
            },
            tipoDeCrop: 'advanced',
            afeta: 'tempo',
            sinal: 'x',
            pontosNecessários: 2,
            buff: 0.9,
            possui: false
        },
        {
            id: 'coinSwindler',
            name: 'Coin Swindler',
            descricao: {
                ingles: '+10% coins when selling crops (Seed Shop)',
                portugues: '+10% de coins ao vender colheitas (Loja de Sementes)'
            },
            tipoDeCrop: 'todas',
            afeta: 'vendaCoins',
            sinal: 'x',
            pontosNecessários: 2,
            buff: 1.1,
            possui: false
        },
        {
            id: 'goldenSunflower',
            name: 'Golden Sunflower',
            descricao: {
                ingles: '1/700 chance of getting +0.35 gold when manually harvesting sunflowers',
                portugues: '1/700 de obter +0,35 gold ao colher sunflowers manualmente'
            },
            tipoDeCrop: 'Sunflower',
            afeta: 'gold',
            sinal: '+',
            pontosNecessários: 2,
            buff: (1 / 700) * 0.35,
            possui: false
        },
        {
            id: 'horrorMike',
            name: 'Horror Mike',
            descricao: {
                ingles: 'Scary Mike AOE increases the size to 7x7 and +0.1 Crops (Medium Crops)',
                portugues: 'Scary Mike aumenta a AOE para 7x7 e concede +0,1 nas colheitas (Medium Crops)'
            },
            tipoDeCrop: 'NFT',
            afeta: 'quantidade',
            sinal: '+',
            pontosNecessários: 2,
            buff: 49,
            possui: false
        },
        {
            id: 'lauriesGains',
            name: 'Laurie\'s Gains',
            descricao: {
                ingles: 'Laurie Crow AOE increases the size to 7x7 and +0.1 Crops (Advanced Crops)',
                portugues: 'Laurie Crow aumenta a AOE para 7x7 e concede +0,1 nas colheitas (Advanced Crops)'
            },
            tipoDeCrop: 'NFT',
            afeta: 'quantidade',
            sinal: '+',
            pontosNecessários: 2,
            buff: 49,
            possui: false
        }
    ],
    tier3: [
        {
            id: 'instantGrowth',
            name: 'Instant Growth',
            descricao: {
                ingles: 'Ability to make all Crops ready for harvest (1/72h)',
                portugues: 'Capacidade de deixar todas Crops prontas para serem colhidas (1/72h)'
            },
            tipoDeCrop: 'todas',
            afeta: 'desativado',
            sinal: '+',
            pontosNecessários: 3,
            buff: '',
            possui: false,
        },
        {
            id: 'acreFarm',
            name: 'Acre Farm',
            descricao: {
                ingles: '+1 Advanced crop yeild, -0.5 Basic and Medium crop yield',
                portugues: '+1 Advanced crop yeild, -0.5 Basic and Medium crop yield'
            },
            tipoDeCrop: 'advanced',
            afeta: 'quantidade',
            sinal: '+',
            pontosNecessários: 3,
            buff: 1,
            possui: false,
            cropReduzida: 'basic medium',
            deBuff: 0.5,
        },
        {
            id: 'hectareFarm',
            name: 'Hectare Farm',
            descricao: {
                ingles: '+1 Basic and Medium crop yield, -0.5 Advanced crop yield',
                portugues: '+1 Basic and Medium crop yield, -0.5 Advanced crop yield'
            },
            tipoDeCrop: 'basic medium',
            afeta: 'quantidade',
            sinal: '+',
            pontosNecessários: 3,
            buff: 1,
            possui: false,
            cropReduzida: 'advanced',
            deBuff: 0.5,
        }
    ]
};

let todasSkillsDeCrops = [].concat(skillsCrops.tierLegacy, skillsCrops.tier1, skillsCrops.tier2, skillsCrops.tier3);
console.log(todasSkillsDeCrops);


skillsCrops.tierLegacy.forEach(skill => {
    console.log(`Skill Legacy: ${skill.name}`);
});

skillsCrops.tier1.forEach(skill => {
    console.log(`Skill Tier 1: ${skill.name}`);
});

skillsCrops.tier2.forEach(skill => {
    console.log(`Skill Tier 2: ${skill.name}`);
});

skillsCrops.tier3.forEach(skill => {
    console.log(`Skill Tier 3: ${skill.name}`);
});
