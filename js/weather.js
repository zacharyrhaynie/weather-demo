$(function() {
  // Enable autocomplete on the search field.
  $("input.typeahead").typeahead({
    onSelect: function(item) {
      // Clear previous weather results, if any.
      clearResult();
      // Get the weather info for the selected search location.
      $.get( "/weather.php?query=" + item.value, function(data) {
        // Show weather results.
        showResult(data);
      });
    },
    ajax: {
      url: 'weather.php?autocomplete=1',
      timeout: 200,
      displayField: "name",
    }
  })
});

function clearResult() {
  $(".weather_icon").attr("src", "images/trans.png");
  $(".result .description").html("");
}

function showResult(data) {
  $(".weather_icon").attr("src", data.icon_url);
  var desc = data.weather + " and " + data.temp_f + "&deg; F";
  $(".result .description").html(desc);
}
