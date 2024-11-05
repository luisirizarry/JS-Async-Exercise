$(document).ready(function() {
    $buttonGimme = $("#gimme");
    $buttonRest = $("#reset");
    $img = $("img");

    let deck_id;
    newDeck()
        .then((id) => {
            deck_id = id;
        })
        .catch((err) => console.log(err));

    $buttonGimme.on("click", function() {
        axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
            .then((card) => {
                $img.attr("src", card.data.cards[0].image);
                if (card.data.remaining === 1) {
                    $buttonGimme.attr("disabled", true);
                    $buttonRest.attr("disabled", false);
                }
            })
            .catch((err) => console.log(err));
    });

    $buttonRest.on("click", function() {
        newDeck()
            .then((id) => {
                deck_id = id; // Get the new deck ID
                $img.attr("src", "");
                $buttonGimme.attr("disabled", false);
                $buttonRest.attr("disabled", true);
            })
            .catch((err) => console.log(err));
    });
});


function newDeck() {
    return axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then((deck) => deck.data.deck_id)
        .catch((err) => console.error(err));
}