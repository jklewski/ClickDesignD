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
xhttp.open("GET", "./assets/dosesIG.json", false);
xhttp.send();
DoseInputsIG = out;
//Define intitial state 
model = document.getElementById("modelform")[0].checked
if (model) {
  ind = 466;
  k1 = 1;
  k2 = 1;
  k3 = 1;
  ind = 466;
  D_res = 325
}
else {


}

function createMap(model) {
  mapDiv = document.createElement('div')
  mapDiv.id = 'map'
  mapDivContainer = document.getElementById('mapContainer')
  mapDivContainer.appendChild(mapDiv)


  if (model) {

    var map = L.map('map').setView([55, 15], 3);
    L.tileLayer.provider('Stamen.Terrain').addTo(map);
    var marker = L.marker([DoseInputs[ind].lat, DoseInputs[ind].lon], { draggable: 'true' }).addTo(map);

    for (var i = 0; i < DoseInputs.length; i++) {
      circleMarker = new L.circleMarker([DoseInputs[i].lat, DoseInputs[i].lon], { radius: 1, color: "red", opacity: 0.2 })
        .addTo(map);
    }
    //marker._latlng
    marker.on('dragend', function () {
      const lat = this._latlng.lat;
      const lon = this._latlng.lng;
      const d = [];
      //find index of closest match
      for (let i = 0; i < DoseInputs.length; i++) {
        d[i] = ((DoseInputs[i].lon - lon) ** 2 + (DoseInputs[i].lat - lat) ** 2) ** 0.5
      }
      ind = d.indexOf(Math.min(...d));
      //document.getElementById("D_ref").innerHTML = "<b>D<sub>Ref</sub> = " + Math.round(doses.D_log[ind]) + " dosedays </b>"
      marker.setLatLng([DoseInputs[ind].lat, DoseInputs[ind].lon]);
      inputSelected = DoseInputs[ind]
      k2_func();
    })

  } else {
    var map = L.map('map').setView([55, 15], 3);
    L.tileLayer.provider('Stamen.Terrain').addTo(map);
    var marker = L.marker([DoseInputsIG.Lats[ind], DoseInputsIG.Lons[ind]], { draggable: 'true' }).addTo(map);

    marker.on('dragend', function () {
      const lat = this._latlng.lat;
      const lon = this._latlng.lng;
      const d = [];
      //find index of closest match
      for (let i = 0; i < DoseInputsIG.Lons.length; i++) {
        d[i] = ((DoseInputsIG.Lons[i] - lon) ** 2 + (DoseInputsIG.Lats[i] - lat) ** 2) ** 0.5
      }
      ind = d.indexOf(Math.min(...d));
      //document.getElementById("D_ref").innerHTML = "<b>D<sub>Ref</sub> = " + Math.round(doses.D_log[ind]) + " dosedays </b>"
      marker.setLatLng([DoseInputsIG.Lats[ind], DoseInputsIG.Lons[ind]]);
      inputSelected = 1
    })

  }

  var menu0Tab = document.getElementById('menu0');
  var observer1 = new MutationObserver(function () {
    if (menu0Tab.style.display != 'none') {
      map.invalidateSize();
    }
  });
  observer1.observe(menu0Tab, { attributes: true });
}
createMap(true)



function k1_func() {
  var f1 = document.getElementById("form1")
  if (f1[0].checked) {
    k1 = 1
  } else if (f1[1].checked) {
    k1 = 1.2
  } else if (f1[2].checked) {
    k1 = 1.4
  }
  return k1
}

function k2_func() {
  var f2 = document.getElementById("form2")
  if (f2[0].checked && f2[2].checked) {
    k2 = 1.0
    document.getElementById("img").src = "./images/side.png"
  } else if (f2[0].checked && f2[3].checked) {
    k2 = DoseInputs[ind].k_trap1
    document.getElementById("img").src = "./images/side_w_gap.png"
  } else if (f2[0].checked && f2[4].checked) {
    k2 = DoseInputs[ind].k_trap2
    document.getElementById("img").src = "./images/side_wo_gap.png"
  } else if (f2[1].checked && f2[2].checked) {
    k2 = DoseInputs[ind].k_trap5
    document.getElementById("img").src = "./images/endgrain.png"
  } else if (f2[1].checked && f2[3].checked) {
    k2 = DoseInputs[ind].k_trap3
    document.getElementById("img").src = "./images/endgrain_w_gap.png"
  } else if (f2[1].checked && f2[4].checked) {
    k2 = DoseInputs[ind].k_trap4
    document.getElementById("img").src = "./images/endgrain_wo_gap.png"
  }
}


var searchField = document.createElement("input")
searchField.type = 'text';
searchField.id = 'myInput';
searchField.placeholder = 'Search for names...';

