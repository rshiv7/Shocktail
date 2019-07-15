$(".button").click(function() {
    if ($(this).attr("data-bool") === 0) {
        $(this).attr("data-bool") = 1;
        $(this).addClass("red");
    }
    else { 
        $(this).attr("data-bool") = 0;
        $(this).removeClass("red");
    }
})