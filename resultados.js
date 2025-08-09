//api para puxar valores do flower das crops entre outros recursos
fetch('https://opensheet.elk.sh/1Hx7RI8NKIsOAbke7zqaN-j9ieR3RCiWe3MNatDZu7jc/1')
  .then(res => res.json())
  .then(data => {  
    atualizarValoresDeVendaPorFlower(data[0]) //vai mandar para a funcção digitada o que ela puxou da api de preços do sfl.world, primeiro data(nome da variavel), o outro data é um objeto que tem p2p como outro objeto dentro, que por sua vez tem outros resultados dentro
    console.log(data[0])
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
        atualizarStatusDasCrops();
        };  
    });
  
};

// 1 hora = 3 600 000 - 1 minuto = 60 000 - 1 segundo = 1000
function formatarTempo(tempoDaCrop) { //ms é de milissegundos
    const horas = Math.floor(tempoDaCrop / 3_600_000); // esse sinal _ serve para separar apenas casa decimais, é visual!
    const minutos = Math.floor((tempoDaCrop % 3_600_000) / 60_000); // % serve para dividir e pegar o resto da divisão!
    const segundos = Math.floor((tempoDaCrop % 60_000) / 1_000); // Math.floor arredonda o numero pra baixo

    //para adicionar 0 a frente da hora!
    const hh = horas < 10 ? '0' + horas : horas;
    const mm = minutos < 10 ? '0' + minutos : minutos;
    const ss = segundos < 10 ? '0' + segundos : segundos;

    //vai mostrar o resultado dentro das outras funções que puxar ela
    return `${hh}:${mm}:${ss}`;
};

