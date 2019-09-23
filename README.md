# WindesheimtoiCal
[![CodeFactor](https://www.codefactor.io/repository/github/broodroosterdev/windesheimtoical/badge)](https://www.codefactor.io/repository/github/broodroosterdev/windesheimtoical)


 A node.js script which spawns a http server which returns a iCal file


# Usage
First, install all the needed dependencies


`npm install moment ical-generator request`


Then, run the index.js file


`node index`


Lastly, open a webbrowser with the following address (replace CLASSCODE with your classcode)


`http://127.0.0.1:3000/CLASSCODE` or `http://127.0.0.1:3000/klas/CLASSCODE`


A save prompt will open which you can use to either save the .ics file or import it into your favourite program!


You can also use the following options for Subject or Teacher Schedule


`http://127.0.0.1:3000/vak/SUBJECTCODE` & `http://127.0.0.1:3000/docent/TEACHERCODE`


# Docker
For docker usage use the following command to build your docker image


`docker build -t <your username>/node-web-app .`


After building your docker image use the following command to run the image


`docker run -p 3000:3000 -d <your username>/node-web-app`
