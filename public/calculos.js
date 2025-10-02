//aba destinada a inputs que resultaram em calculos para alteração de quantidade dentro da aba recursos (crops).

function calcularBuffs(recurso, listasDeBuffs) {
    //variaveis aonde os valores vão ser acumulados
    
    //buff de 20% de chance em vir + 1, media de 0.2
    let buffMineraisFixo = 0;
    if (recurso.id === 'wood' || recurso.id === 'stone' || recurso.id === 'iron' || recurso.id === 'gold') buffMineraisFixo = 0.2;

    //Resultado que altera a quantidade do recurso ou crop de acordo com os buffs que tem
    let multiplicaQtd = 1;
    let somaQtd = 0;
    let somaQtdArea = 0;
    let somaDebuff = 0;
    let multiplicaInstaRecurso = 1;

    //altera o tempo que demora para a crop crescer ou recurso ser produzido!
    let mudancaNoTempo = 1;
    
    //muda a quantidade de estoque de crops, ferramentas entre outros recursos que possa vir, de acordo com os buffs que tem
    let multiplicaEstoque = 1;
    let somaEstoque = 0;

    //muda os valores de custo e venda de crops, ferramentas entre outros recursos que possa vir, de acordo com seus buffs
    let reduzirGastoComCoins = 1;
    let multiplicaVendaPorCoins = 1;

    //buffs de eventos que possa vir ocorrer em sunflower land(soma)
    let buffDeEventoSunshower = 1;
    let buffDeEventoBountifulHarvest = 1;

    //esse 'lista' pode ser skills e NFTs, vai percorrer todos os buffs e adicionar o valor as variaveis criadas acima de acordo com regra
    function aplicarBuffs(lista) { 
        lista.forEach(nftOuSkill => {
            if (!nftOuSkill.possui) return; // se o jogador não tem o buff, ignora
        
            
            //confere a estação(se existir na NFT ou skill) - esse ! nessa situação meio que inverte o resultado, oq é true se torna false e vice-versa, isso serve para que o codigo só retorne quando a estação é diferente do q qremos
            if (nftOuSkill.estacao && !(nftOuSkill.estacao === 'todas' || nftOuSkill.estacao.includes(estacao))) return;
            
            //verifica qual propriedade usar: cropReduzida ou recursoReduzido, se possuir
            const tipoReducao = nftOuSkill.cropReduzida || nftOuSkill.recursoReduzido;

            //vai verificar se tem debuff, como não são todas skills e NFTs que possuem crop/recurso reduzido como status, deve vir antes de afetar recurso
            if (nftOuSkill.afeta.includes('quantidade') && nftOuSkill.sinal === '+' && tipoReducao &&
                (tipoReducao === 'todas' || tipoReducao.includes(recurso.tier) || tipoReducao.includes(recurso.name) || tipoReducao.includes(recurso.id))) {
                somaDebuff += nftOuSkill.deBuff;
            };


            //verifica qual propriedade usar: tipoDeCrop ou tipoDeRecurso.
            const tipo = nftOuSkill.tipoDeCrop || nftOuSkill.tipoDeRecurso ;

            const afetaRecurso = 
                tipo === 'todas' ||
                tipo === 'todos' ||
                tipo.includes(recurso.tier) ||
                tipo.includes(recurso.name) ||
                tipo.includes(recurso.id);

            if (!afetaRecurso) return;

            //aplica os efeitos
            if (nftOuSkill.afeta.includes('quantidade') && nftOuSkill.sinal === 'x') multiplicaQtd *= nftOuSkill.buff;
            if (nftOuSkill.afeta.includes('quantidade') && nftOuSkill.sinal === '+') somaQtd += nftOuSkill.buff;
            if (nftOuSkill.afeta.includes('areaQtd') && nftOuSkill.sinal === '+') somaQtdArea += nftOuSkill.buff; 
            
            if (nftOuSkill.afeta.includes('instantaneo') && nftOuSkill.sinal === 'x') multiplicaInstaRecurso *= nftOuSkill.buff[recurso.id] || nftOuSkill.buff;
            if (nftOuSkill.afeta.includes('tempo') && nftOuSkill.sinal === 'x') mudancaNoTempo *= nftOuSkill.buff['tempo'] ||nftOuSkill.buff;
            if (nftOuSkill.afeta.includes('estoque') && nftOuSkill.sinal === 'x') multiplicaEstoque *= nftOuSkill.buff;
            if (nftOuSkill.afeta.includes('estoque') && nftOuSkill.sinal === '+') somaEstoque += nftOuSkill.buff[recurso.id] || nftOuSkill.buff;

            if (nftOuSkill.afeta.includes('custoCoins') && nftOuSkill.sinal === 'x') reduzirGastoComCoins *= nftOuSkill.buff;
            if (nftOuSkill.afeta.includes('vendaCoins') && nftOuSkill.sinal === 'x') multiplicaVendaPorCoins *= nftOuSkill.buff;

            if (nftOuSkill.afeta.includes('melhorarEvento') && eventoBonus === 'sunshower') buffDeEventoSunshower *= nftOuSkill.buff;
            if (nftOuSkill.afeta.includes('melhorarEvento') && eventoBonus === 'bountifulHarvest') buffDeEventoBountifulHarvest *= nftOuSkill.buff;
            
        });
        
    };
    //percorre todas as listas enviadas ate eles acabarem (foi oque entendi)
    listasDeBuffs.forEach(lista => aplicarBuffs(lista));

    // devolve um objeto com todos os valores calculados
    return {
        buffMineraisFixo,
        multiplicaQtd,
        somaQtd,
        somaQtdArea,
        somaDebuff,
        multiplicaInstaRecurso,
        mudancaNoTempo,
        multiplicaEstoque,
        somaEstoque,
        reduzirGastoComCoins,
        multiplicaVendaPorCoins,
        buffDeEventoSunshower,
        buffDeEventoBountifulHarvest
    };

};

