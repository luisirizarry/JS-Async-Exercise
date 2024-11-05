// Setting the text for the h1 element
const $h1 = $("h1");
$h1.text("Number Facts");

const $ul = $("ul");

// Function to get a single favorite number fact
async function getSingleFavoriteFact() {
  let factData = await axios.get('http://numbersapi.com/7?json');
  $ul.append(`<li>Single favorite number fact: ${factData.data.text}</li>`);
}

// Function to get multiple facts in a single request
async function getMultipleFacts() {
  let factsData = await axios.get('http://numbersapi.com/1..4?json');
  for (let key in factsData.data) {
    $ul.append(`<li>Fact for number ${key}: ${factsData.data[key]}</li>`);
  }
}

// Function to get multiple facts for the same number
async function favoriteNumberFacts() {
  let facts = await Promise.all([
    axios.get('http://numbersapi.com/7?json'),
    axios.get('http://numbersapi.com/7?json'),
    axios.get('http://numbersapi.com/7?json'),
    axios.get('http://numbersapi.com/7?json')
  ]);

  facts.forEach(fact => {
    $ul.append(`<li>Fact for number 7: ${fact.data.text}</li>`);
  });
}

// Call functions to load facts
getSingleFavoriteFact();
getMultipleFacts();
favoriteNumberFacts();
