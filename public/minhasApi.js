//api para puxar valores do flower das crops entre outros recursos
fetch(`/api/proxy?url=https://sfl.world/api/v1/prices`)
  .then(res => res.json())
  .then(data => {  
    atualizarValoresDeVendaPorFlower(data.data.p2p) //vai mandar para a funcção digitada o que ela puxou da api de preços do sfl.world, primeiro data(nome da variavel), o outro data é um objeto que tem p2p como outro objeto dentro, que por sua vez tem outros resultados dentro
    console.log(data.data.p2p)
  })
  .catch(err => {
    console.error('Erro ao puxar a planilha:', err);
  });

//essa função irá inserir o valor de venda por flower das crops e minerais em vendaFlower
function atualizarValoresDeVendaPorFlower(apiValores) {

    marketRecursos.forEach(recurso => {
        if(apiValores[recurso.name]) {
            recurso.valor = apiValores[recurso.name];
            console.log(`O recurso ${recurso.name} está custando ${recurso.valor} flowers!`)
        };
    });
    buffsAdicionadosMinerais();

    crops.forEach(crop => {
        if (apiValores[crop.name]) {
            crop.vendaFlower = apiValores[crop.name];
            console.log(`Crop: ${crop.name} Valor: ${crop.vendaFlower}`);
        };
    });
    buffsAdicionadosCrops();

    fruits.forEach(fruta => {
        if (apiValores[fruta.name]) {
            fruta.vendaFlower = apiValores[fruta.name];
            console.log(`Crop: ${fruta.name} Valor: ${fruta.vendaFlower}`);
        };
    });
    buffsAdicionadosFruits();

    minerals.forEach(mineral => {
        if (apiValores[mineral.name]) {
            mineral.valorMarket = apiValores[mineral.name];
        }
    });
    buffsAdicionadosMinerais();
};

//==========================================================================================================================================================================

//api para puxar valores do flower das NFTs e Wearebles
fetch(`/api/proxy?url=https://sfl.world/api/v1/nfts`)
  .then(res => res.json())
  .then(data => {  
    atualizarValoresDasNfts(data.collectibles, data.wearables) //vai mandar para a funcção digitada o que ela puxou da api de preços do sfl.world, primeiro data(nome da variavel), o outro data é um objeto que tem p2p como outro objeto dentro, que por sua vez tem outros resultados dentro
    console.log(data.wearables)
  })
  .catch(err => {
    console.error('Erro ao puxar a planilha:', err);
  });

//essa função irá inserir o valor de venda por flower das crops em vendaFlower
function atualizarValoresDasNfts(apiCollectibles, apiWearables) {
    // cria o mapa de collectibles pelo id(numero)
    let mapaPrecoCollectibles = {};
    apiCollectibles.forEach(idCollectibles => {
        mapaPrecoCollectibles[idCollectibles.id] = idCollectibles;
    });

    collectiblesCrops.forEach(collectibles => {
        if (mapaPrecoCollectibles[collectibles.idNumber]) {
            collectibles.valor = mapaPrecoCollectibles[collectibles.idNumber].lastSalePrice;
        }
    });

    collectiblesFruits.forEach(collectibles => {
        if (mapaPrecoCollectibles[collectibles.idNumber]) {
            collectibles.valor = mapaPrecoCollectibles[collectibles.idNumber].lastSalePrice;
        }
    });


    collectiblesMinerals.forEach(collectibles => {
        if (mapaPrecoCollectibles[collectibles.idNumber]) {
            collectibles.valor = mapaPrecoCollectibles[collectibles.idNumber].lastSalePrice;
        }
    });   

    // cria o mapa de wearables pelo id(numero)
    let mapaPrecoWearables = {};
    apiWearables.forEach(idWearables => {
        mapaPrecoWearables[idWearables.id] = idWearables;
    });

    wearablesCrops.forEach(wearables => {
        if (mapaPrecoWearables[wearables.idNumber]) {
            wearables.valor = mapaPrecoWearables[wearables.idNumber].lastSalePrice;
        }
    });

    wearablesFruits.forEach(wearables => {
        if (mapaPrecoWearables[wearables.idNumber]) {
            wearables.valor = mapaPrecoWearables[wearables.idNumber].lastSalePrice;
        }
    });

    wearablesMinerals.forEach(wearables => {
        if (mapaPrecoWearables[wearables.idNumber]) {
            wearables.valor = mapaPrecoWearables[wearables.idNumber].lastSalePrice;
        }
    });

    valorTotalEmNftsETotalPontosEmSkills();

    // ⚡ Atualiza o conteúdo dos tooltips (sem re-renderizar os NFTs)
    document.querySelectorAll('.nft-wrapper').forEach(wrapper => {
        const checkbox = wrapper.querySelector('input');
        if (!checkbox) return;

        const nft = [...collectiblesCrops, ...wearablesCrops, ...collectiblesFruits, ...wearablesFruits, ...collectiblesMinerals, ...wearablesMinerals].find(item => item.id === checkbox.id);
        if (!nft) return;

        let valorFlower = precoDoFlower
        let precoDolar = nft.valor * valorFlower;
        const tooltip = wrapper.querySelector('.tooltip');
        if (tooltip) {
            tooltip.innerHTML = `
                <strong>${nft.name}</strong><br>
                ${nft.descricao.portugues || nft.descricao}<br><br>
                Venda: <img src="./icones/flower.png" class="crop-img">
                ${nft.valor} ~ $${precoDolar.toFixed(2)}
            `;
        }
    });

    // ⚡ Mantém o efeito de seguir o mouse
    document.querySelectorAll('.nft-wrapper, .skill-wrapper').forEach(wrapper => {
        const tooltip = wrapper.querySelector('.tooltip');
        wrapper.addEventListener('mousemove', e => {
            tooltip.style.top = e.clientY + 10 + 'px';
            tooltip.style.left = e.clientX + 10 + 'px';
        });
    });
    
}

