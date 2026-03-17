let cipok = [];
let szurescipok = [];






async function cipokBetoltes() {
    try {
        const response = await fetch('./json/webaruhaz.json');
        cipok = await response.json();
        szurescipokcipok = [...cipok];
        cipokmegjelenitese();
        kategoriaMenuGeneralas();
    } catch (error) {
        console.log('Hiba történt a filmek betöltése során!')
    }
}

function cipokmegjelenitese(){
    const card = document.createElement()
}