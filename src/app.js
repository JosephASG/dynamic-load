import express from "express";
import { engine } from "express-handlebars";
import session from 'express-session';
import morgan from "morgan";

import config from "./config.js";
import cityRoute from './routes/city.routes.js'
import siteRoute from './routes/sitios.routes.js'
import clienteRoute from './routes/cliente.routes.js';
import home from './routes/index.routes.js';

import path from 'path'
import flash from 'connect-flash';

const app = express();

// middlewares
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 días de duración de la cookie de sesión
}));

app.use(flash());
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Establecer la ubicación de las vistas (templates) de Handlebars
app.set("views", path.join("src/views"));
// Configurar Handlebars como el motor de plantillas
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
}));
app.set("view engine", ".hbs");

app.use(express.static('src/public'));
// settings
app.set('port', config.port)

//Global variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
})

app.use(cityRoute)
app.use(home)
app.use(siteRoute)
app.use(clienteRoute)
export default app;