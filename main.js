let activebutton = null
let level = 0
let gameactive = false
let lastgen = null

const colors = ["rgb(255, 0, 0)", "rgb(0, 255, 0)", "rgb(0, 0, 255)", "rgb(120, 255, 0)", "rgb(0, 255, 255)", "rgb(130, 0, 255)", "rgb(255, 0, 255)", "rgb(0, 0, 0)"];
let blacklistedcolors = []
let buttons = ["1-1", "1-2", "2-1", "2-2"];

function gamefunc() {
    level += 1
    for (let index = 1; index <= level + 1; index++) {
        for (let indexis = 1; indexis < 3; indexis++) {
            if (blacklistedcolors.length != colors.length) {
                
                var whichbut = `${index}-${indexis}`
                // console.log(whichbut)
                var butcolor = colors[index]

                var button = `<button class="from" id="button${whichbut}" onclick="from('${whichbut}')" style="background-color: ${butcolor}; position: absolute; top: ${Math.ceil(Math.random() * 100)}vh; left: ${Math.ceil(Math.random() * 100)}vw">${index}</button>`

                console.log(button)
                
                // var button = `<button class="from" id="button${whichbut}" onclick="from(${whichbut})" style="background-color: ${butcolor};">${index}</button>`
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



function from(bruhbuttonm) {
    frombutton = bruhbuttonm.toString()
    console.log(activebutton, frombutton)

    var thebutton = $("#button" + frombutton)
    if (activebutton == null) {
        activebutton = frombutton.toString()
        thebutton.css("scale", "1.2")
        thebutton.css("opacity", "10")
        thebutton.css("outline", "rgb(255, 255, 255) 5px solid")
        thebutton.css("z-index", "50")
    } else if (frombutton == activebutton) {
        $("button").text("teest")
        thebutton.css("scale", "1")
        thebutton.css("opacity", "1")
        thebutton.css("outline", "none")
        thebutton.css("z-index", "10")
        activebutton = null
    } else if (frombutton != activebutton && frombutton.toString().charAt(0) == activebutton.toString().charAt(0)) {
        buttons = buttons.filter(e => e !== frombutton)
        buttons = buttons.filter(e => e !== activebutton)
        thebutton.css("color", "limegreen")
        $("#button" + activebutton).css('color', 'limegreen')
        activerbutton = $("#button" + activebutton)
        activebutton = null
        activerbutton.attr("disabled", "true")
        thebutton.attr("disabled", "true")
        
        thebutton.transition({
            "transform": "scale(0)",
        }, 3000, "cubic-bezier(0.075, 0.82, 0.165, 1)")

        activerbutton.transition({
            "transform": "scale(0)",
        }, 3000, "cubic-bezier(0.075, 0.82, 0.165, 1)")
    } else if (frombutton != activebutton && frombutton.toString().charAt(0) != activebutton.toString().charAt(0)) {
        activerbutton = $("#button" + activebutton)
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


    $("h1").text(buttons)
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