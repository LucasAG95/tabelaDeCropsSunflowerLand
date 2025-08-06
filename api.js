fetch('https://opensheet.elk.sh/1Hx7RI8NKIsOAbke7zqaN-j9ieR3RCiWe3MNatDZu7jc/1')
  .then(res => res.json())
  .then(data => {
    data.forEach(api => {
      atualizarValoresDeVendaPorFlower(api)
  });
  })
  .catch(err => {
    console.error('Erro ao puxar a planilha:', err);
  });

//essa função irá inserir o valor de venda por flower das crops em vendaFlower
function atualizarValoresDeVendaPorFlower(apiValores) {
  crops.forEach(crop => {
    if (apiValores.name === crop.name) {
      crop.vendaFlower = apiValores.valor;
      console.log(`Crop: ${crop.name} Valor: ${crop.vendaFlower}`);
      statusCrops();
    }
  })
  
}
atualizarValoresDeVendaPorFlower();