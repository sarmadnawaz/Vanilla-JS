import currencies from "./currencies.js";
const form = document.querySelector(".root form");
const fromSelect = form.querySelector('[name="from_currency"]');
const fromInput = form.querySelector('[name="from_amount"]');
const toSelect = form.querySelector('[name="to_currency"]');
const toEl = form.querySelector(".to_amount");
const API = '*********API_KEY**********'
const endpoint = "https://v6.exchangerate-api.com/v6";
const ratesByBase = {};

function generateOptions(options) {
  return Object.entries(options).map(
    ([currencyCode, currencyName]) =>
      `<option value="${currencyCode}">${currencyCode} - ${currencyName}</option>`
  ).join('');
}

async function fetchRates(base = 'PKR') {
    const res = await fetch(`${endpoint}/${API}/latest/${base}`);
    const rates = await res.json();
    return rates;
}

async function convert(amount, from, to){
    if (!ratesByBase[from]) {
        console.log(
          `Oh no, we dont have ${from} to convert to ${to}. So gets go get it!`
    );
    const rates = await fetchRates(from);
    ratesByBase[from] = rates;    
}
    const rate = ratesByBase[from].conversion_rates[to];
    const convertedAmount = rate * amount;
    console.log(`${amount} ${from} is ${convertedAmount} in ${to}`)
    return convertedAmount
}

function formatCurrency(amount, currency){
    return Intl.NumberFormat('en-US', {
        style : 'currency',
        currency,
    }).format(amount)
}

async function handleInput(){
    const rawAmount = await convert(
        fromInput.value,
        fromSelect.value,
        toSelect.value
    )
    toEl.textContent = formatCurrency(rawAmount, toSelect.value)
}


const optionsHtml = generateOptions(currencies);
fromSelect.innerHTML = optionsHtml;
toSelect.innerHTML = optionsHtml;

form.addEventListener('input', handleInput)