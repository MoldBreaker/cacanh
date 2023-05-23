const express = require('express');
const app = express();
const bp = require('body-parser');
const db = require('./config/db');
const engine = require('express-handlebars');
const router = require('./router/index');
require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(bp.urlencoded({extended: true}));
app.use(bp.json());

//express handlebars
app.engine('handlebars', engine.engine({
    extname: 'hbs'
}));
app.set('view engine', 'handlebars');
app.set('views', './views');

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
})

router(app);

app.listen(port, (err) => {
    if(err) throw err;
    console.log(`Server is running on port http://localhost:${port}`);
});