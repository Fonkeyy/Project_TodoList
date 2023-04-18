export const generateCalendar = () => {
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // create table for month days
    let calendarTable = '<table>';

    // calendar header
    calendarTable += '<thead>';
    calendarTable += '<tr>';
    calendarTable += '<th>Sun</th>';
    calendarTable += '<th>Mon</th>';
    calendarTable += '<th>Tue</th>';
    calendarTable += '<th>Wed</th>';
    calendarTable += '<th>Thu</th>';
    calendarTable += '<th>Fri</th>';
    calendarTable += '<th>Sat</th>';
    calendarTable += '</tr>';
    calendarTable += '</thead>';

    // calendar body
    calendarTable += '<tbody>';

    // loop for weeks
    for (let week = 0; week < 6; week++) {
        calendarTable += '<tr>';
        // loop for days of the week
        for (let day = 0; day < 7; day++) {
            const calendarDay = week * 7 + day - firstDayOfMonth + 1;

            if (calendarDay >= 1 && calendarDay <= daysInMonth) {
                // valid day
                calendarTable += '<td><button class="day">' + calendarDay + '</button></td>';
            } else {
                // invalid day
                calendarTable += '<td>&nbsp;</td>';
            }
        }

        calendarTable += '</tr>';
    }

    calendarTable += '</tbody>';
    calendarTable += '</table>';

    // document.getElementById('calendar').innerHTML = calendarTable;

    // add click events to buttons
    const buttons = document.querySelectorAll('.day');
    for (let btn of buttons) {
        btn.addEventListener('click', (e) => {
            const day = e.target.textContent;
            alert('You clicked on the ' + day + ' of the month.');
        });
    }
    return calendarTable;
};
