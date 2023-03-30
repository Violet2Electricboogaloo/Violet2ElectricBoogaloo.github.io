let activebutton = null
let level = 0
let gameactive = false
let lastgen = null
let lives = 5
let buttoncount = 4

const colors = ["rgb(255, 0, 0)", "rgb(0, 255, 0)", "rgb(0, 0, 255)", "rgb(120, 255, 0)", "rgb(0, 255, 255)", "rgb(130, 0, 255)", "rgb(255, 0, 255)", "rgb(0, 0, 0)"];
let blacklistedcolors = []
let buttons = ["1-1", "1-2", "2-1", "2-2"];

function gamefunc() {
    level += 1
    lives = Math.min(lives + 1, 5)
    for (let index = 1; index <= Math.ceil(level/2.5); index++) {
        var butcolor = colors[Math.round(Math.random() * colors.length)]
        for (let indexis = 1; indexis <= 2; indexis++) {

                $("#lives").text(lives)
                $("#level").text(level)
                $("#buttons").text(buttoncount)
                
                var whichbut = index + "-" + indexis

                var button = `<button class="button${whichbut}" onclick="from('${whichbut}')" style="background-color: ${butcolor}; position: absolute; top: ${Math.ceil(Math.random() * 60) + 5}vh; left: ${Math.ceil(Math.random() * 70) + 5}vw; z-index: ${Math.ceil(level/2.5) - index}">${index}</button>`

                blacklistedcolors.push(butcolor)
                buttons.push(whichbut)
                $("#game").append(button)
                buttoncount++
        }

    }
}

function from(bruhbuttonm) {
    frombutton = bruhbuttonm.toString()
    console.log(activebutton, frombutton)

    var thebutton = $(".button" + frombutton)
    if (activebutton == null) {
        activebutton = frombutton.toString()
        thebutton.css("scale", "1.2")
        thebutton.css("opacity", "10")
        thebutton.css("outline", "rgb(255, 255, 255) 5px solid")
        thebutton.css("z-index", "500")
    } else if (frombutton == activebutton) {
        // $("button").text("teest")
        thebutton.css("scale", "1")
        thebutton.css("opacity", "1")
        thebutton.css("outline", "none")
        thebutton.css("z-index", "200")
        activebutton = null
    } else if (frombutton != activebutton && frombutton.toString().charAt(0) == activebutton.toString().charAt(0)) {
        buttons = buttons.filter(e => e !== frombutton)
        buttons = buttons.filter(e => e !== activebutton)
        thebutton.css("color", "limegreen")
        $(".button" + activebutton).css('color', 'limegreen')
        buttoncount -= 2
        activerbutton = $(".button" + activebutton)
        activebutton = null
        activerbutton.attr("disabled", "true")
        thebutton.attr("disabled", "true")
        thebutton.transition({
            "transform": "scale(0)",
        }, 3000, "cubic-bezier(0.075, 0.82, 0.165, 1)")

        activerbutton.transition({
            "transform": "scale(0)",
        }, 3000, "cubic-bezier(0.075, 0.82, 0.165, 1)")

        var prevactive = activebutton
        thebutton.attr("class", `done${frombutton}`)
        activerbutton.attr("class", `done${activebutton}`)
        setTimeout(() => {
            $(".done" + prevactive).remove()
            $(".done" + frombutton).remove()
        }, 3000);
    } else if (frombutton != activebutton && frombutton.toString().charAt(0) != activebutton.toString().charAt(0)) {
        lives -= 1
        activerbutton = $(".button" + activebutton)
        thebutton.css("color", "red")
        activerbutton.css("color", "red")
        thebutton.css("animation-duration", "0.25s")
        activerbutton.css("animation-duration", "0.25s")
        setTimeout(() => {
            thebutton.css("color", "white")
            activerbutton.css("color", "white")
            thebutton.css("animation-duration", "6s")
            activerbutton.css("animation-duration", "6s")
        }, 1000);
    }
    if (buttons.length <= 0) {
        setTimeout(() => {
            if (level == 0) {
                $("#title").hide(1000)
                $("#game").show(1000)
                $("body").css("width", "100vw")
                $("body").css("height", "100vh")
                $("html").css("width", "100vw")
                $("html").css("height", "100vh")

                $("body").css("overflow", "hidden")
                $("html").css("overflow", "hidden")
                $("#game").css("overflow", "hidden")
            }
            gamefunc()
        }, 500);
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


    // $("h1").text(buttons)
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