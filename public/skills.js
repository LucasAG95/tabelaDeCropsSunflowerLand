let skillsCrops = {
    tierLegacy: [
        {
            id: 'greenThumb',
            name: 'Green Thumb',
            descricao: '+5% de coins ao vender colheitas (Loja de Sementes)',
            tipoDeRecurso: 'todas',
            afeta: 'vendaCoins',
            sinal: 'x',
            buff: 1.05,
            possui: false
        },
        {
            id: 'seedSpecialist',
            name: 'Seed Specialist',
            descricao: '-10% no tempo das Crops',
            tipoDeCrop: 'todas',
            afeta: 'tempo',
            sinal: 'x',
            buff: 0.9,
            possui: false
        },
        {
            id: 'coder',
            name: 'Coder',
            descricao: '+20% na colheita de Crops',
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
            descricao: '-5% no tempo das Crops',
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
            descricao: '+0.1 Basic Crop Yield',
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
            descricao: '+0.1 Medium Crop Yield',
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
            descricao: '+0.1 Advanced Crop Yield',
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
            descricao: 'Delivery da \'Betty\' Coin aumentou 30%',
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
            descricao: 'Aumenta a área de efeito (AOE) do Basic Scarecrow\'s para uma área de 7x7; Adicionalmente, reduz em 10% o tempo de crescimento das crops basicas.',
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
            descricao: '10% de redução no tempo das Advanced Crops',
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
            descricao: '+10% de coins ao vender colheitas (Loja de Sementes)',
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
            descricao: '1/700 de obter +0,35 gold ao colher sunflowers manualmente',
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
            descricao: 'Scary Mike aumenta a AOE para 7x7 e concede +0,1 nas colheitas (Medium Crops)',
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
            descricao: 'Laurie Crow aumenta a AOE para 7x7 e concede +0,1 nas colheitas (Advanced Crops)',
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
            descricao: 'Capacidade de deixar todas Crops prontas para serem colhidas (1/72h)',
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
            descricao: '+1 Advanced crop yeild, -0.5 Basic and Medium crop yield',
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
            descricao: '+1 Basic and Medium crop yield, -0.5 Advanced crop yield',
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

// Ele vai servir como um "atalho" para encontrar qualquer Skill pelo seu id
let mapaDeSkillsCrops = {};
todasSkillsDeCrops.forEach(skills => { 
    mapaDeSkillsCrops[skills.id] = skills;
});
console.log(mapaDeSkillsCrops);

//=============================================================================================================================================================================

let skillsTrees = {
    tierLegacy: [
        {
            id: 'lumberjack',
            name: 'Lumberjack',
            descricao: '+10% Wood',
            tipoDeRecurso: 'wood fruit',
            afeta: 'quantidade',
            sinal: 'x',
            buff: 1.1,
            possui: false
        },
        {
            id: 'logger',
            name: 'Logger',
            descricao: 'Gasta meio machado por arvore',
            tipoDeRecurso: 'axe',
            afeta: 'quantidade',
            sinal: 'x',
            buff: 0.5,
            possui: false
        },
    ],
    tier1: [
        {
            id: 'lumberjacksExtra',
            name: 'Lumberjack\'s Extra',
            descricao: '+0.1 no rendimento de madeira.',
            tipoDeRecurso: 'wood',
            afeta: 'quantidade',
            sinal: '+',
            pontosNecessários: 1,
            buff: 0.1,
            possui: false,
        },
        {
            id: 'treeCharge',
            name: 'Tree Charge',
            descricao: '-10% no tempo de crescimento das árvores',
            tipoDeRecurso: 'wood',
            afeta: 'tempo',
            sinal: 'x',
            pontosNecessários: 1,
            buff: 0.9,
            possui: false,
        },
        {
            id: 'moreAxes',
            name: 'More Axes',
            descricao: '+50 no estoque de machados',
            tipoDeRecurso: 'axe',
            afeta: 'estoque',
            sinal: '+',
            pontosNecessários: 1,
            buff: 50,
            possui: false,
        },
        {
            id: 'instaChop',
            name: 'Insta-Chop',
            descricao: 'Uma única batida nas árvoress',
            tipoDeRecurso: 'wood',
            afeta: '',
            sinal: '',
            pontosNecessários: 1,
            buff: 1,
            possui: false,
        },
    ],
    tier2: [
        {
            id: 'toughTree',
            name: 'Tough Tree',
            descricao: '1/10 de chance de x3 no rendimento de madeira',
            tipoDeRecurso: 'wood',
            afeta: 'quantidade',
            sinal: 'x',
            pontosNecessários: 2,
            buff: 1.2,
            possui: false,
        },
        {
            id: 'fellersDiscount',
            name: 'Feller\'s Discount',
            descricao: '-20% no custo do machado',
            tipoDeRecurso: 'axe',
            afeta: 'custoCoins',
            sinal: 'x',
            pontosNecessários: 2,
            buff: 0.8,
            possui: false,
        },
        {
            id: 'moneyTree',
            name: 'Money Tree',
            descricao: '1% de chance de encontrar 200 Coins ao cortar árvores.',
            tipoDeRecurso: 'wood',
            afeta: 'coinsEncontradas',
            sinal: '+',
            pontosNecessários: 2,
            buff: 2,
            possui: false,
        }
    ],
    tier3: [
        {
            id: 'treeTurnaround',
            name: 'Tree Turnaround',
            descricao: '15% de chance para que as árvores cresçam instantaneamente.',
            tipoDeRecurso: 'wood axe',
            afeta: 'instantaneo',
            sinal: 'x',
            pontosNecessários: 3,
            buff: 1.15,
            possui: false,
        },
        {
            id: 'treeBlitz',
            name: 'Tree Blitz',
            descricao: 'Fazer todas as árvores crescerem instantaneamente (1 vez a cada 24 horas).',
            tipoDeRecurso: 'wood',
            afeta: '',
            sinal: '',
            pontosNecessários: 3,
            buff: 1,
            possui: false,
        }
    ]
};
let todasSkillsDeTrees = [].concat(skillsTrees.tierLegacy, skillsTrees.tier1, skillsTrees.tier2, skillsTrees.tier3);

//=============================================================================================================================================================================

let skillsMinerals = {
    tierLegacy: [
        {
            id: 'prospector',
            name: 'Prospector',
            descricao: '+20% Stone',
            tipoDeRecurso: 'stone',
            afeta: 'quantidade',
            sinal: 'x',
            buff: 1.2,
            possui: false
        },
        {
            id: 'goldRush',
            name: 'Gold Rush',
            descricao: '+50% Gold',
            tipoDeRecurso: 'gold',
            afeta: 'quantidade',
            sinal: 'x',
            buff: 1.5,
            possui: false
        },
    ],
    tier1: [
        {
            id: 'rockNRoll',
            name: 'Rock\'N\'Roll',
            descricao: '+0.1 Stone Yield',
            tipoDeRecurso: 'stone',
            afeta: 'quantidade',
            sinal: '+',
            pontosNecessários: 1,
            buff: 0.1,
            possui: false,
        },
        {
            id: 'ironBumpkin',
            name: 'Iron Bumpkin',
            descricao: '+0.1 Iron Yield',
            tipoDeRecurso: 'iron',
            afeta: 'quantidade',
            sinal: '+',
            pontosNecessários: 1,
            buff: 0.1,
            possui: false,
        },
        {
            id: 'speedMiner',
            name: 'Speed Miner',
            descricao: '-20% no tempo de recuperação das pedras.',
            tipoDeRecurso: 'stone',
            afeta: 'tempo',
            sinal: 'x',
            pontosNecessários: 1,
            buff: 0.8,
            possui: false,
        },
        {
            id: 'tapProspector',
            name: 'Tap Prospector',
            descricao: '1 toque em pequenos minerais (pedra, ferro, ouro)',
            tipoDeRecurso: 'stone iron gold',
            afeta: '',
            sinal: '',
            pontosNecessários: 1,
            buff: 1,
            possui: false,
        },
        {
            id: 'forgeWardProfits',
            name: 'Forge-Ward Profits',
            descricao: '+20% na receita nas entregas do Ferreiro.',
            tipoDeRecurso: 'delivery',
            afeta: 'delivery',
            sinal: 'x',
            pontosNecessários: 1,
            buff: 1.2,
            possui: false,
        },
    ],
    tier2: [
        {
            id: 'ironHustle',
            name: 'Iron Hustle',
            descricao: '-30% no tempo de recuperação de ferro.',
            tipoDeRecurso: 'iron',
            afeta: 'tempo',
            sinal: 'x',
            pontosNecessários: 2,
            buff: 0.7,
            possui: false,
        },
        {
            id: 'frugalMiner',
            name: 'Frugal Miner',
            descricao: '-20% de custo em coin da picareta.',
            tipoDeRecurso: ['pickaxe', 'stonePickaxe', 'ironPickaxe', 'goldPickaxe'],
            afeta: 'custoCoins',
            sinal: 'x',
            pontosNecessários: 2,
            buff: 0.8,
            possui: false,
        },
        {
            id: 'rockyFavor',
            name: 'Rocky Favor',
            descricao: '+1 no rendimento de pedras, -0,5 no rendimento de ferro.',
            tipoDeRecurso: 'stone',
            afeta: 'quantidade',
            sinal: '+',
            pontosNecessários: 2,
            buff: 1,
            possui: false,
            recursoReduzido: 'iron',
            deBuff: 0.5,
        },
        {
            id: 'fireKissed',
            name: 'Fire Kissed',
            descricao: '+1 no rendimento de Crimstone no 5º dia consecutivo.',
            tipoDeRecurso: ['crimstone'],
            afeta: 'quantidade',
            sinal: '+',
            pontosNecessários: 2,
            buff: 0.2,
            possui: false,
        },
        {
            id: 'midasSprint',
            name: 'Midas Sprint',
            descricao: '-10% no tempo de recuperação do ouro.',
            tipoDeRecurso: 'gold',
            afeta: 'tempo',
            sinal: 'x',
            pontosNecessários: 2,
            buff: 0.9,
            possui: false,
        }
    ],
    tier3: [
        {
            id: 'ferrousFavor',
            name: 'Ferrous Favor',
            descricao: '+1 no rendimento de ferro, -0,5 no rendimento de pedras.',
            tipoDeRecurso: 'iron',
            afeta: 'quantidade',
            sinal: '+',
            pontosNecessários: 3,
            buff: 1,
            possui: false,
            recursoReduzido: 'stone',
            deBuff: 0.5,
        },
        {
            id: 'goldenTouch',
            name: 'Golden Touch',
            descricao: '+0.5 Gold Yield',
            tipoDeRecurso: 'gold',
            afeta: 'quantidade',
            sinal: '+',
            pontosNecessários: 3,
            buff: 0.5,
            possui: false,
        },
        {
            id: 'morePicks',
            name: 'More Picks',
            descricao: 'Estoque aumentado: +70 Pickaxe, +20 Stone Pickaxe, +7 Iron Pickaxe.',
            tipoDeRecurso: ['pickaxe', 'stonePickaxe', 'ironPickaxe'],
            afeta: 'estoque',
            sinal: '+',
            pontosNecessários: 3,
            buff: {
                pickaxe: 70,
                stonePickaxe: 20,
                ironPickaxe: 7
            },
            possui: false,
        },
        {
            id: 'firesideAlchemist',
            name: 'Fireside Alchemist',
            descricao: '-15% no tempo de recuperação de Crimstone.',
            tipoDeRecurso: ['crimstone'],
            afeta: 'tempo',
            sinal: 'x',
            pontosNecessários: 3,
            buff: 0.85,
            possui: false,
        },
        {
            id: 'midasRush',
            name: 'Midas Rush',
            descricao: '-20% no tempo de recuperação do ouro.',
            tipoDeRecurso: 'gold',
            afeta: 'tempo',
            sinal: 'x',
            pontosNecessários: 3,
            buff: 0.8,
            possui: false,
        }
    ]
};
let todasSkillsDeMinerals = [].concat(skillsMinerals.tierLegacy, skillsMinerals.tier1, skillsMinerals.tier2, skillsMinerals.tier3);

//=============================================================================================================================================================================

let skillsMachinery = {
    tier1: [
        {
            id: 'cropExtensionModuleI',
            name: 'Crop Extension Module I',
            descricao: 'Permitir que sementes de Rhubarb e Zucchini sejam usadas na CM.',
            tipoDeRecurso: ['Rhubarb', 'Zucchini'],
            afeta: 'permissao',
            sinal: '',
            pontosNecessários: 1,
            buff: '',
            possui: false,
        },
        {
            id: 'cropProcessorUnit',
            name: 'Crop Processor Unit',
            descricao: '-5% no tempo de crescimento da CM, +10% no consumo de Oil.',
            tipoDeRecurso: 'CM',
            afeta: ['tempo', 'consumo'],
            sinal: 'x',
            pontosNecessários: 1,
            buff:{
                tempo: 0.95,
                consumo: 1.1
            },
            possui: false,
        },
        {
            id: 'oilGadget',
            name: 'Oil Gadget',
            descricao: '-10% no consumo de Oil.',
            tipoDeRecurso: 'CM',
            afeta: 'consumo',
            sinal: 'x',
            pontosNecessários: 1,
            buff: 0.9,
            possui: false,
        },
        {
            id: 'oilExtraction',
            name: 'Oil Extraction',
            descricao: '+1 Oil ao coletar das reservas.',
            tipoDeRecurso: 'oil',
            afeta: 'quantidade',
            sinal: '+',
            pontosNecessários: 1,
            buff: 1,
            possui: false,
        },
        {
            id: 'leakProofTank',
            name: 'Leak-Proof Tank',
            descricao: 'Triplica a capacidade do tanque de Oil da Crop Machine',
            tipoDeRecurso: 'CM',
            afeta: '',
            sinal: 'x',
            pontosNecessários: 1,
            buff: '',
            possui: false,
        }
    ],
    tier2: [
        {
            id: 'cropExtensionModuleII',
            name: 'Crop Extension Module II',
            descricao: 'Permitir que sementes de Cenoura e Repolho sejam usadas na CM.',
            tipoDeRecurso: ['Carrot', 'Cabbage'],
            afeta: 'permissao',
            sinal: '',
            pontosNecessários: 2,
            buff: '',
            possui: false,
        },
        {
            id: 'cropExtensionModuleIII',
            name: 'Crop Extension Module III',
            descricao: 'Permitir que sementes de Yam e Brocolli sejam usadas na CM.',
            tipoDeRecurso: ['Yam', 'Brocolli'],
            afeta: 'permissao',
            sinal: '',
            pontosNecessários: 2,
            buff: '',
            possui: false,
        },
        {
            id: 'rapidRig',
            name: 'Rapid Rig',
            descricao: '-20% no tempo de crescimento da CM, +40% no consumo de Oil.',
            tipoDeRecurso: 'CM',
            afeta: ['tempo', 'consumo'],
            sinal: 'x',
            pontosNecessários: 2,
            buff: {
                tempo: 0.8,
                consumo: 1.4
            },
            possui: false,
        },
        {
            id: 'oilBeBack',
            name: 'Oil Be Back',
            descricao: '-20% no tempo de reabastecimento do Oil.',
            tipoDeRecurso: 'oil',
            afeta: 'tempo',
            sinal: 'x',
            pontosNecessários: 2,
            buff: 0.8,
            possui: false,
        },
        {
            id: 'oilRig',
            name: 'Oil Rig',
            descricao: 'A broca de petróleo requer 20 lãs em vez de couro para ser fabricada',
            tipoDeRecurso: 'oilDrill',
            afeta: 'trocaDeRecurso',
            sinal: '',
            pontosNecessários: 2,
            buff: '',
            possui: false,
        }
    ],
    tier3: [
        {
            id: 'fieldExpansionModule',
            name: 'Field Expansion Module',
            descricao: '+5 pacotes adicionados à máquina.',
            tipoDeRecurso: 'CM',
            afeta: 'pacotes',
            sinal: '+',
            pontosNecessários: 3,
            buff: 5,
            possui: false,
        },
        {
            id: 'fieldExtensionModule',
            name: 'Field Extension Module',
            descricao: '+5 plots adicionados à máquina.',
            tipoDeRecurso: 'CM',
            afeta: 'plots',
            sinal: '+',
            pontosNecessários: 3,
            buff: 5,
            possui: false,
        },
        {
            id: 'efficiencyExtensionModule',
            name: 'Efficiency Extension Module',
            descricao: '-30% no consumo de Oil.',
            tipoDeRecurso: 'CM',
            afeta: 'consumo',
            sinal: 'x',
            pontosNecessários: 3,
            buff: 0.7,
            possui: false,
        },
        {
            id: 'greaseLightning',
            name: 'Grease Lightning',
            descricao: 'Fazer poços de Oil vazios se reabastecerem instantaneamente (1/96h).',
            tipoDeRecurso: 'oil',
            afeta: '',
            sinal: '',
            pontosNecessários: 3,
            buff: '',
            possui: false,
        },
    ]
};

let todasSkillsMachinery = [].concat(skillsMachinery.tier1, skillsMachinery.tier2, skillsMachinery.tier3);

let mapaDeSkillsMachinery = {};
todasSkillsMachinery.forEach(skills => { 
    mapaDeSkillsMachinery[skills.id] = skills;
});
console.log(mapaDeSkillsMachinery);
//=============================================================================================================================================================================

//Juntas toda arvore de skill para que ao criar as checkbox seja mais rapido e menor o codigo!
let todasSkillsLegacy = [].concat(skillsCrops.tierLegacy, skillsTrees.tierLegacy ,skillsMinerals.tierLegacy);
let todasSkillsComTier = [].concat(skillsCrops.tier1, skillsCrops.tier2, skillsCrops.tier3, skillsTrees.tier1, skillsTrees.tier2, skillsTrees.tier3, skillsMinerals.tier1, skillsMinerals.tier2, skillsMinerals.tier3, skillsMachinery.tier1, skillsMachinery.tier2, skillsMachinery.tier3);
