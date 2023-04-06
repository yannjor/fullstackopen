export function calculateBmi(heightCm: number, massKg: number): string {
  const bmi = massKg / Math.pow(heightCm / 100, 2);
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal (healthy weight)";
  } else if (bmi < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
}

const height = Number(process.argv[2]);
const mass = Number(process.argv[3]);

console.log(calculateBmi(height, mass));
