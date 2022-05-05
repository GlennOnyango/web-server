const path = require('path');

const express = require('express');
const hbs = require('hbs');

const app = express();

// const homepath = path.join(__dirname,'../public');

// app.use(express.static(homepath));

const port = process.env.port || 3000;

const pathViews = path.join(__dirname,'../templates/views');
const pathPartials = path.join(__dirname,'../templates/partials');
app.set('view engine','hbs');
app.set('views',pathViews);
hbs.registerPartials(pathPartials);

app.get('', (req, res) => {
    res.render('index',{
        'title':'my Home',
        'name':'Glenn',
    });
})
app.get('/about', (req, res) => {
    res.render('about');
})
app.get('/help', (req, res) => {
    res.render('help');
})
app.get('/weather', (req, res) => {
    console.log(req.query);
    if(!req.query.address){
        return res.send({error:'Please provide an address'}) 
    }
    

    res.send({address:req.query.address});
    
})

app.get('/help/*', (req, res) => {
    res.render('404',{'message':"Help article does not exist"});
})

app.get('*', (req, res) => {
    res.render('404',{'message':'Page Not Found'});
})

app.listen(port, () => {
    console.log('Server is up on port 3000.')
})