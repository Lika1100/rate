import { accumulateEvents } from '../../domain/events/accumulateEvents'

export const viewTypeConfig = {
    count: {
        color: 'linear-gradient(150deg, yellow, orange)',
        minVal: 5,
        label: 'количество занятий',
        formatter: value => value.toFixed(0),
        extractCount: (events) =>  events.length,
    },
    duration: {
        color: 'linear-gradient(150deg, #7CB9E8, #318CE7)',
        minVal: 5,
        label: 'количество часов',
        formatter: value => value.toFixed(0),
        extractCount: (events) =>  accumulateEvents(events, 'duration'),
    },
    income: {
        color: 'linear-gradient(150deg, yellowgreen, green)',
        minVal: 10_000,
        label: 'доход',
        extractCount: (events) =>  accumulateEvents(events, 'income'),
        formatter: value => Math.round(value / 1000).toFixed(0) + "k",
    },
}