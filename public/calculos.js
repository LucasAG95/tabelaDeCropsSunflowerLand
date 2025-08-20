//aba destinada a inputs que resultaram em calculos para alteração de quantidade dentro da aba recursos (crops).

function buffsAdicionados() {
    crops.forEach(crop => {
        
    
        //buffs que alteram a quantidade de crop por plot!
        let multiplicaBuff = 1; //buffs de % na quantidade serao calculados aqui!
        let somaBuff = 0; //buffs que somam quantidade serao calculados aqui!
        let somaAreaBuff = 0; //buffs que afetam area e quantidade serao calculados aqui!
        let somaDebuff = 0; //deBuffs que diminuem a quantidade serao calculados aqui!
        let instaCrop = 1; //buffs que crescem insta e afetam quantidade serao calculados aqui!

        //buffs que alteram o tempo da crops!
        let tempoReduzido = 1; //buffs que reduzem o tempo da crop serao calculados aqui!

        //buffs que alteram o estoque das crops!
        let estoqueBuff = 1; //buffs de % que afetam o estoque serao calculados aqui!

        //buffs que alteram o custo de sementes e venda das crops!
        let coinsCustoBuff = 1; //buffs que reduz o custo da coins será calculado aqui (Loja de sementes)!
        let coinsVendaBuff = 1; //buffs que aumenta o valor de venda em coins será calculado aqui (Loja de sementes)!

        skillsCrops.tierLegacy.forEach(legacy => {

            if (legacy.possui === true && legacy.afeta.includes('quantidade') && legacy.sinal === 'x' && 
            (legacy.tipoDeCrop === 'todas' || legacy.tipoDeCrop.includes(crop.tier) || legacy.tipoDeCrop.includes(crop.name))) {
                multiplicaBuff *= legacy.buff;
            };

            if (legacy.possui === true && legacy.afeta.includes('tempo') && legacy.sinal === 'x' && 
            (legacy.tipoDeCrop === 'todas' || legacy.tipoDeCrop.includes(crop.tier) || legacy.tipoDeCrop.includes(crop.name))) {
                tempoReduzido *= legacy.buff;
            };
            
            if (legacy.possui === true && legacy.afeta.includes('vendaCoins') && legacy.sinal === 'x' && 
            (legacy.tipoDeCrop === 'todas' || legacy.tipoDeCrop.includes(crop.tier) || legacy.tipoDeCrop.includes(crop.name))) {
                coinsVendaBuff *= legacy.buff;
            };

        });

        skillsCrops.tier1.forEach(tier1 => {
            
            //buffs que alteram a quantidade de crop por plot
            if(tier1.possui === true && tier1.afeta.includes('quantidade') && tier1.sinal === 'x' && 
            (tier1.tipoDeCrop === 'todas' || tier1.tipoDeCrop.includes(crop.tier) || tier1.tipoDeCrop.includes(crop.name))) {
                multiplicaBuff *= tier1.buff;
            };

            if(tier1.possui === true && tier1.afeta.includes('quantidade') && tier1.sinal === '+' && 
            (tier1.tipoDeCrop === 'todas' || tier1.tipoDeCrop.includes(crop.tier) || tier1.tipoDeCrop.includes(crop.name))) {
                somaBuff += tier1.buff;
            };

            if(tier1.possui === true && tier1.afeta.includes('areaQtd') && tier1.sinal === '+' && 
            (tier1.tipoDeCrop === 'todas' || tier1.tipoDeCrop.includes(crop.tier) || tier1.tipoDeCrop.includes(crop.name))) {
                somaAreaBuff += tier1.buff;
            };

            //buffs que alteram o tempo da crop
            if(tier1.possui === true && tier1.afeta.includes('tempo') && tier1.sinal === 'x' && 
            (tier1.tipoDeCrop === 'todas' || tier1.tipoDeCrop.includes(crop.tier) || tier1.tipoDeCrop.includes(crop.name))) {
                tempoReduzido *= tier1.buff;
            };

            //buffs que alteram a quantidade de sementes do estoque
            if(tier1.possui === true && tier1.afeta.includes('estoque') && tier1.sinal === 'x' && 
            (tier1.tipoDeCrop === 'todas' || tier1.tipoDeCrop.includes(crop.tier) || tier1.tipoDeCrop.includes(crop.name))) {
                estoqueBuff *= tier1.buff;
            };

            //buffs que alteram compra e venda de Crops na loja de sementes
            if(tier1.possui === true && tier1.afeta.includes('custoCoins') && tier1.sinal === 'x' && 
            (tier1.tipoDeCrop === 'todas' || tier1.tipoDeCrop.includes(crop.tier) || tier1.tipoDeCrop.includes(crop.name))) {
                coinsCustoBuff *= tier1.buff;
            };

            if(tier1.possui === true && tier1.afeta.includes('vendaCoins') && tier1.sinal === 'x' && 
            (tier1.tipoDeCrop === 'todas' || tier1.tipoDeCrop.includes(crop.tier) || tier1.tipoDeCrop.includes(crop.name))) {
                coinsVendaBuff *= tier1.buff;
            };

        });

        skillsCrops.tier2.forEach(tier2 => {
            
            //buffs que alteram a quantidade de crop por plot
            if(tier2.possui === true && tier2.afeta.includes('quantidade') && tier2.sinal === 'x' && 
            (tier2.tipoDeCrop === 'todas' || tier2.tipoDeCrop.includes(crop.tier) || tier2.tipoDeCrop.includes(crop.name))) {
                multiplicaBuff *= tier2.buff;
            };

            if(tier2.possui === true && tier2.afeta.includes('quantidade') && tier2.sinal === '+' && 
            (tier2.tipoDeCrop === 'todas' || tier2.tipoDeCrop.includes(crop.tier) || tier2.tipoDeCrop.includes(crop.name))) {
                somaBuff += tier2.buff;
            };

            if(tier2.possui === true && tier2.afeta.includes('areaQtd') && tier2.sinal === '+' && 
            (tier2.tipoDeCrop === 'todas' || tier2.tipoDeCrop.includes(crop.tier) || tier2.tipoDeCrop.includes(crop.name))) {
                somaAreaBuff += tier2.buff;
            };

            //buffs que alteram o tempo da crop
            if(tier2.possui === true && tier2.afeta.includes('tempo') && tier2.sinal === 'x' && 
            (tier2.tipoDeCrop === 'todas' || tier2.tipoDeCrop.includes(crop.tier) || tier2.tipoDeCrop.includes(crop.name))) {
                tempoReduzido *= tier2.buff;
            };

            //buffs que alteram a quantidade de sementes do estoque
            if(tier2.possui === true && tier2.afeta.includes('estoque') && tier2.sinal === 'x' && 
            (tier2.tipoDeCrop === 'todas' || tier2.tipoDeCrop.includes(crop.tier) || tier2.tipoDeCrop.includes(crop.name))) {
                estoqueBuff *= tier2.buff;
            };

            //buffs que alteram compra e venda de Crops na loja de sementes
            if(tier2.possui === true && tier2.afeta.includes('custoCoins') && tier2.sinal === 'x' && 
            (tier2.tipoDeCrop === 'todas' || tier2.tipoDeCrop.includes(crop.tier) || tier2.tipoDeCrop.includes(crop.name))) {
                coinsCustoBuff *= tier2.buff;
            };

            if(tier2.possui === true && tier2.afeta.includes('vendaCoins') && tier2.sinal === 'x' && 
            (tier2.tipoDeCrop === 'todas' || tier2.tipoDeCrop.includes(crop.tier) || tier2.tipoDeCrop.includes(crop.name))) {
                coinsVendaBuff *= tier2.buff;
            };
            
        });

        skillsCrops.tier3.forEach(tier3 => {
            
            //buffs que alteram a quantidade de crop por plot
            if(tier3.possui === true && tier3.afeta.includes('quantidade') && tier3.sinal === 'x' && 
            (tier3.tipoDeCrop === 'todas' || tier3.tipoDeCrop.includes(crop.tier) || tier3.tipoDeCrop.includes(crop.name))) {
                multiplicaBuff *= tier3.buff;
            };

            if(tier3.possui === true && tier3.afeta.includes('quantidade') && tier3.sinal === '+' && 
            (tier3.tipoDeCrop === 'todas' || tier3.tipoDeCrop.includes(crop.tier) || tier3.tipoDeCrop.includes(crop.name))) {
                somaBuff += tier3.buff;
            };

            if(tier3.possui === true && tier3.afeta.includes('areaQtd') && tier3.sinal === '+' && 
            (tier3.tipoDeCrop === 'todas' || tier3.tipoDeCrop.includes(crop.tier) || tier3.tipoDeCrop.includes(crop.name))) {
                somaAreaBuff += tier3.buff;
            };

            if(tier3.possui === true && tier3.afeta.includes('quantidade') && tier3.sinal === '+' && tier3.cropReduzida &&
            (tier3.cropReduzida === 'todas' || tier3.cropReduzida.includes(crop.tier) || tier3.cropReduzida.includes(crop.name))) {
                somaDebuff += tier3.deBuff;
            };

            //buffs que alteram o tempo da crop
            if(tier3.possui === true && tier3.afeta.includes('tempo') && tier3.sinal === 'x' && 
            (tier3.tipoDeCrop === 'todas' || tier3.tipoDeCrop.includes(crop.tier) || tier3.tipoDeCrop.includes(crop.name))) {
                tempoReduzido *= tier3.buff;
            };

            //buffs que alteram a quantidade de sementes do estoque
            if(tier3.possui === true && tier3.afeta.includes('estoque') && tier3.sinal === 'x' && 
            (tier3.tipoDeCrop === 'todas' || tier3.tipoDeCrop.includes(crop.tier) || tier3.tipoDeCrop.includes(crop.name))) {
                estoqueBuff *= tier3.buff;
            };

            //buffs que alteram compra e venda de Crops na loja de sementes
            if(tier3.possui === true && tier3.afeta.includes('custoCoins') && tier3.sinal === 'x' && 
            (tier3.tipoDeCrop === 'todas' || tier3.tipoDeCrop.includes(crop.tier) || tier3.tipoDeCrop.includes(crop.name))) {
                coinsCustoBuff *= tier3.buff;
            };

            if(tier3.possui === true && tier3.afeta.includes('vendaCoins') && tier3.sinal === 'x' && 
            (tier3.tipoDeCrop === 'todas' || tier3.tipoDeCrop.includes(crop.tier) || tier3.tipoDeCrop.includes(crop.name))) {
                coinsVendaBuff *= tier3.buff;
            };
            
        });

        collectiblesCrops.forEach(collectibles => {
            
            //buffs que alteram a quantidade de crop por plot
            if(collectibles.possui === true && collectibles.afeta.includes('quantidade') && collectibles.sinal === 'x' && (collectibles.estacao.includes(estacao) || collectibles.estacao === 'todas') &&
            (collectibles.tipoDeCrop === 'todas' || collectibles.tipoDeCrop.includes(crop.tier) || collectibles.tipoDeCrop.includes(crop.name))) {
                multiplicaBuff *= collectibles.buff;
            };

            if(collectibles.possui === true && collectibles.afeta.includes('quantidade') && collectibles.sinal === '+' && (collectibles.estacao.includes(estacao) || collectibles.estacao === 'todas') &&
            (collectibles.tipoDeCrop === 'todas' || collectibles.tipoDeCrop.includes(crop.tier) || collectibles.tipoDeCrop.includes(crop.name))) {
                somaBuff += collectibles.buff;
            };

            if(collectibles.possui === true && collectibles.afeta.includes('areaQtd') && collectibles.sinal === '+' && (collectibles.estacao.includes(estacao) || collectibles.estacao === 'todas') &&
            (collectibles.tipoDeCrop === 'todas' || collectibles.tipoDeCrop.includes(crop.tier) || collectibles.tipoDeCrop.includes(crop.name))) {
                somaAreaBuff += collectibles.buff;
            };

            if(collectibles.possui === true && collectibles.afeta.includes('instantaneo') && collectibles.sinal === 'x' && (collectibles.estacao.includes(estacao) || collectibles.estacao === 'todas') &&
            (collectibles.tipoDeCrop === 'todas' || collectibles.tipoDeCrop.includes(crop.tier) || collectibles.tipoDeCrop.includes(crop.name))) {
                instaCrop *= collectibles.buff;
            };

            //buffs que alteram o tempo da crop
            if(collectibles.possui === true && collectibles.afeta.includes('tempo') && collectibles.sinal === 'x' && (collectibles.estacao.includes(estacao) || collectibles.estacao === 'todas') &&
            (collectibles.tipoDeCrop === 'todas' || collectibles.tipoDeCrop.includes(crop.tier) || collectibles.tipoDeCrop.includes(crop.name))) {
                tempoReduzido *= collectibles.buff;
            };

            //buffs que alteram a quantidade de sementes do estoque
            if(collectibles.possui === true && collectibles.afeta.includes('estoque') && collectibles.sinal === 'x' && (collectibles.estacao.includes(estacao) || collectibles.estacao === 'todas') &&
            (collectibles.tipoDeCrop === 'todas' || collectibles.tipoDeCrop.includes(crop.tier) || collectibles.tipoDeCrop.includes(crop.name))) {
                estoqueBuff *= collectibles.buff;
            };

            //buffs que alteram compra e venda de Crops na loja de sementes
            if(collectibles.possui === true && collectibles.afeta.includes('custoCoins') && collectibles.sinal === 'x' && (collectibles.estacao.includes(estacao) || collectibles.estacao === 'todas') &&
            (collectibles.tipoDeCrop === 'todas' || collectibles.tipoDeCrop.includes(crop.tier) || collectibles.tipoDeCrop.includes(crop.name))) {
                coinsCustoBuff *= collectibles.buff;
            };

            if(collectibles.possui === true && collectibles.afeta.includes('vendaCoins') && collectibles.sinal === 'x' && (collectibles.estacao.includes(estacao) || collectibles.estacao === 'todas') &&
            (collectibles.tipoDeCrop === 'todas' || collectibles.tipoDeCrop.includes(crop.tier) || collectibles.tipoDeCrop.includes(crop.name))) {
                coinsVendaBuff *= collectibles.buff;
            };
            
        });

        wearablesCrops.forEach(wearables => {
            
            //buffs que alteram a quantidade de crop por plot
            if(wearables.possui === true && wearables.afeta.includes('quantidade') && wearables.sinal === 'x' &&  (wearables.estacao.includes(estacao) || wearables.estacao === 'todas') &&
            (wearables.tipoDeCrop === 'todas' || wearables.tipoDeCrop.includes(crop.tier) || wearables.tipoDeCrop.includes(crop.name))) {
                multiplicaBuff *= wearables.buff;
            };

            if(wearables.possui === true && wearables.afeta.includes('quantidade') && wearables.sinal === '+' &&  (wearables.estacao.includes(estacao) || wearables.estacao === 'todas') &&
            (wearables.tipoDeCrop === 'todas' || wearables.tipoDeCrop.includes(crop.tier) || wearables.tipoDeCrop.includes(crop.name))) {
                somaBuff += wearables.buff;
            };

            if(wearables.possui === true && wearables.afeta.includes('areaQtd') && wearables.sinal === '+' && (wearables.estacao.includes(estacao) || wearables.estacao === 'todas') &&
            (wearables.tipoDeCrop === 'todas' || wearables.tipoDeCrop.includes(crop.tier) || wearables.tipoDeCrop.includes(crop.name))) {
                somaAreaBuff += wearables.buff;
            };

            if(wearables.possui === true && wearables.afeta.includes('instantaneo') && wearables.sinal === 'x' && (wearables.estacao.includes(estacao) || wearables.estacao === 'todas') &&
            (wearables.tipoDeCrop === 'todas' || wearables.tipoDeCrop.includes(crop.tier) || wearables.tipoDeCrop.includes(crop.name))) {
                instaCrop *= wearables.buff;
            };

            //buffs que alteram o tempo da crop
            if(wearables.possui === true && wearables.afeta.includes('tempo') && wearables.sinal === 'x' && (wearables.estacao.includes(estacao) || wearables.estacao === 'todas') &&
            (wearables.tipoDeCrop === 'todas' || wearables.tipoDeCrop.includes(crop.tier) || wearables.tipoDeCrop.includes(crop.name))) {
                tempoReduzido *= wearables.buff;
            };

            //buffs que alteram a quantidade de sementes do estoque
            if(wearables.possui === true && wearables.afeta.includes('estoque') && wearables.sinal === 'x' && (wearables.estacao.includes(estacao) || wearables.estacao === 'todas') &&
            (wearables.tipoDeCrop === 'todas' || wearables.tipoDeCrop.includes(crop.tier) || wearables.tipoDeCrop.includes(crop.name))) {
                estoqueBuff *= wearables.buff;
            };

            //buffs que alteram compra e venda de Crops na loja de sementes
            if(wearables.possui === true && wearables.afeta.includes('custoCoins') && wearables.sinal === 'x' && (wearables.estacao.includes(estacao) || wearables.estacao === 'todas') &&
            (wearables.tipoDeCrop === 'todas' || wearables.tipoDeCrop.includes(crop.tier) || wearables.tipoDeCrop.includes(crop.name))) {
                coinsCustoBuff *= wearables.buff;
            };

            if(wearables.possui === true && wearables.afeta.includes('vendaCoins') && wearables.sinal === 'x' && (wearables.estacao.includes(estacao) || wearables.estacao === 'todas') &&
            (wearables.tipoDeCrop === 'todas' || wearables.tipoDeCrop.includes(crop.tier) || wearables.tipoDeCrop.includes(crop.name))) {
                coinsVendaBuff *= wearables.buff;
            };   

        });

        //buffs temporarios caso possua evento no dia
        if (eventoBonus === 'sunshower') {
            tempoReduzido *= 0.5;
        } else if (eventoBonus === 'bountifulHarvest') {
            somaBuff += 1;
        };

        //altera resultados dentro da lista de Crops
        crop.quantidadePorPlot = (multiplicaBuff + somaBuff + (somaAreaBuff / plots) - somaDebuff) * instaCrop;
        crop.tempoFinal = crop.tempo * tempoReduzido;
        crop.custoFinal = crop.custoDaSemente * coinsCustoBuff;
        crop.vendaFinal = crop.vendaDaCrop * coinsVendaBuff;
        crop.estoqueFinal = crop.estoqueDeSementes * estoqueBuff;
        
    });
    statusCrops();
};

