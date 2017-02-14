(function() {
  function makeResult(success, code) {
    return {success: success, code: code};
  }

  function makeSuccess() {
    return makeResult(true);
  }

  function makeError(code) {
    return makeResult(false, code);
  }

  function getCountdownElement(container, type) {
    switch (type) {
      case "years":
      case "months":
      case "days":
        return container.querySelector("[data-countdown=" + type + "]");
        break;
      default:
        return makeError("unknown parameter type");
    }
  }

  function showElapsedFor(container, startDate) {
    var endDate = null;
    var units = countdown.YEARS | countdown.MONTHS | countdown.DAYS;
    var timespan = countdown(startDate, endDate, units);
    getCountdownElement(container, "years").innerText = timespan.years;
    getCountdownElement(container, "months").innerText = timespan.months;
    getCountdownElement(container, "days").innerText = timespan.days;
  }

  function showCurrentDate() {
    var formattedDate = moment().locale("it").format("LL");
    document.querySelector("[data-today]").innerText = formattedDate;
  }
  document.addEventListener("DOMContentLoaded", function() {
    var containerList = document.querySelectorAll("[data-countdown=\"\"]");
    var container = null;
    var startDate = null;
    var formattedDate = null;
    var dateParts = null;
    for (var index = 0; index < containerList.length; ++index) {
      container = containerList[index];
      formattedDate = container.dataset.countdownStartDate;
      dateParts = formattedDate.split("-");
      startDate = new Date(parseInt(dateParts[0], 10), parseInt(dateParts[1], 10) - 1, parseInt(dateParts[2], 10));
      if (startDate.toString() === "Invalid Date") {
        alert("Error while parsing container #" + index + ": expecting a YYYY-MM-DD date and got " + formattedDate + " instead.");
      } else {
        showElapsedFor(container, startDate);
      }
    }

    showCurrentDate();
  });
})();
