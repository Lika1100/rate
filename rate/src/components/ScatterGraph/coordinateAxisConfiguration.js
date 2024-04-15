export function coordinateAxisConfiguration(minValue, maxValue, horizontal = false, stepsCount = 10) {
  const difference = maxValue - minValue;
  const digitsCount = Math.floor(difference).toString().length - 1
  const step = 10 **  digitsCount;
  
  const start = Math.floor(minValue / step) * step
  const end = Math.ceil(maxValue / step) * step

  let actualStepsCount = (end - start) / step;
  while(actualStepsCount < stepsCount) {
    actualStepsCount *= 2;
  }

  const actualStep = (end - start) / actualStepsCount;
  const actualStart = Math.floor(minValue / actualStep) * actualStep;
  const actualEnd = Math.ceil(maxValue / actualStep) * actualStep;

  const actualWidth = actualEnd - actualStart

  const steps = []

  for (let i = actualStep; i < actualWidth; i += actualStep) {
    steps.push([( horizontal ? i : actualWidth - i) + actualStart, i / actualWidth])
  }

  return [steps, actualStart, actualEnd];
}
