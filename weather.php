<?php
  /**
   * This page talks to weatherapi.com.
   */

  // API URL.
  // You can register for free to get your own api key (fb0... below). 
  $url = "http://api.weatherapi.com/v1/forecast.json?key=fb0b4c5c22d04c22be2202032210112&aqi=no&q=";

  // Check and filter query parameters.
  $query = filter_input(INPUT_GET, 'query', FILTER_DEFAULT);

  if ($query) {
    $query = urlencode($query);

    // Call the api with the user input query (zip, city, etc.).
    $data = file_get_contents($url . $query);
    $parsed = json_decode($data);

    // You can use PHP's error_log to output a string to the log for debugging.
    // error_log($parsed->location->name);

    $result['weather'] = $parsed->current->condition->text;
    $result['temp_f'] = $parsed->current->temp_f;
    $result['icon_url'] = $parsed->current->condition->icon;
    $result['city'] = $parsed->location->name;
    $result['state'] = $parsed->location->region;
    // Returns an array of the weather conditions for all days in the forecast
    $forecastResult['weather'] = $parsed->forecast->forecastday->day->condition->text;
    // Returns an array of the average temps for the forecast (not current) days
    $forecastResult['avgtemp_f'] = $parsed->forecast->forecastday->day->avgtemp_f;
    // Returns an array of the weather icons for the forecast (not current) days
    $forecastResult['icon_url'] = $parsed->forecast->forecastday->day->condition->icon;
    // Add both Current "result" and Forecast "forecastResult" into an object to be passed to .js
    $payload['current'] = $result;
    $payload['forecast'] = $forecastResult;
    header('Content-Type: application/json');
    echo json_encode($payload);
  }
