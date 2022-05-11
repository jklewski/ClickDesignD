//make some sync data import
var materialResistance = []
var out = []
const xhttp = new XMLHttpRequest();
xhttp.onload = function () {
  out = JSON.parse(this.responseText)
}
xhttp.open("GET", "./assets/MaterialResistance.json", false);
xhttp.send();
materialResistance = out;
xhttp.open("GET", "./assets/doses.json", false);
xhttp.send();
doses = out;
xhttp.open("GET", "./assets/DoseInputs.json", false);
xhttp.send();
DoseInputs = out;


    var map = L.map('map').setView([55, 15], 3);
    L.tileLayer.provider('Stamen.Terrain').addTo(map);
    var marker = L.marker([51.5, -0.09], { draggable: 'true' }).addTo(map);

    for (var i = 0; i < doses.D_log.length; i++) {
    circleMarker = new L.circleMarker([DoseInputs[i].lat, DoseInputs[i].lon],{radius:1,color:"red",opacity:0.2})
    .addTo(map);
}
    //marker._latlng
    marker.on('dragend',function() {
    const lat = this._latlng.lat;
    const lon = this._latlng.lng;
    const d = [];
    //find index of closest match
    for (let i=0;i<DoseInputs.length;i++) {
      d[i] = ((DoseInputs[i].lon - lon)**2 + (DoseInputs[i].lat - lat)**2)**0.5
    }
    ind = d.indexOf(Math.min(...d));
    //document.getElementById("D_ref").innerHTML = "<b>D<sub>Ref</sub> = " + Math.round(doses.D_log[ind]) + " dosedays </b>"
    marker.setLatLng([DoseInputs[ind].lat, DoseInputs[ind].lon]);
    inputSelected = DoseInputs[ind]
    })




    function k1_func() {
        var f1 = document.getElementById("form1")
        if (f1[0].checked) {
          var k1 = 1
        } else if (f1[1].checked) {
          var k1 = 1.2
        } else if (f1[2].checked) {
          var k1 = 1.4
        }
        console.log(k1)
        document.getElementById("k1text").innerHTML = "<b>k<sub>1</sub> = " + k1 + "</b>"
        return k1
      }
      function k2_func() {
        var f2 = document.getElementById("form2")
        if (f2[0].checked && f2[2].checked) {
          var k2 = 1
          document.getElementById("img").src = "./images/sidegrain_free.png"
        } else if (f2[0].checked && f2[3].checked) {
          var k2 = 1.5
          document.getElementById("img").src = "./images7sidegrain_vented.png"
        } else if (f2[0].checked && f2[4].checked) {
          var k2 = 1.8
          document.getElementById("img").src = "./images/sidegrain_contact.png"
        } else if (f2[1].checked && f2[2].checked) {
          var k2 = 1.5
          document.getElementById("img").src = "./images/endgrain_free.png"
        } else if (f2[1].checked && f2[3].checked) {
          var k2 = 1.8
          document.getElementById("img").src = "./images/endgrain_vented.png"
        } else if (f2[1].checked && f2[4].checked) {
          var k2 = 2.5
          document.getElementById("img").src = "./images/endgrain_contact.png"
        }
        console.log(k2)
        document.getElementById("k2text").innerHTML = "<b>k<sub>1</sub> = " + k2 + "</b>"
        return k2
      }

      var searchField = document.createElement("input")
  searchField.type = 'text';
  searchField.id = 'myInput';
  searchField.placeholder = 'Search for names...';
  
  searchField.onkeyup = function() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }

  const body = document.body;
  divBody = document.createElement('div')
  divBody.style = "height: 300px; overflow-y:auto;"
  tbl = document.createElement('table');
  tbl.style.border = '3px solid black';
  tbl.id = 'table';

  var header = tbl.createTHead();
  var row = header.insertRow(0);    
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  
  cell1.innerHTML = "<b>Name</b>"; 
  cell2.innerHTML = "<b>Latin name</b>"; 
  cell3.innerHTML = "<b>Treatment</b>"; 
  cell4.innerHTML = "<b>D<sub>Rd</sub></b>"; 
  cell1.style.color="rgb(255,255,255)"
  cell2.style.color="rgb(255,255,255)"
  cell3.style.color="rgb(255,255,255)"
  cell4.style.color="rgb(255,255,255)"
  cell1.style.backgroundColor="rgb(0,0,0)"
  cell2.style.backgroundColor="rgb(0,0,0)"
  cell3.style.backgroundColor="rgb(0,0,0)"
  cell4.style.backgroundColor="rgb(0,0,0)"

  tblBody = document.createElement("tbody");
  for (let i = 0; i < materialResistance.length; i++) {
    const tr = tblBody.insertRow();
    tr.style.border = '1px solid black';
    tr.name = 'test'
    const td = tr.insertCell();
    const td2 = tr.insertCell();
    const td3 = tr.insertCell();
    const td4 = tr.insertCell();

    td.innerHTML = materialResistance[i].name
    td2.innerHTML = "<i>" +materialResistance[i].latinName + "</i>"
    td3.innerHTML = materialResistance[i].treatment
    td4.innerHTML = Math.round(materialResistance[i].resistanceDose)
  }
    
  tbl.appendChild(tblBody)
  divBody.appendChild(searchField)
  divBody.appendChild(tbl);
  prnt = document.getElementById("menu4")
  prnt.appendChild(divBody);