// Stores the title of this environment as a variable
let environmentTitle = "The Deep Sea";

// Stores a list (array) of depth descriptions, one for each level of descent
let depthLevels = [
    "200m — Twilight Zone. The last light fades.",
    "1000m — Night Zone. Total darkness begins.",
    "3000m — Midnight Zone. Pressure crushes everything.",
    "6000m — Hadal Zone. You should not be here."
];

// Stores a list of creatures that live in the deep sea
let creatures = ["anglerfish", "giant squid", "barreleye fish", "vampire squid", "bioluminescent jellyfish"];

// Stores information about the anglerfish as an object (key-value pairs)
let anglerfish = {
    name: "Melanocetus johnsonii",        // Scientific name
    commonName: "Black Seadevil",          // Common name
    depth: "1000m — 4000m",               // Depth range it lives at
    lureColor: "blue-white bioluminescent glow", // What its lure looks like
    danger: "extreme",                     // How dangerous it is
    isWatching: true                       // Whether it is currently watching you
};

// Stores a list of random warning messages to display to the user
let warnings = [
    "Something large passed below you.",
    "The light from above is gone now.",
    "You heard a sound. There is no explanation for it.",
    "The anglerfish has noticed you.",
    "Pressure at this depth is 600 times what you feel on land.",
    "You are not alone down here."
];

// Tracks how many times the user has clicked the depth button
let descentCount = 0;

// Runs when the "How deep am I?" button is clicked
$("#btn-depth").click(function () {
    // Adds 1 to the count each time the button is clicked
    descentCount = descentCount + 1;

    // Gets the position in the array (always one less than the count)
    let arrayPosition = descentCount - 1;

    // Gets the depth description at that position
    let currentDepth = depthLevels[arrayPosition];

    // If there are no more depths in the array, show a final message
    if (currentDepth === undefined) {
        $("#environment-output").html("<p>You have gone too deep. There are no more measurements.</p>");
    } else {
        // Otherwise, display the current depth description
        $("#environment-output").html("<p>" + currentDepth + "</p>");
    }
});

// Runs when the "What lives here?" button is clicked
$("#btn-creatures").click(function () {
    // Starts building an HTML list with an intro line
    let list = "<p>Known inhabitants of this zone:</p><ul>";

    // Loops through every creature in the array and adds it to the list
    for (let i = 0; i < creatures.length; i++) {
        list = list + "<li>" + creatures[i] + "</li>";
    }

    // Closes the list and displays it in the output box
    list = list + "</ul>";
    $("#environment-output").html(list);
});

// Runs when the "Tell me about the anglerfish" button is clicked
$("#btn-anglerfish").click(function () {
    // Builds a string of HTML using each piece of info from the anglerfish object
    let info = "<p><strong>Scientific name:</strong> " + anglerfish.name + "</p>";
    info = info + "<p><strong>Common name:</strong> " + anglerfish.commonName + "</p>";
    info = info + "<p><strong>Depth range:</strong> " + anglerfish.depth + "</p>";
    info = info + "<p><strong>Lure:</strong> " + anglerfish.lureColor + "</p>";
    info = info + "<p><strong>Danger level:</strong> " + anglerfish.danger + "</p>";
    info = info + "<p><strong>Currently watching you:</strong> " + anglerfish.isWatching + "</p>";

    // Displays all the anglerfish info in the output box
    $("#environment-output").html(info);
});

// Runs when the "Any dangers?" button is clicked
$("#btn-warning").click(function () {
    // Picks a random number between 0 and the last index of the warnings array
    let randomIndex = Math.floor(Math.random() * warnings.length);

    // Uses that random number to grab one warning from the list
    let currentWarning = warnings[randomIndex];

    // Displays the random warning in the output box
    $("#environment-output").html("<p><em>" + currentWarning + "</em></p>");
});

