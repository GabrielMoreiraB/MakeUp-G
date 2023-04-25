let itens =[]
const container = document.querySelector('.product-container');
const nome = document.getElementById('name');
const marca = document.getElementById('marca');
const tipo = document.getElementById('tipo');
const org = document.getElementById('org');

const modalInfo = document.querySelector('.modalInfo');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('#close-modal');

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
    let display = itens.map((item, index) =>{
        return (
            `<div class="product" data-index= ${index}>
            <img class="product-figure" src=${item.api_featured_image} alt="">
            <section class="product-description">
                <h1 class="product-name">${item.name}</h1>
                <div class="product-brands">
                    <span class="brand">${item.brand}</span>
                    <span class="price"> R$ ${((+item.price)*5.5).toFixed(2)}</span>
                </div>
            </section>
        </div>`
        )
    })
    display = display.join('')
    container.innerHTML=display;



    const productElements = document.querySelectorAll('.product');
    productElements.forEach(e=> {
        e.addEventListener('click', ()=> showInfo(e))
    })
}

function showInfo(e) {
    let itemElement = e.dataset.index;
    console.log(itemElement);
    modalInfo.innerHTML=`<div class="modalInfo_cabecalho">
                            <h1>${itens[itemElement].name}</h1>
                            <img src=${itens[itemElement].api_featured_image} alt="">
                        </div>
                        <div class="product-brands">
                            <span class="brand">${itens[itemElement].brand}</span>
                            <span class="price">${((+itens[itemElement].price)*5.5).toFixed(2)}</span>
                        </div>
                        <div class="product-brands-infos">
                            <span>Brand</span>
                            <span>${itens[itemElement].brand}</span>
                        </div>
                        <div class="product-brands-infos">
                            <span>Price</span>
                            <span>${((+itens[itemElement].price)*5.5).toFixed(2)}</span>
                        </div>
                        <div class="product-brands-infos">
                            <span>Rating</span>
                            <span>${itens[itemElement].rating}</span>
                        </div>
                        <div class="product-brands-infos">
                            <span>Category</span>
                            <span>${itens[itemElement].category}</span>
                        </div>
                        <div class="product-brands-infos">
                            <span>Product_type</span>
                            <span>${itens[itemElement].product_type}</span>
                        </div>`
    modal.showModal();
}

closeModal.addEventListener('click', () =>{
    modal.close();
    modalInfo.innerHTML='';
    
})