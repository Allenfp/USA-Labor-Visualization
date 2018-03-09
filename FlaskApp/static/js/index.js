var states = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];    
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

var stateValue = ""
var stateUrl = "/state/"

////////// National Data Box Stuff ///////////////////////////////// 

function changeNationalData() {

    var nationalUrl = "/national"

    d3.json(nationalUrl, function(error, nationalData) {
        //find largest and smallest sectors
        var l_sec = Object.keys(nationalData["2016"]).reduce((a, b) => nationalData["2016"][a] > nationalData["2016"][b] ? a : b);
        var s_sec = Object.keys(nationalData["2016"]).reduce((a, b) => nationalData["2016"][a] < nationalData["2016"][b] ? a : b);
        //create arrays for percentage calculation (dont worry, the JSON is presorted)
        var arr16 = Object.keys(nationalData["2016"]).map(function(key) { return nationalData["2016"][key]})
        var arr07 = Object.keys(nationalData["2007"]).map(function(key) { return nationalData["2007"][key]})
        //create an array of the keys for use later.
        var keyArr = Object.keys(nationalData["2016"])
        //do the percentage calculation
        var x = []
        for (i = 0; i < arr16.length; i++) { 
            x.push((arr16[i]/arr07[i])-1)
        }
        //find the strongest and weakest growth and put that into an array.
        var s_growth = x.reduce( (a,b,i) => a[0] < b ? [b,keyArr[i]] : a, [Number.MIN_VALUE,-1])
        var w_growth = x.reduce( (a,b,i) => a[0] > b ? [b,keyArr[i]] : a, [Number.MIN_VALUE,-1])

        d3.select('#nation_facts')
        .append('li').attr('id', 'largestSector').text('Largest Sector: ' + l_sec + ' with ' + nationalData["2016"][l_sec] + ' jobs.')
        .append('li').attr('id', 'strongestGrowth').text('Strongest Growth: ' + s_growth[1] + ' with a change of ' + Math.round(s_growth[0]*1000)/10 + "%.")
        .append('li').attr('id', 'smallestSector').text('Smallest Sector: ' + s_sec + ' with ' + nationalData["2016"][s_sec] + ' jobs.')
        .append('li').attr('id', 'weakestGrowth').text('Weakest Growth/Decline: ' + w_growth[1] + ' with a change of ' + Math.round(w_growth[0]*1000)/10 + "%.");
        });
};

changeNationalData();

function changeStateData(state) {

    stateValue = state

////////// Plotly Graph Related Stuff Goes Here /////////// 

// Blah Blah Blah
// Blah Blah Blah





////////// By State Data Box Stuff ///////////////////////////////// 

    d3.select('#state_facts').selectAll('li').remove();

    d3.json(stateUrl+state, function(error, stateData) {
        //find largest and smallest sectors
        var l_sec = Object.keys(stateData["2016"]).reduce((a, b) => stateData["2016"][a] > stateData["2016"][b] ? a : b);
        var s_sec = Object.keys(stateData["2016"]).reduce((a, b) => stateData["2016"][a] < stateData["2016"][b] ? a : b);
        //create arrays for percentage calculation (dont worry, the JSON is presorted)
        var arr16 = Object.keys(stateData["2016"]).map(function(key) { return stateData["2016"][key]})
        var arr07 = Object.keys(stateData["2007"]).map(function(key) { return stateData["2007"][key]})
        //create an array of the keys for use later.
        var keyArr = Object.keys(stateData["2016"])
        //do the percentage calculation
        var x = []
        for (i = 0; i < arr16.length; i++) { 
            x.push((arr16[i]/arr07[i])-1)
        }
        //find the strongest and weakest growth and put that into an array.
        var s_growth = x.reduce( (a,b,i) => a[0] < b ? [b, keyArr[i]] : a, [Number.MIN_VALUE,-1])
        var w_growth = x.reduce( (a,b,i) => a[0] > b ? [b, keyArr[i]] : a, [Number.MIN_VALUE,-1])


        d3.select('#state_facts')
        .append('li').attr('id', 'largestSector').text('Largest Sector: ' + l_sec + ' with ' + stateData["2016"][l_sec] + ' jobs.')
        .append('li').attr('id', 'strongestGrowth').text('Strongest Growth: ' + s_growth[1] + ' with a change of ' + Math.round(s_growth[0]*1000)/10 + "%.")
        .append('li').attr('id', 'smallestSector').text('Smallest Sector: ' + s_sec + ' with ' + stateData["2016"][s_sec] + ' jobs.')
        .append('li').attr('id', 'weakestGrowth').text('Weakest Growth/Decline: ' + w_growth[1] + ' with a change of ' + Math.round(w_growth[0]*1000)/10 + "%.");


        })

}

////////// By State By Year Data Box Stuff ///////////////////////////////// 

function changeYearData(year) {

    d3.select('#year_facts').selectAll('li').remove();

    d3.json(stateUrl+stateValue+"/year/"+year, function(error, yearData) {
        //find largest and smallest sectors
        var l_sec = Object.keys(yearData["measurementYear"]).reduce((a, b) => yearData["measurementYear"][a] > yearData["measurementYear"][b] ? a : b);
        var s_sec = Object.keys(yearData["measurementYear"]).reduce((a, b) => yearData["measurementYear"][a] < yearData["measurementYear"][b] ? a : b);
        //create arrays for percentage calculation (dont worry, the JSON is presorted)
        var arrMY = Object.keys(yearData["measurementYear"]).map(function(key) { return yearData["measurementYear"][key]})
        var arrBY = Object.keys(yearData["baseYear"]).map(function(key) { return yearData["baseYear"][key]})
        //create an array of the keys for use later.
        var keyArr = Object.keys(yearData["measurementYear"])
        //do the percentage calculation
        var x = []
        for (i = 0; i < arrMY.length; i++) { 
            x.push((arrMY[i]/arrBY[i])-1)
        }
        var y = []
        for (i = 0; i < arrMY.length; i++) { 
            y.push((arrMY[i] - arrBY[i]))
        }
        //find the strongest and weakest growth and put that into an array.
        var s_growth = x.reduce( (a,b,i) => a[0] < b ? [b, keyArr[i]] : a, [Number.MIN_VALUE,-1])
        var w_growth = x.reduce( (a,b,i) => a[0] > b ? [b, keyArr[i]] : a, [Number.MIN_VALUE,-1])
        var s_nominal_growth = y.reduce( (a,b,i) => a[0] < b ? [b, keyArr[i]] : a, [Number.MIN_VALUE,-10000000000000])
        var w_nominal_growth = y.reduce( (a,b,i) => a[0] > b ? [b, keyArr[i]] : a, [Number.MIN_VALUE,-10000000000000])

        d3.select('#year_facts')
        .append('li').attr('id', 'largestSector').text('Strongest Nominal Growth: ' + s_nominal_growth[1] + ' with ' + s_nominal_growth[0] + ' jobs.')
        .append('li').attr('id', 'strongestGrowth').text('Strongest Percentage: ' + s_growth[1] + ' with a change of ' + Math.round(s_growth[0]*1000)/10 + "%.")
        .append('li').attr('id', 'smallestSector').text('Weakest Nominal Growth/Decline: ' + w_nominal_growth[1] + ' with ' + w_nominal_growth[0] + ' jobs.')
        .append('li').attr('id', 'weakestGrowth').text('Weakest Percentage: ' + w_growth[1] + ' with a change of ' + Math.round(w_growth[0]*1000)/10 + "%.");

        console.log(s_nominal_growth)
        console.log(w_nominal_growth)
        })

    }