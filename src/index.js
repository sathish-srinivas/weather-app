import AppRouter from './app.router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import '../node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '../node_modules/@fortawesome/fontawesome-free/js/brands';
import '../node_modules/@fortawesome/fontawesome-free/js/solid';
import '../node_modules/@fortawesome/fontawesome-free/js/fontawesome';

$(() => {
    new AppRouter();
    Backbone.history.start();
});