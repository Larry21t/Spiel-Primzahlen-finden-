const tableHoehe = 10
const tableBreite = 10
const groessteZahl = tableHoehe * tableBreite - 1



var zahlenInTabelle = []
function ZahlenAuflisten(){
    for(var zahl = 0; zahl <= groessteZahl; zahl += 1){
        zahlenInTabelle.push(zahl)
    }
}



function Sieben(){
    var aktuelleSiebzahl = 4
    var aktuellerSummand = 2
    zahlenInTabelle[0]= "X"
    zahlenInTabelle[1]= "X"

    while(aktuellerSummand < groessteZahl){
        while( aktuelleSiebzahl <= groessteZahl){
            zahlenInTabelle [aktuelleSiebzahl] = "X"
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
        var rowInhalt1 = zahlenInTabelle.slice(anzahlRows * tableBreite, (anzahlRows + 1) * tableBreite).join("</td><td>")
        var rowInhalt2 = "<tr><td>" + rowInhalt1 + "</td></tr>"
        var myTableInner = myTableInner + rowInhalt2
    }
    document.getElementsByTagName ("td").className = ("falscheZahl")
    myTable.innerHTML = myTableInner
    body.appendChild(myTable)
}


var punktestand = 0
function istZahlEinePrimzahl(zellenInhalt){   
    var zahlInZelle = parseInt (zellenInhalt.innerHTML) 
    if (nurPrimzahlen.includes(zahlInZelle)) {
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


var KlasseIstPrimzahl = []
var position = 0
var uebereinstimmungen = 0
function wennAllePrimzahlenAngeklicktWordenSindErscheintDieMeldung(angeklickteZelle){
    if (angeklickteZelle.className == "primzahl"){
        var ZahlDieDieKlassePrimzahlHat = parseInt(angeklickteZelle.innerHTML)
        if (KlasseIstPrimzahl.includes(ZahlDieDieKlassePrimzahlHat)){
        }
        else{
            KlasseIstPrimzahl.push(ZahlDieDieKlassePrimzahlHat)
            nurPrimzahlen.sort()
            KlasseIstPrimzahl.sort()
            while (position <= nurPrimzahlen.length){
                if (KlasseIstPrimzahl[position] == nurPrimzahlen[position]){
                    uebereinstimmungen++
                    position++
                    if (uebereinstimmungen == nurPrimzahlen.length){
                        alert("Du hast alle Primzahlen gefunden und dabei " + punktestand + " Punkte erreicht.")
                    }
                }
                else{
                    return
                }
            }
        }   
    }

}

function optionsfeldErstellen(){
    var body = document.getElementsByTagName("body") [0]
    var form = document.createElement("form")
    var absatz = document.createElement("p")
    absatz.innerHTML = "<p> Die Primzahlen sollen folgendermassen angeklickt werden: <p>"
    var option1 = document.createElement("input")
    option1.id = "der Reihe nach"
    option1.type = "radio"
    option1.name = "vorgehensweise"
    option1.value = "der Reihe nach"
    option1.onclick = function(){
        derReiheNach()
    }
    var label1 = document.createElement("label")
    label1.innerHTML = "<label for=\"reihe\"> der Reihe nach</label><br>"
    var option2 = document.createElement("input")
    option2.id = "irgendwie"
    option2.type = "radio"
    option2.name = "vorgehensweise"
    option2.value = "irgendwie"
    option2.onclick = function(){
        irgendwie()
    }
    var label2 = document.createElement("label")
    label2.innerHTML = "<label for=\"irgendwie\"> irgendwie</label>"
    form.appendChild(absatz)
    form.appendChild(option1)
    form.appendChild(label1)
    form.appendChild(option2)
    form.appendChild(label2)
    body.appendChild(form)
}

function derReiheNach(){
    nurPrimzahlen.sort(function(a, b){
        return a-b
    })
    // zellenAnklickbarMachen()
}

function irgendwie(){
    alert("irgendwie")
}





ZahlenAuflisten()
renderTabelle()
Sieben()
optionsfeldErstellen()

var nurPrimzahlen = zahlenInTabelle.filter (element => element > 0)

// function zellenAnklickbarMachen(){
    var cells = document.getElementById("myTable").getElementsByTagName("td")
    for (var i = 0; i <= groessteZahl; i++){
        cells[i].addEventListener("click", function(){
        istZahlEinePrimzahl(this)
        wennAllePrimzahlenAngeklicktWordenSindErscheintDieMeldung(this)
    });
}

// }














