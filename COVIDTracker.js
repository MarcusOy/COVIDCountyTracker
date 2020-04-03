const BASE_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/";
const LAKE_COUNTY_FIPS = 18089;

function getData(offset){
    var today = new Date();
    today.setDate(today.getDate() + offset);
    var date = "";
    if((today.getMonth() + 1) < 10){
        date += '0';
    }
    date += (today.getMonth()+1)+'-';
    if(today.getDate() < 10){
        date += '0';
    }
    date += today.getDate()+'-'+today.getFullYear();
    var url = BASE_URL + date + ".csv";
    
    fetch(url)
    .then(function(response) {
        if(response.ok){
            response.text().then(function(text) {
                done(text);
            });
        }else getData(offset - 1);
    });
}
getData(0);

function done(data) {
    Papa.parse(data, {
        download: false,
        header: true,
        step: function(results, parser){
            if(results.data.FIPS == LAKE_COUNTY_FIPS){
                document.getElementById("num_cases").textContent = results.data.Confirmed;
                document.getElementById("num_deaths").textContent = results.data.Deaths;
                document.getElementById("num_recovered").textContent = results.data.Recovered;
                document.getElementById("last_update").textContent = results.data.Last_Update;
                parser.abort();
            }
        },
        complete: function(results) {
            console.log(results.data);
        }
    })
}