searchField.onkeyup = function () {
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


function createTable(model) {
  if (model) {
  }
  const body = document.body;
  divBody = document.createElement('div')
  divBody.style = "height: 300px; overflow-y:auto;"
  divBody.id = "tblBody"
  tbl = document.createElement('table');
  tbl.style.border = '3px solid black';
  tbl.id = 'table';

  var header = tbl.createTHead();
  var row = header.insertRow(0);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);

  cell1.innerHTML = "<b>Name</b>";
  cell2.innerHTML = "<b>Latin name</b>";
  cell3.innerHTML = "<b>Treatment</b>";
  cell4.innerHTML = "<b>D<sub>Rd</sub> (UC3)</b>";
  cell5.innerHTML = "<b>D<sub>Rd</sub> (UC4)</b>";
  cell1.style.color = "rgb(255,255,255)"
  cell2.style.color = "rgb(255,255,255)"
  cell3.style.color = "rgb(255,255,255)"
  cell4.style.color = "rgb(255,255,255)"
  cell1.style.backgroundColor = "rgb(0,0,0)"
  cell2.style.backgroundColor = "rgb(0,0,0)"
  cell3.style.backgroundColor = "rgb(0,0,0)"
  cell4.style.backgroundColor = "rgb(0,0,0)"
  cell5.style.backgroundColor = "rgb(0,0,0)"

  tblBody = document.createElement("tbody");
  for (let i = 0; i < materialResistance.length; i++) {
    const tr = tblBody.insertRow();
    tr.style.border = '1px solid black';
    tr.name = 'test'
    const td = tr.insertCell();
    const td2 = tr.insertCell();
    const td3 = tr.insertCell();
    const td4 = tr.insertCell();
    const td5 = tr.insertCell();


    td.innerHTML = materialResistance[i].name
    td2.innerHTML = "<i>" + materialResistance[i].latinName + "</i>"
    td3.innerHTML = materialResistance[i].treatment
    td4.innerHTML = Math.round(materialResistance[i].resistanceDoseUC3)
    td5.innerHTML = Math.round(materialResistance[i].resistanceDoseUC4)
  }

  tbl.appendChild(tblBody)
  divBody.appendChild(searchField)
  divBody.appendChild(tbl);
  prnt = document.getElementById("asdf")
  prnt.appendChild(divBody);

  let nth = model*4 + !model*5
  $("#table tr").click(function () {
    $(this).addClass('selected').siblings().removeClass('selected');
    var value = $(this).find('td:nth-child('+nth+')').html();
    D_res = value
  })
}
createTable(true)


resultbutton = document.querySelector("#resultButton")
resultButton.addEventListener("click", () => {
  var tblBody = document.getElementById("resultTableBody")
  const tr = tblBody.insertRow();
  tr.style.border = '1px solid black';
  tr.name = 'test'
  const td = tr.insertCell();
  const td2 = tr.insertCell();
  const td3 = tr.insertCell();
  const td4 = tr.insertCell();
  const td5 = tr.insertCell();
  const td6 = tr.insertCell();
  const td7 = tr.insertCell();
  if (model) {
    td.innerHTML = DoseInputs[ind].lat + ', ' + DoseInputs[ind].lon
    td2.innerHTML = DoseInputs[ind].D_ref;
    td3.innerHTML = k2
    td4.innerHTML = k1
    td5.innerHTML = Math.round(DoseInputs[ind].D_ref * k1 * k2)
    td6.innerHTML = D_res
    td7.innerHTML = Math.round(D_res / (DoseInputs[ind].D_ref * k1 * k2))
  } else if (!model) {
    td.innerHTML = DoseInputsIG.Lats[ind] + ', ' + DoseInputsIG.Lons[ind]
    td2.innerHTML = 'NA'
    td3.innerHTML = 'NA'
    td4.innerHTML = 'NA'
    td5.innerHTML = Math.round(DoseInputsIG.Doses[ind])
    td6.innerHTML = D_res
    td7.innerHTML = Math.round(D_res / (DoseInputsIG.Doses[ind]))
  }
})

/*
function updateResults() {
  el = document.querySelector('#Results')
  k2_func();
  k1_func();
}
*/


function model_func() {
  model = document.getElementById("modelform")[0].checked

  //update tabs and reset index
  if (!model) {
    document.getElementById('t2').style.display = 'none'
    document.getElementById('t3').style.display = 'none'
    document.getElementById('t4').style.display = 'none'
    ind = 466;
  }
  else if (model) {
    ind = 466;
    document.getElementById('t2').style.display = ''
    document.getElementById('t3').style.display = ''
    document.getElementById('t4').style.display = ''
  }

  var tbl = document.getElementById('tblBody')
  tbl.parentNode.removeChild(tbl)
  createTable(model)
  var map = document.getElementById("map")
  map.parentNode.removeChild(map)
  createMap(model)


}