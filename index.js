const ical = require('ical-generator');
const http = require('http');
const request = require('request');
const moment = require('moment');
classcode_pattern = new RegExp('^(?!.*\.\.)(?!.*\.$)[^\W][\w. -]{0,20}$')
http.createServer(function(req, res) {
    try{
        let classcode = req.url.replace('/', '');
        if(!classcode){
            console.error("No classcode provided");
            return;
        }
        if(classcode_pattern.test(classcode)){res.statusCode=404; res.end(); return;}
        const cal = ical({domain: 'windesheim.nl', name: classcode, timezone: 'Europe/Amsterdam'});
        var url = "http://api.windesheim.nl/api/klas/" + classcode + "/Les";
        request(url, function (error, response, body){
            if(error){
                console.error(error);
                return;
            }
            let data = JSON.parse(body);
            if(!data){
                console.error("No rooster found for this classcode " + classcode);
                return;
                
            }
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
    }catch(error){
        console.error(error)
        res.statusCode = 404;
        res.end();
    }
    
}).listen(3000, '127.0.0.1', function() {
    console.log('Server running at http://127.0.0.1:3000/');
});