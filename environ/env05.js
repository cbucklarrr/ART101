// =============================================
//  ENV05 — THE ABYSS WAKES
//  jQuery-driven interactions
// =============================================


// ---- Data ----

// Messages that appear when the user presses a key (random transmission)
let transmissions = [
    "Signal detected at 3,800m. Origin: unknown. Duration: 0.3 seconds. It did not repeat.",
    "The anglerfish has been alive for forty years. It has never seen another of its kind.",
    "At this depth, human voices would be compressed into low groans. The creatures here prefer it.",
    "Something passed between you and the seafloor. It was very large. It did not look up.",
    "Bioluminescence is not decoration. It is language. You cannot read it.",
    "Pressure at 4,000m: 600 atmospheres. Your ribcage would collapse in under a second.",
    "The jellyfish has no brain. It experiences everything directly. Perhaps this is better.",
    "The coral has been growing since the eleventh century. You found it in ten seconds.",
    "There are sounds at this depth that no instrument has named.",
    "The anglerfish lure contains living bacteria. They glow and they are alive and they are bait."
];

// Warnings that appear in the intro when something is disturbed
let disturbanceWarnings = [
    "Something stirred below.",
    "Movement detected.",
    "Pressure anomaly.",
    "The lure is glowing brighter.",
    "Do not move.",
    "It noticed the vibration.",
    "You are being measured."
];

// Max depth for the gauge
let maxDepth = 6000;

// Track whether lights are off
let lightsOut = false;

// Track transmission index (cycles through all messages)
let transmissionIndex = 0;


// ---- Custom Cursor ----
// Moves the glowing cursor dot with the mouse

$(document).mousemove(function (e) {
    // Move the bright cursor dot exactly to the mouse
    $("#cursor").css({
        left: e.clientX,
        top:  e.clientY
    });

    // Move the ring slightly behind (CSS transition creates the lag)
    $("#cursor-trail").css({
        left: e.clientX,
        top:  e.clientY
    });

    // ---- Depth Gauge ----
    // Calculate depth based on how far down the page the mouse is
    let fraction = Math.min(e.pageY / $(document).height(), 1);

    // Map to depth in meters
    let depth = Math.round(fraction * maxDepth);

    // Update the gauge bar width
    $("#gauge-bar").css("width", (fraction * 100) + "%");

    // Update the depth readout
    $("#gauge-reading").text(depth + " m");

    // Change reading color when very deep
    if (depth > 3000) {
        $("#gauge-reading").addClass("deep");
    } else {
        $("#gauge-reading").removeClass("deep");
    }

    // Update pressure reading (roughly 1 atm per 10m)
    let atm = Math.round(depth / 10) + 1;
    $("#pressure-reading").text(atm + " atm");

    // ---- Sonar ping when mouse is near the top ----
    if (e.clientY < 80) {
        $("#sonar-ring").removeClass("ping");
        void $("#sonar-ring")[0].offsetWidth; // force reflow to restart animation
        $("#sonar-ring").addClass("ping");
    }
});


// ---- Anglerfish interactions ----

// Hover: show speech bubble, disturb the title
$("#anglerfish-container").mouseenter(function () {
    $("#angler-speech").fadeIn(300);
    $("#title").addClass("alarmed");

    let randomWarning = disturbanceWarnings[Math.floor(Math.random() * disturbanceWarnings.length)];
    $("#warning-text").text(randomWarning);
});

$("#anglerfish-container").mouseleave(function () {
    $("#angler-speech").fadeOut(300);

    setTimeout(function () {
        $("#title").removeClass("alarmed");
        $("#warning-text").text("");
    }, 1200);
});

// Click: toggle awake state — creature pulses with bioluminescence
$("#anglerfish-container").click(function () {
    $(this).toggleClass("awake");

    if ($(this).hasClass("awake")) {
        $("#angler-speech").text("I see you now.").fadeIn(400);
    } else {
        $("#angler-speech").text("I see you.").fadeOut(300);
    }
});


// ---- Jellyfish: double-click to make it pulse ----

$("#jellyfish-container").dblclick(function () {
    $(this).removeClass("awake");

    let $jelly = $(this);
    setTimeout(function () {
        $jelly.addClass("awake");

        $("#jelly-speech").fadeIn(300);
        setTimeout(function () {
            $("#jelly-speech").fadeOut(600);
        }, 2000);

        setTimeout(function () {
            $jelly.removeClass("awake");
        }, 5000);
    }, 50);

    let randomWarning = disturbanceWarnings[Math.floor(Math.random() * disturbanceWarnings.length)];
    $("#warning-text").text(randomWarning);
    setTimeout(function () { $("#warning-text").text(""); }, 2500);
});


// ---- Coral: mousedown/mouseup to disturb the reef ----

$("#coral-container").mousedown(function () {
    $(this).addClass("disturbed");
    $("#coral-speech").fadeIn(300);

    let randomWarning = disturbanceWarnings[Math.floor(Math.random() * disturbanceWarnings.length)];
    $("#warning-text").text(randomWarning);
});

$("#coral-container").mouseup(function () {
    let $coral = $(this);

    setTimeout(function () {
        $coral.removeClass("disturbed");
        $("#coral-speech").fadeOut(400);
        $("#warning-text").text("");
    }, 900);
});


// ---- Keypress: receive a transmission ----

$(document).keydown(function () {
    $("#key-prompt").fadeOut(300);

    let message = transmissions[transmissionIndex];
    transmissionIndex = (transmissionIndex + 1) % transmissions.length;

    if ($("#transmission").hasClass("hidden")) {
        $("#transmission").removeClass("hidden").hide().fadeIn(500);
    }

    $("#transmission-text").text(message);
    $("#transmission").slideDown(400);

    // Trigger sonar ring as a signal received indicator
    $("#sonar-ring").removeClass("ping");
    void $("#sonar-ring")[0].offsetWidth;
    $("#sonar-ring").addClass("ping");
});


// ---- Lights out button ----

$("#btn-lights").click(function () {
    lightsOut = !lightsOut;

    if (lightsOut) {
        $("body").addClass("lights-out");
        $(this).text("RESTORE LIGHT").addClass("active");
        $("#lights-note").addClass("visible");
        $(".creature-card").addClass("awake");
    } else {
        $("body").removeClass("lights-out");
        $(this).text("KILL THE LIGHTS").removeClass("active");
        $("#lights-note").removeClass("visible");
        $(".creature-card").removeClass("awake");
    }
});