//==========================================================================================================================================================================

//função responsavel por pesquisar a farm e preencher as informações das funções dentro dela (numeroDaFarm é o id do botão pra essa função)
function numeroDaFarm() {
    let numeroFarmId = document.getElementById('numeroFarm').value;
    console.log("🔎 Buscando farm ID:", numeroFarmId);
    // Faz uma requisição para a API do Sunflower Land, pegando os dados da farm pelo número (numeroFarm).
    
    if (!numeroFarmId) {
        console.error('Por favor, digite o numero da farm para pesquisar!');
        return; // Sai da função se o campo estiver vazio
    }

    //reponsavel por puxar dados da api
    fetch(`/api/proxy?url=https://api.sunflower-land.com/community/farms/${numeroFarmId}`)
        .then(res => res.json()) // Quando a resposta chegar, converte o conteúdo dela para JSON.
        .then(data => {
            
            //infos para marcar skills e NFTs
            const skillsLegacyQuePossui = data.farm.inventory;
            const skillQuePossui = data.farm.bumpkin.skills;
            const collectiblesQuePossui = data.farm.inventory;
            const wearablesQuePossui = data.farm.wardrobe;
            
            marcarNftsESkillsQuePossui(skillsLegacyQuePossui, skillQuePossui, collectiblesQuePossui, wearablesQuePossui);

            //infos para preencher plots/nodes que possue na farm
            const cropPlotsQuePossui = data.farm.inventory['Crop Plot'];

            const fruitPlotsQuePossui = data.farm.inventory['Fruit Patch'];

            const treeQuePossui = data.farm.inventory['Tree'];
            const treeT2QuePossui = data.farm.inventory['Ancient Tree'];
            const treeT3QuePossui = data.farm.inventory['Sacred Tree'];

            const stoneQuePossui = data.farm.inventory['Stone Rock'];
            const stoneT2QuePossui = data.farm.inventory['Fused Stone Rock'];
            const stoneT3QuePossui = data.farm.inventory['Reinforced Stone Rock'];

            const ironQuePossui = data.farm.inventory['Iron Rock'];
            const ironT2QuePossui = data.farm.inventory['Refined Iron Rock'];
            const ironT3QuePossui = data.farm.inventory['Tempered Iron Rock'];

            const goldQuePossui = data.farm.inventory['Gold Rock'];
            const goldT2QuePossui = data.farm.inventory['Pure Gold Rock'];
            const goldT3QuePossui = data.farm.inventory['Prime Gold Rock'];

            const crimstoneQuePossui = data.farm.inventory['Crimstone Rock'];

            const oilQuePossui = data.farm.inventory['Oil Reserve'];

            preencherInformacoesDaFarm(
                cropPlotsQuePossui, fruitPlotsQuePossui, 
                treeQuePossui, treeT2QuePossui, treeT3QuePossui,
                stoneQuePossui, stoneT2QuePossui, stoneT3QuePossui,
                ironQuePossui, ironT2QuePossui, ironT3QuePossui,
                goldQuePossui, goldT2QuePossui, goldT3QuePossui,
                crimstoneQuePossui, 
                oilQuePossui);

            //infos para preencher o prestigio de Farm em que esta
            const ilhaQueEsta = data.farm.inventory;
            ilhaPrestigioQueEsta(ilhaQueEsta);

        })
        .catch(err => {
            console.error('Erro ao puxar a API da farm:', err); // Caso dê erro na requisição, mostra a mensagem de erro no console.
        });

    //função responsavel por conferir as NFTs/Skills que tenho e marca-las!
    function marcarNftsESkillsQuePossui(skillsLegacyQuePossui, skillQuePossui, collectiblesQuePossui, wearablesQuePossui) {
        
        //Todas skills legacy que possuir vai ser marcada
        todasSkillsLegacy.forEach(legacy => {
            let checkbox = document.getElementById(legacy.id);
            if (skillsLegacyQuePossui[legacy.name]) {
                checkbox.checked = true;
                legacy.possui = true;
            } else {
                checkbox.checked = false;
                legacy.possui = false;
            };      
        });

        //vai marcar todas skills que você possuir na arvore de skills!
        todasSkillsComTier.forEach(skill => {
            let checkbox = document.getElementById(skill.id);
            if (skillQuePossui[skill.name]) {
                checkbox.checked = true;
                skill.possui = true;
            } else {
                checkbox.checked = false;
                skill.possui = false;
            };    
        });

        //Novidades da Temporada
        novosCollectibles.forEach(collectibles => {
            let checkbox = document.getElementById(collectibles.id);
            if (collectiblesQuePossui[collectibles.name]) {
                checkbox.checked = true;
                collectibles.possui = true;
            } else {
                checkbox.checked = false;
                collectibles.possui = false;
            };
        });

        novosWearables.forEach(wearables => {
            let checkbox = document.getElementById(wearables.id);
            if (wearablesQuePossui[wearables.name]) {
                checkbox.checked = true;
                wearables.possui = true;
            } else {
                checkbox.checked = false;
                wearables.possui = false;
            };
        });

        

        //Crops (depois juntar)
        collectiblesCrops.forEach(collectibles => {
            let checkbox = document.getElementById(collectibles.id);
            if (collectiblesQuePossui[collectibles.name]) {
                checkbox.checked = true;
                collectibles.possui = true;
            } else {
                checkbox.checked = false;
                collectibles.possui = false;
            };
        });

        wearablesCrops.forEach(wearables => {
            let checkbox = document.getElementById(wearables.id);
            if (wearablesQuePossui[wearables.name] || wearablesQuePossui[wearables.name1] || wearablesQuePossui[wearables.name2] || wearablesQuePossui[wearables.name3] || wearablesQuePossui[wearables.name4]) {
                checkbox.checked = true;
                wearables.possui = true;
            } else {
                checkbox.checked = false;
                wearables.possui = false;
            };
        });

        //Frutas
        collectiblesFruits.forEach(collectibles => {
            let checkbox = document.getElementById(collectibles.id);
            if (collectiblesQuePossui[collectibles.name]) {
                checkbox.checked = true;
                collectibles.possui = true;
            } else {
                checkbox.checked = false;
                collectibles.possui = false;
            };
        });

        wearablesFruits.forEach(wearables => {
            let checkbox = document.getElementById(wearables.id);
            if (wearablesQuePossui[wearables.name] || wearablesQuePossui[wearables.name1] || wearablesQuePossui[wearables.name2] || wearablesQuePossui[wearables.name3] || wearablesQuePossui[wearables.name4]) {
                checkbox.checked = true;
                wearables.possui = true;
            } else {
                checkbox.checked = false;
                wearables.possui = false;
            };
        });

        //Minerais
        collectiblesMinerals.forEach(collectibles => {
            let checkbox = document.getElementById(collectibles.id);
            if (collectiblesQuePossui[collectibles.name]) {
                checkbox.checked = true;
                collectibles.possui = true;
            } else {
                checkbox.checked = false;
                collectibles.possui = false;
            };
        });

        wearablesMinerals.forEach(wearables => {
            let checkbox = document.getElementById(wearables.id);
            if (wearablesQuePossui[wearables.name] || wearablesQuePossui[wearables.name1] || wearablesQuePossui[wearables.name2] || wearablesQuePossui[wearables.name3] || wearablesQuePossui[wearables.name4]) {
                checkbox.checked = true;
                wearables.possui = true;
            } else {
                checkbox.checked = false;
                wearables.possui = false;
            };
        });

        valorTotalEmNftsETotalPontosEmSkills();
        nftsDeTierQuePossuemBuffDoAntecessor();
        ativarBonusDasNftsESkills();
        skillsCropsBloqueadas();
        skillsFruitsBloqueadas();
        skillsTreesBloqueadas();
        skillsMineralsBloqueadas();
        skillsMachineryBloqueadas();
        buffsAdicionadosCrops();
        buffsAdicionadosFruits();
        buffsAdicionadosMinerais();
        
    };
    
    //função responsavel por preencher quantos plots/nodes a farm possui!
    function preencherInformacoesDaFarm(cropPlotsQuePossui, fruitPlotsQuePossui,
                treeQuePossui, treeT2QuePossui, treeT3QuePossui,
                stoneQuePossui, stoneT2QuePossui, stoneT3QuePossui,
                ironQuePossui, ironT2QuePossui, ironT3QuePossui,
                goldQuePossui, goldT2QuePossui, goldT3QuePossui,
                crimstoneQuePossui, 
                oilQuePossui) {
        
        //Plots Crops
        plots = cropPlotsQuePossui;
        document.getElementById('plotsPossuidos').value = cropPlotsQuePossui;

        fruitPlot = fruitPlotsQuePossui;
        document.getElementById('fruitPlotsPossuidos').value = fruitPlotsQuePossui;

        //Trees
        mapaDeMinerals['wood'].qtdNodesT1 = treeQuePossui;
        document.getElementById('treesPossuidas').value = treeQuePossui;

        mapaDeMinerals['wood'].qtdNodesT2 = treeT2QuePossui;
        document.getElementById('treesTier2').value = treeT2QuePossui;

        mapaDeMinerals['wood'].qtdNodesT3 = treeT3QuePossui;
        document.getElementById('treesTier3').value = treeT3QuePossui;

        //Stones
        mapaDeMinerals['stone'].qtdNodesT1 = stoneQuePossui;
        document.getElementById('stonesPossuidas').value = stoneQuePossui;

        mapaDeMinerals['stone'].qtdNodesT2 = stoneT2QuePossui;
        document.getElementById('stonesTier2').value = stoneT2QuePossui;

        mapaDeMinerals['stone'].qtdNodesT3 = stoneT3QuePossui;
        document.getElementById('stonesTier3').value = stoneT3QuePossui;

        //Irons
        mapaDeMinerals['iron'].qtdNodesT1 = ironQuePossui;
        document.getElementById('ironsPossuidos').value = ironQuePossui;

        mapaDeMinerals['iron'].qtdNodesT2 = ironT2QuePossui;
        document.getElementById('ironsTier2').value = ironT2QuePossui;

        mapaDeMinerals['iron'].qtdNodesT3 = ironT3QuePossui;
        document.getElementById('ironsTier3').value = ironT3QuePossui;

        //Golds
        mapaDeMinerals['gold'].qtdNodesT1 = goldQuePossui;
        document.getElementById('goldsPossuidos').value = goldQuePossui;

        mapaDeMinerals['gold'].qtdNodesT2 = goldT2QuePossui;
        document.getElementById('goldsTier2').value = goldT2QuePossui;

        mapaDeMinerals['gold'].qtdNodesT3 = goldT3QuePossui;
        document.getElementById('goldsTier3').value = goldT3QuePossui;

        //Crim
        mapaDeMinerals['crimstone'].qtdNodes = crimstoneQuePossui;
        document.getElementById('crimstonesPossuidas').value = crimstoneQuePossui;

        //Oil
        mapaDeMinerals['oil'].qtdNodes = oilQuePossui;
        document.getElementById('oilPossuidos').value = oilQuePossui;

        salvarInformacoes();
        salvarNodesPossuidos();
    };

    //função responsavel por selecionar a ilha prestigio em que esta!
    function ilhaPrestigioQueEsta(ilhaQueEsta) {
        if (ilhaQueEsta['Lava Pit']) {
            ilha = 'Vulcano';
            document.getElementById('ilhaSelect').value = 'Vulcano';
        } else if (ilhaQueEsta['Oil Reserve']) {
            ilha = 'Desert';
            document.getElementById('ilhaSelect').value = 'Desert';
        } else if (ilhaQueEsta['Crimstone Rock']) {
            ilha = 'Petal';
            document.getElementById('ilhaSelect').value = 'Petal';
        } else {
            ilha = 'Basic';
            document.getElementById('ilhaSelect').value = 'Basic';            
        }
        ilhaPrestigioAtual();
        sePossuiVipOuNao();
    };
    
};

//==============================================================================================================================================

//api para puxar o valor do flower
fetch(`/api/proxy?url=https://sfl.world/api/v1.1/exchange`)
  .then(res => res.json())
  .then(data => {  
    valorDoFlowerEmDolar(data.sfl.usd);
  })
  .catch(err => {
    console.error('Erro ao puxar a planilha:', err);
  });

let precoDoFlower;
function valorDoFlowerEmDolar(valor) {
    precoDoFlower = valor;
    console.log(`$${precoDoFlower}`);
    valoresDasGems(); //puxara a função que define o valores das gems pra conversão
    titulosDosSelectsEPreenchimentos(); // rever como ativar esse função dps, por enquanto puxara dps que rodar a api;
    valorTotalEmNftsETotalPontosEmSkills(); //só para forçar o push de calculo das NFTs
};

