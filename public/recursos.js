const mostrarNoHtml = document.getElementById('saida');

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

//api para puxar valores do flower das crops entre outros recursos
fetch(`/api/proxy?url=https://sfl.world/api/v1/prices`)
  .then(res => res.json())
  .then(data => {  
    atualizarValoresDeVendaPorFlower(data.data.p2p) //vai mandar para a funcção digitada o que ela puxou da api de preços do sfl.world, primeiro data(nome da variavel), o outro data é um objeto que tem p2p como outro objeto dentro, que por sua vez tem outros resultados dentro
    console.log(data.data.p2p)
  })
  .catch(err => {
    console.error('Erro ao puxar a planilha:', err);
  });

//essa função irá inserir o valor de venda por flower das crops em vendaFlower
function atualizarValoresDeVendaPorFlower(apiValores) {
    crops.forEach(crop => {
        if (apiValores[crop.name]) {
        crop.vendaFlower = apiValores[crop.name];
        console.log(`Crop: ${crop.name} Valor: ${crop.vendaFlower}`);
        statusCrops();
        };  
    });
  
};