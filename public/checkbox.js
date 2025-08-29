//aba responsavel pelas checkboxs

function configurarCheckbox() {
    skillsCrops.tierLegacy.forEach(skill => {
        let checkbox = document.getElementById(skill.id);

        if(checkbox) {
            skill.possui = checkbox.checked;

            checkbox.addEventListener('change', function() {
                skill.possui = checkbox.checked;
                ativarBonusDasNftsESkills();
                buffsAdicionados();
                statusCrops();
            });
        };
    });

    skillsCrops.tier1.forEach(skill => {
        let checkbox = document.getElementById(skill.id);

        if(checkbox) {
            skill.possui = checkbox.checked;

            checkbox.addEventListener('change', function() {
                skill.possui = checkbox.checked;
                ativarBonusDasNftsESkills();
                skillsBloqueadas();
                buffsAdicionados();
                statusCrops();
            });
        };
    });

    skillsCrops.tier2.forEach(skill => {
        let checkbox = document.getElementById(skill.id);

        if(checkbox) {
            skill.possui = checkbox.checked;

            checkbox.addEventListener('change', function() {
                skill.possui = checkbox.checked;
                ativarBonusDasNftsESkills();
                skillsBloqueadas();
                buffsAdicionados();
                statusCrops();
            });
        };
    });

    skillsCrops.tier3.forEach(skill => {
        let checkbox = document.getElementById(skill.id);

        if(checkbox) {
            skill.possui = checkbox.checked;

            checkbox.addEventListener('change', function() {
                skill.possui = checkbox.checked;
                ativarBonusDasNftsESkills();
                skillsBloqueadas();
                buffsAdicionados();
                statusCrops();
            });
        };
    });

    collectiblesCrops.forEach(collectibles => {
        let checkbox = document.getElementById(collectibles.id);

        if(checkbox) {
            collectibles.possui = checkbox.checked;

            checkbox.addEventListener('change', function() {
                collectibles.possui = checkbox.checked;
                nftsDeTierQuePossuemBuffDoAntecessor();
                ativarBonusDasNftsESkills();
                buffsAdicionados();
                statusCrops();
            });
        };
    });    

    wearablesCrops.forEach(wearables => {
        let checkbox = document.getElementById(wearables.id);

        if(checkbox) {
            wearables.possui = checkbox.checked;

            checkbox.addEventListener('change', function() {
                wearables.possui = checkbox.checked;
                ativarBonusDasNftsESkills();
                buffsAdicionados();
                statusCrops();
            });
        };
    });
    
    nftsDaTemporada.forEach(newCollectibles => {
        let checkbox = document.getElementById(newCollectibles.id);

        if(checkbox) {
            newCollectibles.possui = checkbox.checked;

            checkbox.addEventListener('change', function() {
                newCollectibles.possui = checkbox.checked;
                ativarBonusDasNftsESkills();
                buffsAdicionados();
                statusCrops();
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
        tooltip.innerHTML = `<strong>${skill.name}</strong><br>${skill.descricao.portugues}`;

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

        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.innerHTML = `<strong>${nft.name || nft.nome}</strong><br>${nft.descricao.portugues || nft.descricao}`;

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
    // Skills
    renderSkills(skillsCrops.tierLegacy, 'skills-legacy-container', './skills');
    renderSkills(skillsCrops.tier1, 'skills-tier1-container', './skills');
    renderSkills(skillsCrops.tier2, 'skills-tier2-container', './skills');
    renderSkills(skillsCrops.tier3, 'skills-tier3-container', './skills');

    // Collectibles
    renderNFTs(nftsDaTemporada, 'new-collectibles-container', './collectibles');
    renderNFTs(collectiblesCrops, 'collectibles-container', './collectibles');

    // Wearables
    renderNFTs(wearablesCrops, 'wearables-container', './wearables');
    
    configurarCheckbox();
    nftsDeTierQuePossuemBuffDoAntecessor();
    skillsBloqueadas();
    numeroDaFarm();
    statusCrops();
};

//==================================================================================================================================================================
