import Backbone from "backbone";
import _ from "underscore";

const currencyDataMap = function (response) {
    const weatherData = [];
    if (response && response.daily && Array.isArray(response.daily) && response.daily.length) {

    }
    return weatherData;
}

const currency_model = Backbone.Model.extend({
    defaults: {
        id: 0,

    }
});

const currency_collection = Backbone.Collection.extend({
    url: function () {
        const self = this;
        let queryParam = '';
        if (self.models && self.models[0] && this.models[0].attributes) {
            _.each(this.models[0].attributes, (data, key) => {
                queryParam += `${key}=${data}&`;
            })
            queryParam = queryParam.substring(0, queryParam.length - 1)
        }
        return `${process.env.CURRENCY_API}?` + queryParam;
    },
    parse: function (response) {
        console.log(response);
        const responseList = currencyDataMap(response);
        return responseList && responseList.length ? responseList : response;
    }

});


export default { currencyModel: currency_model, currencyCollection: currency_collection };

