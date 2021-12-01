$(function () {
  // React to hitting enter in the text box instead of clicking submit.
  $("#search-weather").submit(function(e) {
    e.preventDefault();
    clearResult('');

    // Get the weather info for the selected search location.
    $.get("/weather.php?query=" + $("#search").val(), function (data) {
      // Show weather results.
      if (data.temp_f) {
        showResult(data);
      } else {
        clearResult('No valid data for your location.');
      }
    });
  });

  function clearResult($msg = 'Sorry Charlie! Not a valid input.') {
    $(".weather_icon").attr("src", "images/trans.png");
    $("#location").hide();
    $("#city").text();
    $("#state").text();
    $(".result .description").html($msg);
  }

  function showResult(data) {
    $(".weather_icon").attr("src", data.icon_url);
    $("#location").show();
    $("#city").text(data.city);
    $("#state").text(data.state);
    var desc = data.weather + " and " + data.temp_f + "&deg; F";
    $(".result .description").html(desc);
  }

});