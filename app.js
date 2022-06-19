import express from 'express';
import passport from 'passport'
import sendEmail from './email.js';
import magicLogin from './auth.js';
import cookieParser from 'cookie-parser';
import session from 'express-session'

const app = express()
const port = 3000;

// Add the passport-magic-login strategy to Passport


app.set('view engine', 'pug');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser('1234'));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: '1234',
    cookie: {
      httpOnly: true,
      secure: false,
    },
  }));
passport.use(magicLogin);
app.use(passport.initialize());
app.use(passport.session());



app.get('/', (req, res) => {
    res.render('index', { title: 'Test', message: 'Version: 0.0.1'});
});

app.get('/samples', (req, res) => {
    res.send({
        message: 'success',
        status: 'OK'
    })
});

app.post('/sendEmail', async (req, res) => {
    await sendEmail({to: req.body.to, body: req.body.body}, res);
})

// This is where we POST to from the frontend
app.post("/auth/magiclogin", magicLogin.send);

// The standard passport callback setup
app.get(magicLogin.callbackUrl, passport.authenticate("magiclogin"));

app.listen(port, () => {
    console.log(`App listening on port: ${port}!!`);
});