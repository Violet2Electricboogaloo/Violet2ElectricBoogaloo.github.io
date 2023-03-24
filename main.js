let activebutton = null

let buttons = []

function from(frombutton) {
    

    if(activebutton != null) {
        console.log(frombutton.charAt(0), activebutton.charAt(0))
    }
    var thebutton = $("#button" + frombutton)
    if (activebutton == null) {
        activebutton = frombutton
        thebutton.css("scale", "1.2")
        thebutton.css("opacity", "10")
        thebutton.css("outline", "rgb(255, 255, 255) 5px solid")
        thebutton.css("z-index", "50")
    } else if (frombutton == activebutton) {
        thebutton.css("scale", "1")
        thebutton.css("opacity", "1")
        thebutton.css("outline", "none")
        thebutton.css("z-index", "10")
        activebutton = null
    } else if (frombutton != activebutton && frombutton.charAt(0) == activebutton.charAt(0)) {
        thebutton.css("background-color", "limegreen !important")
        $("#button" + activebutton).css('background-color', 'limegreen')
        activerbutton = $("#button" + activebutton)
        activebutton = null
            thebutton.transition({
                "transform": "scale(0)",
            }, 3000)

            activerbutton.transition({
                "transform": "scale(0)",
            }, 3000)
    } else if (frombutton != activebutton && frombutton.charAt(0) != activebutton.charAt(0)) {
        thebutton.css("background-color", "red")
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