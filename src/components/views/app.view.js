import _ from "underscore";
import { Loader } from "@googlemaps/js-api-loader";
import weatherData from '../models/weather.model.js';
import weatherViewData from '../views/weather.view'
const additionalOptions = {};

export default Backbone.View.extend({
    map: null,
    weatherCollectionView: null,
    currentLocation: {
        lat: 11.66,
        lon: 78.14,
        currency: 'INR',
        city: 'salem',
        state: 'Tamil Nadu',
        country: 'IN',
    },

    el: '#root',

    events: {
        'click .next-3-days': 'handleNexThreeDays'
    },

    initialize() {
        this.render();
    },

    render() {
        const self = this;
        self.handleGetCurrentLocation(self);
        return self;
    },

    handleGetCurrentLocation(self) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (sucess) {
                    self.currentLocation.lat = sucess.coords.latitude;
                    self.currentLocation.lon = sucess.coords.longitude;
                    self.updateGeoLocation(self);
                },
                function (error) {
                    self.renderAllTheView(self);
                },
            );
        } else {
            self.renderAllTheView(self);
        }
    },

    updateGeoLocation(self) {
        self.weatherCol = new weatherData.geoLocation({
            lat: self.currentLocation.lat,
            lon: self.currentLocation.lon,
            limit: 5,
            appid: process.env.WEATHER_API_KEY,
        });
        self.weatherCol.fetch({
            success: function (data) {
                data = data?.toJSON();
                if (data && Array.isArray(data) && data.length) {
                    data = data[0];
                    self.currentLocation = {
                        lat: data.lat,
                        lon: data.lon,
                        currency: 'INR',
                        city: data.name,
                        state: data.state,
                        country: data.country,
                    }
                }
                self.renderAllTheView(self);
            },
            error: function (data) {
                console.log(data);
            },
        });
    },

    renderAllTheView(self) {
        self.loadMapIntoTheApplication(self);
        self.renderWeatherDetails(self);
    },

    loadMapIntoTheApplication(self) {
        const loader = new Loader({
            apiKey: process.env.GOOGLE_API_KEY,
            version: "weekly",
            ...additionalOptions,
        });
        loader.load().then(() => {
            self.map = new google.maps.Map(document.getElementById("map-container-id"), {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8,
            });
        });
    },

    handleNexThreeDays: function ($event) {
        const self = this;
        $event.stopPropagation()
        self.renderWeatherDetails(self, 1);
    },

    renderWeatherDetails(self, page = 0) {
        self.weatherCol = new weatherData.weatherCollection({
            lat: self.currentLocation.lat,
            lon: self.currentLocation.lon,
            exclude: 'hourly,alerts,current,minutely',
            units: 'metric',
            lang: 'en',
            appid: process.env.WEATHER_API_KEY,
        });
        page = (page * 3) + 3;
        self.weatherCol.fetch({
            success: function (data) {
                self.weatherCollectionView = new weatherViewData.weatherCollectionView({
                    model: new weatherData.weatherCollection(_.filter(self.weatherCol.toJSON(), (eachData, index) => {
                        return index <= page;
                    }))
                });
                self.updateCurrDetails(self, data.toJSON()[0]);
                console.log(self.weatherCollectionView);
            },
            error: function (data) {
                console.log(data);
            },
        });
    },

    updateCurrDetails(self, data) {
        if (!data) {
            return;
        }
        const dateObj = new Date();
        const hour = (dateObj.getHours() % 13);
        let minutes = dateObj.getMinutes();
        const format = (dateObj.getHours() / 12) >= 1 ? 'pm' : 'am';
        minutes = minutes > 9 ? minutes : ('0' + minutes)
        const timeFormat = `${hour}:${minutes}${format}, ${data.date}`;
        $('#curr_date').text(timeFormat);
        $('#curr_location').text(`${self.currentLocation.city}, ${self.currentLocation.state}`);
        $('#curr_degree').text(data.temp.min);
    }
});