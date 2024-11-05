$h1 = $("h1");
$h1.text("Number Facts");

$ul = $("ul");

// Single favorite number fact request
axios.get('http://numbersapi.com/7?json')
  .then((fact) => {
    $ul.append(`<li>Single favorite number fact: ${fact.data.text}</li>`);
  })
  .catch((err) => console.log(err));

// Multiple number facts in a single request
axios.get('http://numbersapi.com/1..4?json')
  .then((facts) => {
    for (let key in facts.data) {
      $ul.append(`<li>Fact for number ${key}: ${facts.data[key]}</li>`);
    }
  })
  .catch((err) => console.log(err));

// Four facts about the same favorite number
const favoriteNumberFacts = [];
for (let i = 0; i < 4; i++) {
  favoriteNumberFacts.push(axios.get('http://numbersapi.com/7?json'));
}

Promise.all(favoriteNumberFacts)
  .then((factsArr) => {
    for (let fact of factsArr) {
      $ul.append(`<li>Favorite number fact: ${fact.data.text}</li>`);
    }
  })
  .catch((err) => console.log(err));
