
const container = document.querySelector('.product-container');
let nomev= ''
let marcav= ''
let tipov = ''
const nome = document.getElementById('name');
const marca = document.getElementById('marca');
const tipo = document.getElementById('tipo');

let endPointAPI = ` http://makeup-api.herokuapp.com/api/v1/products.json?brand=${marcav}&product_type=${tipov}&name=${nomev}`;


getBuscaItensAPI(endPointAPI);

async function getBuscaItensAPI(link){
    const resp = await fetch(link);
    const itens = await resp.json(); 
    console.log(itens);
    showItens(itens);
    
}

nome.addEventListener('input', () => {
    nomev= nome.value
 getBuscaItensAPI(endPointAPI);
} )

marca.addEventListener('input', () => {
    marcav= marca.value
    getBuscaItensAPI(endPointAPI);
   } )

tipo.addEventListener('input', () => {
    tipov= tipo.value
    getBuscaItensAPI(endPointAPI);
   } )



function showItens(itens) {
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