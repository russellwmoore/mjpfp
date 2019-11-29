const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

let _tmp = Array(5);
for (let i = 0; i < 5; i++) {
    let wk = Array(7).fill(null);
    _tmp[i] = wk;
}
const monthWeeks = _tmp;


export {
    monthWeeks,
    weekdays,
}
