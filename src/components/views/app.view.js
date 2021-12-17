import _ from "underscore";
import { Loader } from "@googlemaps/js-api-loader";
import weatherData from '../models/weather.model.js';
import weatherViewData from '../views/weather.view'
const additionalOptions = {};

export default Backbone.View.extend({
    map: null,
    weatherCollectionView: null,

    el: '#root',

    initialize() {
        this.render();
    },

    render() {
        const self = this;

        self.loadMapIntoTheApplication(self);
        self.renderWeatherDetails(self);
        return self;
    },

    loadMapIntoTheApplication(self) {
        const loader = new Loader({
            apiKey: "YOUR_API_KEY",
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

    renderWeatherDetails(self) {
        self.weatherCol = new weatherData.weatherCollection({
            lat: '11.66',
            lon: '78.14',
            exclude: 'hourly,alerts,current,minutely',
            units: 'metric',
            lang: 'en',
            appid: 'b3f1fe3d2ff2d408560109a61612d016',
        });
        self.weatherCol.fetch({
            success: function (data) {
                self.weatherCollectionView = new weatherViewData.weatherCollectionView({
                    model: self.weatherCol
                });
                console.log(self.weatherCollectionView);
            },
            error: function (data) {
                console.log(data);
            },
        });
    }
});