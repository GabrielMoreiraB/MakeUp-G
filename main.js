let itens = [];
const endPointAPI = 'http://makeup-api.herokuapp.com/api/v1/products.json?brand=';


getBuscaItensAPI();

async function getBuscaItensAPI(){
    const resp = await fetch(endPointAPI);
    const livros = await resp.json(); 
    console.log(livros)
}