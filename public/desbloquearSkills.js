function skillsCropsBloqueadas() {
    let aroveDeAbilidades = 'crops';
    let tituloDoAcordion = 'Crops';
    let pontosTier1 = 0;
    let pontosTier2 = 0;
    let pontosTier3 = 0;
    let totalDePontosGastos = 0;

    todasSkillsDeCrops.forEach(skill => {
        let checkbox = document.getElementById(skill.id)

        // Tier 1 sempre pode ser contado
        if(skill.pontosNecessários === 1 && checkbox.checked) {
            pontosTier1 += skill.pontosNecessários;
        };

        // Tier 2 só conta se já tiver pontos suficientes no Tier 1
        if(skill.pontosNecessários === 2 && checkbox.checked && pontosTier1 >= 3) {
            pontosTier2 += skill.pontosNecessários;
        };

        // Tier 3 só conta se já tiver pontos suficientes no Tier 1 + 2
        if(skill.pontosNecessários === 3 && checkbox.checked && (pontosTier1 + pontosTier2) >= 7) {
            pontosTier3 += skill.pontosNecessários;
        };

        //Bloquear tier 2 e 3 das skills ate condições serem falsas
        if (pontosTier1 < 3 && skill.pontosNecessários === 2) {
            checkbox.disabled = true;
            checkbox.checked = false;
            skill.possui = false;
        } else if ((pontosTier1 + pontosTier2) < 7 && skill.pontosNecessários === 3) {
            checkbox.disabled = true;
            checkbox.checked = false;
            skill.possui = false;
        } else {
            checkbox.disabled = false;
        };
        
    });
    totalDePontosGastos = pontosTier1 + pontosTier2 + pontosTier3;
    console.log(totalDePontosGastos);

    textoParaDesbloquearSkill(3, 7, totalDePontosGastos, aroveDeAbilidades, tituloDoAcordion);
};

function skillsTreesBloqueadas() {
    let aroveDeAbilidades = 'tree';
    let tituloDoAcordion = 'Trees';
    let pontosTier1 = 0;
    let pontosTier2 = 0;
    let pontosTier3 = 0;
    let totalDePontosGastos = 0;

    todasSkillsDeTrees.forEach(skill => {
        let checkbox = document.getElementById(skill.id)

        // Tier 1 sempre pode ser contado
        if(skill.pontosNecessários === 1 && checkbox.checked) {
            pontosTier1 += skill.pontosNecessários;
        };

        // Tier 2 só conta se já tiver pontos suficientes no Tier 1
        if(skill.pontosNecessários === 2 && checkbox.checked && pontosTier1 >= 2) {
            pontosTier2 += skill.pontosNecessários;
        };

        // Tier 3 só conta se já tiver pontos suficientes no Tier 1 + 2
        if(skill.pontosNecessários === 3 && checkbox.checked && (pontosTier1 + pontosTier2) >= 5) {
            pontosTier3 += skill.pontosNecessários;
        };

        //Bloquear tier 2 e 3 das skills ate condições serem falsas
        if (pontosTier1 < 2 && skill.pontosNecessários === 2) {
            checkbox.disabled = true;
            checkbox.checked = false;
            skill.possui = false;
        } else if ((pontosTier1 + pontosTier2) < 5 && skill.pontosNecessários === 3) {
            checkbox.disabled = true;
            checkbox.checked = false;
            skill.possui = false;
        } else {
            checkbox.disabled = false;
        };
        
    });
    totalDePontosGastos = pontosTier1 + pontosTier2 + pontosTier3;
    console.log(totalDePontosGastos);

    textoParaDesbloquearSkill(2, 5, totalDePontosGastos, aroveDeAbilidades, tituloDoAcordion);
};

