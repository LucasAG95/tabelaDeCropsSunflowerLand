//Duração do dia - 24h
let vinteQuatroHoras = parseFloat(86_400_000);

//valor de 1 flower em coins
let flowerEmCoins = 320;
document.getElementById('flowerEmCoins').value = flowerEmCoins;

//=====================================================================================================================================================================

//reposnavel por inserir informações da farm, como plots e nodes que possui!
let plots = parseInt(9);
document.getElementById('plotsPossuidos').value = plots; // Isso serve para ja mostrar o valor de plots no html

function salvarInformacoes() {
    plots = document.getElementById('plotsPossuidos').value;
    if (plots < 9) {
        alert('Não pode colocar menos que 9 plots!');
        plots = 9;
        document.getElementById('plotsPossuidos').value = plots;
    };

    flowerEmCoins = document.getElementById('flowerEmCoins').value;
    console.log(flowerEmCoins)
    buffsAdicionados();
    statusCrops();
};

//=====================================================================================================================================================================

//Estação
let estacao = 'Spring';
document.getElementById('estacaoSelect').addEventListener('change', () => { // vou ter que analisar oque faz ainda!
    estacao = document.getElementById('estacaoSelect').value;
    buffsAdicionados();
    statusCrops();
});

//=====================================================================================================================================================================

//Prestigio em que a pessoa está e calculo da taxa
let ilha = 'Spring'; // guarda o nome da ilha selecionada
let taxa = 1; // guarda a taxa calculada para a ilha

function ilhaPrestigioAtual() { // Função central que lê o <select>, calcula a taxa e atualiza a UI
    ilha = document.getElementById('ilhaSelect').value; //ela pega o <select id="ilhaSelect"> no HTML e guarda o valor escolhido dentro de ilha.
    if (ilha === 'Basic') {
        taxa = 'Não pode vender';
    } else if (ilha === 'Spring') {
        taxa = 0.5;
    } else if (ilha === 'Desert') {
        taxa = 0.2
    } else if (ilha === 'Vulcano') {
        taxa = 0.15
    };
    statusCrops();
};
//registra um ouvinte de evento no <select id="ilhaSelect">.
//toda vez que o usuário mudar a ilha manualmente, a função atualizarTaxa() será chamada.
document.getElementById('ilhaSelect').addEventListener('change', ilhaPrestigioAtual);
console.log(ilha)
//=====================================================================================================================================================================

//Se a pessoa possui VIP ou não e desconto que recebe na taxa
let vip = '';
let desconto = 1;

function sePossuiVipOuNao() {
    vip = document.getElementById('vipSelect').value;
    if (vip === 'Sim') {
        desconto = 0.5;
    } else {
        desconto = 1;
    }
    statusCrops();
}
document.getElementById('vipSelect').addEventListener('change', sePossuiVipOuNao);

//=====================================================================================================================================================================

//Selecionar qual evento bonus esta ocorrendo no game no momento
let eventoBonus = 'nenhum';
let eventoSunshower = 1; //crops crescem 2x mais rapido
let eventoBountifulHarvest = 0; //ganha +1 ao colher frutas e crops
document.getElementById('evento-bonus').addEventListener('change', () => { 
    eventoBonus = document.getElementById('evento-bonus').value;
    if (eventoBonus === 'sunshower') {
        eventoSunshower = 0.5
        eventoBountifulHarvest = 0;
    } else if (eventoBonus === 'bountifulHarvest') {
        eventoBountifulHarvest = 1;
        eventoSunshower = 1;
    } else {
        eventoSunshower = 1;
        eventoBountifulHarvest = 0;
    }
    buffsAdicionados();
    statusCrops();
});

//=====================================================================================================================================================================

//Sementes plantadas individualmente
function sementesPlantadas() {
    document.querySelectorAll('.quantidade-input').forEach(input => { //Procura todos os inputs no HTML que têm a classe quantidade-input.
        let nome = input.dataset.name; //Lê o atributo data-name do input.
        let valor = input.value;
        let crop = crops.find(c => c.name === nome) //Procura no array crops um item com o mesmo nome que o data-name do input. c é abreviação de crop e nome dada a variavel
        if (crop) {
            crop.seedsPlantadas = valor;
        };

    });
    statusCrops();
};

//=====================================================================================================================================================================