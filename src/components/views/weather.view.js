import _ from 'underscore';
import weatherData from '../models/weather.model.js'

const weather_view = Backbone.View.extend({
    model: new weatherData.weathermodel(),

    template: _.template($('#weather-template').html()),

    initialize: function () {
        const self = this;
        console.log(self);
    },

    render: function () {
        const self = this;
        self.$el.html(self.template(self.model.toJSON()));
        return self;
    }
});

const weathers_view = Backbone.View.extend({
    model: new weatherData.weathermodel(),

    el: $('.weather-details'),

    initialize: function () {
        const self = this;
        self.model.on('sync', self.render(self), self);
        self.model.on('add', self.render(self), self);
    },

    render: function (self) {
        self.$el.html('');
        if (self.model && self.model.toArray()) {
            _.each(self.model.toArray(), (eachData) => {
                self.$el.append(new weather_view({ model: eachData }).render().$el);
            });
        } else {
            self.$el.html('No Data Available');
        }
        return self;
    }
});

export default { weatherView: weather_view, weatherCollectionView: weathers_view };