let cipok = [];
let szurescipok = [];
let kosarcipok = [];




let cipokcardok = document.getElementById("cipokcardok");





async function cipokBetoltes() {
    try {
        const response = await fetch('./json/webaruhaz.json');
        cipok = await response.json();
        szurescipok = [...cipok];
        cipokmegjelenitese();
        kategoriakgeneralas();
    } catch (error) {
        console.log('Hiba történt a cipők betöltése során!')
    }
}

function cipokmegjelenitese(){
    cipokcardok.innerHTML = "";
    
    szurescipok.forEach(element => {
        const card = document.createElement("div");
        // card.classList = "col-sm-12 col-md-6 col-lg-3"
        card.classList = "col-auto"
        card.innerHTML = `
        <div class="card h-100" style="width: 20rem;">
        <img src="${element.kep}" class="card-img-top" alt="${element.kep}">
        <div class="card-body"></div>
        <div class="card-footer">
        <h4 class="card-title">${element.marka}</h4>
        <h6 class="fw-bold">${element.modell}</h6>
        <p class="card-text">Szín: ${element.szin} | Méret: ${element.meret}</p>
                    <p class="card-text">Típus: ${element.tipus}</p>

                    <h5 class="fw-bold">${element.ar} Ft</h5>
                    <button id="kosarGomb" data-termek-id="${element.id}"><i class="bi bi-cart-plus"></i> Kosárba helyezés</button>
                </div>
                </div>`
        cipokcardok.appendChild(card)
    });


    




             document.querySelectorAll("#kosarGomb").forEach(element => {
            element.addEventListener('click', (e) => {
                const cipoid = parseInt(e.currentTarget.getAttribute('data-termek-id'));
                kosarhozAdas(cipoid);
        });
    });

    
}

function alaplefutas(){
    
        

}


document.addEventListener('DOMContentLoaded', () =>{
    cipokBetoltes();
    alaplefutas();
})



function kosarhozAdas(id){
    const cipo = cipok.find(x => x.id === id)
    kosarcipok.push(cipo);
}


