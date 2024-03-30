// Submit
function generatePoem(event) {
  event.preventDefault();

  alert("Your poem is being written.");

  let poemElement = document.querySelector("#poem");
  new Typewriter("#poem", {
    strings: ["This <br />is <br />a <br />test."],
    autoStart: true,
    loop: false,
    cursor: "",
  });
}

let poemFormelement = document.querySelector("form");
poemFormelement.addEventListener("submit", generatePoem);

// Input
let SPACE_WIDTH = 8;

function handleInput(event) {
  let inputElement = document.getElementById("generatePoem");
  let placeholderWidth = getTextWidth(inputElement.placeholder);
  let minWidth = 0;

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
