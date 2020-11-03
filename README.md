# Project

Search for a city with the date you wish to travel
returns weather data and an image of the city searched

if date set is within a week, the weather api will fetch the date searched for.
if it is longer than 7 days, the api searches for historical weather data based on the same month and date, but in the previous year.

# Setup

In order to run the app, 3 api keys are required in a .env file for the server 
Please add the following keys to a .env file:
geonames_key = sym149
weatherbit_key = 60b536acaac847de9e393ff20e5a6f59
pixabay_key = 18956996-9db294d3539b2e1865670d925

to run app type the following in the terminal/cmd within the project directory

npm install
npm run build
open two terminals
in one terminal, npm start
second terminal, npm run build-dev
