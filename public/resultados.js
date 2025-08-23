//aba responsavel para mostrar os resultados na tela!

function statusCrops() {
    mostrarNoHtml.innerHTML = '';

    let tempoTotal = 0; // soma do tempo das crops
    let lucroTotalFlower = 0; // soma do lucro em flower

    // tabela principal
    let tabelaCrops = `
    <table class="tabela-crops">
        <thead>
        <tr>
            <th><img src="./icones/${estacao}.png" class="crop-img">Crops<br>Estoque</th>
            <th>Crop por Plot<br>Tempo da Crop</th>
            <th>Sementes que vai Plantar <br><button onclick="sementesPlantadas()">Salvar</button></th>
            <th>Colheita Total<br>Tempo Plantando</th>
            <th>Custo em Sementes<br>Venda das Crops</th>
            <th>Lucro Final<br>por Coins</th>
            <th>Valor do Market P2P</th>
            <th>Vendendo no Market<br>Taxa: ${(taxa * 100) * desconto}%</th>
        </tr>
        </thead>
        <tbody>
    `;

    crops.forEach(crop => {
        if(!crop.estacao.includes(estacao)) return;

        let colheitaTotal= crop.quantidadePorPlot * crop.seedsPlantadas;
        let tempoFinalDaCrop = crop.tempoFinal * Math.ceil(crop.seedsPlantadas / plots);
        let lucroCoins = (crop.vendaFinal * colheitaTotal) - (crop.custoFinal * crop.seedsPlantadas);
        let lucroFlower = (crop.vendaFlower * colheitaTotal) * (1 - (taxa * desconto));
        tempoTotal += tempoFinalDaCrop;
        lucroTotalFlower += lucroFlower;
        
        tabelaCrops += `
        <tr>
            <td><img src="./crops/${crop.name}.png" class="crop-img">${crop.name} <br> <img src="./icones/reestock.png" class="crop-img">${crop.estoqueFinal}</td>
            <td><img src="./crops/${crop.name}.png" class="crop-img">${crop.quantidadePorPlot.toFixed(2)} <br> <img src="./icones/tempo.png" class="crop-img">${formatarTempoDaCrop(crop.tempoFinal)}</td>
            <td><input type="number" placeholder="Qtd" data-name="${crop.name}" class="quantidade-input" value="${crop.seedsPlantadas}"></td>
            <td><img src="./crops/${crop.name}.png" class="crop-img">${colheitaTotal.toFixed(2)} <br> <img src="./icones/tempo.png" class="crop-img">${formatarTempoDaCrop(tempoFinalDaCrop)}</td>
            <td><img src="./icones/coins.png" class="crop-img">${(crop.custoFinal * crop.seedsPlantadas).toFixed(2)} <br> <img src="./icones/coins.png" class="crop-img">${(crop.vendaFinal * colheitaTotal).toFixed(2)}</td>
            <td><img src="./icones/coins.png" class="crop-img">${lucroCoins.toFixed(3)}</td>
            <td><img src="./crops/${crop.name}.png" class="crop-img"> <br> <img src="./icones/flower.png" class="crop-img">${crop.vendaFlower}</td>
            <td><img src="./icones/flower.png" class="crop-img">${lucroFlower.toFixed(4)}</td>
        </tr>
        `;
    });

    tabelaCrops += `</tbody></table>`;

    // cálculo de média de lucro diário
    let mediaLucroDiario = (vinteQuatroHoras / tempoTotal) * lucroTotalFlower;

    // tabela de resumo
    let tabelaResultadoFinal = `
    <table class="tabela-crops totais">
    <thead>
        <tr>
        <th colspan="2">Resumo do Combo</th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <td>Tempo para plantar todo combo:</td>
        <td><img src="icones/tempo.png" class="crop-img">${formatarTempoDaCropComDia(tempoTotal)}</td>
        </tr>
        <tr>
        <td>Média de Lucro por Dia:</td>
        <td><img src="icones/flower.png" class="crop-img">${mediaLucroDiario.toFixed(2)}</td>
        </tr>
        <tr>
        <td>Lucro Total plantando o combo:</td>
        <td><img src="icones/flower.png" class="crop-img">${lucroTotalFlower.toFixed(2)}</td>
        </tr>
    </tbody>
    </table>
    `;

    // coloca as duas tabelas lado a lado
    mostrarNoHtml.innerHTML = `
    <div class="tabelas-em-ordem">
        ${tabelaCrops}
        ${tabelaResultadoFinal}
    </div>
    `;
}
