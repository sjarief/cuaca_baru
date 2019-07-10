const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000

//direcotry
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath) 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Cuaca',
        name: 'Ahmad'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Tentang saya',
        name: 'Ahmad'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Ini halaman bantuan.',
        title: 'Bantuan',
        name: 'Ahmad'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "harus sebuah alamat"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address 
            })
        })
    }) 
})




app.get("/products", (req, res) => {
    if(!req.query.search){
        res.send({
            error: "You must provide a search term"
        })
    }  

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ahmad',
        errorMessage: 'halaman bantuan tidak ditemukan'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ahmad',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server jalan pada port ' + port)
})