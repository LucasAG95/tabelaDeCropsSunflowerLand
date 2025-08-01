let skillCrops = [
    //Skills - Legacy
    {
        id: 'greenThumb',
        nome: 'Green Thumb',
        descricao: '+5% de coins ao vender colheitas (Loja de Sementes)',
        cropAfetada: 'todas',
        afeta: 'coins',
        sinal: 'x',
        custo: 'Legacy',
        buff: 1.05,
        possui: false
    },
    {
        id: 'seedSpecialist',
        nome: 'Seed Specialist',
        descricao: '-10% no tempo das Crops',
        cropAfetada: 'todas',
        afeta: 'tempo',
        sinal: 'x',
        custo: 'Legacy',
        buff: 0.9,
        possui: false
    },
    {
        id: 'coder',
        nome: 'Coder',
        descricao: '+20% na colheita de Crops',
        cropAfetada: 'todas',
        afeta: 'quantidade',
        sinal: 'x',
        custo: 'Legacy',
        buff: 1.2,
        possui: false
    },
    //Skills - Tier 1
    {
        id: 'greenThumb2',
        nome: 'Green Thumb',
        descricao: '-5% no tempo das Crops',
        cropAfetada: 'todas',
        afeta: 'tempo',
        sinal: 'x',
        custo: 1,
        buff: 0.95,
        possui: false
    },
    {
        id: 'youngFarmer',
        nome: 'Young Farmer',
        descricao: '+0.1 Basic Crop Yield',
        cropAfetada: 'basic',
        afeta: 'quantidade',
        sinal: '+',
        custo: 1,
        buff: 0.1,
        possui: false
    },
    {
        id: 'experiencedFarmer',
        nome: 'Experienced Farmer',
        descricao: '+0.1 Medium Crop Yield',
        cropAfetada: 'medium',
        afeta: 'quantidade',
        sinal: '+',
        custo: 1,
        buff: 0.1,
        possui: false
    },
    {
        id: 'oldFarmer',
        nome: 'Old Farmer',
        descricao: '+0.1 Advanced Crop Yield',
        cropAfetada: 'advanced',
        afeta: 'quantidade',
        sinal: '+',
        custo: 1,
        buff: 0.1,
        possui: false
    },
    {
        id: 'bettysFriend',
        nome: 'Betty\'s Friend',
        descricao: 'Delivery da \'Betty\' Coin aumentou 30%',
        cropAfetada: 'todas',
        afeta: 'delivery',
        sinal: 'x',
        custo: 1,
        buff: 1.3,
        possui: false
    },
    {
        id: 'chonkyScarecrow',
        nome: 'Chonky Scarecrow',
        descricao: 'Basic Scarecrow AOE aumenta o tamanho para 7x7',
        cropAfetada: 'NFT',
        afeta: 'quantidade',
        sinal: '+',
        custo: 1,
        buff: 49,
        possui: false
    },
    //Skills - Tier 2
    {
        id: 'strongRoots',
        nome: 'Strong Roots',
        descricao: '10% de redução no tempo das Advanced Crops',
        cropAfetada: 'advanced',
        afeta: 'tempo',
        sinal: 'x',
        custo: 2,
        buff: 0.9,
        possui: false
    },
    {
        id: 'coinSwindler',
        nome: 'Coin Swindler',
        descricao: '+10% de coins ao vender colheitas (Loja de Sementes)',
        cropAfetada: 'todas',
        afeta: 'coins',
        sinal: 'x',
        custo: 2,
        buff: 1.1,
        possui: false
    },
    {
        id: 'goldenSunflower',
        nome: 'Golden Sunflower',
        descricao: '1/700 de obter +0,35 gold ao colher sunflowers manualmente',
        cropAfetada: 'Sunflower',
        afeta: 'gold',
        sinal: '+',
        custo: 2,
        buff: 1.35 / 700 * 0.35,
        possui: false
    },
    {
        id: 'horrorMike',
        nome: 'Horror Mike',
        descricao: 'Scary Mike AOE aumenta o tamanho para 7x7 (Crops Médias)',
        cropAfetada: 'NFT',
        afeta: 'quantidade',
        sinal: '+',
        custo: 2,
        buff: 49,
        possui: false
    },
    {
        id: 'lauriesGains',
        nome: 'Laurie\'s Gains',
        descricao: 'Laurie Crow AOE aumenta o tamanho para 7x7 (Crops Avançadas)',
        cropAfetada: 'NFT',
        afeta: 'quantidade',
        sinal: '+',
        custo: 2,
        buff: 49,
        possui: false
    },
    // Skills - Tier 3
    {
        id: 'acreFarm',
        nome: 'Acre Farm',
        descricao: '+1 Advanced crop yeild, -0.5 Basic and Medium crop yield',
        cropAfetada: 'advanced',
        afeta: 'quantidade',
        sinal: '+',
        custo: 3,
        buff: 1,
        cropReduzida: 'basic medium',
        deBuff: 0.5,
        possui: false
    },
    {
        id: 'hectareFarm',
        nome: 'Hectare Farm',
        descricao: '+1 Basic and Medium crop yield, -0.5 Advanced crop yield',
        cropAfetada: 'basic medium',
        afeta: 'quantidade',
        sinal: '+',
        custo: 3,
        buff: 1,
        cropReduzida: 'advanced',
        deBuff: 0.5,
        possui: false
    },
    {
        id: 'instantGrowth',
        nome: 'Instant Growth',
        descricao: 'Capacidade de deixar todas Crops prontas para serem colhidas (1/72h)',
        cropAfetada: 'DESATIVADO',
        afeta: 'quantidade',
        sinal: '+',
        custo: 3,
        buff: '',
        possui: false
    }
];