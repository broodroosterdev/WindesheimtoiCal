# WindesheimtoiCal
[![CodeFactor](https://www.codefactor.io/repository/github/broodroosterdev/windesheimtoical/badge)](https://www.codefactor.io/repository/github/broodroosterdev/windesheimtoical)


 A node.js script which spawns a http server which returns a iCal file


# Usage
First, install all the needed dependencies


`npm install moment ical-generator request`


Then, run the index.js file


`node index`


Lastly, open a webbrowser with the following address (replace CLASSCODE with your classcode)


`http://127.0.0.1:3000/CLASSCODE` OR `http://127.0.0.1:3000/klas/CLASSCODE`

A save prompt will open which you can use to either save the .ics file or import it into your favourite program!


You can also use the following options to import Subjects or Teacher Schedule

`http://127.0.0.1:3000/vak/SUBJECTCODE` & `http://127.0.0.1:3000/docent/TEACHERCODE`

