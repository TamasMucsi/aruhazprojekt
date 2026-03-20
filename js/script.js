let cipok = [];
let szurescipok = [];
let kosarcipok = [];



let kosarmodalgomb = document.getElementById("kosarmodalgomb");
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

function cipokmegjelenitese() {
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

    //Kosarhoz adas
    document.querySelectorAll("#kosarGomb").forEach(element => {
        element.addEventListener('click', (e) => {
            const cipoid = parseInt(e.currentTarget.getAttribute('data-termek-id'));
            kosarhozAdas(cipoid);
        });
    });



    //kosarbol torles
    document.querySelectorAll('#kosarTorlesGomb').forEach(element => {
        element.addEventListener('click', (e) => {
            const cipoId = parseInt(e.currentTarget.getAttribute('data-termekTorles-id'));
            cipoKosarTorlese(cipoId)
        });
    });




}

function alaplefutas() { 
    
    //ONCLICK SZAROK
    kosarmodalgomb.addEventListener('click', ()=>{
        kosarMegjelenites();
    })
}


function kosarMegjelenites() {
    let kosarbody = document.getElementById("kosarBody");
    kosarbody.innerHTML = ""; 

    if (kosarcipok.length === 0) {
        kosarbody.innerHTML = `<h2 class="text-center"><i class="bi bi-cart"></i> A kosarad üres.</h2>`;
        return;
    }

    kosarcipok.forEach(element => {
        const card = document.createElement("div");
        card.classList = "col-auto";
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
                    <button class="torles-gomb"  data-id="${element.id}"><i class="bi bi-x-octagon-fill"></i> Termék törlése a kosárból</button>
                </div>
                </div>`;
        kosarbody.appendChild(card);
    });

    document.querySelectorAll('.torles-gomb').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.getAttribute('data-id'));
            cipoKosarTorlese(id);
        });
    });
}


document.addEventListener('DOMContentLoaded', () => {
    cipokBetoltes();
    alaplefutas();
})



function kosarhozAdas(id) {
    const cipo = cipok.find(x => x.id === id)
    kosarcipok.push(cipo);
}


function cipoKosarTorlese(id){

    const elsoindexuelem = kosarcipok.findIndex(x => x.id === id);
    if (elsoindexuelem !== -1) {
        kosarcipok.splice(elsoindexuelem, 1);
    }

    kosarMegjelenites();
    
}


