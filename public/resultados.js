//aba responsavel para mostrar os resultados na tela!

function statusCrops() {
    mostrarNoHtml.innerHTML = '';

    let tempoTotal = 0; // soma do tempo das crops
    let lucroTotalFlower = 0; // soma do lucro em flower

    // tabela principal
    let tabelaCrops = `<p><p>
    <table class="tabela-crops">
        <thead>
        <tr>
            <th><img src="./icones/${estacao}.png" class="crop-img">Crops<br>Estoque</th>     
            <th>Média por Plot<br>Tempo da Crop</th>
            <th>Sementes que vai Plantar <br><button onclick="sementesPlantadas()">Salvar</button></th>
            <th>Colheita Total<br>Tempo Plantando</th>
            <th>Custo das Semente<br>em Coins e Flower</th>       
            <th>Valor de Venda <br> Market P2P</th>
            <th>Lucro na venda <br> por Coins</th>
            <th>Lucro no Market P2P<br>Taxa: ${(taxa * 100) * desconto}%</th>
            <th>Melhor opção<br>de Venda atual</th>
        </tr>
        </thead>
        <tbody>
    `;

    crops.forEach(crop => {
        if(!crop.estacao.includes(estacao)) return;

        //calculo para saber quantas crops as sementes plantadas vao me render
        let colheitaTotal= crop.quantidadePorPlot * crop.seedsPlantadas;

        //tempo para plantar as sementes inseridas, arrendondando para cima! 1 semente a mais ja equivale a plantar a msm quantidade de plots
        let tempoFinalDaCrop = crop.tempoFinal * Math.ceil(crop.seedsPlantadas / plots);

        //mostrar o gasto em sementes em coins e tambem convertidas em flower. Caso o campo de seeds esteja vazio mostra o valor original da compra de uma semente. 
        let custoDaSementeEmCoins = crop.seedsPlantadas == 0 ? crop.custoFinal : crop.custoFinal * crop.seedsPlantadas;
        let custoSementeEmFlower = crop.seedsPlantadas == 0 ? (1 / flowerEmCoins) * crop.custoFinal : ((1 / flowerEmCoins) * crop.custoFinal) * crop.seedsPlantadas;

        //mostrar o lucro descontando taxas e custo das sementes em flower, caso nao seja preenchido as sementes ou esteja na ilha Basic, fica como 0. Calcula do lucro em coisn tbm
        let lucroCoins = (crop.vendaFinal * colheitaTotal) - (crop.custoFinal * crop.seedsPlantadas);
        let lucroFlower = crop.seedsPlantadas == 0 || ilha === 'Basic' ? 0 : ((crop.vendaFlower * colheitaTotal) * (1 - (taxa * desconto))) - custoSementeEmFlower;
        
        //mostrar se a melhor opção de venda da crop é por coins ou flower
        let melhorPorCoinsOuFlower
        if (lucroFlower === 0) {
            melhorPorCoinsOuFlower = '';
        } else if (lucroFlower < (1 / flowerEmCoins) * lucroCoins) {
            melhorPorCoinsOuFlower = '<img src="./icones/coins.png" class="crop-img">Coins';
        } else {
            melhorPorCoinsOuFlower = '<img src="./icones/flower.png" class="crop-img">Flower';
        }

        // para tabela de resultado total
        tempoTotal += tempoFinalDaCrop;
        lucroTotalFlower += lucroFlower;
        

        tabelaCrops += `
        <tr>
            <td><img src="./crops/${crop.name}.png" class="crop-img">${crop.name} <br> <img src="./icones/reestock.png" class="crop-img">${crop.estoqueFinal}</td>
            <td><img src="./crops/${crop.name}.png" class="crop-img">${crop.quantidadePorPlot.toFixed(2)} <br> <img src="./icones/tempo.png" class="crop-img">${formatarTempoDaCrop(crop.tempoFinal)}</td>
            <td><input type="number" placeholder="" data-name="${crop.name}" class="quantidade-input" value="${crop.seedsPlantadas}"></td>
            <td><img src="./crops/${crop.name}.png" class="crop-img">${colheitaTotal.toFixed(2)} <br> <img src="./icones/tempo.png" class="crop-img">${formatarTempoDaCrop(tempoFinalDaCrop)}</td>
            <td><img src="./icones/coins.png" class="crop-img">${custoDaSementeEmCoins.toFixed(2)} <br> <img src="./icones/flower.png" class="crop-img">${custoSementeEmFlower.toFixed(5)}</td>
            <td><img src="./crops/${crop.name}.png" class="crop-img"> <br> <img src="./icones/flower.png" class="crop-img">${crop.vendaFlower}</td>
            <td><img src="./icones/coins.png" class="crop-img">${lucroCoins.toFixed(2)}</td>            
            <td><img src="./icones/flower.png" class="crop-img">${lucroFlower.toFixed(4)}</td>
            <td>${melhorPorCoinsOuFlower}</td>
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