function buffsAdicionadosCrops() {
    crops.forEach(crop => {
        // chama a função genérica, passando todas as listas que afetam crops
        const buffs = calcularBuffs(crop, [skillsCrops.tierLegacy, skillsCrops.tier1, skillsCrops.tier2, skillsCrops.tier3, collectiblesCrops, wearablesCrops, novosCollectibles]);
        
        //aplica os buffs no objeto Crop
        crop.quantidadePorPlot =
            (buffs.multiplicaQtd + buffs.somaQtd + (buffs.somaQtdArea / plots) - buffs.somaDebuff + (eventoBountifulHarvest * buffs.buffDeEventoBountifulHarvest)) * buffs.multiplicaInstaRecurso;
        crop.tempoFinal = crop.tempo * buffs.mudancaNoTempo * (eventoSunshower / buffs.buffDeEventoSunshower);
        crop.custoFinal = crop.custoDaSemente * buffs.reduzirGastoComCoins;
        crop.vendaFinal = crop.vendaDaCrop * buffs.multiplicaVendaPorCoins;
        crop.estoqueFinal = crop.estoqueDeSementes * buffs.multiplicaEstoque;
    });

    statusCrops();
};

//==================================================================================================================================================================

function buffsAdicionadosFruits() {
    fruits.forEach(fruta => {
        // chama a função genérica, passando todas as listas que afetam crops
        const buffs = calcularBuffs(fruta, [
            skillsFruits.tier1,
            skillsFruits.tier2,
            skillsFruits.tier3,
            collectiblesFruits,
            wearablesFruits,
            novosCollectibles]);
        
        //aplica os buffs no objeto Crop
        fruta.quantidadePorPlot =
            (buffs.multiplicaQtd + buffs.somaQtd - buffs.somaDebuff + (eventoBountifulHarvest * buffs.buffDeEventoBountifulHarvest)) * buffs.multiplicaInstaRecurso;
        fruta.tempoFinal = fruta.tempo * buffs.mudancaNoTempo;
        fruta.custoFinal = fruta.custoDaSemente * buffs.reduzirGastoComCoins;
        fruta.vendaFinal = fruta.vendaDaCrop * buffs.multiplicaVendaPorCoins;
        fruta.estoqueFinal = (fruta.estoqueDeSementes * buffs.multiplicaEstoque) + buffs.somaEstoque;
        
        fruta.axe = 1;
        if (mapaDeTodasArvoresDeSkills['logger'].possui) fruta.axe *= mapaDeTodasArvoresDeSkills['logger'].buff;
        if (mapaDeTodasArvoresDeSkills['noAxeNoWorries'].possui) fruta.axe *= mapaDeTodasArvoresDeSkills['noAxeNoWorries'].buff;
        if (mapaDeTodosCollectibles['foremanBeaver'].possui) fruta.axe *= mapaDeTodosCollectibles['foremanBeaver'].buff;

        fruta.wood = 1;
        if (mapaDeTodasArvoresDeSkills['noAxeNoWorries'].possui) fruta.wood *= mapaDeTodasArvoresDeSkills['noAxeNoWorries'].buff;
        if (mapaDeTodasArvoresDeSkills['fruityWoody'].possui) fruta.wood += mapaDeTodasArvoresDeSkills['fruityWoody'].buff;
    });
    statusCrops();
};

