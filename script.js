document.addEventListener("DOMContentLoaded", function () {
  const calculator = document.querySelector(".calculator");
  const keys = calculator.querySelector(".calculator-keys");
  const display = calculator.querySelector(".calculator-screen");

  keys.addEventListener("click", (e) => {
    if (!e.target.matches("button")) return;

    const key = e.target;
    const action = key.value === "all-clear"
      ? "clear"
      : key.value === "="
      ? "calculate"
      : key.classList.contains("operator")
      ? "operator"
      : key.classList.contains("decimal")
      ? "decimal"
      : "number";
    const keyContent = key.textContent;
    const displayedNum = display.value;
    const previousKey = calculator.dataset.previousKeyType;

    if (action === "number") {
      if (
        displayedNum === "0" ||
        previousKey === "operator" ||
        previousKey === "calculate"
      ) {
        display.value = keyContent;
      } else {
        display.value = displayedNum + keyContent;
      }
    }

    if (action === "decimal") {
      if (previousKey === "operator" || previousKey === "calculate" || displayedNum === "") {
        display.value = "0.";
      } else if (!displayedNum.includes(".")) {
        display.value = displayedNum + ".";
      }
    }

    if (action === "operator") {
      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.firstValue = displayedNum;
      calculator.dataset.operator = key.value;
    }

    if (key.value === "all-clear") {
      display.value = "0";
      delete calculator.dataset.firstValue;
      delete calculator.dataset.operator;
      delete calculator.dataset.modValue;
    }

    if (key.value === "=") {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      if (firstValue) {
        display.value = calculate(firstValue, operator, secondValue);
      }
      calculator.dataset.previousKeyType = "calculate";
    }

    calculator.dataset.previousKeyType = action;
  });

  function calculate(n1, operator, n2) {
    let result = "";

    if (operator === "+") {
      result = parseFloat(n1) + parseFloat(n2);
    } else if (operator === "-") {
      result = parseFloat(n1) - parseFloat(n2);
    } else if (operator === "*") {
      result = parseFloat(n1) * parseFloat(n2);
    } else if (operator === "/") {
      result = parseFloat(n1) / parseFloat(n2);
    }
    console.log(result);
    return result;
  }
});
