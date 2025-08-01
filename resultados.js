// 1 hora = 3 600 000 - 1 minuto = 60 000 - 1 segundo = 1000
function formatarTempo(tempoDaCrop, mostrarNoHtml) { //ms é de milissegundos
    const horas = Math.floor(tempoDaCrop / 3_600_000); // esse sinal _ serve para separar apenas casa decimais, é visual!
    const minutos = Math.floor((tempoDaCrop % 3_600_000) / 60_000); // % serve para dividir e pegar o resto da divisão!
    const segundos = Math.floor((tempoDaCrop % 60_000) / 1_000); // Math.floor arredonda o numero pra baixo
    const milissegundos = tempoDaCrop % 1_000;

    //para adicionar 0 a frente da hora!
    const hh = horas < 10 ? '0' + horas : horas;
    const mm = minutos < 10 ? '0' + minutos : minutos;
    const ss = segundos < 10 ? '0' + segundos : segundos;

    //vai mostrar o resultado dentro das outras funções que puxar ela
    return `${hh}:${mm}:${ss}`;
};

let mapaDeNfts = {}; //vai mapear as nfts, pelo que entendi
collectiblesCrops.forEach(nft => { //vai verificar e adicionar o id das NFTs no mapaDeNfts, foi oque entendi
    mapaDeNfts[nft.id] = nft; // vai colocar no mapaDeNfts o nome por id de cada NFT e em ordem alfabetica pelo que vi, parace q transforma a lista em objetos 
});
console.log(mapaDeNfts)

function configurarCheckboxes() {
    //checkbox das nfts collectibles de Crops
    collectiblesCrops.forEach(nft => {
        let checkbox = document.getElementById(nft.id); 
        
        if (checkbox) {
            nft.possui = checkbox.checked; 

            checkbox.addEventListener('change', function() { //vai verificar se a box esta marcada ou deesmarcada e toda vez que eu alterar vai chamar oque esta abaixo
                nft.possui = checkbox.checked; 
                atualizarStatusDasCrops();
            });
        }
    });

    //checkbox das nfts wearebles de Crops
    wearablesCrops.forEach(nft => {
        let checkbox = document.getElementById(nft.id); 
        
        if (checkbox) {
            nft.possui = checkbox.checked;

            checkbox.addEventListener('change', function() { //vai verificar se a box esta marcada ou deesmarcada e toda vez que eu alterar vai chamar oque esta abaixo
                nft.possui = checkbox.checked; 
                atualizarStatusDasCrops();
                atualizarTier(nft.id)
            });
        }
    });
    
    //checkbox das skills de Crops
    skillCrops.forEach(skill => {
        let checkbox = document.getElementById(skill.id); // => é um abreviamento de function, entao usar '() =>' é a msm coisa de 'function()', foi oque entendi - o .id é pra verificar se o id no html bate com o pesquisado
        
        if (checkbox) { //Essa linha está checando se a variável checkbox existe, ou seja, se o elemento com aquele id foi encontrado no HTML.
            skill.possui = checkbox.checked; // Atualiza inicialmente (opcional)

            checkbox.addEventListener('change', function() { //addEventListener faz: Ele escuta um evento e executa uma função quando o evento acontece. neste caso, ao clicar na checkbox ele roda novamente trazendo resultado
                skill.possui = checkbox.checked; //toda vez que clicar na checkbox trara resultados diferentes como verdadeiro ou falso, pra funcionar assim, tem que estar dentro da função com addEventListener
                atualizarStatusDasCrops();// ao marca ou desamarcar as checkbox, chamara a função! Não precisaria dela, oque esta dentro da função, podia estar aq pra chamar!
            });
        }
    });


};

const mostrarNoHtml = document.getElementById('saida');


