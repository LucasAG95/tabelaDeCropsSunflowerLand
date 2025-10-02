function statusCrops() {
    mostrarResultadoCrops.innerHTML = '';

    let tempoTotal = 0;
    let lucroTotalFlower = 0;
    let restockCropCombo = 0;

    // tabela principal continua igual
    let tabelaCrops = `
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
            <th>Média de Lucro por Hora<br>(Sem desconta Gems)</th>
        </tr>
        </thead>
        <tbody>
    `;

    crops.forEach(crop => {
        if(!crop.estacao.includes(estacao)) return;
        
        let colheitaTotal = crop.quantidadePorPlot * crop.seedsPlantadas;
        let tempoFinalDaCrop = crop.tempoFinal * Math.ceil(crop.seedsPlantadas / plots);
        let custoDaSementeEmCoins = crop.seedsPlantadas == 0 ? crop.custoFinal : crop.custoFinal * crop.seedsPlantadas;
        let custoSementeEmFlower = crop.seedsPlantadas == 0 ? (1 / flowerEmCoins) * crop.custoFinal : ((1 / flowerEmCoins) * crop.custoFinal) * crop.seedsPlantadas;
        let lucroCoins = (crop.vendaFinal * colheitaTotal) - (crop.custoFinal * crop.seedsPlantadas);
        let lucroFlower = crop.seedsPlantadas == 0 || ilha === 'Basic' ? 0 : ((crop.vendaFlower * colheitaTotal) * (1 - (taxa * desconto))) - custoSementeEmFlower;
        
        let rendimento24h = ((vinteQuatroHoras / crop.tempoFinal) * (plots * crop.quantidadePorPlot)) * (crop.vendaFlower * (1 - (taxa * desconto)));
        let custoEm24h = ((vinteQuatroHoras / crop.tempoFinal) * plots) * (crop.custoFinal / flowerEmCoins);
        let custoEmGems24h = ((((vinteQuatroHoras / crop.tempoFinal) * plots) / (crop.estoqueFinal)) * 15) * precoDaGemEmFlower;
        let lucroEm24h = rendimento24h - (custoEm24h);

        let melhorPorCoinsOuFlower;
        if(lucroFlower === 0){
            melhorPorCoinsOuFlower = '';
        } else if(lucroFlower < (1 / flowerEmCoins) * lucroCoins){
            melhorPorCoinsOuFlower = '<img src="./icones/coins.png" class="crop-img">Coins';
        } else {
            melhorPorCoinsOuFlower = '<img src="./icones/flower.png" class="crop-img">Flower';
        }

        //Total de reestock feitos com as crops
        if(Math.ceil(crop.seedsPlantadas / crop.estoqueFinal) > restockCropCombo){
            restockCropCombo = Math.ceil(crop.seedsPlantadas / crop.estoqueFinal);
        }

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
            <td>
                <img src="./crops/${crop.name}.png" class="crop-img"><br>
                <img src="./icones/flower.png" class="crop-img">${(lucroEm24h / 24).toFixed(5)}
            </td>
        </tr>
        `;

    });
    tabelaCrops += `</tbody></table>`;

    let numeroDeCiclosDasFrutas = 4;
    if (mapaDeTodosCollectibles['immortalPear'].possui) numeroDeCiclosDasFrutas += mapaDeTodosCollectibles['immortalPear'].buff;



    tabelaFruits = `
    <table class="tabela-crops">
        <thead>
        <tr>
            <th><img src="./icones/${estacao}.png" class="crop-img">Fruits<br>Estoque</th>     
            <th>Colheita e Tempo<br>por ciclo</th>
            <th>Sementes que vai Plantar <br><button onclick="sementesPlantadas()">Salvar</button></th>
            <th>Colheita Total<br>Tempo Plantando</th>
            <th>Machados Gastos<br>Madeira Ganhas</th>
            <th>Gasto com Semente<br>e Machados</th>       
            <th>Valor de Venda <br> Market P2P</th>
            <th>Lucro em Coins <br>(Apenas Frutas)</th>
            <th>Lucro no Market P2P<br>Taxa: ${(taxa * 100) * desconto}%</th>
            <th>Melhor opção<br>de Venda atual</th>
            <th>Média de Lucro por Hora<br>(Sem desconta Gems)</th>
        </tr>
        </thead>
        <tbody>
    `;
    
    fruits.forEach(fruta => {
        if(!fruta.estacao.includes(estacao)) return;
        
        let colheitaTotal = (fruta.quantidadePorPlot * 4) * fruta.seedsPlantadas;
        let tempoFinalDaFruta = (fruta.tempoFinal * numeroDeCiclosDasFrutas) * Math.ceil(fruta.seedsPlantadas / fruitPlot);

        let GastoComSementeEmCoins = fruta.custoFinal * fruta.seedsPlantadas;
        let GastoComSementeEmFlower = ((1 / flowerEmCoins) * fruta.custoFinal) * fruta.seedsPlantadas;
        
        let qtdAxesUsados = fruta.axe * fruta.seedsPlantadas;
        let gastoComAxesCoins = qtdAxesUsados * mapaDeFerramentas['axe'].custoTotalEmCoins;
        let gastoComAxesFlower = (1 / flowerEmCoins) * gastoComAxesCoins;

        let qtdWoodFeita = fruta.wood * fruta.seedsPlantadas;

        let lucroCoins = (colheitaTotal * fruta.vendaFinal) - (GastoComSementeEmCoins);
        let lucroFrutasMarket = ((fruta.vendaFlower * colheitaTotal) * (1 - (taxa * desconto))) - GastoComSementeEmFlower;
        let lucroWoodMarket = ((qtdWoodFeita * mapaDeMinerals['wood'].valorMarket) * (1 - (taxa * desconto))) - gastoComAxesFlower;

        let rendimentoFruta24h = ((vinteQuatroHoras / fruta.tempoFinal) * (fruitPlot * fruta.quantidadePorPlot)) * (fruta.vendaFlower * (1 - (taxa * desconto)));
        let rendimentoWood24h = ((vinteQuatroHoras / (fruta.tempoFinal * numeroDeCiclosDasFrutas)) * (fruitPlot * fruta.wood)) * (mapaDeMinerals['wood'].valorMarket * (1 - (taxa * desconto)));

        let custoFrutaEm24h = ((vinteQuatroHoras / (fruta.tempoFinal * numeroDeCiclosDasFrutas)) * fruitPlot) * (fruta.custoFinal / flowerEmCoins);
        let custoAxeEm24h = ((vinteQuatroHoras / (fruta.tempoFinal * numeroDeCiclosDasFrutas)) * fruitPlot) * (mapaDeFerramentas['axe'].custoTotalEmCoins / flowerEmCoins)

        let custoEmGems24h = ((((vinteQuatroHoras / (fruta.tempoFinal * numeroDeCiclosDasFrutas)) * fruitPlot) / (fruta.estoqueFinal)) * 15) * precoDaGemEmFlower;
        let lucroEm24h = (rendimentoFruta24h + rendimentoWood24h) - (custoFrutaEm24h + custoAxeEm24h);

        let melhorPorCoinsOuFlower;
        if(lucroFrutasMarket === 0){
            melhorPorCoinsOuFlower = '';
        } else if(lucroFrutasMarket < (1 / flowerEmCoins) * lucroCoins){
            melhorPorCoinsOuFlower = '<img src="./icones/coins.png" class="crop-img">Coins';
        } else {
            melhorPorCoinsOuFlower = '<img src="./icones/flower.png" class="crop-img">Flower';
        }

        //Total de reestock feitos com as crops
        if(Math.ceil(fruta.seedsPlantadas / fruta.estoqueFinal) > restockCropCombo){
            restockCropCombo = Math.ceil(fruta.seedsPlantadas / fruta.estoqueFinal);
        }

        tabelaFruits += `
        <tr>
            <td><img src="./crops/${fruta.name}.png" class="crop-img">${fruta.name} <br> <img src="./icones/reestock.png" class="crop-img">${fruta.estoqueFinal}</td>
            <td><img src="./crops/${fruta.name}.png" class="crop-img">${fruta.quantidadePorPlot} <br> <img src="./icones/tempo.png" class="crop-img">${formatarTempoDaCrop(fruta.tempoFinal)}</td>
            <td><input type="number" placeholder="" data-name="${fruta.name}" class="quantidade-input" value="${fruta.seedsPlantadas}"></td>
            <td><img src="./crops/${fruta.name}.png" class="crop-img">${colheitaTotal.toFixed(2)} <br> <img src="./icones/tempo.png" class="crop-img">${formatarTempoDaCrop(tempoFinalDaFruta)}</td>
            <td><img src="./minerais/${mapaDeFerramentas['axe'].id}.png" class="crop-img">${qtdAxesUsados}<br><img src="./minerais/${mapaDeMinerals['wood'].id}.png" class="crop-img">${qtdWoodFeita}</td>                
            <td><img src="./icones/coins.png" class="crop-img">${(GastoComSementeEmCoins + gastoComAxesCoins).toFixed(2)}<br><img src="./icones/flower.png" class="crop-img">${(GastoComSementeEmFlower + gastoComAxesFlower).toFixed(4)}</td>
            <td><img src="./crops/${fruta.name}.png" class="crop-img"> <br> <img src="./icones/flower.png" class="crop-img">${fruta.vendaFlower}</td>
            <td><img src="./crops/${fruta.name}.png" class="crop-img"> <br> <img src="./icones/coins.png" class="crop-img">${lucroCoins}</td>
            <td>
                <img src="./crops/${fruta.name}.png" class="crop-img"><img src="./icones/flower.png" class="crop-img">${lucroFrutasMarket.toFixed(4)}<br>
                <img src="./minerais/${mapaDeMinerals['wood'].id}.png" class="crop-img"><img src="./icones/flower.png" class="crop-img">${lucroWoodMarket.toFixed(4)}
            </td>
            <td>${melhorPorCoinsOuFlower}</td>
            <td>
                <img src="./crops/${fruta.name}.png" class="crop-img"> + <img src="./minerais/${mapaDeMinerals['wood'].id}.png" class="crop-img"><br>
                <img src="./icones/flower.png" class="crop-img">${(lucroEm24h / 24).toFixed(5)}
            </td>
        </tr>
        `;

    });


    //cálculo do resumo
    let precoRestockCropDolar = precoPorGem * (restockCropCombo * 15);
    let precoRestockCropFlower = precoDaGemEmFlower * (restockCropCombo * 15);
    let mediaLucroDiario = (vinteQuatroHoras / tempoTotal) * lucroTotalFlower;

    // cards do resumo, lado a lado
    let tabelaResultadoFinal = `
    <div class="resumo-cards">
        <div class="card">
            <div class="card-title"><h3>Tempo para plantar todo combo</h3></div>
            <div class="card-value"><br><img src="icones/tempo.png" class="crop-img">${formatarTempoDaCropComDia(tempoTotal)}</div>
        </div>
        <div class="card">
            <div class="card-title"><h3>Restock</h3></div>
            <div class="card-value">
                Quantidade: ${restockCropCombo} = <img src="icones/gem.png" class="crop-img">${restockCropCombo * 15}<br>
                <img src="icones/flower.png" class="crop-img">${precoRestockCropFlower.toFixed(4)} ~ 
                <img src="icones/usdc.png" class="crop-img">$${precoRestockCropDolar.toFixed(4)}
            </div>
        </div>
        <div class="card">
            <div class="card-title"><h3>Lucro Total do Combo Plantado<br>(Gems Descontadas)</h3></div>
            <div class="card-value">
                <img src="icones/flower.png" class="crop-img">${(lucroTotalFlower - precoRestockCropFlower).toFixed(4)} ~ 
                <img src="icones/usdc.png" class="crop-img">$${((lucroTotalFlower - precoRestockCropFlower) * precoDoFlower).toFixed(4)}
            </div>
        </div>
        <div class="card">
            <div class="card-title"><h3>Média de Lucro Diário<br>(Não desconta Gems)</h3></div>
            <div class="card-value">
                <img src="icones/flower.png" class="crop-img">${mediaLucroDiario.toFixed(2)} ~ 
                <img src="icones/usdc.png" class="crop-img">$${(mediaLucroDiario * precoDoFlower).toFixed(4)}
            </div>
        </div>
    </div>
    `;

    // renderiza tudo
    mostrarResultadoCrops.innerHTML = `
        <div class="tabelas-em-ordem">
            ${tabelaResultadoFinal}
            ${tabelaCrops}
            ${tabelaFruits}
        </div>
    `;
}

//================================================================================================================================================================

function statusMinerais(coinsGastas, woodGastas, stoneGastas, ironGastos, goldGastos, crimstoneGastas, oilGastos, leatherGastos, woolGastas, gastosConvertidoEmFlower) {

    let reestockFerramentas = 0;
    let lucroTotalFlower = 0;

    let tabelaMinerios = `
    <table class="tabela-minerais">
        <thead>
        <tr>
            <th>Ferramentas <br> Estoque</th>
            <th>Tempo de <br> Ressurgimento</th>
            <th>Média feita<br>por Node</th>
            <th><button onclick="nodesQuebrados()">Calcular</button><br>${tituloJeitoDeMinerar}</th>
            <th>Tempo Total</th>
            <th>Ferramentas Usadas<br>Gasto Total</th>
            <th>Qtd. Média <br> Adquirida</th> 
            <th>Custo de produção<br>por Unidade</th>             
            <th>Valor de Venda <br> Market P2P</th>
            <th>Qtd. Restante <br> para venda</th>
            <th>Lucro na venda</th>
            <th>Melhor Comprar<br>ou Minerar</th>
        </tr>
        </thead>
        <tbody>
    `;
    
    ferramentas.forEach(ferramenta => {

        //simplificar para colocar os recursos na tabela
        let imagemRecurso = mapaDeMinerals[ferramenta.recursoAdquirido].id;
        let nomeRecurso = mapaDeMinerals[ferramenta.recursoAdquirido].name;
        let nodesDoRecurso = Number(mapaDeMinerals[ferramenta.recursoAdquirido].qtdNodes);
        let mediaPorNodeDoRecurso = mapaDeMinerals[ferramenta.recursoAdquirido].mediaPorNode;
        let tempoRessurgimentoRecurso = mapaDeMinerals[ferramenta.recursoAdquirido].tempoComBuff;
        let custoDaFerramentaEmFlower = (1 / flowerEmCoins) * ferramenta.custoTotalEmCoins;

        let vezesQuePretendeMinerar = mapaDeMinerals[ferramenta.recursoAdquirido].qtdQuebradasConvertidas;
        let ferramentasUsadas = vezesQuePretendeMinerar * ferramenta.quantidade;
        let totalDeRecursosFarmados = mapaDeMinerals[ferramenta.recursoAdquirido].qtdQuebradasConvertidas * mapaDeMinerals[ferramenta.recursoAdquirido].mediaPorNode;
        let tempoTotalDoMinerio = tempoRessurgimentoRecurso * Math.ceil(vezesQuePretendeMinerar / nodesDoRecurso); //rever isto

        //rever posições 
        let valorMarketRecursos = Number(mapaDeMinerals[ferramenta.recursoAdquirido].valorMarket);
        let custoPorUnidadeRecursoEmFlower = Number(mapaDeMinerals[ferramenta.recursoAdquirido].custoEmFlower);
        let totalRecursoGastoComFerramenta = mapaDeMinerals[ferramenta.recursoAdquirido].gastoComFerramentas;
        let gastoComFerramentas = ferramentasUsadas * ferramenta.custoTotalEmCoins;
        let gastoConvertidoEmFlower = (1 / flowerEmCoins) * gastoComFerramentas;

        let oqueSobraOuFalta = totalDeRecursosFarmados - totalRecursoGastoComFerramenta;

        let lucroFlower = 0;
        if (valorMarketRecursos * oqueSobraOuFalta < 0) {
            lucroFlower = valorMarketRecursos * oqueSobraOuFalta;
        } else if (mapaDeMinerals[ferramenta.recursoAdquirido].vezesQueVaiQuebrar == 0 || ilha === 'Basic') {
            lucroFlower = 0;
        } else {
            lucroFlower = (valorMarketRecursos * oqueSobraOuFalta) * (1 - (taxa * desconto));
        }
        lucroTotalFlower += lucroFlower;

        let comprarOuMinerar;
        if (valorMarketRecursos > custoPorUnidadeRecursoEmFlower || nomeRecurso === 'Oil') {
            comprarOuMinerar = 'Minerar';
        } else if (valorMarketRecursos < custoPorUnidadeRecursoEmFlower) {
            comprarOuMinerar = 'Comprar';
        } else {
            comprarOuMinerar = '-'
        };

        //Total de reestock feitos com as ferramentas
        if(Math.ceil(ferramentasUsadas / ferramenta.estoqueComBuff) > reestockFerramentas){
            reestockFerramentas = Math.ceil(ferramentasUsadas / ferramenta.estoqueComBuff);
        }
        
        tabelaMinerios += `
        <tr>
            <td><img src="./minerais/${ferramenta.id}.png" class="crop-img">${ferramenta.name} <br> <img src="./icones/reestock.png" class="crop-img">${ferramenta.estoqueComBuff}</td>
            <td><img src="./icones/tempo.png" class="crop-img">${formatarTempoDaCrop(tempoRessurgimentoRecurso)}</td>
            <td>${nomeRecurso} <br> <img src="./minerais/${imagemRecurso}.png" class="crop-img">${mediaPorNodeDoRecurso.toFixed(3)}</td>
            <td><input type="number" placeholder="" data-name="${mapaDeMinerals[ferramenta.recursoAdquirido].id}" class="quantidade-input" value="${mapaDeMinerals[ferramenta.recursoAdquirido].vezesQueVaiQuebrar}"></td>
            <td><img src="./icones/tempo.png" class="crop-img">${formatarTempoDaCrop(tempoTotalDoMinerio)}</td>
            <td><img src="./minerais/${ferramenta.id}.png" class="crop-img">${ferramentasUsadas.toFixed(2)}<br><img src="./icones/flower.png" class="crop-img">${gastoConvertidoEmFlower.toFixed(4)}</td>
            <td><img src="./minerais/${imagemRecurso}.png" class="crop-img">${totalDeRecursosFarmados.toFixed(2)}</td>
            <td><img src="./icones/flower.png" class="crop-img">${custoPorUnidadeRecursoEmFlower.toFixed(4)}</td>
            <td><img src="./icones/flower.png" class="crop-img">${valorMarketRecursos.toFixed(4)}</td>
            <td><img src="./minerais/${imagemRecurso}.png" class="crop-img">${oqueSobraOuFalta.toFixed(2)}</td>
            <td><img src="./icones/flower.png" class="crop-img">${(lucroFlower).toFixed(4)}</td>
            <td>${comprarOuMinerar}</td>
        </tr>
        `;

    });
    tabelaMinerios += `</tbody></table>`;


    //para separar o preenchimento quando for pescar ou cavar!
    let tabelaPescaEEscavacao = `
    <table class="tabela-pesca-escavacao">
        <thead>
            <tr>
                <th>Ferramentas <br> Estoque</th>
                <th>Usos disponiveis<br>Diariamente</th>
                <th></th>
                <th><button onclick="nodesQuebrados()">Calcular</button><br>Qtd que vai usar</th>
                <th>Ferramentas Usadas<br>Gasto Total</th>
            </tr>
        </thead>
        <tbody>
    `;

    ferramentasSecundarias.forEach(ferramenta => {

        let vezesQuePretendeMinerar = mapaDeMinerals[ferramenta.recursoAdquirido].qtdQuebradasConvertidas;
        let ferramentasUsadas = vezesQuePretendeMinerar * ferramenta.quantidade;
        let gastoComFerramentas = ferramentasUsadas * ferramenta.custoTotalEmCoins;
        let gastoConvertidoEmFlower = (1 / flowerEmCoins) * gastoComFerramentas;

        //Total de reestock feitos com as ferramentas
        if(Math.ceil(ferramentasUsadas / ferramenta.estoqueComBuff) > reestockFerramentas){
            reestockFerramentas = Math.ceil(ferramentasUsadas / ferramenta.estoqueComBuff);
        }


        tabelaPescaEEscavacao += `
            <tr>
                <td><img src="./minerais/${ferramenta.id}.png" class="crop-img">${ferramenta.name} <br> <img src="./icones/reestock.png" class="crop-img">${ferramenta.estoqueComBuff}</td>
                <td>${ferramenta.limiteComBuff}x<td>
                <td><input type="number" placeholder="" data-name="${mapaDeMinerals[ferramenta.recursoAdquirido].id}" class="quantidade-input" value="${mapaDeMinerals[ferramenta.recursoAdquirido].vezesQueVaiQuebrar}"></td>
                <td><img src="./minerais/${ferramenta.id}.png" class="crop-img">${ferramentasUsadas.toFixed(2)}<br><img src="./icones/flower.png" class="crop-img">${gastoConvertidoEmFlower.toFixed(4)}</td>

            </tr>
            `
    });
    tabelaPescaEEscavacao += `</tbody></table>`;

    
    lucroTotalFlower -= (coinsGastas / flowerEmCoins) +
        (leatherGastos * mapaMarketRecursos['leather'].valor) +
        (woolGastas * mapaMarketRecursos['wool'].valor);

    let precoRestockFerramentasDolar = precoPorGem * (reestockFerramentas * 10);
    let precoRestockFerramentasFlower = precoDaGemEmFlower * (reestockFerramentas * 10);

    let tabelaResultadoFinalMinerios = `
        <div class="resumo-cards">
            <div class="card">
                <div class="card-title"><h3>Total Recursos Gastos</h3></div>
                <div class="card-value">
                    <img src="./icones/coins.png" class="crop-img">${coinsGastas.toFixed(2)} | <img src="./minerais/wood.png" class="crop-img">${woodGastas} | <img src="./minerais/stone.png" class="crop-img">${stoneGastas} |
                    <img src="./minerais/iron.png" class="crop-img">${ironGastos} | <img src="./minerais/gold.png" class="crop-img">${goldGastos}<br>
                    <img src="./minerais/crimstone.png" class="crop-img">${crimstoneGastas} | <img src="./minerais/oil.png" class="crop-img">${oilGastos} | <img src="./animais/leather.png" class="crop-img">${leatherGastos} | <img src="./animais/wool.png" class="crop-img">${woolGastas}<br>
                    <br>Total convertido: <img src="./icones/flower.png" class="crop-img">${gastosConvertidoEmFlower.toFixed(2)}   
                </div>
            </div>
            <div class="card">
                <div class="card-title"><h3>Gasto com Restock</h3></div>
                <div class="card-value">
                    Quantidade: ${reestockFerramentas} = <img src="icones/gem.png" class="crop-img">${reestockFerramentas * 10}<br>
                    <img src="icones/flower.png" class="crop-img">${precoRestockFerramentasFlower.toFixed(4)} ~
                    <img src="icones/usdc.png" class="crop-img">$${precoRestockFerramentasDolar.toFixed(4)}
                </div>
            </div>
            <div class="card">
                <div class="card-title"><h3>Lucro Total <br>(Gems Descontadas)</h3></div>
                <div class="card-value">
                    <img src="icones/flower.png" class="crop-img"> ${(lucroTotalFlower - precoRestockFerramentasFlower).toFixed(4)} ~ 
                    <img src="icones/usdc.png" class="crop-img">$${((lucroTotalFlower - precoRestockFerramentasFlower) * precoDoFlower).toFixed(4)}
                </div>
            </div>
        </div>
        `;
    
    mostrarResultadoMinerals.innerHTML = `
        <div class="tabelas-em-ordem">
            ${tabelaResultadoFinalMinerios}
            ${tabelaMinerios}
            ${tabelaPescaEEscavacao}
        </div>
    `;

};


