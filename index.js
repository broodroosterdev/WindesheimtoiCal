const ical = require('ical-generator');
const http = require('http');
const request = require('request');
const moment = require('moment');
const baseApiUrl = "http://api.windesheim.nl/api";
const iCalDomain = 'broodrooster.dev';
const baseiCalUrl = 'https://www.broodrooster.dev/windesheim/api'
classcode_pattern = new RegExp('^(?!.*\.\.)(?!.*\.$)[^\W][\w. -]{0,20}$')
http.createServer(function(req, res) {
    try{
        let classcode = req.url.replace('/', '');
        if(!classcode){
            console.error("No classcode provided");
            return;
        }
        if(classcode_pattern.test(classcode)){
            res.statusCode = 404;
            res.end();
            return;
        }
        if(classcode.startsWith("klas/")){
            classcode = classcode.slice(5);
            var url = baseApiUrl + "/klas/" + classcode + "/Les";
            var iCalUrl = baseiCalUrl + "/klas/" + classcode;
        } else if(classcode.startsWith("vak/")){
            classcode = classcode.slice(4);
            var url = baseApiUrl + "/vak/" + classcode + "/Les";
            var iCalUrl = baseiCalUrl + "/vak/" + classcode;
        } else if(classcode.startsWith("docent/")){
            classcode = classcode.slice(7);
            var url = baseApiUrl + "/docent/" + classcode + "/Les";
            var iCalUrl = baseiCalUrl + "/docent/" + classcode;
        } else {
            var url = baseApiUrl + "/klas/" + classcode + "/Les";
            var iCalUrl = baseiCalUrl + "/" + classcode;
        }
        const cal = ical({
            domain: `${iCalDomain}`,
            name: classcode,
            timezone: 'Europe/Amsterdam',
            url: `${iCalUrl}`
        });
        request(url, function(error, response, body){
            if(error){
                console.error(error);
                return;
            }
            let data = JSON.parse(body);
            if(!data){
                console.error("No rooster found for this classcode " + classcode);
                return;
            }
            data.forEach((appointment) => {
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
    } catch(error){
        console.error(error)
        res.statusCode = 404;
        res.end();
    }

}).listen(3000, function() {
    console.log('Server running at http://127.0.0.1:3000/');
});