// Ele vai servir como um "atalho" para encontrar qualquer NFT pelo seu id
let mapaDeCollectibles = {}; // cria objeto vazio para guardar NFTs por id
collectiblesCrops.forEach(collectibles => { //vai verificar e organizar por id das NFTs no mapaDeCollectibles, foi oque entendi
    mapaDeCollectibles[collectibles.id] = collectibles; // adiciona cada NFT no objeto usando o id como chave
});
console.log(mapaDeCollectibles)

// Ele vai servir como um "atalho" para encontrar qualquer Skill pelo seu id
let mapaDeSkills = {};
todasSkillsDeCrops.forEach(skills => { //vai verificar e organizar por id das Skills no mapaDeSkills, foi oque entendi
    mapaDeSkills[skills.id] = skills; // vai colocar no mapaDeSkills o nome por id de cada NFT e em ordem alfabetica pelo que vi, parace q transforma a lista em objetos 
});
console.log(mapaDeSkills);

//função responsavel por verificar se skills/NFTs possuem algum bonus ativado por outra skill/NFT
function ativarBonusDasNftsESkills() {
    let mudouBuff;

    do {
        mudouBuff = false;

        collectiblesCrops.forEach(collectibles => {
            let buffAplicado = collectibles.buffBase ?? collectibles.buff;

            if(collectibles.condicional) {
                let depende = mapaDeCollectibles[collectibles.condicional.dependeDe];
                if (depende?.possui) buffAplicado = collectibles.condicional.novoBuff;
            };

            if(collectibles.condicionalSkill) {
                let skill = mapaDeSkills[collectibles.condicionalSkill.dependeDe];
                if (skill.possui) buffAplicado = collectibles.condicionalSkill.novoBuff;
            };
        
            if(collectibles.buff !== buffAplicado) {
                collectibles.buff = buffAplicado;
                mudouBuff = true;
            };

        });

    } while (mudouBuff);

};