var tableHoehe = 5
var tableBreite = 5
var groessteZahl = tableHoehe * tableBreite - 1



/*
View Model für die Tabelle, für jede Zahl im Array gibt es in der Tabelle, 
die durch die renderTabelle-Funktion angezeigt wird, eine Zelle.
*/
var zahlenInTabelle = []
function ZahlenAuflisten(){
    zahlenInTabelle = []
    for(var zahl = 0; zahl <= groessteZahl; zahl += 1){
        zahlenInTabelle.push(zahl)
    }
}

/*
Siebt das Array zahlenInTabelle, die Nicht-Primzahlen werden durch ein X ersetzt.
*/
function arraySieben(){
    var aktuelleSiebzahl = 4
    var aktuellerSummand = 2
    zelleSieben(0)
    zelleSieben(1)

    while(aktuellerSummand < groessteZahl){
        while( aktuelleSiebzahl <= groessteZahl){
            zelleSieben(aktuelleSiebzahl)
            aktuelleSiebzahl += aktuellerSummand
        }
        aktuellerSummand++
        aktuelleSiebzahl = 2* aktuellerSummand
    }
   
}

/*
Siebt eine Zahl, indem es den Wert der aktuellen Siebzahl
im Array durch ein X ersetzt.
*/
function zelleSieben(zellenIndex){
    zahlenInTabelle [zellenIndex] = "X"
    
}


/*
Bringt das Array zahlenInTabelle durch eine Tabelle ins View.
*/
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
    myTable.innerHTML = myTableInner
    body.appendChild(myTable)
}

// Gibt true zurück, wenn die Zahl eine Primzahl ist.
function wennZahlEinePrimzahlIst(zahlInZelle){
    if(nurPrimzahlen.includes(zahlInZelle)){
        return true
    }
}

//Färbt die Zelle rot und zieht vom Punktestand einen Punkt ab.
function zahlIstKeinePrimzahl(zellenInhalt){
    zellenInhalt.className = "falscheZahl"
    punktestand--
}

//Färbt die Zelle grün und zählt zum aktuellen Punktestand einen Punkt dazu.
function zahlIstEinePrimzahl(zellenInhalt){
    zellenInhalt.className = "primzahl"
    punktestand++
}

//Färbt die Zelle orange und zieht vom Punktestand einen Punkt ab.
function zahlIstEinePrimzahlAberInFalscherReihenfolge(zellenInhalt){
    zellenInhalt.className = "primzahlInFalscherReihenfolge"
    punktestand--
}

//Gibt true zurück, wenn die Zahl die nächst grössere Primzahl ist.
function wennZahlDieNaechstGroesserePrimzahlIst(zahlInZelle){
    if(zahlInZelle == nurPrimzahlen[pos]){
        return true
    }
}

//Sortiert die Zahlen im Array nach Wert, die kleinste Zahl zuerst, die grösste zuletzt.
function arraySortieren(arrayName){
    arrayName.sort(function(a, b){
        return a-b
    })

}


var pos = 0
var punktestand = 0
/*
Färbt die Zelle grün und erhöht den Punktestand um eins, wenn die Zahl die nächst grössere Primzahl ist.
Färbt die Zelle orange und zieht eins ab vom Punktestand, wenn die Zahl eine Primzahl, 
aber nicht die nächst grössere Primzahl, ist.
Färbt die Zelle rot und zieht eins vom Punktestand ab, wenn die Zahl keine Primzahl ist.
Zeigt den aktuellen Punktestand an.
*/
function istZahlDieNaechstGroesserePrimzahl(zellenInhalt){
    arraySortieren(nurPrimzahlen)
    var zahlInZelle = parseInt (zellenInhalt.innerHTML) 
    if (wennZahlEinePrimzahlIst(zahlInZelle)) {
        if(wennZahlDieNaechstGroesserePrimzahlIst(zahlInZelle)){
            zahlIstEinePrimzahl(zellenInhalt)
            pos++
        }
        else{
           zahlIstEinePrimzahlAberInFalscherReihenfolge(zellenInhalt)
        }
            
    }
    else{
        zahlIstKeinePrimzahl(zellenInhalt)
    } 
    punkteAnzeigen(punktestand)   
}

/*
Färbt die Zelle grün und zählt eins zum Punktestand dazu, wenn die Zahl eine Primzahl ist.
Färbt die Zelle rot und zieht eins vom Punktestand ab, wenn die Zahl keine Primzahl ist.
Zeigt den Punktestand an.
*/
function istZahlEinePrimzahl(zellenInhalt){
    var zahlInZelle = parseInt(zellenInhalt.innerHTML)
    if (wennZahlEinePrimzahlIst(zahlInZelle)){
        if (zellenInhalt.className == "primzahl"){
        }
        else{
            zahlIstEinePrimzahl(zellenInhalt)
        }
    }
    else{
        zahlIstKeinePrimzahl(zellenInhalt)
    }
    punkteAnzeigen(punktestand)
}

//Bringt den Punktestand ins View
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

/* 
Zeigt die Meldung "Du hast alle Primzahlen gefunden und dabei x Punkte erreicht" als alert Box an, 
wenn alle Primzahlen gefunden worden sind bzw. die Klasse "primzahl" haben.
*/
var KlasseIstPrimzahl = []
var position = 0
function wennAllePrimzahlenAngeklicktWordenSindErscheintDieMeldung(angeklickteZelle){
    if (angeklickteZelle.className == "primzahl"){
        var ZahlDieDieKlassePrimzahlHat = parseInt(angeklickteZelle.innerHTML)
        if (KlasseIstPrimzahl.includes(ZahlDieDieKlassePrimzahlHat)){
        }
        else{
            KlasseIstPrimzahl.push(ZahlDieDieKlassePrimzahlHat)
            arraySortieren(nurPrimzahlen)
            arraySortieren(KlasseIstPrimzahl)
            while (position < nurPrimzahlen.length){
                if(wieVielePrimzahlenSindGefundenWorden(position)){
                    zeigDieMeldungAnWennAllePrimzahlenGefundenWordenSind(position)
                }
                else{
                    return
                }
                
            }
        }   
    }

}

