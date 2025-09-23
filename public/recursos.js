const mostrarResultadoCrops = document.getElementById('saida');
const mostrarResultadoMinerals = document.getElementById('saidaMinerais')

//Lista de Crops Existentes no game - seus status principais- o tempo de crescimento esta em milissegundos
const crops = [
    {name: 'Sunflower',   tempo: 60_000,      tempoFinal: 60_000,      custoDaSemente: 0.01, custoFinal: '', vendaDaCrop: 0.02, vendaFinal: '', vendaFlower: 0, estoqueDeSementes: 800, estoqueFinal: 800, quantidadePorPlot: 1, seedsPlantadas: '', tier: 'basic',    estacao: 'Spring, Summer'},
    {name: 'Potato',      tempo: 300_000,     tempoFinal: 300_000,     custoDaSemente: 0.1,  custoFinal: '', vendaDaCrop: 0.14, vendaFinal: '', vendaFlower: 0, estoqueDeSementes: 400, estoqueFinal: 400, quantidadePorPlot: 1, seedsPlantadas: '', tier: 'basic',    estacao: 'Summer, Autumn, Winter'},
    {name: 'Rhubarb',     tempo: 600_000,     tempoFinal: 600_000,     custoDaSemente: 0.15, custoFinal: '', vendaDaCrop: 0.24, vendaFinal: '', vendaFlower: 0, estoqueDeSementes: 400, estoqueFinal: 400, quantidadePorPlot: 1, seedsPlantadas: '', tier: 'basic',    estacao: 'Spring'},
    {name: 'Pumpkin',     tempo: 1_800_000,   tempoFinal: 1_800_000,   custoDaSemente: 0.2,  custoFinal: '', vendaDaCrop: 0.4,  vendaFinal: '', vendaFlower: 0, estoqueDeSementes: 300, estoqueFinal: 300, quantidadePorPlot: 1, seedsPlantadas: '', tier: 'basic',    estacao: 'Autumn'},
    {name: 'Zucchini',    tempo: 1_800_000,   tempoFinal: 1_800_000,   custoDaSemente: 0.2,  custoFinal: '', vendaDaCrop: 0.4,  vendaFinal: '', vendaFlower: 0, estoqueDeSementes: 400, estoqueFinal: 400, quantidadePorPlot: 1, seedsPlantadas: '', tier: 'basic',    estacao: 'Summer'},
    {name: 'Carrot',      tempo: 3_600_000,   tempoFinal: 3_600_000,   custoDaSemente: 0.5,  custoFinal: '', vendaDaCrop: 0.8,  vendaFinal: '', vendaFlower: 0, estoqueDeSementes: 200, estoqueFinal: 200, quantidadePorPlot: 1, seedsPlantadas: '', tier: 'medium',   estacao: 'Spring, Autumn'},
    {name: 'Yam',         tempo: 3_600_000,   tempoFinal: 3_600_000,   custoDaSemente: 0.5,  custoFinal: '', vendaDaCrop: 0.8,  vendaFinal: '', vendaFlower: 0, estoqueDeSementes: 180, estoqueFinal: 180, quantidadePorPlot: 1, seedsPlantadas: '', tier: 'medium',   estacao: 'Autumn'},
    {name: 'Cabbage',     tempo: 7_200_000,   tempoFinal: 7_200_000,   custoDaSemente: 1,    custoFinal: '', vendaDaCrop: 1.5,  vendaFinal: '', vendaFlower: 0, estoqueDeSementes: 180, estoqueFinal: 180, quantidadePorPlot: 1, seedsPlantadas: '', tier: 'medium',   estacao: 'Spring, Winter'},
    {name: 'Broccoli',    tempo: 7_200_000,   tempoFinal: 7_200_000,   custoDaSemente: 1,    custoFinal: '', vendaDaCrop: 1.5,  vendaFinal: '', vendaFlower: 0, estoqueDeSementes: 180, estoqueFinal: 180, quantidadePorPlot: 1, seedsPlantadas: '', tier: 'medium',   estacao: 'Autumn'},
    {name: 'Soybean',     tempo: 10_800_000,  tempoFinal: 10_800_000,  custoDaSemente: 1.5,  custoFinal: '', vendaDaCrop: 2.3,  vendaFinal: '', vendaFlower: 0, estoqueDeSementes: 180, estoqueFinal: 180, quantidadePorPlot: 1, seedsPlantadas: '', tier: 'medium',   estacao: 'Spring, Autumn'},
    {name: 'Pepper',      tempo: 14_400_000,  tempoFinal: 14_400_000,  custoDaSemente: 2,    custoFinal: '', vendaDaCrop: 3,    vendaFinal: '', vendaFlower: 0, estoqueDeSementes: 160, estoqueFinal: 160, quantidadePorPlot: 1, seedsPlantadas: '', tier: 'medium',   estacao: 'Summer'},
    {name: 'Beetroot',    tempo: 14_400_000,  tempoFinal: 14_400_000,  custoDaSemente: 2,    custoFinal: '', vendaDaCrop: 2.8,  vendaFinal: '', vendaFlower: 0, estoqueDeSementes: 160, estoqueFinal: 160, quantidadePorPlot: 1, seedsPlantadas: '', tier: 'medium',   estacao: 'Summer, Winter'},
    {name: 'Cauliflower', tempo: 28_800_000,  tempoFinal: 28_800_000,  custoDaSemente: 3,    custoFinal: '', vendaDaCrop: 4.25, vendaFinal: '', vendaFlower: 0, estoqueDeSementes: 160, estoqueFinal: 160, quantidadePorPlot: 1, seedsPlantadas: '', tier: 'medium',   estacao: 'Summer, Winter'},
    {name: 'Parsnip',     tempo: 43_200_000,  tempoFinal: 43_200_000,  custoDaSemente: 5,    custoFinal: '', vendaDaCrop: 6.5,  vendaFinal: '', vendaFlower: 0, estoqueDeSementes: 120, estoqueFinal: 120, quantidadePorPlot: 1, seedsPlantadas: '', tier: 'medium',   estacao: 'Winter'},
    {name: 'Eggplant',    tempo: 57_600_000,  tempoFinal: 57_600_000,  custoDaSemente: 6,    custoFinal: '', vendaDaCrop: 8,    vendaFinal: '', vendaFlower: 0, estoqueDeSementes: 100, estoqueFinal: 100, quantidadePorPlot: 1, seedsPlantadas: '', tier: 'advanced', estacao: 'Summer'},
    {name: 'Corn',        tempo: 72_000_000,  tempoFinal: 72_000_000,  custoDaSemente: 7,    custoFinal: '', vendaDaCrop: 9,    vendaFinal: '', vendaFlower: 0, estoqueDeSementes: 100, estoqueFinal: 100, quantidadePorPlot: 1, seedsPlantadas: '', tier: 'advanced', estacao: 'Spring'},
    {name: 'Onion',       tempo: 72_000_000,  tempoFinal: 72_000_000,  custoDaSemente: 7,    custoFinal: '', vendaDaCrop: 10,   vendaFinal: '', vendaFlower: 0, estoqueDeSementes: 100, estoqueFinal: 100, quantidadePorPlot: 1, seedsPlantadas: '', tier: 'advanced', estacao: 'Winter'},
    {name: 'Turnip',      tempo: 86_400_000,  tempoFinal: 86_400_000,  custoDaSemente: 5,    custoFinal: '', vendaDaCrop: 8,    vendaFinal: '', vendaFlower: 0, estoqueDeSementes: 80,  estoqueFinal: 80,  quantidadePorPlot: 1, seedsPlantadas: '', tier: 'advanced', estacao: 'Winter'},
    {name: 'Radish',      tempo: 86_400_000,  tempoFinal: 86_400_000,  custoDaSemente: 7,    custoFinal: '', vendaDaCrop: 9.5,  vendaFinal: '', vendaFlower: 0, estoqueDeSementes: 80,  estoqueFinal: 80,  quantidadePorPlot: 1, seedsPlantadas: '', tier: 'advanced', estacao: 'Summer'},
    {name: 'Wheat',       tempo: 86_400_000,  tempoFinal: 86_400_000,  custoDaSemente: 5,    custoFinal: '', vendaDaCrop: 7,    vendaFinal: '', vendaFlower: 0, estoqueDeSementes: 80,  estoqueFinal: 80,  quantidadePorPlot: 1, seedsPlantadas: '', tier: 'advanced', estacao: 'Spring, Summer, Autumn, Winter'},
    {name: 'Kale',        tempo: 129_600_000, tempoFinal: 129_600_000, custoDaSemente: 7,    custoFinal: '', vendaDaCrop: 10,   vendaFinal: '', vendaFlower: 0, estoqueDeSementes: 60,  estoqueFinal: 60,  quantidadePorPlot: 1, seedsPlantadas: '', tier: 'advanced', estacao: 'Spring, Winter'},
    {name: 'Artichoke',   tempo: 129_600_000, tempoFinal: 129_600_000, custoDaSemente: 7,    custoFinal: '', vendaDaCrop: 12,   vendaFinal: '', vendaFlower: 0, estoqueDeSementes: 60,  estoqueFinal: 60,  quantidadePorPlot: 1, seedsPlantadas: '', tier: 'advanced', estacao: 'Autumn'},
    {name: 'Barley',      tempo: 172_800_000, tempoFinal: 172_800_000, custoDaSemente: 10,   custoFinal: '', vendaDaCrop: 12,   vendaFinal: '', vendaFlower: 0, estoqueDeSementes: 60,  estoqueFinal: 60,  quantidadePorPlot: 1, seedsPlantadas: '', tier: 'advanced', estacao: 'Spring, Autumn'}
];

