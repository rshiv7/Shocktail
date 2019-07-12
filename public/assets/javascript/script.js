function searchByName(event) {
  event.preventDefault();

  var usersInput = $("#usersInputName")
    .val()
    .trim()
    .replace(/ /g, "_");

  var queryURL =
    "https://www.thecocktaildb.com/api/json/v2/8673533/search.php?s=" +
    usersInput;
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    $(".coctailsList").empty();
    console.log(response);
    var drinks = response.drinks;
    for (var i = 0; i < drinks.length; i++) {
      var drinkDiv = $("<div>");
      var drinkName = $("<h4>").text(drinks[i].strDrink);
      var drinkImg = $("<img>")
        .attr("src", drinks[i].strDrinkThumb)
        .css("width", "60%");
      var drinkRecipe = $("<p>").text(drinks[i].strInstructions);
      var drinkIngredients = $("<div>").html("<b> Ingregients </b>");
      for (var j = 1; j < 15; j++) {
        var ingredient = drinks[i]["strIngredient" + j];
        var measure = drinks[i]["strMeasure" + j];
        if (ingredient && ingredient.length > 0) {
          if (measure.length > 0) {
            drinkIngredients.append(
              "<li>" + ingredient + ": " + measure + "</li> "
            );
          } else {
            drinkIngredients.append("<li>" + ingredient + "</li> ");
          }
        }
      }

      $(drinkDiv).append(drinkName, drinkImg, drinkRecipe, drinkIngredients);

      $(".coctailsList").append(drinkDiv);
    }
  });
}
