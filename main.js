let activebutton = null
let level = 0
let gameactive = false
let lastgen = null
let lives = 5
let buttoncount = 4

const colors = ["rgb(255, 0, 0)", "rgb(0, 255, 0)", "rgb(0, 0, 255)", "rgb(120, 255, 0)", "rgb(0, 255, 255)", "rgb(130, 0, 255)", "rgb(255, 0, 255)", "rgb(0, 0, 0)"];
let blacklistedcolors = []
let buttons = ["1-1", "1-2", "2-1", "2-2"];
let leftpositions = []
let toppositions = []

function gamefunc() {
    leftpositions = []
    toppositions = []
    level += 1
    lives = Math.min(lives + 1, 5)
    for (let index = 1; index <= Math.ceil(level / 5); index++) {
        setTimeout(() => {
            var R = Math.random() * 255
            var G = Math.random() * 255
            var B = Math.random() * 255

            var butcolor = `rgb(${R},${G},${B})`
            for (let indexis = 1; indexis <= 2; indexis++) {

                var whichbut = index + "-" + indexis

                var left = (Math.ceil(Math.random() * 20) * 3.5)
                var top = (Math.ceil(Math.random() * 20) * 3.5)

                buttons = buttons.filter(e => e !== frombutton)



                for (let loopy = 0; loopy <= 500; loopy++) {
                    if (leftpositions.length != leftpositions.filter(e => e !== left).length) {
                        left = (Math.ceil(Math.random() * 20) * 3.5)
                    }
                }

                for (let loopy = 0; loopy <= 500; loopy++) {
                    if (toppositions.length != toppositions.filter(e => e !== top).length) {
                        top = (Math.ceil(Math.random() * 20) * 3.5)
                    }
                }

                if (toppositions.length == toppositions.filter(e => e !== top).length && leftpositions.length == leftpositions.filter(e => e !== left).length) {
                    leftpositions.push(left)
                    toppositions.push(top)

                    var button = `<button class="button${whichbut}" onclick="from('${whichbut}')" style="background-color: ${butcolor}; position: absolute; top: ${top}vh; left: ${left}vw;">${index}</button>`

                    blacklistedcolors.push(butcolor)
                    buttons.push(whichbut)
                    $("#game").append(button)
                    buttoncount++

                    if (R + G + B >= 400) {
                        $(".button" + whichbut).css("color", "black")
                    }


                    $("#lives").text(lives)
                    $("#level").text(level)
                    $("#buttons").text(buttoncount)

                }
            }
        }, index * 400);
    }
}

var bruhtest = new Audio("/sfx/SelectSFX.mp3") 

function from(bruhbuttonm) {

    frombutton = bruhbuttonm.toString()
    // console.log(activebutton, frombutton)

    var thebutton = $(".button" + frombutton)
    if (activebutton == null) {
        activebutton = frombutton.toString()
        thebutton.css("scale", "1.2")
        thebutton.css("opacity", "10")
        thebutton.css("outline", "rgb(255, 255, 255) 5px solid")
        thebutton.css("z-index", "1")
        // console.log(frombutton.charAt(2))
        if (frombutton.charAt(2) == 1) {
            $("#button" + frombutton.charAt(0) + "-2").css("z-index", "3000")
            // console.log(2)
        } else {
            $("#button" + frombutton.charAt(0) + "-1").css("z-index", "3000")
            // console.log(1)
        }
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
        thebutton.css("background-color", "limegreen")
        $(".button" + activebutton).css('background-color', 'limegreen')
        buttoncount -= 2
        activerbutton = $(".button" + activebutton)
        activebutton = null
        activerbutton.attr("disabled", "true")
        thebutton.attr("disabled", "true")
        thebutton.transition({
            "transform": "scale(0)",
        }, 1000)

        activerbutton.transition({
            "transform": "scale(0)",
        }, 1000
        )

        var prevactive = activebutton
        thebutton.attr("class", `done${frombutton} done`)
        activerbutton.attr("class", `done${activebutton} done`)
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
            setTimeout(() => {
                $(".done").remove()
                $(".done").remove()
                gamefunc()
            }, 500);
        }, 500);
    }
    $("#lives").text(lives)
    $("#level").text(level)
    $("#buttons").text(buttoncount)
    
    bruhtest.currentTime = 0
    bruhtest.play()
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
