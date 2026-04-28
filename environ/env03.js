let environmentTitle = "The Deep Sea";

let depthLevels = [
    "200m — Twilight Zone. The last light fades.",
    "1000m — Night Zone. Total darkness begins.",
    "3000m — Midnight Zone. Pressure crushes everything.",
    "6000m — AM Zone. You should not be here."
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

    console.log("descent count: " + descentCount);
    console.log("depth: " + currentDepth);
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
    console.log("warning shown: " + currentWarning);
});