//Função que retornara os status das crops
function statusCrops() { //o parametro não precisa ser puxado exatamente de fora, ele pode ser um parametro que quiser dentro dele sem puxar infos de fora
    
    let tabela = `
    <table class="tabela-crops">
      <thead>
        <tr>
          <h1>Resultado das Crops</h1>
          <th>Crop</th>
          <th><img src="imagens/tempo.png" class="crop-img">Tempo</th>
          <th><img src="imagens/cropplot.png" class="crop-img">Crop por Plot</th>
          <th>Colheita Total</th>
          <th><img src="imagens/coins.png" class="crop-img">Custo(Sementes)</th>
          <th><img src="imagens/coins.png" class="crop-img">Venda(Crops)</th>
          <th><img src="imagens/coins.png" class="crop-img">Lucro Final</th>
          <th><img src="imagens/reestock.png" class="crop-img">Estoque</th>
        </tr>
      </thead>
      <tbody>
  `;

    crops.forEach(crop => {
        if(!crop.estacao.includes(temporada)) return;        
    
        let multiCrop = 1; //buffs de % serao adicionados aqui
        let somaCrop = 0; //buffs de + serao adicionados aqui
        let menosCrop = 0; //debuffs de + serao adicionados aqui
        let tempoCrop = 1; //buffs de tempo serao adicionados aqui
        let vendaCoins = 1; //buffs que aumentam o valor da venda de crops por coins serao adicionados aqui
        let custoCoins = 1; //buffs que reduzem o valor de compra das sementes por coins serao adicionados aqui

        //vai passar por cada skill e conferir as condições pedidas dentro do forEach
        skillCrops.forEach(skill => {

            //todas skills que forem de multiplicar e possuirem essas condições serao adicionadas ao multiCrop
            if (skill.possui === true && skill.afeta.includes('quantidade') && skill.sinal === 'x' &&
            (skill.cropAfetada === 'todas' || skill.cropAfetada.includes(crop.tier) || skill.cropAfetada.includes(crop.name))) {
                multiCrop *= skill.buff;
            };

            //todas skills que forem de somar e possuirem essas condições serao adicionadas ao somaCrop
            if (skill.possui === true && skill.afeta.includes('quantidade') && skill.sinal === '+' &&
            (skill.cropAfetada === 'todas' || skill.cropAfetada.includes(crop.tier) || skill.cropAfetada.includes(crop.name))) {
                somaCrop += skill.buff;
            };

            //todas skills que forem de diminuir e possuirem essas condições serao adicionadas ao menosCrop
            if (skill.possui === true && skill.afeta.includes('quantidade') && skill.sinal === '+' && skill.deBuff &&
            (skill.cropReduzida === 'todas' || skill.cropReduzida.includes(crop.tier) || skill.cropReduzida.includes(crop.name))) {
                menosCrop += skill.deBuff;
            };

            //todas skills que afetarem o tempo da crop e possuirem essas condições serao adicionadas ao tempoCrop
            if (skill.possui === true && skill.afeta.includes('tempo') && skill.sinal === 'x' &&
            (skill.cropAfetada === 'todas' || skill.cropAfetada.includes(crop.tier) || skill.cropAfetada.includes(crop.name))) {
                tempoCrop *= skill.buff;
            };

            //todas skills que afetarem o valor de venda da crop e possuirem essas condições serao adicionadas ao vendaCoins!
            if (skill.possui === true && skill.afeta.includes('coins') && skill.sinal === 'x' &&
            (skill.cropAfetada === 'todas' || skill.cropAfetada.includes(crop.tier) || skill.cropAfetada.includes(crop.name))) {
                vendaCoins *= skill.buff;
            };

            //todas skills que afetarem o custo de compra da semente e possuirem essas condições serao adicionadas ao custoCoins!
            if (skill.possui === true && skill.afeta.includes('desconto') && skill.sinal === 'x' &&
            (skill.cropAfetada === 'todas' || skill.cropAfetada.includes(crop.tier) || skill.cropAfetada.includes(crop.name))) {
                custoCoins *= skill.buff;
            };
        });

        //vai passar por cada collectibles e conferir as condições pedidas dentro do forEach
        collectiblesCrops.forEach(collectibles => {

            //todas collectibles que forem de multiplicar e possuirem essas condições serao adicionadas ao multiCrop
            if (collectibles.possui === true && collectibles.afeta.includes('quantidade') && collectibles.sinal === 'x' && (collectibles.estacao === 'todas' || collectibles.estacao.includes(temporada)) &&
            (collectibles.cropAfetada === 'todas' || collectibles.cropAfetada.includes(crop.tier) || collectibles.cropAfetada.includes(crop.name))) {
                multiCrop *= collectibles.buff;
            };

            //todas collectibles que forem de somar e possuirem essas condições serao adicionadas ao somaCrop
            if (collectibles.possui === true && collectibles.afeta.includes('quantidade') && collectibles.sinal === '+' && (collectibles.estacao === 'todas' || collectibles.estacao.includes(temporada)) &&
            (collectibles.cropAfetada === 'todas' || collectibles.cropAfetada.includes(crop.tier) || collectibles.cropAfetada.includes(crop.name))) {
                somaCrop += collectibles.buff;
            };

            //todas collectibles que afetarem o tempo da crop e possuirem essas condições serao adicionadas ao tempoCrop
            if (collectibles.possui === true && collectibles.afeta.includes('tempo') && collectibles.sinal === 'x' && (collectibles.estacao === 'todas' || collectibles.estacao.includes(temporada)) &&
            (collectibles.cropAfetada === 'todas' || collectibles.cropAfetada.includes(crop.tier) || collectibles.cropAfetada.includes(crop.name))) {
                tempoCrop *= collectibles.buff;
            };

            //todas collectibles que afetarem o valor de venda da crop e possuirem essas condições serao adicionadas ao vendaCoins!
            if (collectibles.possui === true && collectibles.afeta.includes('coins') && collectibles.sinal === 'x' && (collectibles.estacao === 'todas' || collectibles.estacao.includes(temporada)) &&
            (collectibles.cropAfetada === 'todas' || collectibles.cropAfetada.includes(crop.tier) || collectibles.cropAfetada.includes(crop.name))) {
                vendaCoins *= collectibles.buff;
            };

            //todas collectibles que afetarem o custo de compra da semente e possuirem essas condições serao adicionadas ao custoCoins!
            if (collectibles.possui === true && collectibles.afeta.includes('desconto') && collectibles.sinal === 'x' && (collectibles.estacao === 'todas' || collectibles.estacao.includes(temporada)) &&
            (collectibles.cropAfetada === 'todas' || collectibles.cropAfetada.includes(crop.tier) || collectibles.cropAfetada.includes(crop.name))) {
                custoCoins *= collectibles.buff;
            };
        });

        //vai passar por cada wearables e conferir as condições pedidas dentro do forEach
        wearablesCrops.forEach(wearables => {

            //todas wearables que forem de multiplicar e possuirem essas condições serao adicionadas ao multiCrop
            if (wearables.possui === true && wearables.afeta.includes('quantidade') && wearables.sinal === 'x' && (wearables.estacao === 'todas' || wearables.estacao.includes(temporada)) &&
            (wearables.cropAfetada === 'todas' || wearables.cropAfetada.includes(crop.tier) || wearables.cropAfetada.includes(crop.name))) {
                multiCrop *= wearables.buff;
            };

            //todas wearables que forem de somar e possuirem essas condições serao adicionadas ao somaCrop
            if (wearables.possui === true && wearables.afeta.includes('quantidade') && wearables.sinal === '+' && (wearables.estacao === 'todas' || wearables.estacao.includes(temporada)) &&
            (wearables.cropAfetada === 'todas' || wearables.cropAfetada.includes(crop.tier) || wearables.cropAfetada.includes(crop.name))) {
                somaCrop += wearables.buff;
            };

            //todas wearables que afetarem o tempo da crop e possuirem essas condições serao adicionadas ao tempoCrop
            if (wearables.possui === true && wearables.afeta.includes('tempo') && wearables.sinal === 'x' && (wearables.estacao === 'todas' || wearables.estacao.includes(temporada)) &&
            (wearables.cropAfetada === 'todas' || wearables.cropAfetada.includes(crop.tier) || wearables.cropAfetada.includes(crop.name))) {
                tempoCrop *= wearables.buff;
            };

            //todas wearables que afetarem o valor de venda da crop e possuirem essas condições serao adicionadas ao vendaCoins!
            if (wearables.possui === true && wearables.afeta.includes('coins') && wearables.sinal === 'x' && (wearables.estacao === 'todas' || wearables.estacao.includes(temporada)) &&
            (wearables.cropAfetada === 'todas' || wearables.cropAfetada.includes(crop.tier) || wearables.cropAfetada.includes(crop.name))) {
                vendaCoins *= wearables.buff;
            };

            //todas wearables que afetarem o custo de compra da semente e possuirem essas condições serao adicionadas ao custoCoins!
            if (wearables.possui === true && wearables.afeta.includes('desconto') && wearables.sinal === 'x' && (wearables.estacao === 'todas' || wearables.estacao.includes(temporada)) &&
            (wearables.cropAfetada === 'todas' || wearables.cropAfetada.includes(crop.tier) || wearables.cropAfetada.includes(crop.name))) {
                custoCoins *= wearables.buff;
            };

        });

        //Quantidade de Crop
        let colheitaPorPlot = ((1 * multiCrop) + somaCrop) - menosCrop;
        let colheitaTotal = colheitaPorPlot * plots;

        //Tempo final de Crop
        let tempoFinal = crop.tempo * tempoCrop;

        //Lucro das Crops
        let compraSemente = (crop.custoDaSemente * custoCoins) * plots
        let vendaCrops = (colheitaPorPlot * crop.vendaDaCrop * vendaCoins) * plots;
        let lucro = vendaCrops - compraSemente;
            
        tabela += `
            <tr>
                <td> <img src="imagens/${crop.name.toLowerCase()}.png" alt="${crop.name}" class="crop-img"> ${crop.name} </td> 
                <td>${formatarTempo(tempoFinal)}</td>
                <td>${colheitaPorPlot.toFixed(2)}</td>
                <td>${colheitaTotal.toFixed(2)}</td>
                <td>${compraSemente.toFixed(2)}</td>
                <td>${vendaCrops.toFixed(2)}</td>
                <td>${lucro.toFixed(2)}</td>
                <td>${crop.estoqueDeSementes}</td>
            </tr>
            `; //toLowerCase() é para tranformar tudo em letra minuscula
            
    });
    
    tabela += `</tbody></table>`;
    mostrarNoHtml.innerHTML = tabela;
    
};

