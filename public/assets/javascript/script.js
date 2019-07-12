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

function searchByIngredients(event) {
  event.preventDefault();
  debugger;
  var basicURL =
    "https://www.thecocktaildb.com/api/json/v2/8673533/filter.php?i=";

  var ingredients = [];
  $(".ing").each(function() {
    if ($(this).prop("checked")) {
      ingredients.push($(this).val());
    }
  });

  var queryURL = basicURL + ingredients.join(",");
  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var drinks = response.drinks;
    if (drinks == "None Found") {
      $(".coctailsList")
        .empty()
        .text("None Found");
    } else {
      for (var i = 0; i < drinks.length; i++) {
        var drinkDiv = $("<div>");
        var drinkName = $("<h4>").text(drinks[i].strDrink);
        var drinkImg = $("<img>")
          .attr("src", drinks[i].strDrinkThumb)
          .css("width", "60%");
        var drinkInfo = $("<div>").css("display", "none");
        var show = $("<button>")
          .text("show more")
          .css("width", "60%")
          .on("click", function() {
            if ($(drinkInfo).css("display") == "none") {
              $(drinkInfo).show();
              $(show).text("hide");
            } else {
              $(show).text("show");
              $(drinkInfo).css("display", "none");
            }
          });

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
        $(drinkInfo).append(drinkRecipe, drinkIngredients);
        drinkDiv.append(drinkName, drinkImg, drinkInfo, show);
        $(".coctailsList").append(drinkDiv);
      }
    }
  });
}

function showRandom() {
  var queryURL = "https://www.thecocktaildb.com/api/json/v2/8673533/random.php";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    $(".coctailsList").empty();
    var drink = response.drinks[0];
    var drinkDiv = $("<div>").addClass("card");

    var cardImgDiv = $("<div>").addClass(
      "card-image waves-effect waves-block waves-light"
    );
    var drinkImg = $("<img>")
      .attr("src", drink.strDrinkThumb)
      .css("width", "50%");
    $(cardImgDiv).append(drinkImg);

    var cardContentDiv = $("<div>").addClass("card-content");
    var icon = $("<i>")
      .addClass("material-icons right")
      .text("more_vert");

    var cardContentSpan = $("<span>").addClass(
      "card-title activator grey-text text-darken-4"
    );
    cardContentSpan.text(drink.strDrink).append(icon);
    cardContentDiv.append(cardContentSpan);

    var cardRevealDiv = $("<div>").addClass("card-reveal");
    var iconClose = $("<i>")
      .addClass("material-icons right")
      .text("close");
    var cardRevealSpan = $("<span>").addClass(
      "card-title grey-text text-darken-4"
    );
    $(cardRevealSpan)
      .text(drink.strDrink)
      .append(iconClose);

    var drinkRecipe = $("<p>").text(drink.strInstructions);
    var drinkIngredients = $("<div>").html("<b> Ingregients </b>");
    for (var j = 1; j < 15; j++) {
      var ingredient = drink["strIngredient" + j];
      var measure = drink["strMeasure" + j];
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
    $(cardRevealDiv).append(cardRevealSpan, drinkRecipe, drinkIngredients);
    $(drinkDiv).append(cardImgDiv, cardContentDiv, cardRevealDiv);

    $(".coctailsList").append(drinkDiv);
  });
}
