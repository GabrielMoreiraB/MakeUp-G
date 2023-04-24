let itens =[]
const container = document.querySelector('.product-container');
const nome = document.getElementById('name');
const marca = document.getElementById('marca');
const tipo = document.getElementById('tipo');

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