const tableHoehe = 10
const tableBreite = 10
const groessteZahl = tableHoehe * tableBreite - 1



var primzahlen1 = []
function ZahlenAuflisten(){
    for(var zahl = 0; zahl <= groessteZahl; zahl += 1){
        primzahlen1.push(zahl)
    }
}



function Sieben(){
    var aktuelleSiebzahl = 4
    var aktuellerSummand = 2
    primzahlen1[0]= ""
    primzahlen1[1]= ""

    while(aktuellerSummand < groessteZahl){
        while( aktuelleSiebzahl <= groessteZahl){
            primzahlen1 [aktuelleSiebzahl] = ""
            aktuelleSiebzahl += aktuellerSummand
        }
        aktuellerSummand++
        aktuelleSiebzahl = 2* aktuellerSummand
    }
   
}


function renderTabelle(){
    var body = document.getElementsByTagName("body")[0]
    var myTable = document.getElementById ("myTable")
    if (myTable){
        body.removeChild(myTable)
    }
    myTable = document.createElement("table")
    myTable.id = "myTable"
    var myTableInner = ""

    for (var anzahlRows = 0; anzahlRows < tableHoehe; anzahlRows += 1){
        var rowInhalt1 = primzahlen1.slice(anzahlRows * tableBreite, (anzahlRows + 1) * tableBreite).join("</td><td>")
        var rowInhalt2 = "<tr><td>" + rowInhalt1 + "</td></tr>"
        var myTableInner = myTableInner + rowInhalt2
    }
    myTable.innerHTML = myTableInner
    body.appendChild(myTable)
}

var punktestand = 0
function istZahlEinePrimzahl(zellenInhalt){   
    var zahlInZelle = parseInt (zellenInhalt.innerHTML) 
    if (primzahlen1.includes(zahlInZelle)) {
        zellenInhalt.className = "primzahl"
        punktestand++
    }
    else{
        zellenInhalt.className = "falscheZahl"
        punktestand--
    } 
    punkteAnzeigen(punktestand)   
}

function punkteAnzeigen(punktestand){
    var body = document.getElementsByTagName ("body") [0]
    var anzeigePunkte = document.getElementById("anzeigePunkte")
    if(anzeigePunkte){
        body.removeChild(anzeigePunkte)
    }
    anzeigePunkte = document.createElement("p")
    anzeigePunkte.id = "anzeigePunkte"
    anzeigePunkte.innerHTML = `<p> <span class = \"rahmen\"> Punkte: ${punktestand}</span></p>`
    body.appendChild(anzeigePunkte)
}


ZahlenAuflisten()
renderTabelle()
Sieben()


var cells = document.getElementById("myTable").getElementsByTagName("td")
for (var i = 0; i <= groessteZahl; i++){
    cells[i].addEventListener("click", function(){
        istZahlEinePrimzahl(this)
    });
}



