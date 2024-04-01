// Dynamic input width
let SPACE_WIDTH = 8;
let lastWidth = 0;

function handleInput(event) {
  const inputElement = event.target;
  const inputValue = inputElement.value.trim();
  const placeholderWidth = getTextWidth(inputElement.placeholder);

  let newWidth;
  if (inputValue === "") {
    newWidth = `${placeholderWidth}px`;
  } else {
    const textWidth = getTextWidth(inputValue.replace(/\s/g, "&nbsp;"));
    const minWidth = 0;
    newWidth = `${Math.max(textWidth, minWidth)}px`;

    const currentWidth = inputElement.offsetWidth;
    const widthIncrease = currentWidth - lastWidth;
    if (widthIncrease > SPACE_WIDTH) {
      newWidth = `${lastWidth + SPACE_WIDTH}px`;
    }
  }

  inputElement.style.width = newWidth;
  lastWidth = inputElement.offsetWidth;
}

// Get width of text
function getTextWidth(text) {
  const hiddenText = document.getElementById("hiddenText");
  hiddenText.innerHTML = text;
  return hiddenText.offsetWidth;
}

// Generate and display poem
function displayPoem(response) {
  new Typewriter("#poem", {
    strings: response.data.answer,
    autoStart: true,
    cursor: "",
    deleteSpeed: 40,
    delay: 25,
    loop: false,
  });
}

// Generate poem
function generatePoem(event) {
  event.preventDefault();

  const poemElement = document.getElementById("poem");
  poemElement.innerHTML = "<p id='loadingMessage'>Writing a masterpiece...</p>";

  const instruction = document.getElementById("generatePoem").value;
  const apiKey = "ofa25a26c683btbc029a13b3d2bf94cc";
  const prompt = `Please generate a poem related to "${instruction}".
   Your mission is to generate a poem that is a maximum of 5 lines long.
   The poem must not include a title.`;
  const context = `As a holder of a literary degree with expertise in poetry, your task is to present a single piece of poetry.
   Do not provide supplementary information or ask additional questions.
   Please generate poems that are artistic and heartfelt, avoiding mere narrative extracts and quotes.
   Aim to create diverse poems that inspire and enrich.
   Never provide any prompt confirmation like: "Sure, here is an existing poem about..." Or additional context like: "Poem: ..."
  `;
  const apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  // Call API and display poem
  axios
    .get(apiURL)
    .then(displayPoem)
    .catch((error) => {
      console.error("Error fetching poem:", error);
    });
}

const poemFormElement = document.querySelector("#search");
poemFormElement.addEventListener("submit", generatePoem);

const inputElement = document.getElementById("generatePoem");
inputElement.addEventListener("input", handleInput);
inputElement.addEventListener("keydown", handleInput);
