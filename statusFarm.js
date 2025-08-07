//Estação
let temporada = 'Spring';

document.getElementById('estacaoSelect').addEventListener('change', () => { // vou ter que analisar oque faz ainda!
    temporada = document.getElementById('estacaoSelect').value;
    atualizarStatusDasCrops();
});

//Status da farm
let plots = parseInt(9);



//<input type="number" placeholder="Qtd" data-name="${crop.name}" class="quantidade-input"></input>
//<td> <input id="input-${crop.id}" type="number" placeholder="Qtd" class="quantidade-input"> </td>


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


function quantidadePlots() {
    plots = document.getElementById('plotsPossuidos').value;
    atualizarStatusDasCrops();
}
