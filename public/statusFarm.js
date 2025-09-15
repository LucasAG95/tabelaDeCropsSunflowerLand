//Duração do dia - 24h
let vinteQuatroHoras = parseFloat(86_400_000);

//=====================================================================================================================================================================

//valor de 1 flower em coins
let flowerEmCoins = 1000;
document.getElementById('flower-em-coins').value = 1000;

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

    //mostrar o valor inserido do flower em coins ao salvar
    flowerEmCoins = document.getElementById('flower-em-coins').value;
    console.log(flowerEmCoins)

    //chama as funções para atualizar
    calculoMineraisEFerramentas();
    buffsAdicionados();
    statusCrops();
    statusMinerais();
};

//função para salvar os nodes que possui
function salvarNodesPossuidos() {
    mapaDeMinerals['wood'].qtdNodes = document.getElementById('treesPossuidas').value || 1;
    mapaDeMinerals['stone'].qtdNodes = document.getElementById('stonesPossuidas').value || 1;
    mapaDeMinerals['iron'].qtdNodes = document.getElementById('ironsPossuidos').value || 1;
    mapaDeMinerals['gold'].qtdNodes = document.getElementById('goldsPossuidos').value || 1;
    mapaDeMinerals['crimstone'].qtdNodes = document.getElementById('crimstonesPossuidas').value || 1;
    mapaDeMinerals['oil'].qtdNodes = document.getElementById('oilPossuidos').value || 1;
    
    calculoMineraisEFerramentas();
    statusMinerais();
}


//=====================================================================================================================================================================

//Estação
let estacao = 'Spring';
function selecionandoEstacao() {
    estacao = document.getElementById('estacaoSelect').value;
    //titulosDosSelectsEPreenchimentos();
    buffsAdicionados();
    statusCrops();
};
document.getElementById('estacaoSelect').addEventListener('change', selecionandoEstacao);

//=====================================================================================================================================================================

//Prestigio em que a pessoa está e calculo da taxa
let ilha = 'Basic'; // guarda o nome da ilha selecionada
let taxa = 1; // guarda a taxa calculada para a ilha

function ilhaPrestigioAtual() { // Função central que lê o <select>, calcula a taxa e atualiza a UI
    ilha = document.getElementById('ilhaSelect').value; //ela pega o <select id="ilhaSelect"> no HTML e guarda o valor escolhido dentro de ilha.
    if (ilha === 'Basic') {
        taxa = 'Não pode vender';
    } else if (ilha === 'Petal') {
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
document.getElementById('ilhaSelect').addEventListener('change', sePossuiVipOuNao); //para que quando eu mude de ilha ele chame a função para mudar autimaticamente o vip e mostrar o resultado corretamente
console.log(ilha)
//=====================================================================================================================================================================

//Se a pessoa possui VIP ou não e desconto que recebe na taxa
let vip = 'Sim';
let desconto = 1;

function sePossuiVipOuNao() {
    vip = document.getElementById('vipSelect').value;
    if (vip === 'Sim' && ilha !== 'Basic') {
        desconto = 0.5;
    } else {
        desconto = 1;
    }
    ilhaPrestigioAtual();
    statusCrops();
}
document.getElementById('vipSelect').addEventListener('change', sePossuiVipOuNao);

//=====================================================================================================================================================================

//Selecionar qual evento bonus esta ocorrendo no game no momento
let eventoBonus = 'nenhum';
let eventoSunshower = 1; //crops crescem 2x mais rapido
let eventoBountifulHarvest = 0; //ganha +1 ao colher frutas e crops

function eventoDeBonus() {
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
    //titulosDosSelectsEPreenchimentos();
    buffsAdicionados();
    statusCrops();
}
document.getElementById('evento-bonus').addEventListener('change', eventoDeBonus)

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

function nodesQuebrados() {
    document.querySelectorAll('.quantidade-input').forEach(input => { //Procura todos os inputs no HTML que têm a classe quantidade-input.
        let nome = input.dataset.name; //Lê o atributo data-name do input.
        let valor = input.value;
        let mineral = minerals.find(mineral => mineral.id === nome) //Procura no array crops um item com o mesmo nome que o data-name do input.
        if (mineral) {
            mineral.vezesQueVaiQuebrar = valor;
        };

    });
    statusMinerais();
};



//=====================================================================================================================================================================

//Responsavel por dar valor a cada Gem dependendo do pack
let precoPorGem = 0.9 / 100; //valor do primeiro pack dividido pelas gems
let precoDaGemEmFlower;
function valoresDasGems() {
    let packGemsSelecionado = document.getElementById('pack-gems').value;
    let quantidadeGems = parseFloat(packGemsSelecionado.split('-')[0]); // Pega a primeira parte antes do '-'
    let custoDoPack = parseFloat(packGemsSelecionado.split('-')[1]); // Pega tudo depois do '-'
    precoPorGem = custoDoPack / quantidadeGems;
    //conversao do valor de cada gem pra flower
    precoDaGemEmFlower = precoPorGem / precoDoFlower;
    console.log(precoDaGemEmFlower + `esse é o valor`);
    //funções chamadas
    titulosDosSelectsEPreenchimentos();
    statusCrops();
}
document.getElementById('pack-gems').addEventListener('change', valoresDasGems);

//======================================================================================================================================================================


//mostrar(modificar) 'titulos' das abas
function titulosDosSelectsEPreenchimentos() {
    document.getElementById('valor-do-flower').innerHTML = `<br>Valor do Flower: <img src="icones/flower.png" class="crop-img">$${precoDoFlower.toFixed(4)}`
    document.getElementById('valor-por-gem').innerHTML = `Preço por Gem: <img src="icones/gem.png" class="crop-img">$${precoPorGem.toFixed(4)} = <img src="icones/flower.png" class="crop-img">${precoDaGemEmFlower.toFixed(4)}<br>`
    document.getElementById('valor-por-gem').innerHTML += `Seed Restock: <img src="icones/gem.png" class="crop-img">$${(precoPorGem * 15).toFixed(4)} = <img src="icones/flower.png" class="crop-img">${(precoDaGemEmFlower * 15).toFixed(4)}<br>`
}

