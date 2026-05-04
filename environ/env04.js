let environmentTitle = "The Deep Sea";

let depthLevels = [
    "200m — Twilight Zone. The last light fades.",
    "1000m — Night Zone. Total darkness begins.",
    "3000m — Midnight Zone. Pressure crushes everything.",
    "6000m — Hadal Zone. You should not be here."
];

let creatures = ["anglerfish", "giant squid", "barreleye fish", "vampire squid", "bioluminescent jellyfish"];

let anglerfish = {
    name: "Melanocetus johnsonii",
    commonName: "Black Seadevil",
    depth: "1000m — 4000m",
    lureColor: "blue-white bioluminescent glow",
    danger: "extreme",
    isWatching: true
};

let warnings = [
    "Something large passed below you.",
    "The light from above is gone now.",
    "You heard a sound. There is no explanation for it.",
    "The anglerfish has noticed you.",
    "Pressure at this depth is 600 times what you feel on land.",
    "You are not alone down here."
];

let descentCount = 0;

$("#btn-depth").click(function () {
    descentCount = descentCount + 1;
    let arrayPosition = descentCount - 1;
    let currentDepth = depthLevels[arrayPosition];

    if (currentDepth === undefined) {
        $("#environment-output").html("<p>You have gone too deep. There are no more measurements.</p>");
    } else {
        $("#environment-output").html("<p>" + currentDepth + "</p>");
    }
});

$("#btn-creatures").click(function () {
    let list = "<p>Known inhabitants of this zone:</p><ul>";
    for (let i = 0; i < creatures.length; i++) {
        list = list + "<li>" + creatures[i] + "</li>";
    }
    list = list + "</ul>";
    $("#environment-output").html(list);
});

$("#btn-anglerfish").click(function () {
    let info = "<p><strong>Scientific name:</strong> " + anglerfish.name + "</p>";
    info = info + "<p><strong>Common name:</strong> " + anglerfish.commonName + "</p>";
    info = info + "<p><strong>Depth range:</strong> " + anglerfish.depth + "</p>";
    info = info + "<p><strong>Lure:</strong> " + anglerfish.lureColor + "</p>";
    info = info + "<p><strong>Danger level:</strong> " + anglerfish.danger + "</p>";
    info = info + "<p><strong>Currently watching you:</strong> " + anglerfish.isWatching + "</p>";
    $("#environment-output").html(info);
});

$("#btn-warning").click(function () {
    let randomIndex = Math.floor(Math.random() * warnings.length);
    let currentWarning = warnings[randomIndex];
    $("#environment-output").html("<p><em>" + currentWarning + "</em></p>");
});

function tuneEnvironment(zone) {

    // Remove active class from all tune buttons, then mark the right one
    $(".tune-btn").removeClass("active");
    $(".tune-btn").each(function () {
        if ($(this).attr("onclick") === "tuneEnvironment('" + zone + "')") {
            $(this).addClass("active");
        }
    });

    if (zone === "surface") {
        $("body").css("background-color", "#0a2a45");
        $("#top-zone").css("background-color", "#0d3b6e");
        $("#main-zone").css("background-color", "#082030");

        $("#anglerfish").css("filter", "brightness(1.1) saturate(1.4)");
        $("#jellyfish").css("filter", "brightness(1.2) hue-rotate(160deg) saturate(1.6)");
        $("#coral").css("filter", "brightness(1.1) saturate(1.5)");

        $(".particle").css("background", "rgba(100, 220, 255, 0.7)");

        $("#intro").text(
            "You are near the surface. Sunlight filters down in long, shifting columns. " +
            "The water is blue-green and cold, but not yet hostile. " +
            "Above you, you can still see the sky. You haven't gone far enough yet."
        );

        $("#zone-name").text("surface (0–200m)");
        $("#environment-output").html("<p>Light reaches you here. The world above still exists.</p>");

    } else if (zone === "shallow") {
        $("body").css("background-color", "#021422");
        $("#top-zone").css("background-color", "#031c30");
        $("#main-zone").css("background-color", "#010e1c");

        $("#anglerfish").css("filter", "brightness(0.9) saturate(1.0)");
        $("#jellyfish").css("filter", "brightness(0.9) hue-rotate(180deg) saturate(1.2)");
        $("#coral").css("filter", "brightness(0.85) saturate(0.9)");

        $(".particle").css("background", "rgba(160, 200, 230, 0.5)");

        $("#intro").text(
            "The light is thinning. You are in the twilight zone — " +
            "where the last of the sun dissolves into pressure. " +
            "Creatures here are translucent. They have never cast a shadow."
        );

        $("#zone-name").text("shallow / twilight (200–1000m)");
        $("#environment-output").html("<p>The color blue is fading. Everything is becoming grey and slow.</p>");

    } else if (zone === "deep") {
        $("body").css("background-color", "#020c1a");
        $("#top-zone").css("background-color", "#031628");
        $("#main-zone").css("background-color", "#010a14");

        $("#anglerfish").css("filter", "brightness(0.85) saturate(0.8)");
        $("#jellyfish").css("filter", "brightness(0.8) hue-rotate(200deg)");
        $("#coral").css("filter", "brightness(0.7) saturate(0.5)");

        $(".particle").css("background", "rgba(180, 230, 255, 0.4)");

        $("#intro").text(
            "Far beneath the surface, where sunlight is limited, " +
            "there is a world that has never known the sound of humans. " +
            "Cold, in the dark depths, things glow. Things breathe. Things watch. " +
            "You are descending now. The water closes above you like a door."
        );

        $("#zone-name").text("deep / midnight (1000–4000m)");
        $("#environment-output").html("<p>Total darkness. Only bioluminescence. The pressure is becoming personal.</p>");

    } else if (zone === "abyss") {
        $("body").css("background-color", "#04000a");
        $("#top-zone").css("background-color", "#080006");
        $("#main-zone").css("background-color", "#020002");

        $("#anglerfish").css("filter", "brightness(0.5) saturate(0.3) hue-rotate(300deg)");
        $("#jellyfish").css("filter", "brightness(0.4) hue-rotate(280deg) saturate(0.4)");
        $("#coral").css("filter", "brightness(0.35) saturate(0.2) hue-rotate(320deg)");

        $(".particle").css("background", "rgba(180, 60, 80, 0.25)");

        $("#intro").text(
            "You have gone too far. This is the hadal zone — the place where the ocean floor " +
            "drops into trenches that have no name in any human language. " +
            "The pressure here would flatten your bones like paper. " +
            "Nothing should be alive at this depth. And yet."
        );

        $("#zone-name").text("abyss / hadal (4000m+)");
        $("#environment-output").html("<p><em>The anglerfish is still watching. It has always been watching.</em></p>");

    } else {
        $("#environment-output").html("<p>Unknown zone. The instruments are not reading correctly.</p>");
        $("#zone-name").text("unknown");
    }
}