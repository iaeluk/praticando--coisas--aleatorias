let usuarioEscolha = document.querySelector('.e__usuario')
let computadorEscolha = document.querySelector('.e__computador')
let resultadoDisplay = document.querySelector('.resultado')
let resultadoRodada = document.querySelector('.rodada')
let rodadaModal = document.querySelector('.rodadaModal')
let resultadoModal = document.querySelector('.resultadoModal')
let modal = document.querySelector('.modal')

let escolhaU
let escolhaC
let resultado

function escolha(numero) {
    
    switch (numero) {
        case 1: escolhaU = "pedra"
            break;
        case 2: escolhaU = "papel"
            break;
        case 3: escolhaU = "tesoura"
    }
    usuarioEscolha.innerText = escolhaU


    let randomNumber = function aleatorio() {
        return Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    }

    switch (randomNumber()) {
        case 1: escolhaC = "pedra"
            break;
        case 2: escolhaC = "papel"
            break;
        case 3: escolhaC = "tesoura"
    }
    computadorEscolha.innerText = escolhaC

    game(escolhaU, escolhaC)
}

let pontos = [0, 0]
let rodada = 0

function game(escolhaU, escolhaC) {
    


    switch (escolhaU + escolhaC) {
        case "papelpapel": resultado = `Empate!`
            rodada++
            break;
        case "pedrapedra": resultado = `Empate!`
            rodada++
            break;
        case "tesouratesoura": resultado = `Empate!`
            rodada++
            break;
        case "papelpedra": resultado = `Vitória!`
            rodada++
            pontos[0]++
            break;
        case "tesourapapel": resultado = `Vitória!`
            rodada++
            pontos[0]++
            break;
        case "pedratesoura": resultado = `Vitória!`
            rodada++
            pontos[0]++
            break;
        case "papeltesoura": resultado = `Derrota!`
            rodada++
            pontos[1]++
            break;
        case "pedrapapel": resultado = `Derrota!`
            rodada++
            pontos[1]++
            break;
        case "tesourapedra": resultado = `Derrota!`
            rodada++
            pontos[1]++

    }

    resultadoRodada.innerText = `Você ${pontos[0]} x ${pontos[1]} Computador `
    resultadoDisplay.innerText = `Rodada ${rodada} - ${resultado}`

    if (rodada == 3) {
        rodadaModal.innerText = `Você ${pontos[0]} x ${pontos[1]} Computador `
        modal.classList.toggle('visible')
        
        vencedorFinal()
    }
    
    function vencedorFinal() {
        if (pontos[0] > pontos[1]) {
            resultadoModal.innerText += "Você Ganhou!"
        } else if (pontos[0] === pontos[1]) {
            resultadoModal.innerText += "Ninguém ganhou!"
        } else {
            resultadoModal.innerText += "O computador ganhou!"
            console.log("Computador ganhou")
        }  
    }
}

function jogarNovamente() {
    pontos = [0, 0]
    rodada = 0
    escolhaU = '--'
    usuarioEscolha.innerText = escolhaU
    escolhaC = '--'
    computadorEscolha.innerText = escolhaC
    resultadoRodada.innerText = `Você ${pontos[0]} x ${pontos[1]} Computador `
    resultadoDisplay.innerText = `Rodada`
    resultadoModal.innerHTML = ''
    modal.classList.toggle('visible')
}
