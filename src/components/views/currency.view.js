import _ from 'underscore';
import currencyData from '../models/currency.model.js'

const currency_view = Backbone.View.extend({
    model: new currencyData.currencyModel(),

    template: _.template($('#currency-template').html()),

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

const currencys_view = Backbone.View.extend({
    model: new currencyData.currencymodel(),

    el: $('.currency-details'),

    initialize: function () {
        const self = this;
        self.model.on('sync', self.render(self), self);
        self.model.on('add', self.render(self), self);
    },

    render: function (self) {
        self.$el.html('');
        if (self.model && self.model.toArray()) {
            _.each(self.model.toArray(), (eachData) => {
                self.$el.append(new currency_view({ model: eachData }).render().$el);
            });
        } else {
            self.$el.html('No Data Available');
        }
        return self;
    }
});

export default { currencyView: currency_view, currencyCollectionView: currencys_view };