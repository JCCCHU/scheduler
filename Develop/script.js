//2013-02-08  Y M D
//2013-02-08 09:30  Y M D H M

const curTime = moment();
const dayStart = 0;
const dayEnd = 24;
let schedule = {};

$('#currentDay').text(moment().format('dddd MMMM Do, YYYY, h:mm A'));

//console.log(moment().hour());

// (Attempts to) Load local schedule
// If local storage can't be loaded, initializes a blank schedule
function loadLocal() {
    if (localStorage.getItem("schedule") === null) {
        for (var i = dayStart; i < dayEnd; i++) {
            schedule[i] = "";
        }
        localStorage.setItem("schedule", JSON.stringify(schedule));
    } else {
        schedule = JSON.parse(localStorage.getItem("schedule"));
    }
}

function render() {
    loadLocal();
    console.log(schedule);

    for (var i = dayStart; i < dayEnd; i++) {
        
        let hour = i;
        let AMPM = 'AM';
        let relative;
        let block = $("<div class='row'>");

        if (hour > 12) {
            hour -= 12;
            AMPM = 'PM';
        }
        if (i == curTime.hour()) {
            relative = 'present';
        } else if (i < curTime.hour()) {
            relative = 'past';
        } else if (i > curTime.hour()) {
            relative = 'future';
        }
        
        $(block).append(`
            <div class='col-1 hour time-block'>
                <p>${hour} ${AMPM}</p>
            </div>
            <div class='col description'>
                <form>
                    <div class="form-group ${relative}">
                        <textarea class='form-control ' id='${hour}${AMPM}' placeholder="Enter details" rows="2"></textarea>
                    </div>
                </form>
            </div>
            <div class='col-1'>
                <button type="button" class="btn saveBtn">Save</button>
            </div>
            
            `);
        $(".container").append(block);
    }
}

$(document).ready(function () {
    render();
})