//==================================================================================================================================================================

function buffsAdicionadosMinerais() {

    minerals.forEach(mineral => {
        // chama a função genérica, passando todas as listas que afetam minerais
        const buffs = calcularBuffs(mineral, [
            skillsTrees.tierLegacy,
            skillsTrees.tier1,
            skillsTrees.tier2,
            skillsTrees.tier3,
            skillsMinerals.tierLegacy, 
            skillsMinerals.tier1, 
            skillsMinerals.tier2, 
            skillsMinerals.tier3,
            skillsMachinery.tier1, 
            skillsMachinery.tier2, 
            skillsMachinery.tier3,
            novosCollectibles,
            novosWearables,
            collectiblesMinerals, 
            wearablesMinerals]);
        
        //conta do buff ao fundir os recursos para um tier maior - / t1 = 1 recurso / t2 = 4 recursos do t1 / t3 = 4 recursos do t2 (16 recursos t1)
        let buffRecursoTier2 = Number(mineral.qtdNodesT2 * 0.5);
        let buffRecursoTier3 = Number(mineral.qtdNodesT3 * 2.5);
        let buffMedioGeralAAdicionar = (buffRecursoTier2 + buffRecursoTier3) / Number(mineral.qtdNodes);

        mineral.mediaPorNode =
            ((mineral.mediaPorNodePadrao * buffs.multiplicaQtd) + buffMedioGeralAAdicionar + buffs.somaQtd + buffs.buffMineraisFixo + (buffs.somaQtdArea / mineral.qtdNodes) - buffs.somaDebuff)  * buffs.multiplicaInstaRecurso;
        mineral.tempoComBuff = mineral.tempoPadrao * buffs.mudancaNoTempo;
    });

    ferramentas.forEach(ferramenta => {
        // chama a função genérica, passando todas as listas que afetam as ferramentas
        const buffs = calcularBuffs(ferramenta, [
            skillsTrees.tierLegacy,
            skillsTrees.tier1,
            skillsTrees.tier2,
            skillsTrees.tier3,
            skillsMinerals.tierLegacy, 
            skillsMinerals.tier1, 
            skillsMinerals.tier2, 
            skillsMinerals.tier3,
            novosCollectibles,
            novosWearables,
            collectiblesMinerals, 
            wearablesMinerals]);

        ferramenta.quantidade = 
            (buffs.multiplicaQtd) * buffs.multiplicaInstaRecurso;
        ferramenta.coins = ferramenta.coinsPadrao * buffs.reduzirGastoComCoins;
        ferramenta.estoqueComBuff = Math.ceil(ferramenta.estoquePadrao * buffs.multiplicaEstoque) + buffs.somaEstoque;
    });
    valoresMineriosEFerramentasEGastos();
};

