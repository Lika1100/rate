const inflationData = `2019,1.01,0.44,0.32,0.29,0.34,0.04,0.20,-0.24,-0.16,0.13,0.28,0.36,3.05
2020,0.40,0.33,0.55,0.83,0.27,0.22,0.35,-0.04,-0.07,0.43,0.71,0.83,4.91
2021,0.67,0.78,0.66,0.58,0.74,0.69,0.31,0.17,0.60,1.11,0.96,0.82,8.39
2022,0.99,1.17,7.61,1.56,0.12,-0.35,-0.39,-0.52,0.05,0.18,0.37,0.78,11.92
2023,0.84,0.46,0.37,,,,,,,,,,0.84`;


function getInflationByMonth() {
  const result = {}
  let compound = 1;

  for (const r of inflationData.split("\n")) {
    const [year, ...rest] = r.split(",");
    for (let i = 0; i < 12; i++) {
      compound *= (1 + rest[i] / 100);
      result[`${year}.${i}`] = compound;
    }
  }
  return result;
}

function getInflation(inflationData) {
  const result = {}
  for (const r of inflationData.split("\n")) {
    const [year, ...rest] = r.split(",")
    for (let i = 0; i < 12; i++) {
      result[`${year}.${i}`] = 1 + (rest[i] / 100)
    }
  }
  return result
}


export const monthInflation = getInflation(inflationData)

export const inflationByMonth = getInflationByMonth();
