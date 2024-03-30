// Submit
function generatePoem(event) {
  event.preventDefault();

  alert("Your poem is being written.");

  let poemElement = document.querySelector("#poem");
  new Typewriter("#poem", {
    strings: [
      " Beneath society's scrutinizing gaze,<br />She dares to defy, to blaze her own ways.<br />In equality's embrace, she finds her home,<br />Unshackled spirit, no longer alone.<br />Woman, stand tall, you're not just flesh and bone.",
    ],
    autoStart: true,
    cursor: "",
    deleteSpeed: 40,
    delay: 62,
    pauseFor: 10000,
    loop: false,
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
