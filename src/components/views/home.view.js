import _ from "underscore";

export default Backbone.View.extend({
    template: _.template($('#home-template').html()),

    el: '#root',

    initialize() {
        this.render();
    },

    render() {
        const self = this;
        const htmlContent = this.template({});
        self.$el.html(htmlContent);
        return self;
    }

});