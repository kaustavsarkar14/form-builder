const addButtons = document.querySelectorAll(".add-button");
const formContainer = document.getElementById("formContainer");
const saveButton = document.getElementById("save");

addButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const newInputDiv = document.createElement("div");
    const uid = Date.now();
    newInputDiv.classList.add("inputDiv");
    let labelText;
    let inputType;
    if (e.target.id == "input") {
      labelText = "Sample Input";
      inputType = "input";
    } else if (e.target.id == "select") {
      labelText = "Select";
      inputType = "select";
    } else if (e.target.id == "textarea") {
      labelText = "Textarea";
      inputType = "textarea";
    }
    newInputDiv.innerHTML = `
          <div>
            <label for="${uid}">${labelText}</label>
            <button onclick="deleteInputDiv('${uid}')" >Delete</button>
          </div>
   `;
    const input = document.createElement(inputType);
    input.id = uid;
    input.className = "input";
    input.placeholder = "placeholder...";
    newInputDiv.appendChild(input);
    formContainer.appendChild(newInputDiv);
    initListeners();
  });
});

function initListeners() {
  const inputDivs = document.querySelectorAll(".inputDiv");
  inputDivs.forEach((inputDiv) => {
    inputDiv.draggable = true;
    inputDiv.addEventListener('dragstart', e=>{
        e.target.classList.add("dragging")
    })
    inputDiv.addEventListener('dragend', e=>{
        e.target.classList.remove("dragging")
    })
  });
}
initListeners()

function deleteInputDiv(id) {
  document.getElementById(id).parentElement.remove();
}

saveButton.addEventListener("click", (e) => {
  const inputDivs = [...document.querySelectorAll(".inputDiv")];
  console.log(inputDivs);
  const result = inputDivs.map((inputDiv) => {
    const input = inputDiv.querySelector(".input");
    const label = inputDiv.querySelector("label");
    return {
      type: input.tagName.toLowerCase(),
      label: label.innerText,
      id: input.id,
      placeholder: input.placeholder,
    };
  });
  console.log(result);
});
