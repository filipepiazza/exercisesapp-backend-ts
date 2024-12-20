interface ResultValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyHours: number[],
  target: number
): ResultValues => {
  const periodLength = dailyHours.length;
  let trainingDays = dailyHours.filter((day) => day > 0).length;
  const totalHrsTrained = dailyHours.reduce((a, b) => a + b);
  let success = false;
  let rating = 0;
  let ratingDescription;
  const average = totalHrsTrained / trainingDays;

  if (average >= target) {
    success = true;
    rating = 1;
    ratingDescription = "you did it";
  } else {
    ratingDescription = "you failed";
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

// const startCalculation = (args: string[]) => {
//   const target = Number(args[2]);
//   const dailyhours = args.splice(3).map((arg) => Number(arg));

//   console.log(target, dailyhours);

//   console.log(calculateExercises(dailyhours, target));
// };

//startCalculation(process.argv);
