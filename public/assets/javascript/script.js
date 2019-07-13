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
    if (drinks == "None Found") {
      var img = $(".img").attr("src", "sad-cartoon-margarita.png");
      $(".coctailsList")
        .empty()
        .html("<h4>None Found</h4>")
        .append(img);
    } else {
      for (var i = 0; i < drinks.length; i++) {
        var drink = drinks[i];
        var drinkDiv = $("<div>").addClass("card");

        var cardImgDiv = $("<div>").addClass("card-image");
        var drinkImg = $("<img>").attr("src", drink.strDrinkThumb);
        cardImgDiv.append(drinkImg);

        var cardContentDiv = $("<div>").addClass("card-content");
        var drinkName = $("<span>")
          .addClass("card-title")
          .text(drink.strDrink);

        var drinkRecipe = $("<p>").text(drink.strInstructions);
        var drinkIngredients = $("<div>").html("<b> Ingregients </b>");
        getIngredients(drink, drinkIngredients);
      }

      cardContentDiv.append(drinkName, drinkRecipe, drinkIngredients);
      drinkDiv.append(cardImgDiv, cardContentDiv);

      $(".coctailsList").append(drinkDiv);
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
    var drinkImg = $("<img>").attr("src", drink.strDrinkThumb);
    cardImgDiv.append(drinkImg);

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
    var cardRevealSpan = $("<span>")
      .addClass("card-title grey-text text-darken-4")
      .text(drink.strDrink)
      .append(iconClose);

    var drinkRecipe = $("<p>").text(drink.strInstructions);
    var drinkIngredients = $("<div>").html("<b> Ingregients </b>");

    getIngredients(drink, drinkIngredients);
    cardRevealDiv.append(cardRevealSpan, drinkRecipe, drinkIngredients);
    drinkDiv.append(cardImgDiv, cardContentDiv, cardRevealDiv);

    $(".coctailsList").append(drinkDiv);
  });
}

function getIngredients(drink, drinkIngredients) {
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
}

function getInfo(id) {
  var queryURL =
    "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var drinks = response.drinks[0];
    var drinkDiv = $("<div>").addClass("card");

    var cardImgDiv = $("<div>").addClass(
      "card-image waves-effect waves-block waves-light"
    );
    var drinkImg = $("<img>").attr("src", drinks.strDrinkThumb);
    cardImgDiv.append(drinkImg);

    var cardContentDiv = $("<div>").addClass("card-content");
    var icon = $("<i>")
      .addClass("material-icons right")
      .text("more_vert");

    var cardContentSpan = $("<span>")
      .addClass("card-title activator grey-text text-darken-4")
      .text(drinks.strDrink)
      .append(icon);
    cardContentDiv.append(cardContentSpan);

    var cardRevealDiv = $("<div>").addClass("card-reveal");
    var iconClose = $("<i>")
      .addClass("material-icons right")
      .text("close");
    var cardRevealSpan = $("<span>")
      .addClass("card-title grey-text text-darken-4")
      .text(drinks.strDrink)
      .append(iconClose);

    var drinkRecipe = $("<p>").text(drinks.strInstructions);
    var drinkIngredients = $("<div>").html("<b> Ingregients </b>");

    getIngredients(drinks, drinkIngredients);

    cardRevealDiv.append(cardRevealSpan, drinkRecipe, drinkIngredients);
    drinkDiv.append(cardImgDiv, cardContentDiv, cardRevealDiv);
    $(".coctailsList").append(drinkDiv);
  });
}

function searchByIngredients(event) {
  event.preventDefault();
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
    debugger;
    var drinks = response.drinks;
    if (drinks == "None Found") {
      var img = $(".img").attr("src", "sad-cartoon-margarita.png");
      $(".coctailsList")
        .empty()
        .html("<h4>None Found</h4>")
        .append(img);
    } else {
      for (var i = 0; i < drinks.length; i++) {
        var id = drinks[i].idDrink;
        getInfo(id);
      }
    }
  });
}
