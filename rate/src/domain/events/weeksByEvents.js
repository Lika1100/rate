const MSK_TIMEZONE_SHIFT = 0;

export function getFirstMonday(date) {
    const copy = new Date(date);
    copy.setHours(MSK_TIMEZONE_SHIFT)
    copy.setMinutes(0)
    copy.setSeconds(0)
    copy.setMilliseconds(0)
    const daysBetweenMondayAndFirstDay = copy.getDay() === 0 ? 6 : copy.getDay() - 1;

    const firstMonday = new Date(copy);
    firstMonday.setDate(copy.getDate() - daysBetweenMondayAndFirstDay);

    return firstMonday
}

export function weeksByEvents (events) {
    const years = events.map(event => event.start.getFullYear())
    const minYear = Math.min(...years)
    const maxYear = Math.max(...years)

    const firstDay = new Date(minYear, 0, 1, MSK_TIMEZONE_SHIFT, 0, 0)
    const minYearFirstMonday = getFirstMonday(firstDay);
    const lastDay = new Date(maxYear, 11, 31, MSK_TIMEZONE_SHIFT, 0, 0);

    
    const monArr = []


    let currentDate = new Date(minYearFirstMonday);
    while (currentDate < lastDay) {
        monArr.push(currentDate);

        const nextDate = new Date(currentDate);
        nextDate.setDate(nextDate.getDate() + 7);

        currentDate = nextDate;
    }

    return monArr;
}

export function monthByEvents (events) {
    const years = events.map(event => event.start.getFullYear())
    const minYear = Math.min(...years)
    const maxYear = Math.max(...years)

    const firstDay = new Date(minYear, 0, 1, MSK_TIMEZONE_SHIFT, 0, 0)
    const lastDay = new Date(maxYear, 11, 31, MSK_TIMEZONE_SHIFT, 0, 0);


    const monArr = []


    let currentDate = new Date(firstDay);
    while (currentDate < lastDay) {
        monArr.push(currentDate);

        const nextDate = new Date(currentDate);
        nextDate.setMonth(nextDate.getMonth() + 1);

        currentDate = nextDate;
    }

    return monArr;
}
