let collectiblesCrops = [
    //NFTs feitos no ferreiro
    {
        id: 'warehouse',
        name: 'Warehouse',
        descricao: '+20% de Sementes no stock',
        estacao: 'todas',
        tipoDeCrop: 'todas',
        afeta: 'estoque',
        sinal: 'x',
        buff: 1.2,
        possui: false
    },
    {
        id: 'basicScarecrow', //este nft ainda terá q ser visto
        name: 'Basic Scarecrow',
        descricao: '-20% no tempo de Crops Basicas - Efeito em 9 Plots',
        estacao: 'todas',
        tipoDeCrop: 'basic',
        afeta: 'areaTemp',
        sinal: 'x',
        buffBase: 0.8,
        condicionalSkill: {
            dependeDe: 'chonkyScarecrow',
            novoBuff: 0.7,
        },
        buff: 0.8,
        possui: false
    },
    {
        id: 'scaryMike',
        name: 'Scary Mike',
        descricao: '+0.2 Medium Crops - Efeito em 9 Plots',
        estacao: 'todas',
        tipoDeCrop: 'medium',
        afeta: 'areaQtd',
        sinal: '+',
        buffBase: 0.2 * 9,
        condicionalSkill: {
            dependeDe: 'horrorMike',
            novoBuff: 0.3 * 49
        },
        buff: 0.2 * 9 ,
        possui: false
    },
    {
        id: 'laurieTheChuckleCrow',
        name: 'Laurie the Chuckle Crow',
        descricao: '+0.2 Advanced Crops - Efeito em 9 Plots',
        estacao: 'todas',
        tipoDeCrop: 'advanced',
        afeta: 'areaQtd',
        sinal: '+',
        buffBase: 0.2 * 9,
        condicionalSkill: {
            dependeDe: 'lauriesGains',
            novoBuff: 0.3 * 49
        },
        buff: 0.2 * 9,
        possui: false
    },
    //Collectibles - Crops
    {
        id: 'nancy',
        name: 'Nancy',
        descricao: '-15% no tempo das Crops',
        estacao: 'todas',
        tipoDeCrop: 'todas',
        afeta: 'tempo',
        sinal: 'x',
        buff: 0.85,
        possui: false
    },
    {
        id: 'scarecrow',
        name: 'Scarecrow',
        descricao: '-15% no tempo das Crops, +20% Crops',
        estacao: 'todas',
        tipoDeCrop: 'todas',
        afeta: 'quantidade',
        sinal: 'x',
        buff: 1.2,
        possui: false,
    },
    {
        id: 'kuebiko',
        name: 'Kuebiko',
        descricao: '-15% no tempo das Crops, +20% Crops e Sementes Grátis',
        estacao: 'todas',
        tipoDeCrop: 'todas',
        afeta: 'custoCoins',
        sinal: 'x',
        buff: 0,
        possui: false,
    },
    {
        id: 'springGuardian', 
        name: 'Spring Guardian',
        descricao: 'Proteção contra Desastres de Primavera, Eventos de Primavera Abençoados',
        estacao: 'Spring',
        tipoDeCrop: 'todas',
        afeta: 'melhorarEvento',
        sinal: 'x',
        buff: 2,
        possui: false
    },
    {
        id: 'summerGuardian', 
        name: 'Summer Guardian',
        descricao: 'Proteção contra Desastres de Verão, Eventos de Verão Abençoados',
        estacao: 'Summer',
        tipoDeCrop: 'todas',
        afeta: 'melhorarEvento',
        sinal: 'x',
        buff: 2,
        possui: false
    },
    {
        id: 'autumnGuardian', 
        name: 'Autumn Guardian',
        descricao: 'Proteção contra Desastres de Outono, Eventos de Outono Abençoados',
        estacao: 'Autumn',
        tipoDeCrop: 'todas',
        afeta: 'melhorarEvento',
        sinal: 'x',
        buff: 2,
        possui: false
    },
    {
        id: 'winterGuardian', 
        name: 'Winter Guardian',
        descricao: 'Proteção contra Desastres de Inverno, Eventos de Inverno Abençoados',
        estacao: 'Winter',
        tipoDeCrop: 'todas',
        afeta: 'melhorarEvento',
        sinal: 'x',
        buff: 2,
        possui: false
    },
    {
        id: 'lunarCalendar',
        name: 'Lunar Calendar',
        descricao: '10% no tempo das Crops',
        estacao: 'todas',
        tipoDeCrop: 'todas',
        afeta: 'tempo',
        sinal: 'x',
        buff: 0.9,
        possui: false
    },
    {
        id: 'gnome',
        name: 'Gnome',
        descricao: '+10 Medium ou Advanced Crops - Efeito em 1 Plot',
        estacao: 'todas',
        tipoDeCrop: 'medium / advanced',
        afeta: 'areaQtd',
        sinal: '+',
        buff: 10,
        possui: false
    },
    {
        id: 'sirGoldensnout',
        name: 'Sir Goldensnout',
        descricao: '+0.5 Crops - Efeito em 12 Plots',
        estacao: 'todas',
        tipoDeCrop: 'todas',
        afeta: 'areaQtd',
        sinal: '+',
        buff: 0.5 * 12,
        possui: false
    },
    {
        id: 'stellarSunflower',
        name: 'Stellar Sunflower',
        descricao: '3% de chance em obter +10 Sunflowers',
        estacao: 'todas',
        tipoDeCrop: 'Sunflower',
        afeta: 'quantidade',
        sinal: '+',
        buff: 3/100*10,
        possui: false
    },
    {
        id: 'peeledPotato',
        name: 'Peeled Potato',
        descricao: '20% de chance em obter +1 Potato',
        estacao: 'todas',
        tipoDeCrop: 'Potato',
        afeta: 'quantidade',
        sinal: '+',
        buff: 20/100,
        possui: false
    },
    {
        id: 'potentPotato',
        name: 'Potent Potato',
        descricao: '3% de chance em obter +10 Potatos',
        estacao: 'todas',
        tipoDeCrop: 'Potato',
        afeta: 'quantidade',
        sinal: '+',
        buff: 3/100*10,
        possui: false
    },
    {
        id: 'victoriaSisters',
        name: 'Victoria Sisters',
        descricao: '+20% Pumpkins',
        estacao: 'todas',
        tipoDeCrop: 'Pumpkin',
        afeta: 'quantidade',
        sinal: 'x',
        buff: 1.2,
        possui: false
    },
    {
        id: 'labGrownPumpkin',
        name: 'Lab Grown Pumpkin',
        descricao: '+0,3 Pumpkins',
        estacao: 'todas',
        tipoDeCrop: 'Pumpkin',
        afeta: 'quantidade',
        sinal: '+',
        buff: 0.3,
        possui: false
    },
    {
        id: 'freyaFox',
        name: 'Freya Fox',
        descricao: '+0.5 Pumpkins',
        estacao: 'todas',
        tipoDeCrop: 'Pumpkin',
        afeta: 'quantidade',
        sinal: '+',
        buff: 0.5,
        possui: false
    },
    {
        id: 'giantZucchini',
        name: 'Giant Zucchini',
        descricao: 'Zucchini cresce 2x mais rápido',
        estacao: 'todas',
        tipoDeCrop: 'Zucchini',
        afeta: 'tempo',
        sinal: 'x',
        buff: 0.5,
        possui: false
    },
    {
        id: 'easterBunny',
        name: 'Easter Bunny',
        descricao: '+20% Carrots',
        estacao: 'todas',
        tipoDeCrop: 'Carrot',
        afeta: 'quantidade',
        sinal: 'x',
        buff: 1.2,
        possui: false
    },
    {
        id: 'pabloTheBunny',
        name: 'Pablo The Bunny',
        descricao: '+0.1 Carrot',
        estacao: 'todas',
        tipoDeCrop: 'Carrot',
        afeta: 'quantidade',
        sinal: '+',
        buff: 0.1,
        possui: false
    },
    {
        id: 'labGrownCarrot',
        name: 'Lab Grown Carrot',
        descricao: '+0,2 Carrots',
        estacao: 'todas',
        tipoDeCrop: 'Carrot',
        afeta: 'quantidade',
        sinal: '+',
        buff: 0.2,
        possui: false
    },
    {
        id: 'giantYam',
        name: 'Giant Yam',
        descricao: '+0.5 Yams',
        estacao: 'todas',
        tipoDeCrop: 'Yam',
        afeta: 'quantidade',
        sinal: '+',
        buff: 0.5,
        possui: false
    },
    {
        id: 'karkinos',
        name: 'Karkinos',
        descricao: '+0.1 Cabbage (Não funciona com Cabbage Boy)',
        estacao: 'todas',
        tipoDeCrop: 'Cabbage',
        afeta: 'quantidade',
        sinal: '+',
        buffBase: 0.1,
        condicional: {
            dependeDe: 'cabbageBoy',
            novoBuff: 0
        },
        buff: 0.1,
        possui: false
    },
    {
        id: 'cabbageBoy',
        name: 'Cabbage Boy',
        descricao: '+0.25 Cabbage ou +0.5 Cabbage possuindo Cabbage Girl',
        estacao: 'todas',
        tipoDeCrop: 'Cabbage',
        afeta: 'quantidade',
        sinal: '+',
        buffBase: 0.25,
        condicional: {
            dependeDe: 'cabbageGirl',
            novoBuff: 0.5
        },
        buff: 0.25,
        possui: false
    },
    {
        id: 'cabbageGirl',
        name: 'Cabbage Girl',
        descricao: '-50% no tempo das Cabbages',
        estacao: 'todas',
        tipoDeCrop: 'Cabbage',
        afeta: 'tempo',
        sinal: 'x',
        buff: 0.5,
        possui: false
    },
    {
        id: 'soybliss',
        name: 'Soybliss',
        descricao: '+1 Soybean',
        estacao: 'todas',
        tipoDeCrop: 'Soybean',
        afeta: 'quantidade',
        sinal: '+',
        buff: 1,
        possui: false
    },
    {
        id: 'goldenCauliflower',
        name: 'Golden Cauliflower',
        descricao: '+100% Cauliflower',
        estacao: 'todas',
        tipoDeCrop: 'Cauliflower',
        afeta: 'quantidade',
        sinal: 'x',
        buff: 2,
        possui: false
    },
    {
        id: 'mysteriousParsnip',
        name: 'Mysterious Parsnip',
        descricao: '-50% no tempo das Parsnips',
        estacao: 'todas',
        tipoDeCrop: 'Parsnip',
        afeta: 'tempo',
        sinal: 'x',
        buff: 0.5,
        possui: false
    },
    {
        id: 'purpleTrail',
        name: 'Purple Trail',
        descricao: '+0.2 Eggplant',
        estacao: 'todas',
        tipoDeCrop: 'Eggplant',
        afeta: 'quantidade',
        sinal: '+',
        buff: 0.2,
        possui: false
    },
    {
        id: 'obie',
        name: 'Obie',
        descricao: '-25% no tempo das Eggplants',
        estacao: 'todas',
        tipoDeCrop: 'Eggplant',
        afeta: 'tempo',
        sinal: 'x',
        buff: 0.75,
        possui: false
    },
    {
        id: 'maximus',
        name: 'Maximus',
        descricao: '+1 Eggplant',
        estacao: 'todas',
        tipoDeCrop: 'Eggplant',
        afeta: 'quantidade',
        sinal: '+',
        buff: 1,
        possui: false
    },
    {
        id: 'poppy',
        name: 'Poppy',
        descricao: '+0.1 Corn',
        estacao: 'todas',
        tipoDeCrop: 'Corn',
        afeta: 'quantidade',
        sinal: '+',
        buff: 0.1,
        possui: false
    },
    {
        id: 'queenCornelia',
        name: 'Queen Cornelia',
        descricao: '+1 Corn - Efeito em 10 Plots',
        estacao: 'todas',
        tipoDeCrop: 'Corn',
        afeta: 'areaQtd',
        sinal: '+',
        buff: 1 * 10,
        possui: false
    },
    {
        id: 'kernaldo',
        name: 'Kernaldo',
        descricao: '-25% no tempo do Corn',
        estacao: 'todas',
        tipoDeCrop: 'Corn',
        afeta: 'tempo',
        sinal: 'x',
        buff: 0.75,
        possui: false
    },
    {
        id: 'hoot',
        name: 'Hoot',
        descricao: '+0.5 Radish, Wheat, Kale, Rice e Barley',
        estacao: 'todas',
        tipoDeCrop: 'Radish, Wheat, Kale, Rice, Barley',
        afeta: 'quantidade',
        sinal: '+',
        buff: 0.5,
        possui: false
    },
    {
        id: 'radicalRadish',
        name: 'Radical Radish',
        descricao: '3% de chance em obter +10 Radishes',
        estacao: 'todas',
        tipoDeCrop: 'Radish',
        afeta: 'quantidade',
        sinal: '+',
        buff: 3/100*10,
        possui: false
    },
    {
        id: 'labGrownRadish',
        name: 'Lab Grown Radish',
        descricao: '+0,4 Radishes',
        estacao: 'todas',
        tipoDeCrop: 'Radish',
        afeta: 'quantidade',
        sinal: '+',
        buff: 0.4,
        possui: false
    },
    {
        id: 'foliant',
        name: 'Foliant',
        descricao: '+0.2 Kale',
        estacao: 'todas',
        tipoDeCrop: 'Kale',
        afeta: 'quantidade',
        sinal: '+',
        buff: 0.2,
        possui: false
    },
    {
        id: 'giantKale',
        name: 'Giant Kale',
        descricao: '+2 Kale',
        estacao: 'todas',
        tipoDeCrop: 'Kale',
        afeta: 'quantidade',
        sinal: '+',
        buff: 2,
        possui: false
    },
    {
        id: 'sheafOfPlenty',
        name: 'Sheaf of Plenty',
        descricao: '+2 Barley',
        estacao: 'todas',
        tipoDeCrop: 'Barley',
        afeta: 'quantidade',
        sinal: '+',
        buff: 2,
        possui: false
    }
];
  
