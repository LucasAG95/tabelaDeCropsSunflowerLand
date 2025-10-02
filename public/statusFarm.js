//Duração do dia - 24h
let vinteQuatroHoras = parseFloat(86_400_000);
let umaHora = parseFloat(3_600_000);

//=====================================================================================================================================================================

//valor de 1 flower em coins
let flowerEmCoins = 1000;
document.getElementById('flower-em-coins').value = 1000;

//reposnavel por inserir informações da farm, como plots e nodes que possui!
let plots = parseInt(9);
document.getElementById('plotsPossuidos').value = plots; // Isso serve para ja mostrar o valor de plots no html

let fruitPlot = 1;

function salvarInformacoes() {
    plots = document.getElementById('plotsPossuidos').value;
    if (plots < 9) {
        alert('Não pode colocar menos que 9 plots!');
        plots = 9;
        document.getElementById('plotsPossuidos').value = plots;
    };

    fruitPlot = document.getElementById('fruitPlotsPossuidos').value;
    
    //mostrar o valor inserido do flower em coins ao salvar
    flowerEmCoins = document.getElementById('flower-em-coins').value;
    console.log(flowerEmCoins)

    //chama as funções para atualizar
    buffsAdicionadosMinerais();
    buffsAdicionadosCrops();
    buffsAdicionadosFruits();
};

//função para salvar os nodes que possui
function salvarNodesPossuidos() {
    mapaDeMinerals['wood'].qtdNodesT1 = document.getElementById('treesPossuidas').value;
    mapaDeMinerals['wood'].qtdNodesT2 = document.getElementById('treesTier2').value;
    mapaDeMinerals['wood'].qtdNodesT3 = document.getElementById('treesTier3').value;
    mapaDeMinerals['wood'].qtdNodes = Number(mapaDeMinerals['wood'].qtdNodesT1) + Number((mapaDeMinerals['wood'].qtdNodesT2 * 4)) + Number((mapaDeMinerals['wood'].qtdNodesT3 * 16)) || 1;
    console.log(`tenho ${mapaDeMinerals['wood'].qtdNodes} de arvores`)

    mapaDeMinerals['stone'].qtdNodesT1 = document.getElementById('stonesPossuidas').value;
    mapaDeMinerals['stone'].qtdNodesT2 = document.getElementById('stonesTier2').value;
    mapaDeMinerals['stone'].qtdNodesT3 = document.getElementById('stonesTier3').value;
    mapaDeMinerals['stone'].qtdNodes = Number(mapaDeMinerals['stone'].qtdNodesT1) + Number((mapaDeMinerals['stone'].qtdNodesT2 * 4)) + Number((mapaDeMinerals['stone'].qtdNodesT3 * 16)) || 1;

    mapaDeMinerals['iron'].qtdNodesT1 = document.getElementById('ironsPossuidos').value;
    mapaDeMinerals['iron'].qtdNodesT2 = document.getElementById('ironsTier2').value;
    mapaDeMinerals['iron'].qtdNodesT3 = document.getElementById('ironsTier3').value;
    mapaDeMinerals['iron'].qtdNodes = Number(mapaDeMinerals['iron'].qtdNodesT1) + Number((mapaDeMinerals['iron'].qtdNodesT2 * 4)) + Number((mapaDeMinerals['iron'].qtdNodesT3 * 16)) || 1;

    mapaDeMinerals['gold'].qtdNodesT1 = document.getElementById('goldsPossuidos').value;
    mapaDeMinerals['gold'].qtdNodesT2 = document.getElementById('goldsTier2').value;
    mapaDeMinerals['gold'].qtdNodesT3 = document.getElementById('goldsTier3').value;
    mapaDeMinerals['gold'].qtdNodes = Number(mapaDeMinerals['gold'].qtdNodesT1) + Number((mapaDeMinerals['gold'].qtdNodesT2 * 4)) + Number((mapaDeMinerals['gold'].qtdNodesT3 * 16)) || 1;

    mapaDeMinerals['crimstone'].qtdNodes = document.getElementById('crimstonesPossuidas').value || 1;

    mapaDeMinerals['oil'].qtdNodes = document.getElementById('oilPossuidos').value || 1;
    
    buffsAdicionadosMinerais();
};

//=====================================================================================================================================================================

//Estação
let estacao = 'Spring';
function selecionandoEstacao() {
    estacao = document.getElementById('estacaoSelect').value;
    //titulosDosSelectsEPreenchimentos();
    buffsAdicionadosCrops();
    buffsAdicionadosFruits();
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
    buffsAdicionadosCrops();
    buffsAdicionadosFruits();
    buffsAdicionadosMinerais();
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
    buffsAdicionadosCrops();
    buffsAdicionadosFruits();
}
document.getElementById('evento-bonus').addEventListener('change', eventoDeBonus)