//============================================================================================================================================================================

const minerals = [
    { id: 'wood',       name: 'Wood',      qtdNodes: 1, tempoPadrao: 7_200_000,  tempoComBuff: 7_200_000,  mediaPorNodePadrao: 1,           mediaPorNode: 1,           mediaCustoEmCoins: '', custoEmFlower: '', valorMarket: '',   gastoComFerramentas: '', vezesQueVaiQuebrar: ''},
    { id: 'stone',      name: 'Stone',     qtdNodes: 1, tempoPadrao: 14_400_000, tempoComBuff: 14_400_000, mediaPorNodePadrao: 1,           mediaPorNode: 1,           mediaCustoEmCoins: '', custoEmFlower: '', valorMarket: '',   gastoComFerramentas: '', vezesQueVaiQuebrar: ''},
    { id: 'iron',       name: 'Iron',      qtdNodes: 1, tempoPadrao: 28_800_000, tempoComBuff: 28_800_000, mediaPorNodePadrao: 1,           mediaPorNode: 1,           mediaCustoEmCoins: '', custoEmFlower: '', valorMarket: '',   gastoComFerramentas: '', vezesQueVaiQuebrar: ''},
    { id: 'gold',       name: 'Gold',      qtdNodes: 1, tempoPadrao: 86_400_000, tempoComBuff: 86_400_000, mediaPorNodePadrao: 1,           mediaPorNode: 1,           mediaCustoEmCoins: '', custoEmFlower: '', valorMarket: '',   gastoComFerramentas: '', vezesQueVaiQuebrar: ''},
    { id: 'crimstone',  name: 'Crimstone', qtdNodes: 1, tempoPadrao: 86_400_000, tempoComBuff: 86_400_000, mediaPorNodePadrao: 1.4,         mediaPorNode: 1.4,         mediaCustoEmCoins: '', custoEmFlower: '', valorMarket: '',   gastoComFerramentas: '', vezesQueVaiQuebrar: ''},
    { id: 'oil',        name: 'Oil',       qtdNodes: 1, tempoPadrao: 72_000_000, tempoComBuff: 72_000_000, mediaPorNodePadrao: 16.66666667, mediaPorNode: 16.66666667, mediaCustoEmCoins: '', custoEmFlower: '', valorMarket: 0,    gastoComFerramentas: '', vezesQueVaiQuebrar: ''},
    { id: 'peixe',      name: 'Peixe',     qtdNodes: 1, tempoPadrao: 86_400_000, tempoComBuff: 86_400_000, mediaPorNodePadrao: 1,           mediaPorNode: 1,           mediaCustoEmCoins: '', custoEmFlower: '', valorMarket: 0,    gastoComFerramentas: '', vezesQueVaiQuebrar: ''},    
    { id: 'escavacao',  name: 'Escavação', qtdNodes: 1, tempoPadrao: 86_400_000, tempoComBuff: 86_400_000, mediaPorNodePadrao: 1,           mediaPorNode: 1,           mediaCustoEmCoins: '', custoEmFlower: '', valorMarket: 0,    gastoComFerramentas: '', vezesQueVaiQuebrar: ''},
    { id: 'escavacao2', name: 'Escavação', qtdNodes: 1, tempoPadrao: 86_400_000, tempoComBuff: 86_400_000, mediaPorNodePadrao: 4,           mediaPorNode: 4,           mediaCustoEmCoins: '', custoEmFlower: '', valorMarket: 0,    gastoComFerramentas: '', vezesQueVaiQuebrar: ''},
];

