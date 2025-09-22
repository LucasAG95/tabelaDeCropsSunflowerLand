//aba responsavel pelas checkboxs

function configurarCheckbox() {
    todasSkillsLegacy.forEach(skill => {
        let checkbox = document.getElementById(skill.id);

        if(checkbox) {
            skill.possui = checkbox.checked;

            checkbox.addEventListener('change', function() {
                skill.possui = checkbox.checked;
                ativarBonusDasNftsESkills();
                buffsAdicionadosCrops();
                buffsAdicionadosMinerais();
            });
        };
    });

    todasSkillsComTier.forEach(skill => {
        let checkbox = document.getElementById(skill.id);

        if(checkbox) {
            skill.possui = checkbox.checked;

            checkbox.addEventListener('change', function() {
                skill.possui = checkbox.checked;
                ativarBonusDasNftsESkills();
                skillsCropsBloqueadas();
                skillsTreesBloqueadas();
                skillsMineralsBloqueadas();
                skillsMachineryBloqueadas();
                valorTotalEmNftsETotalPontosEmSkills();
                buffsAdicionadosCrops();
                buffsAdicionadosMinerais();
            });
        };
    });

    //==============================================================================================================================================

    //NFTs e Wearables
    novosCollectibles.forEach(newCollectibles => {
        let checkbox = document.getElementById(newCollectibles.id);

        if(checkbox) {
            newCollectibles.possui = checkbox.checked;

            checkbox.addEventListener('change', function() {
                newCollectibles.possui = checkbox.checked;
                valorTotalEmNftsETotalPontosEmSkills();
                ativarBonusDasNftsESkills();
                buffsAdicionadosCrops();
                buffsAdicionadosMinerais();
            });
        };
    }); 

    collectiblesCrops.forEach(collectibles => {
        let checkbox = document.getElementById(collectibles.id);

        if(checkbox) {
            collectibles.possui = checkbox.checked;

            checkbox.addEventListener('change', function() {
                collectibles.possui = checkbox.checked;
                valorTotalEmNftsETotalPontosEmSkills();
                nftsDeTierQuePossuemBuffDoAntecessor();
                ativarBonusDasNftsESkills();
                buffsAdicionadosCrops();
            });
        };
    });

    wearablesCrops.forEach(wearables => {
        let checkbox = document.getElementById(wearables.id);

        if(checkbox) {
            wearables.possui = checkbox.checked;

            checkbox.addEventListener('change', function() {
                wearables.possui = checkbox.checked;
                valorTotalEmNftsETotalPontosEmSkills();
                ativarBonusDasNftsESkills();
                buffsAdicionadosCrops();
            });
        };
    });
    
    collectiblesMinerals.forEach(collectibles => {
        let checkbox = document.getElementById(collectibles.id);

        if(checkbox) {
            collectibles.possui = checkbox.checked;

            checkbox.addEventListener('change', function() {
                collectibles.possui = checkbox.checked;
                valorTotalEmNftsETotalPontosEmSkills();
                nftsDeTierQuePossuemBuffDoAntecessor();
                buffsAdicionadosMinerais();
            });
        };
    }); 

    wearablesMinerals.forEach(wearables => {
        let checkbox = document.getElementById(wearables.id);

        if(checkbox) {
            wearables.possui = checkbox.checked;

            checkbox.addEventListener('change', function() {
                wearables.possui = checkbox.checked;
                valorTotalEmNftsETotalPontosEmSkills();
                buffsAdicionadosMinerais();
            });
        };
    }); 

};

//==================================================================================================================================================================

//feito pelo gpt, nao sei ao certo oq faz!
function renderSkills(lista, containerId, pastaImagens) {
    const container = document.getElementById(containerId);

    lista.forEach(skill => {

        const wrapper = document.createElement('div');
        wrapper.className = 'skill-wrapper';

        const label = document.createElement('label');
        label.setAttribute('for', skill.id);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = skill.id;

        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.innerHTML = `<strong>${skill.name}</strong><br>${skill.descricao.portugues || skill.descricao}`;

        const img = document.createElement('img');
        img.src = `${pastaImagens}/${skill.id}.png`; // usa o caminho passado
        img.alt = skill.name || skill.nome;
        img.className = 'skill-img';

        label.appendChild(checkbox);
        label.appendChild(img);
        wrapper.appendChild(label);
        wrapper.appendChild(tooltip);
        container.appendChild(wrapper);
    });
};