let wearablesCrops = [
    {
        id: 'greenAmulet',
        name: 'Green Amulet',
        descricao: 'Chance de colher 10x mais crops',
        estacao: 'todas',
        tipoDeCrop: 'todas',
        afeta: 'quantidade',
        sinal: 'x',
        buff: 1.9,
        possui: false
    },
    {
        id: 'infernalPitchfork',
        name: 'Infernal Pitchfork',
        descricao: '+3 Crops',
        estacao: 'todas',
        tipoDeCrop: 'todas',
        afeta: 'quantidade',
        sinal: '+',
        buff: 3,
        possui: false
    },
    {
        id: 'devilOrAngelWings',
        name: 'Devil Wings',
        name2: 'Angel Wings',
        descricao: '30% de chance em colher crop instantaneamente',
        estacao: 'todas',
        tipoDeCrop: 'todas',
        afeta: 'instantaneo e custoCoins',
        sinal: 'x',
        buff: 1.4, //1.3 é a base, mas dps vai plantar de novo, esse 1.4 deve ser adicionado aos custos de sementes tbm
        possui: false
    },
    {
        id: 'blossomWard', 
        name: 'Blossom Ward',
        descricao: '+1 Crop por plot na Primavera',
        estacao: 'Spring',
        tipoDeCrop: 'todas',
        afeta: 'quantidade',
        sinal: '+',
        buff: 1,
        possui: false
    },
    {
        id: 'solflareAegis', 
        name: 'Solflare Aegis',
        descricao: '-50% no tempo das Crops no Verão',
        estacao: 'Summer',
        tipoDeCrop: 'todas',
        afeta: 'tempo',
        sinal: 'x',
        buff: 0.5,
        possui: false
    },
    {
        id: 'autumnsEmbrace', 
        name: 'Autumn\'s Embrace',
        descricao: '-50% no tempo das Crops no Outono',
        estacao: 'Autumn',
        tipoDeCrop: 'todas',
        afeta: 'tempo',
        sinal: 'x',
        buff: 0.5,
        possui: false
    },
    {
        id: 'frozenHeart', 
        name: 'Frozen Heart',
        descricao: '+1 Crop por plot no Inverno',
        estacao: 'Winter',
        tipoDeCrop: 'todas',
        afeta: 'quantidade',
        sinal: '+',
        buff: 1,
        possui: false
    },
    {
        id: 'sunflowerShield',
        name: 'Sunflower Shield',
        descricao: 'Sementes de girassol Grátis',
        estacao: 'todas',
        tipoDeCrop: 'Sunflower',
        afeta: 'custoCoins',
        sinal: 'x',
        buff: 0,
        possui: false
    },
    {
        id: 'sunflowerAmulet',
        name: 'Sunflower Amulet',
        descricao: '+10% Sunflower',
        estacao: 'todas',
        tipoDeCrop: 'Sunflower',
        afeta: 'quantidade',
        sinal: 'x',
        buff: 1.1,
        possui: false
    },
    {
        id: 'carrotAmulet',
        name: 'Carrot Amulet',
        descricao: '-20% no tempo de crescimento da Cenoura',
        estacao: 'todas',
        tipoDeCrop: 'Carrot',
        afeta: 'tempo',
        sinal: 'x',
        buff: 0.8,
        possui: false
    },
    {
        id: 'broccoliHat',
        name: 'Broccoli Hat',
        descricao: 'Broccoli cresce 2x mais rápido',
        estacao: 'todas',
        tipoDeCrop: 'Broccoli',
        afeta: 'tempo',
        sinal: 'x',
        buff: 0.5,
        possui: false
    },
    {
        id: 'tofuMask',
        name: 'Tofu Mask',
        descricao: '+0.1 Soybean',
        estacao: 'todas',
        tipoDeCrop: 'Soybean',
        afeta: 'quantidade',
        sinal: '+',
        buff: 0.1,
        possui: false
    },
    {
        id: 'beetrootAmulet',
        name: 'Beetroot Amulet',
        descricao: '+20% Beetroot',
        estacao: 'todas',
        tipoDeCrop: 'Beetroot',
        afeta: 'quantidade',
        sinal: 'x',
        buff: 1.2,
        possui: false
    },
    {
        id: 'redPepperOnesie',
        name: 'Red Pepper Onesie',
        descricao: '-25% no tempo de colheita da pimenta(Pepper)',
        estacao: 'todas',
        tipoDeCrop: 'Pepper',
        afeta: 'tempo',
        sinal: 'x',
        buff: 0.75,
        possui: false
    },
    {
        id: 'parsnip',
        name: 'Parsnip',
        descricao: '+20% Parsnip',
        estacao: 'todas',
        tipoDeCrop: 'Parsnip',
        afeta: 'quantidade',
        sinal: 'x',
        buff: 1.2,
        possui: false
    },
    {
        id: 'eggplantOnesie',
        name: 'Eggplant Onesie',
        descricao: '+0.1 Eggplant',
        estacao: 'todas',
        tipoDeCrop: 'Eggplant',
        afeta: 'quantidade',
        sinal: '+',
        buff: 0.1,
        possui: false
    },
    {
        id: 'cornOnesie',
        name: 'Corn Onesie',
        descricao: '+0.1 Corn',
        estacao: 'todas',
        tipoDeCrop: 'Corn',
        afeta: 'quantidade',
        sinal: '+',
        buff: 0.1,
        possui: false
    },
    {
        id: 'ladybugSuit',
        name: 'Ladybug Suit',
        descricao: '-25% do custo da Semente de Onion(Cebola) em Coins',
        estacao: 'todas',
        tipoDeCrop: 'Onion',
        afeta: 'custoCoins',
        sinal: 'x',
        buff: 0.75,
        possui: false
    },
    {
        id: 'sickle',
        name: 'Sickle',
        descricao: '+2 Wheat',
        estacao: 'todas',
        tipoDeCrop: 'Wheat',
        afeta: 'quantidade',
        sinal: '+',
        buff: 2,
        possui: false
    },
    {
        id: 'factionQuiver',
        name: '"Faction" Quiver',
        name1: 'Bumpkin Quiver',
        name2: 'Goblin Quiver',
        name3: 'Nightshade Quiver',
        name4: 'Sunflorian Quiver',
        descricao: '+0.25 Crops e Fruits',
        estacao: 'todas',
        tipoDeCrop: 'todas',
        afeta: 'quantidade',
        sinal: '+',
        buff: 0.25,
        possui: false
    }
];

