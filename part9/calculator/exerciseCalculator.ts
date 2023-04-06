interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const ratingDescription: Map<number, string> = new Map([
  [1, "horrible"],
  [2, "not too bad but could be better"],
  [3, "good job"],
]);

function calculateRating(average: number, target: number): number {
  const diff = average - target;
  if (diff < -1) {
    return 1;
  } else if (diff <= 0) {
    return 2;
  } else {
    return 3;
  }
}

export function calculateExercises(
  exerciseHours: number[],
  target: number
): Result {
  const periodLength = exerciseHours.length;
  const average = exerciseHours.reduce((a, b) => a + b) / periodLength;
  const rating = calculateRating(average, target);
  return {
    periodLength,
    trainingDays: exerciseHours.filter((h) => h > 0).length,
    success: average >= target,
    rating,
    ratingDescription: ratingDescription.get(rating) || "",
    target,
    average,
  };
}

try {
  const exerciseHours = process.argv.slice(3).map((h) => Number(h));
  const target = Number(process.argv[2]);
  console.log(calculateExercises(exerciseHours, target));
} catch (exception) {
  console.log("Failed to parse input arguments");
}
