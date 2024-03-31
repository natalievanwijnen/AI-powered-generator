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
  document.getElementById("loadingMessage").remove();

  new Typewriter("#poem", {
    strings: response.data.answer,
    autoStart: true,
    cursor: "",
    deleteSpeed: 40,
    delay: 25,
    loop: false,
  });
}

function generatePoem(event) {
  event.preventDefault();

  document.getElementById("poem").innerHTML =
    "<p id='loadingMessage'>Scouring the archives...</p>";

  let instruction = document.getElementById("generatePoem").value;
  let apiKey = "ofa25a26c683btbc029a13b3d2bf94cc";
  let prompt = `I'm seeking a poem related to "${instruction}".
  Do not generate a new poem; the poem must already exist.
  The poem's title must not be revealed.
  The poem cannot exceed 10 lines. 
  Please strictly adhere to the following format: "poem" - "poet". Poem first, poet after, never a title.
  Strongly prioritize works by recognized poets; however, if none exist on this topic, anonymous works can be an exception.
  Please select poems that are artistic and heartfelt, avoiding mere narrative extracts and quotes.
  Never provide any prompt confirmation like: "Sure, here is an existing poem about..." Or additional context like: "Poem: ..."`;

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
