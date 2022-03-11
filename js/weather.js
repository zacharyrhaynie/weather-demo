$(function () {
  // React to hitting enter in the text box instead of clicking submit.
  $("#search-weather").submit(function (e) {
    e.preventDefault();
    clearResult('');


    // Get the weather info for the selected search location. Added days 3 to default to selecting 3 days in the forecast.
    // Hope to eventually add a drop down next to forecast to allow the user to select days in forecast.
    $.get("/weather.php?query=" + $("#search").val(), function (data) {
      // Show weather results.
      if (data.current.city) {
        prepareData(data);
      } else {
        clearResult('No valid data for your location.');
      }
    });
  });

  // Joe, I reject you're error message and substitue my professional one.
  function clearResult($msg = 'Invalid input. Please try again.') {
    $(".weather_icon").attr("src", "images/trans.png");
    $("#location").hide();
    $("#city").text();
    $("#state").text();
    $(".result .description").html($msg);
    // JOE YOU FORGOT THE ;
  };

  function prepareData(data) {
    // Moved location related information out because it applies to both,
    $("#location").show();
    $("#city").text(data.current.city);
    $("#state").text(data.current.state);
    // Add functionality to show results dependent upon whether you have current or forecast currently selected.
    // Pulls current from the payload and displays it's information.
    $(".weather_icon").attr("src", data.current.icon_url);
    var desc = data.current.weather + " and " + data.current.temp_f + "&deg; F";
    $(".result .description").html(desc);
    // For each day in forecast portion of the payload, display the information. Ensure that it responds to the size of the forecast payload.
    data.forecast.forEach(forecastDay => {
      let day = $("<div></div>");
      let img = $("<img id='weather_icon'>").attr('src', forecastDay.day.condition.icon);
      day.append(img);
      day.append("<br />")
      let forecastDate = forecastDay.date;
      day.append(forecastDate)
      let desc = forecastDay.day.condition.text + " and " + forecastDay.day.avgtemp_f + "&deg; F";
      // Throwaway variable to append.
      let descr = $("<div></div>").html(desc)
      day.append(descr)
      $(".forecastResults").append(day)
    });
  };

  //Listeners to ensure that current information is hidden or shown depending upon which radio button is selected.
  $("#formatChoice").on("click", function (e) {
    if (e.target.type == "radio" && e.target.value == "Current") {
      $("#currFore").text("Current")
      $(".result .description").show()
      $(".weather_icon").show()
      $(".forecastResults").hide()
    } else if (e.target.type == "radio" && e.target.value == "Forecast") {
      $("#currFore").text("Forecast")
      $(".forecastResults").show()
      $(".weather_icon").hide()
      $(".result .description").hide()
    };
  });
});