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

};

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

window.onload = function () {
    // Skills
    renderSkills(skillsCrops.tierLegacy, 'skills-legacy-container', './skills');
    renderSkills(skillsCrops.tier1, 'skills-tier1-container', './skills');
    renderSkills(skillsCrops.tier2, 'skills-tier2-container', './skills');
    renderSkills(skillsCrops.tier3, 'skills-tier3-container', './skills');

    // Collectibles
    renderNFTs(collectiblesCrops, 'collectibles-container', './collectibles');

    // Wearables
    renderNFTs(wearablesCrops, 'wearables-container', './wearables');
    configurarCheckbox();
    numeroDaFarm();
    statusCrops();
};

function numeroDaFarm() {
    let numeroFarmId = document.getElementById('numeroFarm').value;
    console.log("🔎 Buscando farm ID:", numeroFarmId);
    // Faz uma requisição para a API do Sunflower Land, pegando os dados da farm pelo número (numeroFarm).
    
    if (!numeroFarmId) {
        console.error('Por favor, digite o numero da farm para pesquisar!');
        return; // Sai da função se o campo estiver vazio
    }

    fetch(`/api/proxy?url=https://api.sunflower-land.com/community/farms/${numeroFarmId}`)
        .then(res => res.json()) // Quando a resposta chegar, converte o conteúdo dela para JSON.
        .then(data => {
            
            const skillsLegacyQuePossui = data.farm.inventory;
            const skillQuePossui = data.farm.bumpkin.skills;
            const collectiblesQuePossui = data.farm.inventory;
            const wearablesQuePossui = data.farm.wardrobe;
            marcarNftsESkillsQuePossui(skillsLegacyQuePossui, skillQuePossui, collectiblesQuePossui, wearablesQuePossui);
            console.log(data);
        })
        .catch(err => {
            console.error('Erro ao puxar a API da farm:', err); // Caso dê erro na requisição, mostra a mensagem de erro no console.
        });

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
            if (wearablesQuePossui[wearables.name]) {
                checkbox.checked = true;
                wearables.possui = true;
            } else {
                checkbox.checked = false;
                wearables.possui = false;
            };
        });
        ativarBonusDasNftsESkills();
        buffsAdicionados();
        statusCrops();
    };

}

//https://api.allorigins.win/raw?url=https://api.sunflower-land.com/community/farms/${numeroFarmId}
//http://localhost:3001/farm/${numeroFarmId}

