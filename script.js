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

  let todayDate = new Date(); 
  let inputDate = new Date(input); 

  let birthDetails = {
    date: inputDate.getDate(),
    month: inputDate.getMonth() + 1,
    year: inputDate.getFullYear(),
  };

  let currentDate = todayDate.getDate();
  let currentMonth = todayDate.getMonth() + 1;
  let currentYear = todayDate.getFullYear();
  leapYearChecker(currentYear);

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

  yearOfBirth = currentYear - birthDetails.year;
  if (currentMonth >= birthDetails.month) {
    monthOfBirth = currentMonth - birthDetails.month;
  } else {
    yearOfBirth--;
    monthOfBirth = 12 + currentMonth - birthDetails.month;
  }


  if (currentDate >= birthDetails.date) {
    dateOfBirth = currentDate - birthDetails.date;
  } else {
    monthOfBirth--;
    let days = daysInMonth(birthDetails.month, birthDetails.year);
    dateOfBirth = days + currentDate - birthDetails.date;
    if (monthOfBirth < 0) {
      monthOfBirth = 11;
      yearOfBirth--;
    }
  }

  let value = todayDate - inputDate;
  let totalHours = todayDate.getHours();

  totalDays = `${Math.floor(value / (1000 * 60 * 60 * 24))} d - ${
    totalHours % 24
  } h`;

  totalWeeks = `${Math.floor(value / (1000 * 60 * 60 * 24 * 7))} w - ${
    Math.floor(value / (1000 * 60 * 60 * 24)) % 7
  } d`;

  totalMonths = `${yearOfBirth * 12 + monthOfBirth} m - ${
    Math.floor(dateOfBirth / 7) % 7
  } w`;

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

const leapYearChecker = (year) => {
  if (year % 4 == 0 || (year % 100 == 0 && year % 400 == 0)) {
    months[1] = 29;
  } else {
    months[1] = 28;
  }
};

const daysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};
