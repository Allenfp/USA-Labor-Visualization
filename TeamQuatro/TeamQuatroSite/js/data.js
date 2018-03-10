$(document).ready(function() {
    $('.table').DataTable();
} );

var $tbody = document.querySelector("tbody");

var yearsData = dataSet;

function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < yearsData.length; i++) {
    var data = yearsData[i];
    var fields = Object.keys(data);
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = data[field];
    }
  }
}

renderTable();