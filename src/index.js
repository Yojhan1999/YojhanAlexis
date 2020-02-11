const  express = require('express');
const morgan = requiere('morgan');
const exphbs = requiere('express-handlebars');
const path = require('path');

const app = express ();

// inicio
const app=express();

//configuraciones
app.set('port',process.env.PORT || 4000);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs', exphbs({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));

app.set('view engine','.hbs');

//peticiones
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
//variables globales
app.use((req,res,next)=>{
    next();
});
//rutas
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links',require('./routes/links'));
app.use('/admit',require('./routes/admit'));
/*
app.use('/links_admin',require('./routes/links_admin'));
app.use('/links_cordinador',require('./routes/links_cordinador'));
//public
app.unsubscribe(express.static(path.join(__dirname,'public')));
//ruta
*/
//inicia el server
app.listen(app.get('port'),()=>{
    console.log('server on port',app.get('port'));


});
