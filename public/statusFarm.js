//Duração do dia - 24h
let vinteQuatroHoras = parseFloat(86_400_000);

//Status da farm
let plots = parseInt(1);
function quantidadePlots() {
    plots = document.getElementById('plotsPossuidos').value;
    buffsAdicionados();
    statusCrops();
};

//Estação
let estacao = 'Spring';
document.getElementById('estacaoSelect').addEventListener('change', () => { // vou ter que analisar oque faz ainda!
    estacao = document.getElementById('estacaoSelect').value;
    buffsAdicionados();
    statusCrops();
});

//Prestigio em que a pessoa está e calculo da taxa
let ilha = '';
let taxa = 1;
document.getElementById('ilhaSelect').addEventListener('change', () => {
    ilha = document.getElementById('ilhaSelect').value;
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
});

//Se a pessoa possui VIP ou não e desconto que recebe na taxa
let vip = '';
let desconto = 1;
document.getElementById('vipSelect').addEventListener('change', () => {
    vip = document.getElementById('vipSelect').value;
    if (vip === 'Sim') {
        desconto = 0.5;
    } else {
        desconto = 1;
    }
    statusCrops();
});

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

