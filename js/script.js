let cipok = [];
let szurescipok = [];
let kosarcipok = [];



let kosarmodalgomb = document.getElementById("kosarmodalgomb");
let cipokcardok = document.getElementById("cipokcardok");
let kosarUritesGomb = document.getElementById("kosarUritesGomb");
let ujMentesGomb = document.getElementById("ujMentesGomb");
let ujtermekform = document.getElementById("ujtermekform");
let keresoinput = document.getElementById("keresoinput")
let keresesgomb = document.getElementById("keresesgomb")





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
        <img src="${element.kep ? element.kep : `../img/nincskep.jpg`}" class="card-img-top" alt="${element.kep}">
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

    kosarUritesGomb.addEventListener('click', ()=>{
        osszesTorles();
    })

    ujMentesGomb.addEventListener('click', ()=>{
        ujCipoHozzaadas();
    })

    keresesgomb.addEventListener('click', ()=>{
        kereses();
    })

    keresoinput.addEventListener('keypress',(x) =>{
        if (x.key === "Enter") 
        {
        kereses();    
        }
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
        <img src="${element.kep ? element.kep : `../img/nincskep.jpg`}" class="card-img-top" alt="${element.kep}">
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

if (kosarmodalgomb != null) {
    document.addEventListener('DOMContentLoaded', () => {
    cipokBetoltes();
    alaplefutas();
})
}




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


function osszesTorles(){
    if (kosarcipok.length === 0) {
        alert("A kosarad üres, nincs mit törölni!!!");
        return
    }

    if (confirm(`Biztosan ki szeretnéd üríteni a kosarad?`)) {
        
            kosarcipok = [];
            szurescipok = [];
            kosarMegjelenites();    
        
    }

}


function ujCipoHozzaadas(){
    if (!ujtermekform.checkValidity()) {
        ujtermekform.reportValidity();
        return;
    }


     const ujCipo = {
        id: cipok.length > 0 ? Math.max(...cipok.map(f => f.id)) + 1: 1,
        marka: document.getElementById('ujMarka').value,
        modell: document.getElementById('ujModell').value,
        szin: document.getElementById('ujSzin').value,
        meret: parseInt(document.getElementById('ujMeret').value),
        tipus: document.getElementById('ujTipus').value,
        kep: document.getElementById('ujKep').value,
        ar: parseInt(document.getElementById('ujAr').value),
    };

    cipok.push(ujCipo);
    szurescipok = [...cipok];
    cipokmegjelenitese();

    const modal = bootstrap.Modal.getInstance(document.getElementById('ujtermekModal'));
    modal.hide();
    ujtermekform.reset();
}


function kereses(){
    const markakereses = keresoinput.value.toLowerCase().trim();
    szurescipok = cipok.filter(x => x.marka.toLowerCase().includes(markakereses));
    cipokmegjelenitese()
    const modal = bootstrap.Modal.getInstance(document.getElementById('keresesmodal'));
    modal.hide();
    keresoinput.value = "";
}
