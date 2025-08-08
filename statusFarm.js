//Estação
let temporada = 'Spring';

document.getElementById('estacaoSelect').addEventListener('change', () => { // vou ter que analisar oque faz ainda!
    temporada = document.getElementById('estacaoSelect').value;
    atualizarStatusDasCrops();
});

//Status da farm
let plots = parseInt(1);

function quantidadePlots() {
    plots = document.getElementById('plotsPossuidos').value;
    atualizarStatusDasCrops();
}

//Sementes plantadas individualmente
function sementesPlantadas() {

    document.querySelectorAll('.quantidade-input').forEach(input => { //Procura todos os inputs no HTML que têm a classe quantidade-input.
        let nome = input.dataset.name; //Lê o atributo data-name do input.
        let valor = input.value;
        let crop = crops.find(c => c.name === nome) //Procura no array crops um item com o mesmo nome que o data-name do input. c é abreviação de crop e nome dada a variavel
        if (crop) {
            crop.quantidade = valor;
        };

    });
    atualizarStatusDasCrops();
};

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
    atualizarStatusDasCrops();
});

let vip = '';
let desconto = 1;

document.getElementById('vipSelect').addEventListener('change', () => {
    vip = document.getElementById('vipSelect').value;
    if (vip === 'Sim') {
        desconto = 0.5;
    } else {
        desconto = 1;
    }
    atualizarStatusDasCrops();
});




