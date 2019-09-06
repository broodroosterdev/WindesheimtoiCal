const ical = require('ical-generator');
const http = require('http');
const request = require('request');
const moment = require('moment');
classcode_pattern = new RegExp('^(?!.*\.\.)(?!.*\.$)[^\W][\w. -]{0,20}$')
http.createServer(function(req, res) {
    let klascode = req.url.replace('/', '');
    if(classcode_pattern.test(klascode)){res.end(); return;};
    const cal = ical({domain: 'windesheim.nl', name: klascode, timezone: 'Europe/Amsterdam'});
    var url = "http://api.windesheim.nl/api/klas/" + klascode + "/Les";
    request(url, function (error, response, body){
            let data = JSON.parse(body);
            data.forEach((appointment) =>{
                cal.createEvent({
                    uid: appointment.id,
                    start: moment.unix(appointment.starttijd / 1000).subtract(2, 'hours'),
                    end: moment.unix(appointment.eindtijd / 1000).subtract(2, 'hours'),
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