//=====================================================================================================================================================================

//Sementes plantadas individualmente
function sementesPlantadas() {
    document.querySelectorAll('.quantidade-input').forEach(input => { //Procura todos os inputs no HTML que têm a classe quantidade-input.
        let nome = input.dataset.name; //Lê o atributo data-name do input.
        let valor = input.value;
        
        //Para Crops
        let crop = crops.find(c => c.name === nome); //Procura no array crops um item com o mesmo nome que o data-name do input. c é abreviação de crop e nome dada a variavel
        if (crop) {
            crop.seedsPlantadas = valor;
        };

        //Para Frutas
        let fruta = fruits.find(f => f.name === nome);
        if (fruta) {
            fruta.seedsPlantadas = valor;
        }

    });
    buffsAdicionadosCrops();
    buffsAdicionadosFruits();
};

//ao selecionar o modo, muda como calcula os minerais e traz novos resultados
let modoDeCalcular = 'manual';
let tituloJeitoDeMinerar = 'Qtd que vai quebrar';
function selecionarModoDeCalculo() {
    modoDeCalcular = document.getElementById('tipo-de-calculo').value
    console.log(`meu valor é de ${modoDeCalcular}`)

    // limpa todos os inputs - (chat GPT)
    document.querySelectorAll('.quantidade-input').forEach(input => {
        input.value = '';
    });

    if (modoDeCalcular === 'rodada') {
        tituloJeitoDeMinerar = 'Qtd de Ciclos Minerando';
    } else if (modoDeCalcular === 'hora') {
        tituloJeitoDeMinerar = 'Qtd de Horas Minerando';
    } else {
        tituloJeitoDeMinerar = 'Qtd que vai Minerar';
    }

    nodesQuebrados();
}
document.getElementById('tipo-de-calculo').addEventListener('change', selecionarModoDeCalculo);

function nodesQuebrados() {
    document.querySelectorAll('.quantidade-input').forEach(input => { //Procura todos os inputs no HTML que têm a classe quantidade-input.
        let nome = input.dataset.name; //Lê o atributo data-name do input.
        let valor = input.value;
        let mineral = minerals.find(mineral => mineral.id === nome) //Procura no array crops um item com o mesmo nome que o data-name do input.

        if (mineral) {
            mineral.vezesQueVaiQuebrar = valor;
            
            if (modoDeCalcular === 'rodada') {
                mineral.qtdQuebradasConvertidas = mineral.vezesQueVaiQuebrar * mineral.qtdNodes;
            } else if (modoDeCalcular === 'hora') {
                mineral.qtdQuebradasConvertidas = Math.floor((mineral.vezesQueVaiQuebrar * umaHora) / mineral.tempoComBuff) * mineral.qtdNodes;
            } else {
                mineral.qtdQuebradasConvertidas = mineral.vezesQueVaiQuebrar;
            }
        };

    });
    buffsAdicionadosMinerais();
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
    buffsAdicionadosCrops();
    buffsAdicionadosFruits();
    buffsAdicionadosMinerais();
}
document.getElementById('pack-gems').addEventListener('change', valoresDasGems);

//======================================================================================================================================================================


//mostrar(modificar) 'titulos' das abas
function titulosDosSelectsEPreenchimentos() {
    document.getElementById('valor-do-flower').innerHTML = `<br>Valor do Flower: <img src="icones/flower.png" class="crop-img">$${precoDoFlower.toFixed(4)}`
    document.getElementById('valor-por-gem').innerHTML = `Preço por Gem ➔ <img src="icones/gem.png" class="crop-img">$${precoPorGem.toFixed(4)} = <img src="icones/flower.png" class="crop-img">${precoDaGemEmFlower.toFixed(4)}<br><br>`
    document.getElementById('valor-por-gem').innerHTML += `Seed Restock: 15<img src="icones/gem.png" class="crop-img">➔ $${(precoPorGem * 15).toFixed(4)} = <img src="icones/flower.png" class="crop-img">${(precoDaGemEmFlower * 15).toFixed(4)}<br>`
    document.getElementById('valor-por-gem').innerHTML += `Tool Restock: 10<img src="icones/gem.png" class="crop-img">➔ $${(precoPorGem * 10).toFixed(4)} = <img src="icones/flower.png" class="crop-img">${(precoDaGemEmFlower * 10).toFixed(4)}<br>`
    document.getElementById('valor-por-gem').innerHTML += `Full Restock: 20<img src="icones/gem.png" class="crop-img">➔ $${(precoPorGem * 20).toFixed(4)} = <img src="icones/flower.png" class="crop-img">${(precoDaGemEmFlower * 20).toFixed(4)}<br>`
};

