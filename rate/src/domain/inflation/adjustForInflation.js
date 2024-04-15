import { monthInflation } from "./inflation";

export function adjustForInflation(monthInflation, targetMonth, targetYear, month, year) {
    if (`${targetYear}.${targetMonth}` < `${year}.${month}`) {
        return 1 / adjustForInflation(monthInflation, month, year, targetMonth, targetYear);
    }

    let currMonth = month;
    let currYear = year;
    let compound = 1
    while(`${currYear}.${currMonth}` < `${targetYear}.${targetMonth}`) {
        const key = `${currYear}.${currMonth}`
        compound *= monthInflation[key] ?? 1;

        currMonth++;
        if (currMonth === 12) {
            currMonth = 0;
            currYear++;
        }
    }

    return compound;
}

export function adjustEventsIncomeForInflation(events, targetMonth, targetYear) {
    const adjustedPrices = events.map(({start, price}) => {
        const inflation = adjustForInflation(monthInflation, start.getMonth(), start.getFullYear(), targetMonth, targetYear, )
        return price / inflation;
    });
    console.log(adjustedPrices);
    return adjustedPrices.reduce((a, b) => a + b, 0);
}

//               ↓
// 1000  1000  1000  1000  1000
// 01.22 02.22 03.22 04.22 05.22
// 0.2   0.3   0.5   0.7
// 1560  1300  1000  588          ← ответ
//     1.56
// 1000 × 1.56

// если открыть текущую неделю там есть х учеников, которые к этому моменту отзанимались среднее/медианное количество недель