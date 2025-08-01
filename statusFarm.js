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
    plots = document.getElementById('quantidadePlantada').value;
    atualizarStatusDasCrops();
};
