# Darfield Weather Station 2.0 

This website presents dynamic weather information as recorded by the weather station. The front page contains a simple dashboard of realtime weather information,
updated every 3 seconds, along with graphs for the past 24-hours and today/yesterday extremes. Other pages include a weather webcam/archive of images taken every
5 minutes with a Logitech C920 webcam , a graphs page for all realtime (1-min interval) data, a history section displaying historic weather data, and a 7-day forecast
page.

The data is downloaded from the weather station using the python program Weewx and the plug-in Weewxwd and stored in a mySQL database on a local machine. This software 
is also responsible for uploading various files to an external web server.

The software is all run on a low cost/powered Raspberry Pi which is switched on 24-7, and is also connected to a USB webcam for taking images during daylight hours.

This website has been designed as a single page AngularJS 2.0 application, thus moving between pages does not require a page refresh and allows pages to be dynamically 
updated on the fly. The website also makes use of bootstrap 3 css styling.

## Languages Used ##

 * Angular JS 2.0
 * HTML
 * CSS / SCSS
 * PHP 5.6
