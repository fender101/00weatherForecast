//Aeris Forecast Object Logic

window.onload = function() {

const aeris = new AerisWeather('XPvRjjJwk7jY8JHijPi0L', 'zFhTundlhjQ7YzfDD30Vo5w1VKdhlhwLKL2UkuBP');

const loc = 'oakland,ca';
 
const forecastRequest = aeris.api().endpoint('forecasts').place(loc).limit(5).get();
const placesRequest = aeris.api().endpoint('places').place(loc).get();


const weatherResults = Promise.all([forecastRequest, placesRequest]);

weatherResults
    .then((apiResults) => {
        const forecastsResults = apiResults[0].data;
        const placesResults = apiResults[1].data;

        document.getElementById('location').innerHTML = formatPlaceName(placesResults);

        renderForecastDays(forecastsResults[0].periods);
    });

function formatPlaceName(obj) {
    const stateOrCountry = (obj.place.state) ? obj.place.state : obj.place.country;
    return `${obj.place.name}, ${stateOrCountry}`;
    }

function renderForecastDays(periods) {
        periods.reverse();
     
        const weekdayNames = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];
     
        periods.forEach(period => {
            const dayName = weekdayNames[new Date(period.dateTimeISO).getDay()];
            const iconSrc = `https://cdn.aerisapi.com/wxblox/icons/${period.icon || 'na.png'}`;
            const maxTempF = period.maxTempF || 'N/A';
            const minTempF = period.minTempF || 'N/A';
            const weather = period.weatherPrimary || 'N/A';
     
            const template = (`
                <div class="card" style="width: 20%">
                    <div class="card-body">
                        <h4 class="card-title text-center">${dayName}</h4>
                        <p><img class="card-img mx-auto d-block" style="max-width: 100px;" src="${iconSrc}"></p>
                        <h6 class="card-title text-center">${weather}</h6>
                        <p class="card-text text-center">High: ${maxTempF} Low: ${minTempF}</p>
                    </div>
                </div>
            `);
     
            document.getElementById('forecast-items').insertAdjacentHTML('afterbegin', template);
        });
    }
}

