const convertBtn = document.getElementById("convert-btn");
const resultDiv = document.getElementById("result");
const ApiKey = "f9494ada5bd9cac762cfe81e";
var Url;

if (convertBtn && resultDiv) {
  Url = "";
  convertBtn.addEventListener("click", async function () {
    const valueHTML = document.getElementById("amount") as HTMLInputElement;
    const value = valueHTML.value;

    let fromCurrency = "";
    let toCurrency = "";

    const fromCurrencyElement = document.getElementById(
      "from-currency"
    ) as HTMLSelectElement;
    if (fromCurrencyElement) {
      fromCurrency = fromCurrencyElement.value;
    }

    const toCurrencyElement = document.getElementById(
      "to-currency"
    ) as HTMLSelectElement;
    if (toCurrencyElement) {
      toCurrency = toCurrencyElement.value;
    }

    if (!value || !fromCurrency || !toCurrency) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    Url =
      "https://v6.exchangerate-api.com/v6/" +
      ApiKey +
      "/latest/" +
      fromCurrency;
    try {
      const response = await fetch(Url);
      const data = await response.json();
      var output = data.conversion_rates[toCurrency];
      output *= parseFloat(value);
      document.getElementById("result").innerHTML = showResults(
        output,
        parseFloat(value),
        fromCurrency,
        toCurrency
      );
    } catch (error) {
      console.log("ERROR requiting data");
      document.getElementById("result").innerHTML = `<h2>ERROR</h2>`;
    }
  });
}

function showResults(
  output: number,
  from_value: number,
  from_coin: string,
  to_coin: string
) {
  const resultsHTML = `
    <h2>${from_value} ${from_coin} = ${output} ${to_coin}</h2>
  `;
  return resultsHTML;
}
