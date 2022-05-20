let months = new Array(12);
months[0] = 31;
months[1] = 28;
for (let i = 2; i < 12; i++) {
  if (i % 2 == 1) {
    months[i] = 30;
  } else {
    months[i] = 31;
  }
}

const ageCalculator = () => {
  let input = document.querySelector("input").value;

  let dateOfBirth,
    monthOfBirth,
    yearOfBirth,
    totalMonths,
    totalWeeks,
    totalDays;

  let todayDate = new Date(); // Current date
  let inputDate = new Date(input); // Input date

  // For input date, months, and years
  let birthDetails = {
    date: inputDate.getDate(),
    month: inputDate.getMonth() + 1,
    year: inputDate.getFullYear(),
  };

  // For current date, months, and years
  let currentDate = todayDate.getDate();
  let currentMonth = todayDate.getMonth() + 1;
  let currentYear = todayDate.getFullYear();

  //   For Leap year
  leapYearChecker(currentYear);

  // Check if input date is not valid to calculate means greater than current date
  if (
    birthDetails.year > currentYear ||
    (birthDetails.month > currentMonth && birthDetails.year == currentYear) ||
    (birthDetails.date > currentDate &&
      birthDetails.month == currentMonth &&
      birthDetails.year == currentYear)
  ) {
    alert("Not valid");
    return;
  }

  // For year calculation
  yearOfBirth = currentYear - birthDetails.year;

  // For months calculation
  if (currentMonth >= birthDetails.month) {
    monthOfBirth = currentMonth - birthDetails.month;
  } else {
    yearOfBirth--;
    monthOfBirth = 12 + currentMonth - birthDetails.month;
  }

  // For days calculation
  if (currentDate >= birthDetails.date) {
    dateOfBirth = currentDate - birthDetails.date;
  } else {
    monthOfBirth--;
    let days = daysInMonth(birthDetails.month, birthDetails.year);
    dateOfBirth = days + currentDate - birthDetails.date;
    // When month value gets negative
    if (monthOfBirth < 0) {
      monthOfBirth = 11;
      yearOfBirth--;
    }
  }

  // For total days and weeks
  let value = todayDate - inputDate;
  let totalHours = todayDate.getHours();

  totalDays = `${Math.floor(value / (1000 * 60 * 60 * 24))} d - ${
    totalHours % 24
  } h`;

  totalWeeks = `${Math.floor(value / (1000 * 60 * 60 * 24 * 7))} w - ${
    Math.floor(value / (1000 * 60 * 60 * 24)) % 7
  } d`;

  // For total months
  totalMonths = `${yearOfBirth * 12 + monthOfBirth} m - ${
    Math.floor(dateOfBirth / 7) % 7
  } w`;

  // Display output
  displayCalculatedResult(
    yearOfBirth,
    monthOfBirth,
    dateOfBirth,
    totalMonths,
    totalWeeks,
    totalDays
  );
};

const displayCalculatedResult = (
  bYear,
  bMonth,
  bDate,
  tMonths,
  tWeeks,
  tDays
) => {
  document.getElementById("years").innerHTML = bYear;
  document.getElementById("months").innerHTML = bMonth;
  document.getElementById("days").innerHTML = bDate;
  document.getElementById("total-months").innerHTML = tMonths;
  document.getElementById("total-weeks").innerHTML = tWeeks;
  document.getElementById("total-days").innerHTML = tDays;
};

// To check leap year
const leapYearChecker = (year) => {
  if (year % 4 == 0 || (year % 100 == 0 && year % 400 == 0)) {
    months[1] = 29;
  } else {
    months[1] = 28;
  }
};

// To check how many days in that month
const daysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};