function atualizarStatusDasCrops() { //limpara as crops ao ser chamada e reiniciara para que seja feita as contas ativando/desativando as skills
    mostrarNoHtml.innerHTML = '';

    let buffNftsAtualizados;

    do { //É uma estrutura de repetição, parecida com o while, mas com uma diferença importante: 📌 O do {} roda pelo menos uma vez, mesmo se a condição for falsa no início. Nesse caso ele vai ficar percorrendo ate que todas condições sejam true e ela n consiga mais alterar nenhum buff
        buffNftsAtualizados = false; // toda vez que entra na repetição ele volta a ser falso, pra fazer o caminho abaixo, ate que nao exista mais oque alterar e ele se trona true na mesma hora, encerrando a repetição

        //verificar se alguma NFT tem condicional que mude o buff (dentro do collectiblesCrops)
        collectiblesCrops.forEach(nft =>{
            if (nft.condicional) { //vou verificar se alguma nft tem condicional, se tiver vou fazer oq esta abaixo
                let depende = mapaDeNfts[nft.condicional.dependeDe]; //vai armazenar qual o nome da NFT de condição
                let buffAplicado = (depende && depende.possui) ? nft.condicional.novoBuff : nft.buffBase //se a condição for verdadeira, coloca o novo buff na NFT, se se torna falsa, volta ao buff original

                if (nft.buff !== buffAplicado) { //se o buff for diferente do que aplicamos, abaixo iremos aplicar o buff para ficar igual.
                    nft.buff = buffAplicado;
                    buffNftsAtualizados = true; //para mostrar que a mudança ocorreu
                };
            };
        });
        
        //verificar se alguma NFT tem alguma skill condicional que mude o buff (dentro do collectiblesCrops)
        collectiblesCrops.forEach(nft => {
            if (nft.condicionalSkill) {
                let skill = skillCrops.find(s => s.id === nft.condicionalSkill.dependeDe);
                let buffAplicado = (skill && skill.possui) ? nft.condicionalSkill.novoBuff : nft.buffBase;

                if (nft.buff !== buffAplicado) {
                    nft.buff = buffAplicado;
                    };
                };
        });


    } while (buffNftsAtualizados); //a repetição vai parar quando todos buff condicionais forem atualizados.
    
    statusCrops();
};



