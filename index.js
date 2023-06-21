const express = require('express');
const app = express();
const bp = require('body-parser');
const db = require('./config/db');
const engine = require('express-handlebars');
const router = require('./router/index');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const helpers = require('./util/helpers')
require('dotenv').config();

function startServer() {
    const app = express();
    const port = process.env.PORT || 3000;

    app.use(bp.urlencoded({extended: true}));
    app.use(bp.json());

    app.use(cookieParser());
    app.use(session({
    secret: process.env.SECRETKEY,
    resave: false,
    saveUninitialized: false,
    }));
    app.use(function (req, res, next) {
        res.locals.session = req.session;
        next();
    });

    //express handlebars
    app.engine('handlebars', engine.engine({
        extname: 'hbs',
        helpers: helpers
    }));
    app.set('view engine', 'handlebars');
    app.set('views', './views');
  
    // Your routes and middleware
  
    // Error-handling middleware
    app.use((err, req, res, next) => {
      console.error('Error:', err);
      // Handle the error or send an appropriate response
      res.status(500).send('Internal Server Error');
    });

    db.connect((err) => {
        if (err) throw err;
        console.log('Connected to database');
    })

    router(app);

    // Server instance
    const server = app.listen(port, (err) => {
        if(err) throw err;
        console.log(`Server is running on port http://localhost:${port}`);
    });
  
    
  
    // Error event listener
    server.on('error', (error) => {
      console.error('Server error:', error);
      // Restart the server
      server.close();
      startServer();
    });
  
    // Close event listener
    server.on('close', () => {
      console.log('Server closed');
      // Restart the server
      startServer();
    });

  }

startServer();