// Ele vai servir como um "atalho" para encontrar qualquer NFT pelo seu id
let mapaDeCollectibles = {}; // cria objeto vazio para guardar NFTs por id
collectiblesCrops.forEach(collectibles => { //vai verificar e organizar por id das NFTs no mapaDeCollectibles, foi oque entendi
    mapaDeCollectibles[collectibles.id] = collectibles; // adiciona cada NFT no objeto usando o id como chave
});
console.log(mapaDeCollectibles)

let nftsDaTemporada = [
    {
        id: 'giantOnion',
        name: 'Giant Onion',
        descricao: '+3 Onions',
        estacao: 'todas',
        tipoDeCrop: 'Onion',
        afeta: 'quantidade',
        sinal: '+',
        buff: 3,
        possui: false 
    },
    {
        id: 'giantTurnip',
        name: 'Giant Turnip',
        descricao: '',
        estacao: 'todas',
        tipoDeCrop: '-50% no tempo de crescimento da Turnip',
        afeta: 'tempo',
        sinal: 'x',
        buff: 0.5,
        possui: false
    },
    {
        id: 'giantArtichoke',
        name: 'Giant Artichoke',
        descricao: '+2 Artichoke',
        estacao: 'todas',
        tipoDeCrop: 'Artichoke',
        afeta: 'quantidade',
        sinal: '+',
        buff: 2,
        possui: false
    }
];