function skillsMineralsBloqueadas() {
    let aroveDeAbilidades = 'mineral';
    let tituloDoAcordion = 'Minerals';
    let pontosTier1 = 0;
    let pontosTier2 = 0;
    let pontosTier3 = 0;
    let totalDePontosGastos = 0;

    todasSkillsDeMinerals.forEach(skill => {
        let checkbox = document.getElementById(skill.id)

        // Tier 1 sempre pode ser contado
        if(skill.pontosNecessários === 1 && checkbox.checked) {
            pontosTier1 += skill.pontosNecessários;
        };

        // Tier 2 só conta se já tiver pontos suficientes no Tier 1
        if(skill.pontosNecessários === 2 && checkbox.checked && pontosTier1 >= 3) {
            pontosTier2 += skill.pontosNecessários;
        };

        // Tier 3 só conta se já tiver pontos suficientes no Tier 1 + 2
        if(skill.pontosNecessários === 3 && checkbox.checked && (pontosTier1 + pontosTier2) >= 7) {
            pontosTier3 += skill.pontosNecessários;
        };

        //Bloquear tier 2 e 3 das skills ate condições serem falsas
        if (pontosTier1 < 3 && skill.pontosNecessários === 2) {
            checkbox.disabled = true;
            checkbox.checked = false;
            skill.possui = false;
        } else if ((pontosTier1 + pontosTier2) < 7 && skill.pontosNecessários === 3) {
            checkbox.disabled = true;
            checkbox.checked = false;
            skill.possui = false;
        } else {
            checkbox.disabled = false;
        };
        
    });
    totalDePontosGastos = pontosTier1 + pontosTier2 + pontosTier3;
    console.log(totalDePontosGastos);

    textoParaDesbloquearSkill(3, 7, totalDePontosGastos, aroveDeAbilidades, tituloDoAcordion);
};

function skillsMachineryBloqueadas() {
    let aroveDeAbilidades = 'machinery';
    let tituloDoAcordion = 'Machinery';
    let pontosTier1 = 0;
    let pontosTier2 = 0;
    let pontosTier3 = 0;
    let totalDePontosGastos = 0;

    todasSkillsMachinery.forEach(skill => {
        let checkbox = document.getElementById(skill.id)

        // Tier 1 sempre pode ser contado
        if(skill.pontosNecessários === 1 && checkbox.checked) {
            pontosTier1 += skill.pontosNecessários;
        };

        // Tier 2 só conta se já tiver pontos suficientes no Tier 1
        if(skill.pontosNecessários === 2 && checkbox.checked && pontosTier1 >= 2) {
            pontosTier2 += skill.pontosNecessários;
        };

        // Tier 3 só conta se já tiver pontos suficientes no Tier 1 + 2
        if(skill.pontosNecessários === 3 && checkbox.checked && (pontosTier1 + pontosTier2) >= 5) {
            pontosTier3 += skill.pontosNecessários;
        };

        //Bloquear tier 2 e 3 das skills ate condições serem falsas
        if (pontosTier1 < 2 && skill.pontosNecessários === 2) {
            checkbox.disabled = true;
            checkbox.checked = false;
            skill.possui = false;
        } else if ((pontosTier1 + pontosTier2) < 5 && skill.pontosNecessários === 3) {
            checkbox.disabled = true;
            checkbox.checked = false;
            skill.possui = false;
        } else {
            checkbox.disabled = false;
        };
        
    });
    totalDePontosGastos = pontosTier1 + pontosTier2 + pontosTier3;
    console.log(totalDePontosGastos);

    textoParaDesbloquearSkill(2, 5, totalDePontosGastos, aroveDeAbilidades, tituloDoAcordion);
};


//função que vai ser responsavel por mudar os textos que mostram a quantidade de pontos faltantes para desbloquear skill!
function textoParaDesbloquearSkill(pontosProNivel2, pontosProNivel3, totalPontosGastos, aroveDeAbilidades, tituloDoAcordion) {
    //mostrar texto no accordion com o total de pontos gastos na arvore de crops
    document.getElementById(`accordion-skill-${aroveDeAbilidades}`).innerHTML = `${tituloDoAcordion}: ${totalPontosGastos} Pontos usados`;

    //mostrar pontos necessários para desbloquear o nivel 2
    if (totalPontosGastos < pontosProNivel2) {
        document.getElementById(`accordion-skill-${aroveDeAbilidades}-tier2`).innerHTML = `Nivel 2 - Pontos para desbloquear: ${pontosProNivel2 - totalPontosGastos}`;
    } else {
        document.getElementById(`accordion-skill-${aroveDeAbilidades}-tier2`).innerHTML = ``;
    }

    //mostrar pontos necessários para desbloquear o nivel 3
    if (totalPontosGastos < pontosProNivel3) {
        document.getElementById(`accordion-skill-${aroveDeAbilidades}-tier3`).innerHTML = `Nivel 3 - Pontos para desbloquear: ${pontosProNivel3 - totalPontosGastos}`;
    } else {
        document.getElementById(`accordion-skill-${aroveDeAbilidades}-tier3`).innerHTML = ``
    }
    
};