export function groupStudents(events) {
  const studentsNames = events.map(({ name }) => name)
  const uniqStudentsNamesObj = new Set(studentsNames)
  const uniqStudentsNamesArr = [...uniqStudentsNamesObj]
  let obj = {}
  uniqStudentsNamesArr.map((name) => obj[name] = [])
  events.forEach((event) => {
    obj[event.name].push(event)
  })
  let studentsGroup = []
  for (let key in obj) {
    studentsGroup.push({ name: key, events: obj[key] })
  }
  return studentsGroup
}
