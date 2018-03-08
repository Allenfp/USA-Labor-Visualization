var states = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];    
var years = ['08', '09', '10', '11', '12', '13', '14', '15', '16'];

var sel = document.getElementById('inputGroupSelect04');
for(var i = 0; i < states.length; i++) {
var opt = document.createElement('option');
opt.innerHTML = states[i];
opt.value = states[i];
sel.appendChild(opt);
}

var sel2 = document.getElementById('inputGroupSelect03');
for(var i = 0; i < years.length; i++) {
var opt2 = document.createElement('option');
opt2.innerHTML = years[i];
opt2.value = years[i];
sel2.appendChild(opt2);
}

// var stateUrl = "/state/"


function changeStateData(state) {


////////// Plotly Graph Related Stuff Goes Here /////////// 

// Blah Blah Blah
// Blah Blah Blah





////////// Data Box Stuff ///////////////////////////////// 

//     d3.select('#state_facts').selectAll('li').remove();

//     d3.json(stateUrl+state, function(error, stateData) {
 
//         d3.select('#state_facts')
//         .append('li').attr('id', 'largestSector').text('Largest Sector: '+ getMax(stateData.data16))
//         // .append('li').attr('id', 'bbType').text('BB Type: ' + sampleMeta.BBTYPE)
//         // .append('li').attr('id', 'ethnicity').text('Ethnicity: '+ sampleMeta.ETHNICITY)
//         // .append('li').attr('id', 'gender').text('Gender: ' + sampleMeta.GENDER)
//         // .append('li').attr('id', 'location').text('Location: ' + sampleMeta.LOCATION)
//         // .append('li').attr('id', 'sampleID').text('Sample ID: ' + sampleMeta.SAMPLEID)
//         })












}
