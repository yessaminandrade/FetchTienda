const main = document.getElementsByTagName("main").item(0);
const URLMain = "https://fakestoreapi.com/products/";
const cardsContainer = document.getElementById("cards-container");


function getData(){
    const options = {"method": "GET"};
    fetch(URLMain, options)
    .then((response) => {
        console.log(response);
        response.json().then((res) => {
        //    console.log(res.length);
        //    console.log(res[0].tittle);
        createCards(res);
        });

    })
    .catch((err) => {
        main.insertAdjacentHTML("beforeend",
            `<div class = "alert alert-danger" role = "alert">
            ${err.message}
            </div>`);
    });

} //getData

getData();

function createCards(prods) {
    prods.forEach((prod, index) => {
      cardsContainer.insertAdjacentHTML("beforeend",
        `<div class="card shadow-sm" style="width: 18rem;">
          <img src="${prod.image}" class="card-img-top" alt="${prod.title}" style="height: 200px; object-fit: contain;">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${prod.title}</h5>
            <p class="card-text">${prod.description.substring(0, 80)}...</p>
            <button class="btn btn-primary mt-auto" data-index="${index}" data-bs-toggle="modal" data-bs-target="#productModal">
              Ver más
            </button>
          </div>
        </div>`);
    });
  

    const buttons = document.querySelectorAll('button[data-bs-toggle="modal"]');
    buttons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const i = btn.getAttribute("data-index");
        const prod = prods[i];
  
        document.getElementById("modalTitle").textContent = prod.title;
        document.getElementById("modalDescription").textContent = prod.description;
        document.getElementById("modalCategory").textContent = prod.category;
        document.getElementById("modalRating").textContent = prod.rating.rate;
      });
    });
  }
  
  
  