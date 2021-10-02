import * as api from "./src/js/api.js"; // imported the given api

const allLocations = await api.default.getLocations(); // declared variable and used await operator
let row = ''; // declared a row
allLocations.map(async (location, index) => { // mapped all locations using synch
    const incidents = await api.default.getIncidentsByLocationId(location.id); // getting all incidents by location id
    incidents.map((incident) => {
        row = `<tr class="text-center align-disable bg-dark" style=" background-color:#3e3e3e">
                <td class="text-right align-disable">` // writing html in js
        if (incident.priority === 1) { // setting condition if priority equal to 1
            row += `<img src='./src/img/alarm-low.png'/>` // on priority 1 showing the low alarm icon
        } else if (incident.priority === 2) { // setting condition if priority equal to 1
            row += `<img src='./src/img/alarm-medium.png'/>` // on priority 1 showing the medium alarm icon
        } else if (incident.priority === 3) { // setting condition if priority equal to 1
            row += `<img src='./src/img/alarm-high.png'/>` // on priority 1 showing the high alarm icon
        }
        row += `</td>
                <td>` + incident.name + `</td>
                <td class="date">` + moment(incident.datetime).format('M/D/YYYY HH:mm:ss A') + `</td>
                <td>` + incident.priority + `</td>
                <td>` + location.name + `</td>
            </tr>`;

            // showing the data on the table from api, which is all incidents name, date time, priority and location by id using variable

        $('#incidents').append(row); // used javascript append function 
    })
    if (index == allLocations.length-1) {
        $('#myTable').DataTable(); // used datatable for sorting 
    }
})
