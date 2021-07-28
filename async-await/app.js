const fetch = require('node-fetch'); // requere o módulo node-fetch
const fs = require('fs'); // requere o módulo fs

async function getData() { // função para pegar dados 
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/2'); //pega o json da api esperando o retorno
    const data = await response.json(); // converte o json para objeto espendendo o resultado de response
    return data // retorna o objeto
}

async function writeData() { // função que escreve no arquivo
    const data = await getData(); // espera a conclusão de getData
    fs.writeFile('data.json', JSON.stringify(data), (err) => { // escreve no fileSystem passando o arquivo para Json
        if (err) throw err; // se tiver um erro, retorna o erro
        console.log('Arquivo gravado!'); // quando o arquivo é gravado sem problemas, retorna essa mensagem
    });
    return data; // retorna o conteudo de data
}

writeData() // chama a função writeData

.then(() => { // quando a função writeData terminar, executa o then
    fs.readFile('data.json', 'utf8', (err, data) => { // agora que o arquivo foi criado, vamos ler ele
        if (err) throw err; // se tiver um erro, retorna o erro
        HandleData(data) // chamo a função HandleData passando o conteudo do arquivo
    })
})

function HandleData(uhuu) { // função que vai tratar o conteudo do arquivo
    const object = JSON.parse(uhuu); // converte o conteudo do arquivo para objeto
    console.log(object.title); // mostra o conteúdo da propriedade título
    console.log(object); // mostra o conteúdo completo do arquivo
}