// Function that changes the look of the page depending on which zone is selected
function tuneEnvironment(zone) {

    // Removes the "active" highlight from all tune buttons first
    $(".tune-btn").removeClass("active");

    // Loops through each button to find the one that matches the selected zone
    $(".tune-btn").each(function () {
        // If this button's onclick matches the current zone, highlight it as active
        if ($(this).attr("onclick") === "tuneEnvironment('" + zone + "')") {
            $(this).addClass("active");
        }
    });

    // Checks which zone was selected and applies the right colors and text
    if (zone === "surface") {
        // Sets lighter blue colors for the surface zone
        $("body").css("background-color", "#0a2a45");
        $("#top-zone").css("background-color", "#0d3b6e");
        $("#main-zone").css("background-color", "#082030");

        // Makes images brighter and more colorful for the surface
        $("#anglerfish").css("filter", "brightness(1.1) saturate(1.4)");
        $("#jellyfish").css("filter", "brightness(1.2) hue-rotate(160deg) saturate(1.6)");
        $("#coral").css("filter", "brightness(1.1) saturate(1.5)");

        // Makes particles brighter and more visible near the surface
        $(".particle").css("background", "rgba(100, 220, 255, 0.7)");

        // Updates the intro text to match the surface environment
        $("#intro").text(
            "You are near the surface. Sunlight filters down in long, shifting columns. " +
            "The water is blue-green and cold, but not yet hostile. " +
            "Above you, you can still see the sky. You haven't gone far enough yet."
        );

        // Updates the zone label and output message
        $("#zone-name").text("surface (0–200m)");
        $("#environment-output").html("<p>Light reaches you here. The world above still exists.</p>");

    } else if (zone === "shallow") {
        // Sets darker colors for the shallow/twilight zone
        $("body").css("background-color", "#021422");
        $("#top-zone").css("background-color", "#031c30");
        $("#main-zone").css("background-color", "#010e1c");

        // Slightly dims the images for the twilight zone
        $("#anglerfish").css("filter", "brightness(0.9) saturate(1.0)");
        $("#jellyfish").css("filter", "brightness(0.9) hue-rotate(180deg) saturate(1.2)");
        $("#coral").css("filter", "brightness(0.85) saturate(0.9)");

        // Makes particles slightly dimmer
        $(".particle").css("background", "rgba(160, 200, 230, 0.5)");

        // Updates the intro text for the twilight zone
        $("#intro").text(
            "The light is thinning. You are in the twilight zone — " +
            "where the last of the sun dissolves into pressure. " +
            "Creatures here are translucent. They have never cast a shadow."
        );

        // Updates the zone label and output message
        $("#zone-name").text("shallow / twilight (200–1000m)");
        $("#environment-output").html("<p>The color blue is fading. Everything is becoming grey and slow.</p>");

    } else if (zone === "deep") {
        // Restores the default deep sea colors
        $("body").css("background-color", "#020c1a");
        $("#top-zone").css("background-color", "#031628");
        $("#main-zone").css("background-color", "#010a14");

        // Restores the default image filters for the deep zone
        $("#anglerfish").css("filter", "brightness(0.85) saturate(0.8)");
        $("#jellyfish").css("filter", "brightness(0.8) hue-rotate(200deg)");
        $("#coral").css("filter", "brightness(0.7) saturate(0.5)");

        // Restores the default particle color
        $(".particle").css("background", "rgba(180, 230, 255, 0.4)");

        // Restores the original intro text
        $("#intro").text(
            "Far beneath the surface, where sunlight is limited, " +
            "there is a world that has never known the sound of humans. " +
            "Cold, in the dark depths, things glow. Things breathe. Things watch. " +
            "You are descending now. The water closes above you like a door."
        );

        // Updates the zone label and output message
        $("#zone-name").text("deep / midnight (1000–4000m)");
        $("#environment-output").html("<p>Total darkness. Only bioluminescence. The pressure is becoming personal.</p>");

    } else if (zone === "abyss") {
        // Sets almost-black colors with a purple tint for the abyss
        $("body").css("background-color", "#04000a");
        $("#top-zone").css("background-color", "#080006");
        $("#main-zone").css("background-color", "#020002");

        // Makes images very dark and shifts their color toward purple/red
        $("#anglerfish").css("filter", "brightness(0.5) saturate(0.3) hue-rotate(300deg)");
        $("#jellyfish").css("filter", "brightness(0.4) hue-rotate(280deg) saturate(0.4)");
        $("#coral").css("filter", "brightness(0.35) saturate(0.2) hue-rotate(320deg)");

        // Changes particles to a dim reddish glow for the abyss
        $(".particle").css("background", "rgba(180, 60, 80, 0.25)");

        // Updates the intro text for the abyss zone
        $("#intro").text(
            "You have gone too far. This is the hadal zone — the place where the ocean floor " +
            "drops into trenches that have no name in any human language. " +
            "The pressure here would flatten your bones like paper. " +
            "Nothing should be alive at this depth. And yet."
        );

        // Updates the zone label and output message
        $("#zone-name").text("abyss / hadal (4000m+)");
        $("#environment-output").html("<p><em>The anglerfish is still watching. It has always been watching.</em></p>");

    } else {
        // If none of the known zones matched, show an error message
        $("#environment-output").html("<p>Unknown zone. The instruments are not reading correctly.</p>");
        $("#zone-name").text("unknown");
    }
}