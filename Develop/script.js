//2013-02-08  Y M D
//2013-02-08 09:30  Y M D H M

const curTime = moment();

$('#currentDay').text(moment().format('dddd MMMM Do, YYYY, h:mm A'));

console.log(moment().hour());

$(document).ready(function () {
    for (var i = 6; i < 22; i++) {
        let hour = i;
        let AMPM = 'AM';
        let relative;
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
        let block = $("<div class='row'>");
        $(block).append(`<div class='col ${relative}' id='${hour}${AMPM}'>${hour}:00 ${AMPM}</div>`);
        $(".container").append(block);
    }
})