function valoresMineriosEFerramentasEGastos() {
    
    //definir preço do machado e madeira
    mapaDeFerramentas['axe'].custoTotalEmCoins = mapaDeFerramentas['axe'].coins;
    mapaDeMinerals['wood'].mediaCustoEmCoins = (mapaDeFerramentas['axe'].custoTotalEmCoins * mapaDeFerramentas['axe'].quantidade) / mapaDeMinerals['wood'].mediaPorNode;
    mapaDeMinerals['wood'].custoEmFlower = mapaDeMinerals['wood'].mediaCustoEmCoins * (1 / flowerEmCoins);

    //definir preço da picareta e pedra
    mapaDeFerramentas['pickaxe'].custoTotalEmCoins = mapaDeFerramentas['pickaxe'].coins +
    (mapaDeMinerals['wood'].mediaCustoEmCoins * mapaDeFerramentas['pickaxe'].wood);

    mapaDeMinerals['stone'].mediaCustoEmCoins = (mapaDeFerramentas['pickaxe'].custoTotalEmCoins * mapaDeFerramentas['pickaxe'].quantidade) / mapaDeMinerals['stone'].mediaPorNode;
    mapaDeMinerals['stone'].custoEmFlower = mapaDeMinerals['stone'].mediaCustoEmCoins * (1 / flowerEmCoins);

    //definir preço da picareta de pedra e ferro
    mapaDeFerramentas['stonePickaxe'].custoTotalEmCoins = mapaDeFerramentas['stonePickaxe'].coins + 
    (mapaDeMinerals['wood'].mediaCustoEmCoins * mapaDeFerramentas['stonePickaxe'].wood) + 
    (mapaDeMinerals['stone'].mediaCustoEmCoins * mapaDeFerramentas['stonePickaxe'].stone);

    mapaDeMinerals['iron'].mediaCustoEmCoins = (mapaDeFerramentas['stonePickaxe'].custoTotalEmCoins * mapaDeFerramentas['stonePickaxe'].quantidade) / mapaDeMinerals['iron'].mediaPorNode;
    mapaDeMinerals['iron'].custoEmFlower = mapaDeMinerals['iron'].mediaCustoEmCoins * (1 / flowerEmCoins);

    //definir preço da picareta de ferro e ouro
    mapaDeFerramentas['ironPickaxe'].custoTotalEmCoins = mapaDeFerramentas['ironPickaxe'].coins + 
    (mapaDeMinerals['wood'].mediaCustoEmCoins * mapaDeFerramentas['ironPickaxe'].wood) + 
    (mapaDeMinerals['iron'].mediaCustoEmCoins * mapaDeFerramentas['ironPickaxe'].iron);

    mapaDeMinerals['gold'].mediaCustoEmCoins = (mapaDeFerramentas['ironPickaxe'].custoTotalEmCoins * mapaDeFerramentas['ironPickaxe'].quantidade) / mapaDeMinerals['gold'].mediaPorNode;
    mapaDeMinerals['gold'].custoEmFlower = mapaDeMinerals['gold'].mediaCustoEmCoins * (1 / flowerEmCoins);


    //definir preço da picareta de ouro e crimstone
    mapaDeFerramentas['goldPickaxe'].custoTotalEmCoins = mapaDeFerramentas['goldPickaxe'].coins + 
    (mapaDeMinerals['wood'].mediaCustoEmCoins * mapaDeFerramentas['goldPickaxe'].wood) + 
    (mapaDeMinerals['gold'].mediaCustoEmCoins * mapaDeFerramentas['goldPickaxe'].gold);

    mapaDeMinerals['crimstone'].mediaCustoEmCoins = (mapaDeFerramentas['goldPickaxe'].custoTotalEmCoins * mapaDeFerramentas['goldPickaxe'].quantidade) / mapaDeMinerals['crimstone'].mediaPorNode;
    mapaDeMinerals['crimstone'].custoEmFlower = mapaDeMinerals['crimstone'].mediaCustoEmCoins * (1 / flowerEmCoins);

    //definir preço da Oil Drill e oil
    if (mapaDeSkillsMachinery['oilRig'].possui) {
        mapaDeFerramentas['oilDrill'].custoTotalEmCoins = mapaDeFerramentas['oilDrill'].coins + 
        (mapaDeMinerals['wood'].mediaCustoEmCoins * mapaDeFerramentas['oilDrill'].wood) + 
        (mapaDeMinerals['iron'].mediaCustoEmCoins * mapaDeFerramentas['oilDrill'].iron) +
        ((mapaMarketRecursos['wool'].valor * flowerEmCoins) * mapaDeFerramentas['oilDrill'].wool);
    } else {
        mapaDeFerramentas['oilDrill'].custoTotalEmCoins = mapaDeFerramentas['oilDrill'].coins + 
        (mapaDeMinerals['wood'].mediaCustoEmCoins * mapaDeFerramentas['oilDrill'].wood) + 
        (mapaDeMinerals['iron'].mediaCustoEmCoins * mapaDeFerramentas['oilDrill'].iron) +
        ((mapaMarketRecursos['leather'].valor * flowerEmCoins) * mapaDeFerramentas['oilDrill'].leather);
    }
    mapaDeMinerals['oil'].mediaCustoEmCoins = (mapaDeFerramentas['oilDrill'].custoTotalEmCoins * mapaDeFerramentas['oilDrill'].quantidade) / mapaDeMinerals['oil'].mediaPorNode;
    mapaDeMinerals['oil'].custoEmFlower = mapaDeMinerals['oil'].mediaCustoEmCoins * (1 / flowerEmCoins);

    //definir preço médio para pescar
    mapaDeFerramentas['rod'].custoTotalEmCoins = mapaDeFerramentas['rod'].coins +
    (mapaDeMinerals['wood'].mediaCustoEmCoins * mapaDeFerramentas['rod'].wood) +
    (mapaDeMinerals['stone'].mediaCustoEmCoins * mapaDeFerramentas['rod'].stone);

    mapaDeMinerals['peixe'].mediaCustoEmCoins = (mapaDeFerramentas['rod'].custoTotalEmCoins * mapaDeFerramentas['rod'].quantidade) / mapaDeMinerals['peixe'].mediaPorNode;
    mapaDeMinerals['peixe'].custoEmFlower = mapaDeMinerals['peixe'].mediaCustoEmCoins * (1 / flowerEmCoins);

    //definir preço médio para cavar com Sand Shovel
    mapaDeFerramentas['sandShovel'].custoTotalEmCoins = mapaDeFerramentas['sandShovel'].coins +
    (mapaDeMinerals['wood'].mediaCustoEmCoins * mapaDeFerramentas['sandShovel'].wood) +
    (mapaDeMinerals['stone'].mediaCustoEmCoins * mapaDeFerramentas['sandShovel'].stone);

    mapaDeMinerals['escavacao'].mediaCustoEmCoins = (mapaDeFerramentas['sandShovel'].custoTotalEmCoins * mapaDeFerramentas['sandShovel'].quantidade) / mapaDeMinerals['escavacao'].mediaPorNode;
    mapaDeMinerals['escavacao'].custoEmFlower = mapaDeMinerals['escavacao'].mediaCustoEmCoins * (1 / flowerEmCoins);

    //definir preço médio para cavar com Sand Drill
    mapaDeFerramentas['sandDrill'].custoTotalEmCoins = mapaDeFerramentas['sandDrill'].coins +
    (mapaDeMinerals['wood'].mediaCustoEmCoins * mapaDeFerramentas['sandDrill'].wood) +
    (mapaDeMinerals['crimstone'].mediaCustoEmCoins * mapaDeFerramentas['sandDrill'].crimstone) +
    (mapaDeMinerals['oil'].mediaCustoEmCoins * mapaDeFerramentas['sandDrill'].oil) +
    ((mapaMarketRecursos['leather'].valor * flowerEmCoins) * mapaDeFerramentas['sandDrill'].leather);

    mapaDeMinerals['escavacao2'].mediaCustoEmCoins = (mapaDeFerramentas['sandDrill'].custoTotalEmCoins * mapaDeFerramentas['sandDrill'].quantidade) / mapaDeMinerals['escavacao2'].mediaPorNode;
    mapaDeMinerals['escavacao2'].custoEmFlower = mapaDeMinerals['escavacao2'].mediaCustoEmCoins * (1 / flowerEmCoins);

    //==========================================================================================================================================================

    //vai somar o quanto gastei do recurso para criar as ferramentas
    let coinsGastas = 0;
    let woodGastas = 0;
    let stoneGastas = 0;
    let ironGastos = 0;
    let goldGastos = 0;
    let crimstoneGastas = 0;
    let oilGastos = 0;
    let leatherGastos = 0;
    let woolGastas = 0;

    todasFerramentas.forEach(ferramenta => {
        if(ferramenta.coins)
            coinsGastas += ((mapaDeMinerals[ferramenta.recursoAdquirido].qtdQuebradasConvertidas * ferramenta.quantidade) * ferramenta.coins);
        if(ferramenta.wood)
            woodGastas += ((mapaDeMinerals[ferramenta.recursoAdquirido].qtdQuebradasConvertidas * ferramenta.quantidade) * ferramenta.wood);
        if(ferramenta.stone)
            stoneGastas += ((mapaDeMinerals[ferramenta.recursoAdquirido].qtdQuebradasConvertidas * ferramenta.quantidade) * ferramenta.stone);
        if(ferramenta.iron)
            ironGastos += ((mapaDeMinerals[ferramenta.recursoAdquirido].qtdQuebradasConvertidas * ferramenta.quantidade) * ferramenta.iron);
        if(ferramenta.gold)
            goldGastos += ((mapaDeMinerals[ferramenta.recursoAdquirido].qtdQuebradasConvertidas * ferramenta.quantidade) * ferramenta.gold);
        if(ferramenta.crimstone)
            crimstoneGastas += ((mapaDeMinerals[ferramenta.recursoAdquirido].qtdQuebradasConvertidas * ferramenta.quantidade) * ferramenta.crimstone);
        if(ferramenta.oil)
            oilGastos += ((mapaDeMinerals[ferramenta.recursoAdquirido].qtdQuebradasConvertidas * ferramenta.quantidade) * ferramenta.oil);
        
        //se possuir a skill Oil Rig troca pra wool o gasto
        if (mapaDeSkillsMachinery['oilRig'].possui) {
            if(ferramenta.wool)
                woolGastas += ((mapaDeMinerals[ferramenta.recursoAdquirido].qtdQuebradasConvertidas * ferramenta.quantidade) * ferramenta.wool);
        } else {
            if(ferramenta.leather)
                leatherGastos += ((mapaDeMinerals[ferramenta.recursoAdquirido].qtdQuebradasConvertidas * ferramenta.quantidade) * ferramenta.leather);
        }; 
        
    });
    
    mapaDeMinerals['wood'].gastoComFerramentas      = woodGastas;
    mapaDeMinerals['stone'].gastoComFerramentas     = stoneGastas;
    mapaDeMinerals['iron'].gastoComFerramentas      = ironGastos;
    mapaDeMinerals['gold'].gastoComFerramentas      = goldGastos;
    mapaDeMinerals['crimstone'].gastoComFerramentas = crimstoneGastas;
    mapaDeMinerals['oil'].gastoComFerramentas       = oilGastos;
    //mapaDeMinerals['leather'].gastoComFerramentas   = leatherGastos;

    let gastosConvertidoEmFlower = (coinsGastas / flowerEmCoins) +
        (woodGastas * mapaDeMinerals['wood'].custoEmFlower) +
        (stoneGastas * mapaDeMinerals['stone'].custoEmFlower) +
        (ironGastos * mapaDeMinerals['iron'].custoEmFlower) +
        (goldGastos * mapaDeMinerals['gold'].custoEmFlower) +
        (crimstoneGastas * mapaDeMinerals['crimstone'].custoEmFlower) +
        (oilGastos * mapaDeMinerals['oil'].custoEmFlower) +
        (leatherGastos * mapaMarketRecursos['leather'].valor) +
        (woolGastas * mapaMarketRecursos['wool'].valor);


    console.log(`vou gastar: ${coinsGastas} Coins + ${woodGastas} Woods + ${stoneGastas} Stones + ${ironGastos} Irons + ${goldGastos} Golds + ${crimstoneGastas} Crim + ${oilGastos} Oils +  ${leatherGastos} Leather`)
    
    statusMinerais(coinsGastas, woodGastas, stoneGastas, ironGastos, goldGastos, crimstoneGastas, oilGastos, leatherGastos, woolGastas, gastosConvertidoEmFlower);
    statusCrops();
}

