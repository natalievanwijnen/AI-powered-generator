// Input width flexibility
let SPACE_WIDTH = 8;
let lastWidth = 0;

function handleInput(event) {
  let inputElement = document.getElementById("generatePoem");
  let placeholderWidth = getTextWidth(inputElement.placeholder);
  let minWidth = 0;
  let newWidth;

  let inputValue = inputElement.value;

  if (inputValue.trim() === "") {
    newWidth = `${placeholderWidth}px`;
  } else {
    let textWidth = getTextWidth(inputValue.replace(/\s/g, "&nbsp;"));
    newWidth = `${Math.max(textWidth, minWidth)}px`;

    let currentWidth = inputElement.offsetWidth;
    let widthIncrease = currentWidth - lastWidth;
    if (widthIncrease > SPACE_WIDTH) {
      newWidth = `${lastWidth + SPACE_WIDTH}px`;
    }
  }

  inputElement.style.width = newWidth;
  lastWidth = inputElement.offsetWidth;
}

function getTextWidth(text) {
  let hiddenText = document.getElementById("hiddenText");
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
    pauseFor: 10000,
    loop: false,
  });
}

function generatePoem(event) {
  event.preventDefault();

  let instruction = document.getElementById("generatePoem").value;
  let apiKey = "ofa25a26c683btbc029a13b3d2bf94cc";
  let prompt = `I'm seeking a poem related to "${instruction}".
  Do not generate a new poem; it must already exist.
  The poem's title must not be revealed.
  If the poem exceeds 10 lines, please provide an excerpt. 
  Please strictly adhere to the following format: "poem" - "author". Poem first, author after, never a title.
  Strongly prioritize works by recognized authors; however, if none exist on this topic, anonymous works must be an exception.
  Please select poems that are artistic and heartfelt, avoiding mere narrative extracts.
  I do not want any prompt confirmation like: "Sure, here is an existing poem about..." Or additional context like: "Poem: ..."`;

  let context = `As a holder of a literary degree with expertise in poetry, your task is to present a single piece of poetry.
  Do not provide supplementary information or ask additional questions.
  Aim to curate a diverse and captivating collection of poems that inspire and enrich, following the specified format rigorously.`;

  let apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&key=${apiKey}`;

  axios
    .get(apiURL)
    .then(displayPoem)
    .catch((error) => {
      console.error("Error fetching poem:", error);
    });
}

let poemFormElement = document.querySelector("#search");
poemFormElement.addEventListener("submit", generatePoem);

let inputElement = document.getElementById("generatePoem");
inputElement.addEventListener("input", handleInput);
inputElement.addEventListener("keydown", handleInput);