//Gibt true zurück, wenn bei beiden Arrays der gleiche Wert am gleichen Index(Position) steht.
function wieVielePrimzahlenSindGefundenWorden(){
    if (KlasseIstPrimzahl[position] == nurPrimzahlen[position]){
        position++
        return true
    }
}

/*Zeigt die Meldung an, wenn alle Primzahlen gefunden worden sind bzw. 
wenn die uebereinstimmungen gleich gross sind wie die Länge des Arrays "nurPrimzahlen"*/
function zeigDieMeldungAnWennAllePrimzahlenGefundenWordenSind(){
    if (position == nurPrimzahlen.length){
        alert("Du hast alle Primzahlen gefunden und dabei " + punktestand + " Punkte erreicht.")
    }
}

/* 
Erstellt die zwei Optionsfelder "irgendwie" und "der Reihe nach", mit diesen kann 
die Vorgehensweise, wie die Primzahlen angeklickt werden müssen, ausgewählt werden.
Sobald ein Optionsfeld ausgewählt wurde, werden die Optionsfelder und das Dropdown-Listenfeld ausgegraut.
*/
function optionsfeldErstellen(){
    var body = document.getElementsByTagName("body") [0]
    var form = document.createElement("form")
    var absatz = document.createElement("p")
    absatz.innerHTML = "<p> 2. Die Primzahlen sollen folgendermassen angeklickt werden: <p>"
    var option1 = document.createElement("input")
    option1.id = "der Reihe nach"
    option1.type = "radio"
    option1.name = "vorgehensweise"
    option1.value = "der Reihe nach"
    option1.onclick = function(){
        zellenAnklickbarMachenFuerReihenfolge()
        option1.setAttribute("disabled", "disabled")
        option2.setAttribute("disabled", "disabled")
        select.setAttribute("disabled", "disabled")
    }
    var label1 = document.createElement("label")
    label1.innerHTML = "<label for=\"der Reihe nach\"> der Reihe nach</label><br>"
    var option2 = document.createElement("input")
    option2.id = "irgendwie"
    option2.type = "radio"
    option2.name = "vorgehensweise"
    option2.value = "irgendwie"
    option2.onclick = function(){
        zellenAnklickbarMachenFuerIrgendwie()
        option1.setAttribute("disabled", "disabled")
        option2.setAttribute("disabled", "disabled")
        select.setAttribute("disabled", "disabled")
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

/*
Macht alle Zellen in der Tabelle anklickbar.
Sobald eine Zelle angeklickt wurde, wird überprüft, ob diese Zahl die nächst grössere Primzahl ist
und ob alle Primzahlen gefunden worden sind.
*/
function zellenAnklickbarMachenFuerReihenfolge(){
    var cells = document.getElementById("myTable").getElementsByTagName("td")
    for (var i = 0; i <= groessteZahl; i++){
        cells[i].addEventListener("click", function(){
        istZahlDieNaechstGroesserePrimzahl(this)
        wennAllePrimzahlenAngeklicktWordenSindErscheintDieMeldung(this)
        });
    }
}

/*
Macht alle Zellen in der Tabelle anklickbar.
Sobald eine Zelle angeklickt wurde, wird überprüft, ob diese eine Primzahl ist und ob alle Primzahlen gefunden worden sind.
*/
function zellenAnklickbarMachenFuerIrgendwie(){
    var cells = document.getElementById("myTable").getElementsByTagName("td")
    for (var i = 0; i <= groessteZahl; i++){
        cells[i].addEventListener("click", function(){
        istZahlEinePrimzahl(this)
        wennAllePrimzahlenAngeklicktWordenSindErscheintDieMeldung(this)
        });
    }
}

var select = document.createElement("select")
//Erstellt das Dropdown-Listenfeld, mit dem die Seitenlänge der Tabelle festgelegt werden kann.
function dropdownFeldErstellen(){
    var body = document.getElementsByTagName("body")[0]
    var label1 = document.createElement("label")
    label1.innerHTML = "<label for=\"seitenlaenge\"> 1. Gib die Breite der Tabelle an: </label><br>"
    select.id = "seitenlaenge"
    for (var anzahlOptionen = 5; anzahlOptionen < 45; anzahlOptionen++){
       var selectInnerHTML1 = "<option>" + anzahlOptionen + "</option>"
       var selectInnerHTML2 = selectInnerHTML2 + selectInnerHTML1
    }
    select.innerHTML = selectInnerHTML2
    select.onchange = function(){
        listenfeld(this)
    }
    body.appendChild(label1)
    body.appendChild(select)
}

/* 
Zeigt die Tabelle mit der neu gewählten Seitenlänge an und siebt anschliessend das Array zahlenInTabelle.
*/
function listenfeld(listenfeldInhalt){
    tableHoehe = parseInt(listenfeldInhalt.value)
    tableBreite = tableHoehe
    groessteZahl = tableHoehe * tableBreite -1
    ZahlenAuflisten()
    renderTabelle()
    arraySieben()
    nurPrimzahlen = zahlenInTabelle.filter (element => element > 0)
}



ZahlenAuflisten()
dropdownFeldErstellen()
optionsfeldErstellen()
renderTabelle()
arraySieben()
var nurPrimzahlen = zahlenInTabelle.filter (element => element > 0)
