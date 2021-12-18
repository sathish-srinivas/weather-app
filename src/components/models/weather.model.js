import Backbone from "backbone";
import _ from "underscore";

const weatherDataMap = function (response) {
    const weatherData = [];
    if (response && response.daily && Array.isArray(response.daily) && response.daily.length) {
        _.each(response.daily, (each, index) => {
            weatherData.push({
                id: each.dt,
                lat: response.lat,
                log: response.lon,
                temp: {
                    min: each.temp.min,
                    max: each.temp.max
                },
                date: new Date(each.dt * 1000).toDateString(),
                weather: {
                    main: each.weather[0]?.main,
                    description: each.weather[0]?.description,
                }
            })
        });
    }
    return weatherData;
}

const weather_model = Backbone.Model.extend({
    defaults: {
        id: 0,
        lat: 11.664325,
        log: 78.1460142,
        temp: {
            min: 0,
            max: 0
        },
        date: new Date().toLocaleString(),
        weather: {
            main: 'NA',
            description: 'NA',
        }
    }
});

const weather_collection = Backbone.Collection.extend({
    url: function () {
        const self = this;
        let queryParam = '';
        if (self.models && self.models[0] && this.models[0].attributes) {
            _.each(this.models[0].attributes, (data, key) => {
                queryParam += `${key}=${data}&`;
            })
            queryParam = queryParam.substring(0, queryParam.length - 1)
        }
        return `${process.env.WEATHER_API}?` + queryParam;
        // api.openweathermap.org/data/2.5/forecast/daily?lat=35&lon=139&cnt=10&appid={API key}
    },
    parse: function (response) {
        console.log(response);
        const responseList = weatherDataMap(response);
        return responseList && responseList.length ? responseList : response;
    }

});

const geo_location_collection = Backbone.Collection.extend({
    url: function () {
        const self = this;
        let queryParam = '';
        if (self.models && self.models[0] && this.models[0].attributes) {
            _.each(this.models[0].attributes, (data, key) => {
                queryParam += `${key}=${data}&`;
            })
            queryParam = queryParam.substring(0, queryParam.length - 1)
        }
        return `${process.env.GEO_CODING_API}?` + queryParam;
        // api.openweathermap.org/data/2.5/forecast/daily?lat=35&lon=139&cnt=10&appid={API key}
    },
    parse: function (response) {
        console.log(response);
        return response;
    }

});

export default { weathermodel: weather_model, weatherCollection: weather_collection, geoLocation: geo_location_collection };