//==================================================================================================================================================================

//função responsavel por verificar se skills/NFTs possuem algum bonus ativado por outra skill/NFT
function ativarBonusDasNftsESkills() {
    let mudouBuff;

    do {
        mudouBuff = false;

        todosCollectibles.forEach(collectibles => {
            let buffAplicado = collectibles.buffBase ?? collectibles.buff;

            if(collectibles.condicional) {
                let depende = mapaDeTodosCollectibles[collectibles.condicional.dependeDe];
                if (depende?.possui) buffAplicado = collectibles.condicional.novoBuff;
            };

            if(collectibles.condicionalSkill) {
                let skill = mapaDeTodasArvoresDeSkills[collectibles.condicionalSkill.dependeDe];
                if (skill.possui) buffAplicado = collectibles.condicionalSkill.novoBuff;
            };
        
            if(collectibles.buff !== buffAplicado) {
                collectibles.buff = buffAplicado;
                mudouBuff = true;
            };

        });

    } while (mudouBuff);

};

//==================================================================================================================================================================

//responsavel por ativar buffs de NFTs com tier
function nftsDeTierQuePossuemBuffDoAntecessor() {

    //Espantalhos
    if (kuebiko.checked || scarecrow.checked || nancy.checked) {
        mapaDeCollectiblesCrops['nancy'].possui = true;
    } else {
        mapaDeCollectiblesCrops['nancy'].possui = false;
    }

    if (kuebiko.checked || scarecrow.checked) {
        mapaDeCollectiblesCrops['scarecrow'].possui = true;
    } else {
        mapaDeCollectiblesCrops['scarecrow'].possui = false;
    }

    //Beavers
    if (foremanBeaver.checked || apprenticeBeaver.checked || woodyTheBeaver.checked) {
        mapaDeCollectiblesMinerals['woodyTheBeaver'].possui = true;
    } else {
        mapaDeCollectiblesMinerals['woodyTheBeaver'].possui = false;
    }

    if (foremanBeaver.checked || apprenticeBeaver.checked) {
        mapaDeCollectiblesMinerals['apprenticeBeaver'].possui = true;
    } else {
        mapaDeCollectiblesMinerals['apprenticeBeaver'].possui = false;
    }
    
    buffsAdicionadosCrops();
    buffsAdicionadosMinerais();
};