let mapaDeMinerals = {}; // cria objeto vazio para guardar NFTs por id
minerals.forEach(mineral => { //vai verificar e organizar por id das NFTs no mapaDeCollectibles, foi oque entendi
    mapaDeMinerals[mineral.id] = mineral; // adiciona cada NFT no objeto usando o id como chave
});

const ferramentas = [
    { id: 'axe',          name: 'Axe',           recursoAdquirido: 'wood',       custoTotalEmCoins: '', tier: 'machado',  quantidade: 1, estoquePadrao: 200, estoqueComBuff: 200, coinsPadrao: 20,  coins: 20},
    { id: 'pickaxe',      name: 'Pickaxe',       recursoAdquirido: 'stone',      custoTotalEmCoins: '', tier: 'picareta', quantidade: 1, estoquePadrao: 60,  estoqueComBuff: 60,  coinsPadrao: 20,  coins: 20,  wood: 3},
    { id: 'stonePickaxe', name: 'Stone Pickaxe', recursoAdquirido: 'iron',       custoTotalEmCoins: '', tier: 'picareta', quantidade: 1, estoquePadrao: 20,  estoqueComBuff: 20,  coinsPadrao: 20,  coins: 20,  wood: 3,  stone: 5},
    { id: 'ironPickaxe',  name: 'Iron Pickaxe',  recursoAdquirido: 'gold',       custoTotalEmCoins: '', tier: 'picareta', quantidade: 1, estoquePadrao: 5,   estoqueComBuff: 5,   coinsPadrao: 80,  coins: 80,  wood: 3,  iron: 5},
    { id: 'goldPickaxe',  name: 'Gold Pickaxe',  recursoAdquirido: 'crimstone',  custoTotalEmCoins: '', tier: 'picareta', quantidade: 1, estoquePadrao: 5,   estoqueComBuff: 5,   coinsPadrao: 100, coins: 100, wood: 3,  gold: 3},
    { id: 'oilDrill',     name: 'Oil Drill',     recursoAdquirido: 'oil',        custoTotalEmCoins: '', tier: 'drill',    quantidade: 1, estoquePadrao: 5,   estoqueComBuff: 5,   coinsPadrao: 100, coins: 100, wood: 20, iron: 9, leather: 10, wool: 20},
    
    { id: 'rod',          name: 'Rod',           recursoAdquirido: 'peixe',      custoTotalEmCoins: '', tier: 'vara',     quantidade: 1, estoquePadrao: 50,  estoqueComBuff: 50,  coinsPadrao: 20,  coins: 20,  wood: 3,  stone: 1},
    { id: 'sandShovel',   name: 'Sand Shovel',   recursoAdquirido: 'escavacao',  custoTotalEmCoins: '', tier: 'pa',       quantidade: 1, estoquePadrao: 50,  estoqueComBuff: 50,  coinsPadrao: 20,  coins: 20,  wood: 2 , stone: 1},
    { id: 'sandDrill',    name: 'Sand Drill',    recursoAdquirido: 'escavacao2', custoTotalEmCoins: '', tier: 'drill',    quantidade: 1, estoquePadrao: 10,  estoqueComBuff: 10,  coinsPadrao: 40,  coins: 40,  wood: 3,  crimstone: 1, oil: 1, leather: 1},
];

