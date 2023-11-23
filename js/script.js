import { Modal } from "./modal.js";
import { AlertError } from "./alert-error.js";
import { calculateIMC, notANumber } from "./utils.js";

const form = document.querySelector("form");
export const inputWeight = document.querySelector("#weight");
export const inputHeight = document.querySelector("#height");

inputWeight.oninput = () => AlertError.close();
inputHeight.oninput = () => AlertError.close();

form.onsubmit = (event) => {
  event.preventDefault();

  const weight = inputWeight.value;
  const height = inputHeight.value;

  const weightOrHeightIsNotANumber = notANumber(weight) || notANumber(height);

  if (weightOrHeightIsNotANumber) {
    AlertError.open();
    return;
  }

  AlertError.close();

  const result = calculateIMC(weight, height);
  displayResultMessage(result);
};

function displayResultMessage(result) {
  const message = `Seu IMC é de ${result}`;

  Modal.message.innerText = message;
  Modal.open();
}

window.addEventListener("keydown", handleKeydown);
function handleKeydown(event) {
  if (event.key === "Escape") return Modal.close(), Modal.clear();
}
