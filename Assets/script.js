
// Date will pull in automatically using Moment
var now = moment().format(" (MM/D/YYYY)");
$("#currentDay").text(now);
// console.log(now);

$(document).ready(function () {
  var submitButton = document.getElementById("searchBtn");
  var inputValue = document.getElementById("inputValue");
  var city = document.getElementById("city");
  var temp = document.getElementById("temp");
  var wind = document.getElementById("wind");
  var humidity = document.getElementById("humidity");
  var uv = document.getElementById("uv");
  var buttons = document.querySelector("buttons");
  var history = [];

// loads local storage
  function loadStorage() {
    var savedCities = JSON.parse(localStorage.getItem("history"));
    console.log("history", savedCities);

      var arraySize = savedCities.length;
      var lastIndex = arraySize -1;
    // this is for the first value in the array
    if (lastIndex > -1 ) {
    showcityinfo(savedCities[lastIndex])
    }
    };

    function showcityinfo(cityName) {
      document.getElementById("weatherTitleBox").style.display = "flex";
      
      var mainAPI =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityName +
        "&units=imperial&appid=60e9ee923c45e087f45389019a259b46";
        // calls the api
      fetch(mainAPI)
        .then((data) => data.json())
        // .then(data => console.log(data))
        .then((data) => {
          var cityValue = data["name"];
          var tempValue = data["main"]["temp"];
          var windValue = data["wind"]["speed"];
          var humidityValue = data["main"]["humidity"];
          var latValue = data["coord"]["lat"];
          var longValue = data["coord"]["lon"];

          $("#currentDayImage").attr(
            "src",
            `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
          );

          (city.innerHTML = cityValue), " ";
          temp.innerHTML = tempValue;
          wind.innerHTML = windValue;
          humidity.innerHTML = humidityValue;

          history.push(cityValue);
          localStorage.setItem("history", JSON.stringify(history));
          //this is a sub fetch. it is the api that has the uv index but only by longitude and latitude. using the variables created prior, they were inserted into the api as the properties.
          fetch(
            "https://api.openweathermap.org/data/2.5/onecall?lat=" +
              latValue +
              "&lon=" +
              longValue +
              "&appid=60e9ee923c45e087f45389019a259b46"
          )
            .then((data) => data.json())
            // .then(data => console.log(data))
            .then((data) => {
              var uvValue = data["current"]["uvi"];
              uv.innerHTML = uvValue;

              // code for changing color of uv index background based on the uv index
              // green
              if (uvValue <= 1.99)
                $("#uv").css({
                  "background-color": "#228B22",
                  color: "#ffffff",
                });
              // yellow
              else if (uvValue >= 2 && uvValue <= 5.99)
                $("#uv").css({
                  "background-color": "#FFFF00",
                  color: "#000000",
                });
              // orange
              else if (uvValue >= 6 && uvValue <= 7.99)
                $("#uv").css({
                  "background-color": "#FFA500",
                  color: "#000000",
                });
              // red
              else if (uvValue >= 8 && uvValue <= 9.99)
                $("#uv").css({
                  "background-color": "#FF0000",
                  color: "#ffffff",
                });
              // purple
              else
                $("#uv").css({
                  "background-color": "#800080",
                  color: "#ffffff",
                });

              // this creates buttons on the sidebar. eventually need to be able to click on them and write the data in the center div
              var buttonDiv = document.getElementById("buttonBox");
              var cityButton = document.createElement("button");

              cityButton.type = "button";
              cityButton.innerHTML = cityValue;
              buttonDiv.appendChild(cityButton);
              // this section is for the 5 day forecast
              var forecastAPI =
                "https://api.openweathermap.org/data/2.5/forecast?q=" +
                cityName +
                "&units=imperial&results=10&appid=60e9ee923c45e087f45389019a259b46";
              fetch(forecastAPI)
                .then((data) => data.json())
                .then((data) => {
               
                  // this is the setup for each mini time block. the 3 refers to the day in list of objects found in json data., the time is in unix timecode, and the format is from moment
                  // day 1
                  $("#day1Date").html(
                    moment(data.list[3].dt, "X").format("MM/DD/YYYY")
                  );
                  $("#day1Temp").html(data.list[3].main.temp);
                  $("#day1Image")
                    .attr(
                      "src",
                      `http://openweathermap.org/img/wn/${data.list[11].weather[0].icon}@2x.png`
                    )
                    .show();
                  $("#day1Humidity").html(data.list[3].main.humidity);
                  $("#day1Wind").html(data.list[3].wind.speed);

                  // console.log(data.list[11])
                  // day 2
                  $("#day2Date").html(
                    moment(data.list[11].dt, "X").format("MM/DD/YYYY")
                  );
                  $("#day2Temp").html(data.list[11].main.temp);
                  $("#day2Image")
                    .attr(
                      "src",
                      `http://openweathermap.org/img/wn/${data.list[11].weather[0].icon}@2x.png`
                    )
                    .show();
                  $("#day2Humidity").html(data.list[11].main.humidity);
                  $("#day2Wind").html(data.list[11].wind.speed);

                  // console.log(data.list[19])
                  // day 3
                  $("#day3Date").html(
                    moment(data.list[19].dt, "X").format("MM/DD/YYYY")
                  );
                  $("#day3Temp").html(data.list[19].main.temp);
                  $("#day3Image")
                    .attr(
                      "src",
                      `http://openweathermap.org/img/wn/${data.list[19].weather[0].icon}@2x.png`
                    )
                    .show();
                  $("#day3Humidity").html(data.list[19].main.humidity);
                  $("#day3Wind").html(data.list[19].wind.speed);

                  // console.log(data.list[26])
                  // day 4
                  $("#day4Date").html(
                    moment(data.list[26].dt, "X").format("MM/DD/YYYY")
                  );
                  $("#day4Temp").html(data.list[26].main.temp);
                  $("#day4Image")
                    .attr(
                      "src",
                      `http://openweathermap.org/img/wn/${data.list[26].weather[0].icon}@2x.png`
                    )
                    .show();
                  $("#day4Humidity").html(data.list[26].main.humidity);
                  $("#day4Wind").html(data.list[26].wind.speed);

                  // console.log(data.list[34])
                  // day 5
                  $("#day5Date").html(
                    moment(data.list[34].dt, "X").format("MM/DD/YYYY")
                  );
                  $("#day5Temp").html(data.list[34].main.temp);
                  $("#day5Image")
                    .attr(
                      "src",
                      `http://openweathermap.org/img/wn/${data.list[34].weather[0].icon}@2x.png`
                    )
                    .show();
                  $("#day5Humidity").html(data.list[34].main.humidity);
                  $("#day5Wind").html(data.list[34].wind.speed);

                  cityButton.addEventListener(
                    "click",
                    function changeCityInfo() {
                      city.innerHTML = cityValue;
                      temp.innerHTML = tempValue;
                      wind.innerHTML = windValue;
                      humidity.innerHTML = humidityValue;
                      uv.innerHTML = uvValue;

                      if (uvValue <= 1.99)
                        $("#uv").css({
                          "background-color": "#228B22",
                          color: "#ffffff",
                        });
                      // yellow
                      else if (uvValue >= 2 && uvValue <= 5.99)
                        $("#uv").css({
                          "background-color": "#FFFF00",
                          color: "#000000",
                        });
                      // orange
                      else if (uvValue >= 6 && uvValue <= 7.99)
                        $("#uv").css({
                          "background-color": "#FFA500",
                          color: "#000000",
                        });
                      // red
                      else if (uvValue >= 8 && uvValue <= 9.99)
                        $("#uv").css({
                          "background-color": "#FF0000",
                          color: "#ffffff",
                        });
                      // purple
                      else
                        $("#uv").css({
                          "background-color": "#800080",
                          color: "#ffffff",
                        });

                      fetch(mainAPI)
                        .then((data) => data.json())
                        .then((data) => {
                          $("#currentDayImage").attr(
                            "src",
                            `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                          );
                        });

                      fetch(forecastAPI)
                        .then((data) => data.json())
                        .then((data) => {
                          // this is the setup for each mini time block. the 3 refers to the day in list of objects found in json data., the time is in unix timecode, and the format is from moment
                          $("#day1Date").html(
                            moment(data.list[3].dt, "X").format("MM/DD/YYYY")
                          );
                          $("#day1Temp").html(data.list[3].main.temp);
                          $("#day1Image")
                            .attr(
                              "src",
                              `http://openweathermap.org/img/wn/${data.list[11].weather[0].icon}@2x.png`
                            )
                            .show();
                          $("#day1Humidity").html(data.list[3].main.humidity);
                          $("#day1Wind").html(data.list[3].wind.speed);

                          $("#day2Date").html(
                            moment(data.list[11].dt, "X").format("MM/DD/YYYY")
                          );
                          $("#day2Temp").html(data.list[11].main.temp);
                          $("#day2Image")
                            .attr(
                              "src",
                              `http://openweathermap.org/img/wn/${data.list[11].weather[0].icon}@2x.png`
                            )
                            .show();
                          $("#day2Humidity").html(data.list[11].main.humidity);
                          $("#day2Wind").html(data.list[11].wind.speed);

                          $("#day3Date").html(
                            moment(data.list[19].dt, "X").format("MM/DD/YYYY")
                          );
                          $("#day3Temp").html(data.list[19].main.temp);
                          $("#day3Image")
                            .attr(
                              "src",
                              `http://openweathermap.org/img/wn/${data.list[19].weather[0].icon}@2x.png`
                            )
                            .show();
                          $("#day3Humidity").html(data.list[19].main.humidity);
                          $("#day3Wind").html(data.list[19].wind.speed);

                          $("#day4Date").html(
                            moment(data.list[26].dt, "X").format("MM/DD/YYYY")
                          );
                          $("#day4Temp").html(data.list[26].main.temp);
                          $("#day4Image")
                            .attr(
                              "src",
                              `http://openweathermap.org/img/wn/${data.list[26].weather[0].icon}@2x.png`
                            )
                            .show();
                          $("#day4Humidity").html(data.list[26].main.humidity);
                          $("#day4Wind").html(data.list[26].wind.speed);

                          $("#day5Date").html(
                            moment(data.list[34].dt, "X").format("MM/DD/YYYY")
                          );
                          $("#day5Temp").html(data.list[34].main.temp);
                          $("#day5Image")
                            .attr(
                              "src",
                              `http://openweathermap.org/img/wn/${data.list[34].weather[0].icon}@2x.png`
                            )
                            .show();
                          $("#day5Humidity").html(data.list[34].main.humidity);
                          $("#day5Wind").html(data.list[34].wind.speed);
                        });
                      // end of changeCityInfo function
                    }
                  );
                });
            });
        });
    }

    // function for pulling weather data based on the searched location. This will pull the 5 day forecast, uv index, change photos, etc., all based on the click event listener
    submitButton.addEventListener("click", function () {
      showcityinfo(inputValue.value);
    });
    
    
  
  loadStorage();
});