function tempoParaColherTudo(tempoDaCrop, quantidadePlantada) {
    
    let tempo = Math.ceil(quantidadePlantada / plots) * tempoDaCrop

    const horas = Math.floor(tempo / 3_600_000); // esse sinal _ serve para separar apenas casa decimais, é visual!
    const minutos = Math.floor((tempo % 3_600_000) / 60_000); // % serve para dividir e pegar o resto da divisão!
    const segundos = Math.floor((tempo % 60_000) / 1_000); // Math.floor arredonda o numero pra baixo

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
            <h1> Resultado das Crops</h1>
            <th> Crop\nEstoque </th>
            <th> Crop por Plot\nTempo da Crop </th>
            <th> Sementes que vai Plantar <button onclick="sementesPlantadas()">Salvar</button> </th>
            <th> Sementes Plantadas\nTempo Plantando</th>
            <th> Colheita Total </th>
            <th> Custo em Sementes\nVenda das Crops </th>
            <th>Lucro Final\npor Coins</th>
            <th>Valor do Market P2P</th>
            <th>Vendendo no Market\nTaxa: ${(taxa * 100) * desconto}%</th>
        </tr>
      </thead>
      <tbody>
  `;
    //Criação da variavel para calcular o lucro total com o combo montado e o tempo total do combo montado
    let lucroVendendoTudo = 0;
    let tempoTotal = 0;

    crops.forEach(crop => {
        if(!crop.estacao.includes(temporada)) return;        
    
        let multiCrop = 1; //buffs de % serao adicionados aqui
        let somaCrop = 0; //buffs de + serao adicionados aqui
        let menosCrop = 0; //debuffs de + serao adicionados aqui
        let tempoCrop = 1; //buffs de tempo serao adicionados aqui
        let vendaCoins = 1; //buffs que aumentam o valor da venda de crops por coins serao adicionados aqui
        let custoCoins = 1; //buffs que reduzem o valor de compra das sementes por coins serao adicionados aqui
        let somaArea = 0; //buffs que afetam quantidade em area serao somados aqui
        let instaCrop = 1; //buffs que coletam crop instantaneamente serao adicionados aqui
        let estoqueCrops = 1; //buffs que afetarem o estoque serao adicionados aqui

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

            //todas collectibles que afetarem quantidade em area e possuirem essas condições serao adicionadas ao somaArea!
            if (collectibles.possui === true && collectibles.afeta.includes('areaQtd') && collectibles.sinal === '+' && (collectibles.estacao === 'todas' || collectibles.estacao.includes(temporada)) &&
            (collectibles.cropAfetada === 'todas' || collectibles.cropAfetada.includes(crop.tier) || collectibles.cropAfetada.includes(crop.name))) {
                somaArea += collectibles.buff;
            };

            //todas collectibles que afetarem estoque e possuirem essas condições serao adicionadas a estoqueCrops!
            if (collectibles.possui === true && collectibles.afeta.includes('estoque') && collectibles.sinal === 'x' && (collectibles.estacao === 'todas' || collectibles.estacao.includes(temporada)) &&
            (collectibles.cropAfetada === 'todas' || collectibles.cropAfetada.includes(crop.tier) || collectibles.cropAfetada.includes(crop.name))) {
                estoqueCrops *= collectibles.buff;
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

            //todas wearables que forem de coleta instantanea e possuirem essas condições serao adicionadas ao instaCrop
            if (wearables.possui === true && wearables.afeta.includes('instantaneo') && wearables.sinal === 'x' && (wearables.estacao === 'todas' || wearables.estacao.includes(temporada)) &&
            (wearables.cropAfetada === 'todas' || wearables.cropAfetada.includes(crop.tier) || wearables.cropAfetada.includes(crop.name))) {
                instaCrop *= wearables.buff;
            };

        });

        //Quantidade de Crop
        let colheitaPorPlot = ((1 * multiCrop) + somaCrop + (somaArea / plots) - menosCrop) * instaCrop;
        let colheitaTotal = colheitaPorPlot * crop.quantidade;

        //Tempo de cada Crop e tempo total plantando as sementes
        let tempoFinal = crop.tempo * tempoCrop;
        let tempoPlantando = tempoParaColherTudo(tempoFinal, crop.quantidade);
        //tempo total do combo
        tempoTotal += (Math.ceil(crop.quantidade / plots) * tempoFinal);
        
        //Lucro das Crops
        let compraSemente = (crop.custoDaSemente * custoCoins) * crop.quantidade
        let vendaCrops = (colheitaPorPlot * crop.vendaDaCrop * vendaCoins) * crop.quantidade;
        let lucro = vendaCrops - compraSemente;

        //Estoque de sementes de cada Crop
        let estoqueSemente = crop.estoqueDeSementes * estoqueCrops;
        
        //Lucro vendendo recursos por Flower
        let lucroFlower = (crop.vendaFlower * colheitaTotal) * (1 - (taxa * desconto));

        //somar o combo
        lucroVendendoTudo += lucroFlower;

        tabela += `
            <tr>
                <td> <img src="imagens/${crop.name}.png" alt="${crop.name}" class="crop-img"> ${crop.name} \n <img src="imagens/reestock.png" class="crop-img">${estoqueSemente} </td>
                <td> <img src="imagens/${crop.name}.png" class="crop-img">${colheitaPorPlot.toFixed(2)} \n <img src="imagens/tempo.png" class="crop-img">${formatarTempo(tempoFinal)} </td>
                <td> <input type="number" placeholder="Qtd" data-name="${crop.name}" class="quantidade-input" value="${crop.quantidade}"> </td>
                <td> <img src="imagens/seeds.png" class="crop-img">${crop.quantidade} \n <img src="imagens/tempo.png" class="crop-img">${tempoPlantando} </td>
                <td> <img src="imagens/${crop.name}.png" class="crop-img">${colheitaTotal.toFixed(2)}</td>
                <td> <img src="imagens/coins.png" class="crop-img">${compraSemente.toFixed(2)} \n <img src="imagens/coins.png" class="crop-img">${vendaCrops.toFixed(2)}</td>
                <td><img src="imagens/coins.png" class="crop-img">${lucro.toFixed(2)}</td>
                <td><img src="imagens/${crop.name}.png" class="crop-img"> \n <img src="imagens/flower.png" class="crop-img">${crop.vendaFlower}</td>
                <td><img src="imagens/flower.png" class="crop-img">${(lucroFlower).toFixed(5)}</td>
            </tr>

            `;
            //<img src="imagens/coins.png" class="crop-img">${compraSemente.toFixed(2)}
    });

    //pegar o total do tempo do combo e ver a média que rende em 24h
    let lucroDiario = (vinteQuatroHoras / tempoTotal) * lucroVendendoTudo;

    
    tabela += `<p> Lucro Total do Combo: <img src="imagens/flower.png" class="crop-img">${(lucroVendendoTudo).toFixed(3)}\n Média de Lucro em 24h: <img src="imagens/flower.png" class="crop-img">${(lucroDiario).toFixed(3)}</p>`
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
                    buffNftsAtualizados = true;
                };
            };
        });

    } while (buffNftsAtualizados); //a repetição vai parar quando todos buff condicionais forem atualizados.
    statusCrops();
    
};

