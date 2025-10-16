let alfabeto = [
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9','á','é','í','ó','ú','â','ê','ô','ã',' ',',',';','.','_','#','*','"','-','+'
]


let valoresPorLetra = []

for (let i = 0; i < alfabeto.length; i++) {
    valoresPorLetra.push(i)
}

const encrypt = (texto, chave, operacao) => {

    for (let m = 0; m < texto.length; m++) {
        let caractereVálido = false

        for (let l = 0; l < alfabeto.length; l++) {
            if (texto[m] === alfabeto[l]) {
                caractereVálido = true
            }
        }

        if (caractereVálido === false) {
            throw Error("Caractere inválido")
        }
    }


    const chaveFinal = generateChaveFinal(texto, chave)
    let textoEncriptado = ""

    for (let i = 0; i < texto.length ; i++) {
        let valorDaLetraAtual
        let valorDaLetraDaChaveAtual

        for (let j = 0; j < alfabeto.length; j++) {
            if (alfabeto[j] === texto[i]) {
                valorDaLetraAtual = valoresPorLetra[j]
            }
            if (alfabeto[j] === chaveFinal[i]) {
                valorDaLetraDaChaveAtual = valoresPorLetra[j]
            }
        }

        const resultadoDaOperacaoAtual = formula(valorDaLetraAtual, valorDaLetraDaChaveAtual, operacao)

        for (let k = 0; k < valoresPorLetra.length; k++) {
            if (resultadoDaOperacaoAtual === valoresPorLetra[k]) {
                textoEncriptado += alfabeto[k]
            }
        }
    }
    return textoEncriptado
}

const decrypt = (texto, chave, operacao) => {
    const chaveFinal = generateChaveFinal(texto, chave)
    let textoEncriptado = ""

    for (let i = 0; i < texto.length ; i++) {
        let valorDaLetraAtual
        let valorDaLetraDaChaveAtual

        for (let j = 0; j < alfabeto.length; j++) {
            if (alfabeto[j] === texto[i]) {
                valorDaLetraAtual = valoresPorLetra[j]
            }
            if (alfabeto[j] === chaveFinal[i]) {
                valorDaLetraDaChaveAtual = valoresPorLetra[j]
            }
        }

        const resultadoDaOperacaoAtual = formula(valorDaLetraAtual, valorDaLetraDaChaveAtual, operacao)

        for (let k = 0; k < valoresPorLetra.length; k++) {
            if (resultadoDaOperacaoAtual === valoresPorLetra[k]) {
                textoEncriptado += alfabeto[k]
            }
        }
    }
    return textoEncriptado
}

const formula = (value1, value2, operation) => {
    let resultado;
    if (operation === true) {
        resultado = (value1 + value2) % alfabeto.length
    } else {
        resultado = (value1 - value2 + alfabeto.length) % alfabeto.length
    }
    return resultado
}

const generateChaveFinal = (texto, chave) => {
    let chaveFinal = ""
    let i = 0

    while (chaveFinal.length < texto.length) {
        chaveFinal = chaveFinal + chave[i % chave.length]
        i++
    }

    return chaveFinal
}

const key = 'ABC1'
const texto = 'Amigos e Pessoas'

console.log("texto original:", texto)
console.log("chave:", key)

console.log("\nTexto encriptado:")
console.log(encrypt(texto, key, true))

const textoEncriptado = encrypt(texto, key, true)
console.log("\nTexto decriptado:")
console.log(decrypt(textoEncriptado, key, false))