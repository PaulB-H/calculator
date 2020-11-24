## Calculator

Issue with decimals...

I was trying to do input.value += whatever was coming in from the button

<button onclick="numpad(3)">3</button>

but when you try that with a decimal, the number field removes the decimal automatically since there is technically nothing following it, no need for the decimal

To fix this I added separate function for decimal, and a "que" for the decimal and it gets added before the next number when one is pressed, and also has a regex to ensure no multiple decimals

    function numpad(num) {
      console.log(`Adding ${num} to input.value`);
      if (decimalQue) {
        input.value += "." + num;
        decimalQue = false;
      } else {
        input.value += num;
      }
      console.log(`input.value is now ${input.value}`);
    }

    function decimal() {
      let decimalPatt = /[.]+/g;
      let decimals = input.value.search(decimalPatt);
      console.log(decimals);
      if (decimals === -1) {
        input.value += ".";
        decimalQue = true;
      }
    }
