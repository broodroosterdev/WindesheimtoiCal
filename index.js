const ical = require('ical-generator');
const http = require('http');
const request = require('request');
const moment = require('moment');
const cal = ical({domain: 'github.com', name: 'my first iCal'});

http.createServer(function(req, res) {
    let klascode = req.url.replace('/', '');
    var url = "http://api.windesheim.nl/api/klas/" + klascode + "/Les";
    request(url, function (error, response, body){ 
            let data = JSON.parse(body);
            data.forEach((appointment) =>{
                cal.createEvent({
                    uid: appointment.id,
                    start: moment.unix(appointment.starttijd / 1000).utcOffset("+02:00"),
                    end: moment.unix(appointment.eindtijd / 1000).utcOffset("+02:00"),
                    summary: appointment.commentaar,
                    location: appointment.lokaal,
                    organizer: appointment.klascode
                });
            });
            cal.serve(res);
    })
}).listen(3000, '127.0.0.1', function() {
    console.log('Server running at http://127.0.0.1:3000/');
});