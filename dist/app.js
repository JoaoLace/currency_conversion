var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const convertBtn = document.getElementById("convert-btn");
const resultDiv = document.getElementById("result");
const ApiKey = "f9494ada5bd9cac762cfe81e";
var Url;
if (convertBtn && resultDiv) {
    Url = "";
    convertBtn.addEventListener("click", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const valueHTML = document.getElementById("amount");
            const value = valueHTML.value;
            let fromCurrency = "";
            let toCurrency = "";
            const fromCurrencyElement = document.getElementById("from-currency");
            if (fromCurrencyElement) {
                fromCurrency = fromCurrencyElement.value;
            }
            const toCurrencyElement = document.getElementById("to-currency");
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
                const response = yield fetch(Url);
                const data = yield response.json();
                var output = data.conversion_rates[toCurrency];
                output *= parseFloat(value);
                document.getElementById("result").innerHTML = showResults(output, parseFloat(value), fromCurrency, toCurrency);
            }
            catch (error) {
                console.log("ERROR requiting data");
            }
        });
    });
}
function showResults(output, from_value, from_coin, to_coin) {
    const resultsHTML = `
    <h2>${from_value} ${from_coin} = ${output} ${to_coin}</h2>
  `;
    return resultsHTML;
}
