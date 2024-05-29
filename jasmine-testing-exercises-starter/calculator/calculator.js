window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const values = {amount: 10000, years: 5, rate: 5}
  const amount = document.getElementById('loan-amount');
  const years = document.getElementById('loan-years');
  const rate = document.getElementById('loan-rate');
  amount.value = values['amount'];
  years.value = values['years'];
  rate.value = values['rate'];

  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const amount = document.getElementById('loan-amount').value;
  const years = document.getElementById('loan-years').value;
  const rate = document.getElementById('loan-rate').value;
  const values = {'amount': amount, 'years': years, 'rate': rate}
  updateMonthly(calculateMonthlyPayment(values));
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  const monthlyRate = (values.rate / 100) / 12;
  const n = Math.floor(values.years * 12);
  const monthlyPayment = (values.amount * monthlyRate) / (1 - (1 + monthlyRate) ** (-n));
  return `${Math.round(monthlyPayment * 100) / 100}`;
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  document.getElementById('monthly-payment').innerText = monthly;
}
