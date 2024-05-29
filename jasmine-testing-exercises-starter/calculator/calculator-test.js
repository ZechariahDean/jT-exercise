
it('should calculate the monthly rate correctly', function () {
  const values = {
    amount: 10000, 
    years: 6, 
    rate: 3.5
  };
  expect(calculateMonthlyPayment(values)).toEqual('154.18');
});


it("should return a result with 2 decimal places", function() {
  const values = {
    amount: 1000, 
    years: 10, 
    rate: 3.3333
  }
  expect(calculateMonthlyPayment(values)).toEqual('9.81');
});

it('should handle extreme interest rates', function() {
  const values1 = {
    amount: 100, 
    years: 20, 
    rate: 99.9
  }
  const values2 = {
    amount: 1000000, 
    years: 10, 
    rate: 0.1
  }
  expect(calculateMonthlyPayment(values1)).toEqual('8.33');
  expect(calculateMonthlyPayment(values2)).toEqual('8375.42');
})
