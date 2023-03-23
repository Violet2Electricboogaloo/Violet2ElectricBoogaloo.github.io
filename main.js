let activebutton = null

let buttons = []

function from(frombutton) {
    if (activebutton == null) {
        activebutton = frombutton
        var thebutton = $("#button" + frombutton)
        thebutton.css("scale", "1.2")
        thebutton.css("opacity", "1")
        thebutton.css("outline", "white 2px solid")
        thebutton.css("z-index", "50")
    } else if (frombutton == activebutton) {
        thebutton.css("background-color", "green")
    } else {
        $("#button" + activebutton).css('background-color',  'red;')
    }
}

function pagewidthchanged() {
    $("#widthspan").text($(window).innerWidth())
    $("#heightspan").text($(window).innerHeight())

    if ($(window).innerHeight() < 500) {
        $("#heightspan").css("color", "red")
    } else {
        $("#heightspan").css("color", "limegreen")
    }

    if ($(window).innerWidth() < 500) {
        $("#widthspan").css("color", "red")
    } else {
        $("#widthspan").css("color", "limegreen")
    }
};

$(window).bind('load', function () {
    pagewidthchanged()

    fromarray.push($("#debug1"));
    toarray.push($("#debug2"));
});

$(window).resize(function () {
    pagewidthchanged()
});

$(document).mousemove(function (event) {
    windowWidth = $(window).width();
    windowHeight = $(window).height();

    mouseXpercentage = Math.round(event.pageX / windowWidth * 100);
    mouseYpercentage = Math.round(event.pageY / windowHeight * 100);

    $('body').css('background', 'radial-gradient(at ' + mouseXpercentage + '% ' + mouseYpercentage + '%, rgb(100, 85, 120), rgb(90, 75, 110))');
});