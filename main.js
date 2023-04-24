let itens =[]
const container = document.querySelector('.product-container');
const nome = document.getElementById('name');
const marca = document.getElementById('marca');
const tipo = document.getElementById('tipo');
const org = document.getElementById('org');

let endPointAPI = ` http://makeup-api.herokuapp.com/api/v1/products.json?brand=${marca.value}&product_type=${tipo.value}`;


getBuscaItensAPI(endPointAPI);

async function getBuscaItensAPI(link){
    const resp = await fetch(link);
    itens = await resp.json(); 
    console.log(itens);
    showItens(itens);  
}

marca.addEventListener('blur', () => {
    let endPointAPI = ` http://makeup-api.herokuapp.com/api/v1/products.json?brand=${marca.value}&product_type=${tipo.value}`;
    getBuscaItensAPI(endPointAPI);
   } )

tipo.addEventListener('blur', () => {
    let endPointAPI = ` http://makeup-api.herokuapp.com/api/v1/products.json?brand=${marca.value}&product_type=${tipo.value}`;
    getBuscaItensAPI(endPointAPI);
   } )

nome.addEventListener('blur',()=> {
    itens = itens.filter(item => item.name.includes(nome.value))
    showItens(itens);
})

org.addEventListener('input',()=> {
    if(org.value == 'az'){
        itens = itens.sort((a, b) => a.name.localeCompare(b.name));
        showItens(itens);
    }
    if(org.value == 'za'){
        itens = itens.sort((a, b) => a.name.localeCompare(b.name)).reverse();
        showItens(itens);
    }
    if(org.value == 'menor'){
        itens = itens.sort((a, b) => (+a.price)-(+b.price));
        showItens(itens);
    }
    if(org.value == 'maior'){
        itens = itens.sort((a, b) => (+a.price)-(+b.price)).reverse();
        showItens(itens);
    }
})

function showItens(itens) {
    container.innerHTML='';
    let display = itens.map(item =>{
        return (
            `<div class="product">
            <img class="product-figure" src=${item.image_link} alt="">
            <section class="product-description">
                <h1 class="product-name">${item.name}</h1>
                <div class="product-brands">
                    <span class="brand">${item.brand}</span>
                    <span class="price">${((+item.price)*5.5).toFixed(2)}</span>
                </div>
            </section>
        </div>`
        )
    })
    display = display.join('')
    container.innerHTML=display
}