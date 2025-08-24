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

//essa função irá inserir o valor de venda por flower das crops em vendaFlower
function atualizarValoresDeVendaPorFlower(apiValores) {
    crops.forEach(crop => {
        if (apiValores[crop.name]) {
        crop.vendaFlower = apiValores[crop.name];
        console.log(`Crop: ${crop.name} Valor: ${crop.vendaFlower}`);
        statusCrops();
        };  
    });
  
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
            preencherInformacoesDaFarm(cropPlotsQuePossui)

            //infos para preencher o prestigio de Farm em que esta
            const ilhaQueEsta = data.farm.inventory;
            ilhaPrestigioQueEsta(ilhaQueEsta);

        })
        .catch(err => {
            console.error('Erro ao puxar a API da farm:', err); // Caso dê erro na requisição, mostra a mensagem de erro no console.
        });

    //função responsavel por conferir as NFTs/Skills que tenho e marca-las!
    function marcarNftsESkillsQuePossui(skillsLegacyQuePossui, skillQuePossui, collectiblesQuePossui, wearablesQuePossui) {
        
        skillsCrops.tierLegacy.forEach(legacy => {
            let checkbox = document.getElementById(legacy.id);
            if (skillsLegacyQuePossui[legacy.name]) {
                checkbox.checked = true;
                legacy.possui = true;
            } else {
                checkbox.checked = false;
                legacy.possui = false;
            };      
        });

        skillsCrops.tier1.forEach(tier1 => {
            let checkbox = document.getElementById(tier1.id);
            if (skillQuePossui[tier1.name]) {
                checkbox.checked = true;
                tier1.possui = true;
            } else {
                checkbox.checked = false;
                tier1.possui = false;
            };    
        });

        skillsCrops.tier2.forEach(tier2 => {
            let checkbox = document.getElementById(tier2.id);
            if (skillQuePossui[tier2.name]) {
                checkbox.checked = true;
                tier2.possui = true;
            } else {
                checkbox.checked = false;
                tier2.possui = false;
            };
        });

        skillsCrops.tier3.forEach(tier3 => {
            let checkbox = document.getElementById(tier3.id);
            if (skillQuePossui[tier3.name]) {
                checkbox.checked = true;
                tier3.possui = true;
            } else {
                checkbox.checked = false;
                tier3.possui = false;
            };
        });

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
        nftsDeTierQuePossuemBuffDoAntecessor();
        ativarBonusDasNftsESkills();
        buffsAdicionados();
        statusCrops();
    };
    
    //função responsavel por preencher quantos plots/nodes a farm possui!
    function preencherInformacoesDaFarm(cropPlotsQuePossui) {
        plots = cropPlotsQuePossui;
        document.getElementById('plotsPossuidos').value = cropPlotsQuePossui;
        salvarInformacoes();
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
            ilha = 'Spring';
            document.getElementById('ilhaSelect').value = 'Spring';
        } else {
            ilha = 'Basic';
            document.getElementById('ilhaSelect').value = 'Basic';            
        }
        ilhaPrestigioAtual();
        sePossuiVipOuNao();
    };
    
};