$(document).ready(async function() {
    const $buttonGimme = $("#gimme");
    const $buttonRest = $("#reset");
    const $img = $("img");

    // Disable reset button initially
    $buttonRest.attr("disabled", true);

    // Set the initial deck ID
    let deck_id = await newDeck();

    // Set up click event handlers using async functions
    $buttonGimme.on("click", async function() {
        await gimme(deck_id);
    });

    $buttonRest.on("click", async function() {
        deck_id = await reset();
    });
});


async function newDeck() {
    try {
        let res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        return res.data.deck_id;
    } catch (e) {
        console.log("Error", e);
    }
}

async function gimme(deck_id) {
    try {
        let card = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
        $("img").attr("src", card.data.cards[0].image);
        
        // Disable the "Gimme" button and enable the "Reset" button if only 1 card is remaining
        if (card.data.remaining === 1) {
            $("#gimme").attr("disabled", true);
            $("#reset").attr("disabled", false);
        }
    } catch (e) {
        console.log("Error", e);
    }
}

async function reset() {
    try {
        // Clear the image and reset button states
        $("img").attr("src", "");
        $("#gimme").attr("disabled", false);
        $("#reset").attr("disabled", true);
        
        // Fetch a new deck ID for the reset
        let newDeckId = await newDeck();
        return newDeckId;
    } catch (e) {
        console.log("Error", e);
    }
}