function renderNFTs(lista, containerId, pastaImagens) {
    const container = document.getElementById(containerId);

    lista.forEach(nft => {
        const wrapper = document.createElement('div');
        wrapper.className = 'nft-wrapper';

        const label = document.createElement('label');
        label.setAttribute('for', nft.id);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = nft.id;

        let precoDolar = nft.valor * precoDoFlower //apenas para converter o valor da NFT em dolar, talvez mudar de lugar dps

        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.innerHTML = `<strong>${nft.name}</strong><br>${nft.descricao.portugues || nft.descricao}<br><br>Venda: <img src="./icones/flower.png" class="crop-img">${nft.valor} ~ $${precoDolar.toFixed(2)}`;

        const img = document.createElement('img');
        img.src = `${pastaImagens}/${nft.id}.png`; // usa o caminho passado
        img.alt = nft.name || nft.nome;
        img.className = 'nft-img';

        label.appendChild(checkbox);
        label.appendChild(img);
        wrapper.appendChild(label);
        wrapper.appendChild(tooltip);
        container.appendChild(wrapper);
    });
};

//==================================================================================================================================================================

window.onload = function () {

    // Skills Legacy
    renderSkills(todasSkillsLegacy, 'skills-legacy-container', './skills');
    // Skills Crops
    renderSkills(skillsCrops.tier1, 'skills-crop-tier1-container', './skills');
    renderSkills(skillsCrops.tier2, 'skills-crop-tier2-container', './skills');
    renderSkills(skillsCrops.tier3, 'skills-crop-tier3-container', './skills');
    //Skills Trees
    renderSkills(skillsTrees.tier1, 'skills-tree-tier1-container', './skills');
    renderSkills(skillsTrees.tier2, 'skills-tree-tier2-container', './skills');
    renderSkills(skillsTrees.tier3, 'skills-tree-tier3-container', './skills');
    //Skills Minerals
    renderSkills(skillsMinerals.tier1, 'skills-mineral-tier1-container', './skills');
    renderSkills(skillsMinerals.tier2, 'skills-mineral-tier2-container', './skills');
    renderSkills(skillsMinerals.tier3, 'skills-mineral-tier3-container', './skills');
    //Skills Machinery
    renderSkills(skillsMachinery.tier1, 'skills-machinery-tier1-container', './skills');
    renderSkills(skillsMachinery.tier2, 'skills-machinery-tier2-container', './skills');
    renderSkills(skillsMachinery.tier3, 'skills-machinery-tier3-container', './skills');

    // Collectibles
    renderNFTs(collectiblesCrops, 'collectibles-container-crops', './collectibles');
    renderNFTs(collectiblesMinerals, 'collectibles-container-minerals', './collectibles');

    // Wearables

    renderNFTs(wearablesCrops, 'wearables-container-crops', './wearables');
    renderNFTs(wearablesMinerals, 'wearables-container-minerals', './wearables');

    //NFTs da Temporada
    renderNFTs(novosCollectibles, 'new-collectibles-container', './novasNFTs');
    renderNFTs(novosWearables, 'new-wearables-container', './novasNFTs');

    //chamando funções
    configurarCheckbox();
    nftsDeTierQuePossuemBuffDoAntecessor();
    skillsCropsBloqueadas();
    skillsTreesBloqueadas();
    skillsMineralsBloqueadas();
    skillsMachineryBloqueadas();
    valorTotalEmNftsETotalPontosEmSkills();
    numeroDaFarm();
    buffsAdicionadosCrops();
    buffsAdicionadosMinerais();


    // ⚡ Aqui: faz o tooltip seguir o mouse
    document.querySelectorAll('.nft-wrapper, .skill-wrapper').forEach(wrapper => {
        const tooltip = wrapper.querySelector('.tooltip');
        wrapper.addEventListener('mousemove', e => {
            tooltip.style.top = e.clientY + 10 + 'px';
            tooltip.style.left = e.clientX + 10 + 'px';
        });
    });

};

//==================================================================================================================================================================

