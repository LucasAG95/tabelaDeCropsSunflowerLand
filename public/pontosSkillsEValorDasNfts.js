function valorTotalEmNftsETotalPontosEmSkills() {

    //soma dos pontos de skills gastos
    let totalDePontosEmSkills = 0;
    todasSkillsComTier.forEach(skill => {
        let checkbox = document.getElementById(skill.id);

        if(checkbox && checkbox.checked) {
            totalDePontosEmSkills += Number(skill.pontosNecessários);
        };
    });
    document.getElementById('total-pontos-gastos-em-skills').innerHTML = `Skills: ${totalDePontosEmSkills} Pontos`;
    //========================================================================================================================

    //soma dos valores em flower e dolar das Collectibles de Crops
    let valorEmCollectiblesCrops = 0;
    collectiblesCrops.forEach(collectibles => {
        let checkbox = document.getElementById(collectibles.id);

        if(checkbox && checkbox.checked) {
            valorEmCollectiblesCrops += Number(collectibles.valor);
        };
    });
    document.getElementById('accordion-collectibles-crops').innerHTML = `Crops: <img src="./icones/flower.png" class="crop-img">${valorEmCollectiblesCrops.toFixed(2)} ~ $${(valorEmCollectiblesCrops * precoDoFlower).toFixed(2)}`;
    
    //soma dos valores em flower e dolar das Wearables de Crops
    let valorEmWearablesCrops = 0;
    wearablesCrops.forEach(wearables => {
        let checkbox = document.getElementById(wearables.id);

        if (checkbox && checkbox.checked) {
            valorEmWearablesCrops += Number(wearables.valor);
        };
    });
    document.getElementById('accordion-wearables-crops').innerHTML = `Crops: <img src="./icones/flower.png" class="crop-img">${valorEmWearablesCrops.toFixed(2)} ~ $${(valorEmWearablesCrops * precoDoFlower).toFixed(2)}`;

    //soma dos valores em flower e dolar das Collectibles de Fruits
    let valorEmCollectiblesFruits = 0;
    collectiblesCrops.forEach(collectibles => {
        let checkbox = document.getElementById(collectibles.id);

        if(checkbox && checkbox.checked) {
            valorEmCollectiblesFruits += Number(collectibles.valor);
        };
    });
    document.getElementById('accordion-collectibles-fruits').innerHTML = `Fruits: <img src="./icones/flower.png" class="crop-img">${valorEmCollectiblesFruits.toFixed(2)} ~ $${(valorEmCollectiblesFruits * precoDoFlower).toFixed(2)}`;

    //soma dos valores em flower e dolar das Wearables de Fruits
    let valorEmWearablesFruits = 0;
    wearablesFruits.forEach(wearables => {
        let checkbox = document.getElementById(wearables.id);

        if (checkbox && checkbox.checked) {
            valorEmWearablesFruits += Number(wearables.valor);
        };
    });
    document.getElementById('accordion-wearables-fruits').innerHTML = `Fruits: <img src="./icones/flower.png" class="crop-img">${valorEmWearablesFruits.toFixed(2)} ~ $${(valorEmWearablesFruits * precoDoFlower).toFixed(2)}`;

    //soma dos valores em flower e dolar das Collectibles de Minerals
    let valorEmCollectiblesMinerals = 0;
    collectiblesMinerals.forEach(collectibles => {
        let checkbox = document.getElementById(collectibles.id);

        if (checkbox && checkbox.checked) {
            valorEmCollectiblesMinerals += Number(collectibles.valor);
        };
    });
    document.getElementById('accordion-collectibles-minerals').innerHTML = `Minerals: <img src="./icones/flower.png" class="crop-img">${valorEmCollectiblesMinerals.toFixed(2)} ~ $${(valorEmCollectiblesMinerals * precoDoFlower).toFixed(2)}`;

    //soma dos valores em flower e dolar das Wearables de Minerals
    let valorEmWearablesMinerals = 0;
    wearablesMinerals.forEach(wearables => {
        let checkbox = document.getElementById(wearables.id);

        if (checkbox && checkbox.checked) {
            valorEmWearablesMinerals += Number(wearables.valor);
        };
    });
    document.getElementById('accordion-wearables-minerals').innerHTML = `Minerals: <img src="./icones/flower.png" class="crop-img">${valorEmWearablesMinerals.toFixed(2)} ~ $${(valorEmWearablesMinerals * precoDoFlower).toFixed(2)}`;


    //valor total em Collectibles/Wearables!
    let totalEmCollectibles = valorEmCollectiblesCrops + valorEmCollectiblesFruits + valorEmCollectiblesMinerals;
    let totalEmWearables = valorEmWearablesCrops + valorEmWearablesFruits + valorEmWearablesMinerals;
    document.getElementById('total-valor-em-collectibles').innerHTML = `Collectibles: <img src="./icones/flower.png" class="crop-img">${totalEmCollectibles.toFixed(2)} ~ $${(totalEmCollectibles * precoDoFlower).toFixed(2)}`;
    document.getElementById('total-valor-em-wearables').innerHTML = `Wearables: <img src="./icones/flower.png" class="crop-img">${totalEmWearables.toFixed(2)} ~ $${(totalEmWearables * precoDoFlower).toFixed(2)}`;

};