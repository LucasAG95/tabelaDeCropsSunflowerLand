//aba para formatar os tempos que vai mostrar!

function formatarTempoDaCrop(tempo) {
    let horas = Math.floor(tempo / 3_600_000)
    let minutos = Math.floor((tempo % 3_600_000) / 60_000); 
    let segundos = Math.floor((tempo % 60_000) / 1_000);

    let hh = horas < 10 ? '0' + horas : horas;
    let mm = minutos < 10 ? '0' + minutos : minutos;
    let ss = segundos < 10 ? '0' + segundos : segundos;
    
    return `${hh}:${mm}:${ss}`;
};

function formatarTempoDaCropComDia(tempo) {
    let dias = Math.floor(tempo / 86_400_000)
    let horas = Math.floor((tempo % 86_400_000) / 3_600_000);
    let minutos = Math.floor((tempo % 3_600_000) / 60_000); 
    let segundos = Math.floor((tempo % 60_000) / 1_000);

    let dd = dias < 10 ? '0' + dias : dias;
    let hh = horas < 10 ? '0' + horas : horas;
    let mm = minutos < 10 ? '0' + minutos : minutos;
    let ss = segundos < 10 ? '0' + segundos : segundos;
    
    return `${dd}d ${hh}:${mm}:${ss}`;
};