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
        
        let melhorPorCoinsOuFlower;
        if(lucroFlower === 0){
            melhorPorCoinsOuFlower = '';
        } else if(lucroFlower < (1 / flowerEmCoins) * lucroCoins){
            melhorPorCoinsOuFlower = '<img src="./icones/coins.png" class="crop-img">Coins';
        } else {
            melhorPorCoinsOuFlower = '<img src="./icones/flower.png" class="crop-img">Flower';
        }

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
        </tr>
        `;
    });

    tabelaCrops += `</tbody></table>`;

    // cálculo do resumo
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
        </div>
    `;
}

//================================================================================================================================================================

function statusMinerais(coinsGastas, woodGastas, stoneGastas, ironGastos, goldGastos, crimstoneGastas, oilGastos, leatherGastos, woolGastas) {

    let tabelaMinerios = `
    <table class="tabela-minerais">
        <thead>
        <tr>
            <th>Ferramentas <br> Estoque</th>
            <th>Tempo de <br> Ressurgimento</th>
            <th>Média feita<br>por Node</th>
            <th>Nodes que vai quebrar <br><button onclick="nodesQuebrados()">Salvar</button></th>
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
        let nodesDoRecurso = mapaDeMinerals[ferramenta.recursoAdquirido].qtdNodes;
        let mediaPorNodeDoRecurso = mapaDeMinerals[ferramenta.recursoAdquirido].mediaPorNode;
        let tempoRessurgimentoRecurso = mapaDeMinerals[ferramenta.recursoAdquirido].tempoComBuff;
        let vezesQuePretendeMinerar = mapaDeMinerals[ferramenta.recursoAdquirido].vezesQueVaiQuebrar;
        let valorMarketRecursos = Number(mapaDeMinerals[ferramenta.recursoAdquirido].valorMarket);
        let custoPorUnidadeRecursoEmFlower = (mapaDeMinerals[ferramenta.recursoAdquirido].mediaCustoEmCoins) * (1 / flowerEmCoins);
        let totalDeRecursosFarmados = mapaDeMinerals[ferramenta.recursoAdquirido].vezesQueVaiQuebrar * mapaDeMinerals[ferramenta.recursoAdquirido].mediaPorNode;
        let totalRecursoGastoComFerramenta = mapaDeMinerals[ferramenta.recursoAdquirido].gastoComFerramentas;
        let oqueSobraOuFalta = totalDeRecursosFarmados - totalRecursoGastoComFerramenta;

        
        let tempoTotalDoMinerio = tempoRessurgimentoRecurso * Math.ceil(vezesQuePretendeMinerar / nodesDoRecurso);
        let custoDaFerramentaEmFlower = (1 / flowerEmCoins) * ferramenta.custoTotalEmCoins;
        let ferramentasUsadas = ferramenta.quantidade * vezesQuePretendeMinerar;
        let gastoComFerramentas = ferramentasUsadas * ferramenta.custoTotalEmCoins;
        let gastoConvertidoEmFlower = (1 / flowerEmCoins) * gastoComFerramentas;

        let lucroFlower = mapaDeMinerals[ferramenta.recursoAdquirido].vezesQueVaiQuebrar == 0 || ilha === 'Basic' ? 0 : ((valorMarketRecursos * oqueSobraOuFalta) * (1 - (taxa * desconto)));
        
        let comprarOuMinerar;
        if (valorMarketRecursos > custoPorUnidadeRecursoEmFlower) {
            comprarOuMinerar = 'Minerar';
        } else if (valorMarketRecursos < custoPorUnidadeRecursoEmFlower) {
            comprarOuMinerar = 'Comprar';
        } else {
            comprarOuMinerar = '-'
        };

        tabelaMinerios += `
        <tr>
            <td><img src="./minerais/${ferramenta.id}.png" class="crop-img">${ferramenta.name} <br> <img src="./icones/reestock.png" class="crop-img">${ferramenta.estoqueComBuff}</td>
            <td><img src="./icones/tempo.png" class="crop-img">${formatarTempoDaCrop(tempoRessurgimentoRecurso)}</td>
            <td>${nomeRecurso} <br> <img src="./minerais/${imagemRecurso}.png" class="crop-img">${mediaPorNodeDoRecurso.toFixed(2)}</td>
            <td><input type="number" placeholder="" data-name="${mapaDeMinerals[ferramenta.recursoAdquirido].id}" class="quantidade-input" value="${mapaDeMinerals[ferramenta.recursoAdquirido].vezesQueVaiQuebrar}"></td>
            <td><img src="./icones/tempo.png" class="crop-img">${formatarTempoDaCrop(tempoTotalDoMinerio)}</td>
            <td><img src="./minerais/${ferramenta.id}.png" class="crop-img">${ferramentasUsadas}<br><img src="./icones/flower.png" class="crop-img">${gastoConvertidoEmFlower.toFixed(4)}</td>
            <td><img src="./minerais/${imagemRecurso}.png" class="crop-img">${totalDeRecursosFarmados.toFixed(2)}</td>
            <td><img src="./icones/flower.png" class="crop-img">${custoPorUnidadeRecursoEmFlower.toFixed(4)}</td>
            <td><img src="./icones/flower.png" class="crop-img">${valorMarketRecursos .toFixed(4)}</td>
            <td><img src="./minerais/${imagemRecurso}.png" class="crop-img">${oqueSobraOuFalta.toFixed(2)}</td>
            <td><img src="./icones/flower.png" class="crop-img">${(lucroFlower).toFixed(4)}</td>
            <td>${comprarOuMinerar}</td>
        </tr>
        `;

    });
    tabelaMinerios += `</tbody></table>`;

    let tabelaResultadoFinal = `
        <div class="resumo-cards">
            <div class="card">
                <div class="card-title"><h3>Total Recursos Gastos</h3></div>
                <div class="card-value">
                    <img src="./icones/coins.png" class="crop-img">${coinsGastas.toFixed(2)} - <img src="./minerais/wood.png" class="crop-img">${woodGastas} - <img src="./minerais/stone.png" class="crop-img">${stoneGastas}
                    <img src="./minerais/iron.png" class="crop-img">${ironGastos} - <img src="./minerais/gold.png" class="crop-img">${goldGastos}<br>
                    <img src="./minerais/crimstone.png" class="crop-img">${crimstoneGastas} - <img src="./minerais/oil.png" class="crop-img">${oilGastos} - <img src="./animais/leather.png" class="crop-img">${leatherGastos} - <img src="./animais/wool.png" class="crop-img">${woolGastas}<br>
                </div>
            </div>
            <div class="card">
                <div class="card-title"><h3>Restock</h3></div>
                <div class="card-value">
                    Quantidade:  = <img src="icones/gem.png" class="crop-img"><br>
                    <img src="icones/flower.png" class="crop-img"> ~ 
                    <img src="icones/usdc.png" class="crop-img">$
                </div>
            </div>
            <div class="card">
                <div class="card-title"><h3>Lucro Total do Combo Plantado<br>(Gems Descontadas)</h3></div>
                <div class="card-value">
                    <img src="icones/flower.png" class="crop-img"> ~ 
                    <img src="icones/usdc.png" class="crop-img">$
                </div>
            </div>
            <div class="card">
                <div class="card-title"><h3>Média de Lucro Diário<br>(Não desconta Gems)</h3></div>
                <div class="card-value">
                    <img src="icones/flower.png" class="crop-img">~ 
                    <img src="icones/usdc.png" class="crop-img">$
                </div>
            </div>
        </div>
        `;



    mostrarResultadoMinerals.innerHTML = `
        <div class="tabelas-em-ordem">
            ${tabelaResultadoFinal}
            ${tabelaMinerios}
        </div>
    `;

};