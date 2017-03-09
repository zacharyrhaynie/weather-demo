<?php
  /**
   * This page talks to weather.com's API (wunderground).
   * It either returns a list of  autocomplete locations based
   * on user input or returns the selected weather result.
   */

  // Check and filter query parameters.
  $autocomplete = filter_input(INPUT_GET, 'autocomplete', FILTER_DEFAULT);
  $q = filter_input(INPUT_GET, 'query', FILTER_DEFAULT);

  if (isset($autocomplete) && isset($q) && $autocomplete == 1) {
    $q = urlencode($q);
    $data = file_get_contents("http://autocomplete.wunderground.com/aq?query=" . $q);
    $parsed_data = json_decode($data);

    foreach ($parsed_data->RESULTS as $loc) {
      // Lat/Lon is the unique ID for each location.
      $latlon = $loc->lat . ',' . $loc->lon;
      $result[] = array('id' => $latlon, 'name' => $loc->name);
    }

    if (!isset($result)) {
      $result[] = array('id' => -1, 'name' => $q . ' not found');
    }

    header('Content-Type: application/json');
    echo json_encode($result);

  } elseif (isset($q)) {
    // Return weather info for chosen location.
    $data = file_get_contents("http://api.wunderground.com/api/a57f820f5f3e7a5d/geolookup/conditions/q/" . $q . ".json");
    $parsed = json_decode($data);
    $result['weather'] = $parsed->current_observation->weather;
    $result['temp_f'] = $parsed->current_observation->temp_f;
    $result['icon_url'] = $parsed->current_observation->icon_url;
    header('Content-Type: application/json');
    echo json_encode($result);
  }
?>
