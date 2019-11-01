$(document).ready(function () {
    var checked = false;
    var flag = false;
    var reg = /^[0-9A-z_]{3,14}$/;
    $("#sp01").click(function () {
        var lengthy = $(this).css('background-position').split(' ')[1];
        var bgy;
        //console.log(lengthy);
        if (lengthy != "0px") {
            lengthy = 0;
            checked = true;
        } else {
            lengthy = -20;
            checked = false;
        }
        bgy = lengthy + "px";
        var positions = 0 + " " + bgy;
        $(this).css('background-position', positions);
    });
    $("#inp02").blur(function () {
        //console.log(reg.test($("#inp02").val()));
        if (reg.test($("#inp02").val())) {
            flag = true;
            $($("#tips01")).css('display', 'none');
        } else {
            flag = false;
            console.log(typeof reg.test($("#inp02").val()));
            $($("#tips01")).css('display', 'block');
        }
    });
    $("#inp002").blur(function () {
        if ($("#inp002").val() == $("#inp02").val()) {
            $($("#tips02")).css('display', 'none');
            flag = true;
        } else {
            flag = false;
            $($("#tips02")).css('display', 'block');
        }
    });
    $(document).click(function () {
        if ($("#inp002").val() == "" || $("#inp01").val() == "" || $("#inp02").val() == "") {
            flag = false;
        } else {
            flag = true;
        }
        if (checked && flag) {
            $($("#sub")).css('background', "#5079D9");
        } else {
            $($("#sub")).css('background', "#B9CAEC");
        }
        console.log(flag);
    });
    $("#sub").click(function () {
        return (checked && flag);
    });
    $("#inp01").click(function () {
        $($("#tips03")).css("display", "none");
    });
    $("#inp02").click(function () {
        $($("#tips04")).css("display", "none");
    });
    $("#inp002").click(function () {
        $($("#tips05")).css("display", "none");
    });
});
