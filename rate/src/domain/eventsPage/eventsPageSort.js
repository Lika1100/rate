import { getFirstMonday } from "../events/weeksByEvents";
export const comparators = {
    last: {
      title: "Конец",
      comparator: (students) => (a, b) => {
        const aEvents = students[a].map(event => event.start);
        const bEvents = students[b].map(event => event.start);
  
        const aFirstMonday = getFirstMonday(aEvents[0]);
        const bFirstMonday = getFirstMonday(bEvents[0]);
        const aLastMonday = getFirstMonday(aEvents.at(-1));
        const bLastMonday = getFirstMonday(bEvents.at(-1));
  
        return aLastMonday - bLastMonday || aFirstMonday - bFirstMonday;
      },
    },
    first: {
      title: "Начало",
      comparator: (students) => (a, b) => {
        const aEvents = students[a].map(event => event.start);
        const bEvents = students[b].map(event => event.start);
  
        const aFirstMonday = getFirstMonday(aEvents[0]);
        const bFirstMonday = getFirstMonday(bEvents[0]);
        const aLastMonday = getFirstMonday(aEvents.at(-1));
        const bLastMonday = getFirstMonday(bEvents.at(-1));
  
        return aFirstMonday - bFirstMonday || aLastMonday - bLastMonday;
      },
    },
  }
  export const comparatorsKeys = Object.keys(comparators);
