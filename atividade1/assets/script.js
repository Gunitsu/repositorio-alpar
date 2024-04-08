function rolarParaElemento(seletorElemento, instancia = 0) {
    // Seleciona todos os elementos que correspondem ao seletor fornecido
    const elementos = document.querySelectorAll(seletorElemento);
    // Verifica se há elementos correspondentes ao seletor e se a instância solicitada existe
    if (elementos.length > instancia) {
        // Rolagem para a instância especificada do elemento
        elementos[instancia].scrollIntoView({ behavior: 'smooth' });
    }
}

const link1 = document.getElementById("link1");
const link2 = document.getElementById("link2");
const link3 = document.getElementById("link3");

link1.addEventListener('click', () => {
    rolarParaElemento('.header');
});

link2.addEventListener('click', () => {
    // Rolagem para o segundo elemento com classe "header"
    rolarParaElemento('.header', 1);
});

link3.addEventListener('click', () => {
    rolarParaElemento('.card2');
});