let mapaDeFerramentas = {}; // cria objeto vazio para guardar NFTs por id
ferramentas.forEach(ferramenta => { //vai verificar e organizar por id das NFTs no mapaDeCollectibles, foi oque entendi
    mapaDeFerramentas[ferramenta.id] = ferramenta; // adiciona cada NFT no objeto usando o id como chave
});

//============================================================================================================================================================================

const marketRecursos = [
    //Crops
    { id: 'sunflower',   name: 'Sunflower',   valor: '' },
    { id: 'potato',      name: 'Potato',      valor: '' },
    { id: 'rhubarb',     name: 'Rhubarb',     valor: '' },
    { id: 'pumpkin',     name: 'Pumpkin',     valor: '' },
    { id: 'zucchini',    name: 'Zucchini',    valor: '' },
    { id: 'carrot',      name: 'Carrot',      valor: '' },
    { id: 'yam',         name: 'Yam',         valor: '' },
    { id: 'cabbage',     name: 'Cabbage',     valor: '' },
    { id: 'broccoli',    name: 'Broccoli',    valor: '' },
    { id: 'soybean',     name: 'Soybean',     valor: '' },
    { id: 'pepper',      name: 'Pepper',      valor: '' },
    { id: 'beetroot',    name: 'Beetroot',    valor: '' },
    { id: 'cauliflower', name: 'Cauliflower', valor: '' },
    { id: 'parsnip',     name: 'Parsnip',     valor: '' },
    { id: 'eggplant',    name: 'Eggplant',    valor: '' },
    { id: 'corn',        name: 'Corn',        valor: '' },
    { id: 'onion',       name: 'Onion',       valor: '' },
    { id: 'turnip',      name: 'Turnip',      valor: '' },
    { id: 'radish',      name: 'Radish',      valor: '' },
    { id: 'wheat',       name: 'Wheat',       valor: '' },
    { id: 'kale',        name: 'Kale',        valor: '' },
    { id: 'artichoke',   name: 'Artichoke',   valor: '' },
    { id: 'barley',      name: 'Barley',      valor: '' },

    //Frutas
    { id: 'tomato',      name: 'Tomato',      valor: '' },
    { id: 'lemon',       name: 'Lemon',       valor: '' },
    { id: 'chestnut',    name: 'Chestnut',    valor: '' },
    { id: 'blueberry',   name: 'Blueberry',   valor: '' },
    { id: 'starfruit',   name: 'Starfruit',   valor: '' },
    { id: 'orange',      name: 'Orange',      valor: '' },
    { id: 'apple',       name: 'Apple',       valor: '' },
    { id: 'banana',      name: 'Banana',      valor: '' },
    { id: 'coconut',     name: 'Coconut',     valor: '' },
    { id: 'celestine',   name: 'Celestine',   valor: '' },
    { id: 'lunara',      name: 'Lunara',      valor: '' },
    { id: 'duskberry',   name: 'Duskberry',   valor: '' },

    //GH
    { id: 'grape',       name: 'Grape',       valor: '' },
    { id: 'rice',        name: 'Rice',        valor: '' },
    { id: 'olive',       name: 'Olive',       valor: '' },

    //Minerios
    { id: 'wood',        name: 'Wood',        valor: '' },
    { id: 'stone',       name: 'Stone',       valor: '' },
    { id: 'iron',        name: 'Iron',        valor: '' },
    { id: 'gold',        name: 'Gold',        valor: '' },
    { id: 'crimstone',   name: 'Crimstone',   valor: '' },

    //Animais
    { id: 'egg',         name: 'Egg',         valor: '' },
    { id: 'feather',     name: 'Feather',     valor: '' },
    { id: 'honey',       name: 'Honey',       valor: '' },
    { id: 'milk',        name: 'Milk',        valor: '' },
    { id: 'leather',     name: 'Leather',     valor: '' },
    { id: 'wool',        name: 'Wool',        valor: '' },
    { id: 'merinoWool',  name: 'Merino Wool', valor: '' },
];

let mapaMarketRecursos = {};
marketRecursos.forEach(recurso => {
    mapaMarketRecursos[recurso.id] = recurso;
});
console.log(`esta funcionando ${mapaMarketRecursos['leather'].valor}`)