$(document).ready(function () {
    $("#check").val("t");
    $("#sp01").click(function () {
        var lengthy = $(this).css('background-position').split(' ')[1];
        var bgy;
        console.log(lengthy);
        if (lengthy != "0px") {
            lengthy = 0;
            checked = true;
            $("#check").val("t");
        } else {
            lengthy = -20;
            checked = false;
            $("#check").val("f");
        }
        bgy = lengthy + "px";
        var positions = 0 + " " + bgy;
        $(this).css('background-position', positions);
    });
    $("#inp01").click(function () {
        $($("#tips03")).css("display", "none");
    });
    $("#inp02").click(function () {
        $($("#tips04")).css("display", "none");
    });
   /*  $("#sub").click(function () {
        $.get("login.php", {
            che: "Donald",
            town: "Ducktown"
        }, function (data, status) {
            alert("Data: " + data + "nStatus: " + status);
        });
    }); */

});