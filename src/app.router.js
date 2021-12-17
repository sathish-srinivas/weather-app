import HomeView from './components/views/app.view.js';

const router_mapper = {
    routes: {
        '': () => {
            new HomeView();
        }
    }
};

export default Backbone.Router.extend(router_mapper);
