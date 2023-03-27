let activebutton = null
let level = 0
let gameactive = false
let lastgen = null

const colors = ["rgb(255, 0, 0)", "rgb(0, 255, 0)", "rgb(0, 0, 255)", "rgb(120, 255, 0)", "rgb(0, 255, 255)", "rgb(130, 0, 255)", "rgb(255, 0, 255)", "rgb(0, 0, 0)"];
let blacklistedcolors = []
let buttons = [];

function gamefunc() {
    level += 1
    for (let index = 1; index <= level; index++) {
        for (let indexis = 0; indexis < 2; indexis++) {
            if (blacklistedcolors.length != colors.length) {
                
                var whichbut = `${index}-${indexis}`
                var butcolor = colors[index]

                var button = `<button class="from" id="button${whichbut}" onclick="from(${whichbut})" style="background-color: ${butcolor}; position: absolute; top: ${(Math.random() * ($(window).innerHeight() - 20)) + 10}px, left: ${(Math.random() * ($(window).innerWidth() - 20)) + 10}px">${index}</button>`
                blacklistedcolors.push(butcolor)
                buttons.push(whichbut)
                $("#game").append(button)
            }
        }

    }
}

// function start() {
//     $("button").attr("disabled", "true")
//     $("#title").transition({
//         "transform": "translateY(-150vh)"
//     }, 1500)
//     setTimeout(() => {
//         $("#title").hide(0)
//         $("#game").show(1000)
//     }, 1600);
//     gameactive = true
//     gamefunc()
// }



function from(frombutton) {
    // if (activebutton != null) {
    //     console.log(frombutton.charAt(0), activebutton.charAt(0))
    // }
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
        buttons.splice(buttons[buttons.indexOf(frombutton)]) 
        buttons.splice(buttons[buttons.indexOf(activebutton)]) 
        thebutton.css("color", "limegreen")
        $("#button" + activebutton).css('color', 'limegreen')
        activerbutton = $("#button" + activebutton)
        activebutton = null
        activerbutton.attr("disabled", "true")
        thebutton.attr("disabled", "true")
        thebutton.transition({
            "transform": "scale(0)",
        }, 3000)

        activerbutton.transition({
            "transform": "scale(0)",
        }, 3000)
    } else if (frombutton != activebutton && frombutton.charAt(0) != activebutton.charAt(0)) {
        activerbutton = $("#button" + activebutton)
        thebutton.css("color", "red")
        activerbutton.css("color", "red")
        thebutton.css("animation-duration", "0.5s")
        activerbutton.css("animation-duration", "0.5s")
        setTimeout(() => {
            thebutton.css("color", "white")
            activerbutton.css("color", "white")
            thebutton.css("animation-duration", "6s")
            activerbutton.css("animation-duration", "6s")
        }, 1000);
    }
    if (buttons.length() <= 0) {
        setTimeout(() => {
            if (level = 0) {
                
            }
            gamefunc()
        }, 1000);
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
    $("#game").hide(0)
});

$(window).resize(function () {
    pagewidthchanged()
});

$(document).mousemove(function (event) {
    windowWidth = $(window).width();
    windowHeight = $(window).height();

    mouseXpercentage = Math.round(event.pageX / windowWidth * 100);
    mouseYpercentage = Math.round(event.pageY / windowHeight * 100);

    $('body').css('background', 'radial-gradient(circle at ' + mouseXpercentage + '% ' + mouseYpercentage + '%, rgb(75, 30, 120), rgb(80, 65, 100) 130px)');
});