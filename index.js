import * as api from "./src/js/api.js";

const allLocations = await api.default.getLocations();
let row = '';
allLocations.map(async (location, index) => {
    const incidents = await api.default.getIncidentsByLocationId(location.id);
    incidents.map((incident) => {
        row = `<tr class="text-center align-disable bg-dark" style=" background-color:#3e3e3e">
                <td class="text-right align-disable">`
        if (incident.priority === 1) {
            row += `<img src='./src/img/alarm-low.png'/>`
        } else if (incident.priority === 2) {
            row += `<img src='./src/img/alarm-medium.png'/>`
        } else if (incident.priority === 3) {
            row += `<img src='./src/img/alarm-high.png'/>`
        }
        row += `</td>
                <td>` + incident.name + `</td>
                <td class="date">` + moment(incident.datetime).format('M/D/YYYY HH:mm:ss A') + `</td>
                <td>` + incident.priority + `</td>
                <td>` + location.name + `</td>
            </tr>`;

        $('#incidents').append(row);
    })
    if (index == allLocations.length-1) {
        $('#myTable').DataTable();
    }
})