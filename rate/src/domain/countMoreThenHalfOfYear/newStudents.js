const halfOfYearInDays = 181
const oneDay = 1000 * 60 * 60 * 24 // in ms

export function getNewStudents(students) {
    return students
        .map(({ events, name }) => {
            const breaksLengths = [];
            for(let i = 0; i < events.length - 1; i++) {
                const currentLesson = events[i].start
                const nextLesson = events[i + 1].start
                const amountInDays = (nextLesson - currentLesson) / oneDay
                breaksLengths.push(amountInDays)
            }

            const maxBreakLength = Math.max(...breaksLengths);

            return {
                name,
                events,
                maxBreakLength,
            }
        })
        .filter(({ maxBreakLength }) => maxBreakLength >= halfOfYearInDays)
        .sort((a, b) => b.maxBreakLength - a.maxBreakLength)
}
// [{name, events, days}]
// big  max 150 days
// пол года от 181 до 184 дней

