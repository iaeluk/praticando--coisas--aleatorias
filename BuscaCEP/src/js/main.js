const cep = document.querySelector('#cep')


const showData = result => {
    for (const campo in result) {
       if(document.querySelector('#'+campo)) {
           document.querySelector('#'+campo).value = result[campo];
       }
    }
}

cep.addEventListener('blur', async function (e) {
    let search = cep.value.replace('-', '')
    const options = {
        method: 'GET',
        mode: 'cors',
        cahce: 'default'
    }
    
    try {
        let response = await fetch(`https://viacep.com.br/ws/${search}/json/`, options)
        let data = await response.json()
        showData(data)
    } catch (error) {
        cep.value = ('CEP INVÁLIDO')
        console.error('Deu ruim!!!'+error)
    }
})