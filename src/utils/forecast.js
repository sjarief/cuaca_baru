const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/cead5de102cdbd992d99279fd6d4dd5b/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' suhunya ' + (5/9 * (body.currently.temperature - 32)) + ' derajat celcius. ada peluang hujan sebesar ' + body.currently.precipProbability + '%')
        }
    })
}

module.exports = forecast