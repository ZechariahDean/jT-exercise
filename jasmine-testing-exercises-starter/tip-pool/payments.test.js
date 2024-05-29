describe("payment test (with setup and teardown)", function() {
    beforeEach(function() {
        // initialization logic
        billAmtInput.value = 80;
        tipAmtInput.value = 12;
    });

    it("shouldn't add a payment with submitPaymentInfo if input is empty", function() {
        billAmtInput.value = '';
        submitPaymentInfo();
        expect(Object.keys(allPayments).length).toEqual(0);
    });

    it("should create a new payment with submitPaymentInfo", function() {
        submitPaymentInfo();
        expect(Object.keys(allPayments).length).toEqual(1);
        expect(allPayments['payment1'].billAmt).toEqual('80');
        expect(allPayments['payment1'].tipAmt).toEqual('12');
        expect(allPayments['payment1'].tipPercent).toEqual(15);
    });

    it("should update payment table with appendPaymentTable", function() {
        let payment = createCurPayment();
        allPayments['payment1'] = payment;  
        appendPaymentTable(payment);

        let tdList = document.querySelectorAll('#paymentTable tbody tr td');
        expect(tdList[0].innerText).toEqual('$80');
        expect(tdList[1].innerText).toEqual('$12');
        expect(tdList[2].innerText).toEqual('15%');
        expect(tdList.length).toEqual(3);
    });

    it("should return undefined when createCurPayment is passed a negative or empty input(s)", function() {
        billAmtInput.value = -10;
        tipAmtInput.value = 3;
        expect(createCurPayment()).toEqual(undefined);

        billAmtInput.value = 10;
        tipAmtInput.value = '';
        expect(createCurPayment()).toEqual(undefined);
    });

    it("should not return if billAmt = 0 but it should if tipAmt = 0", function() {
        billAmtInput.value = 0;
        tipAmtInput.value = 7;
        expect(createCurPayment()).toEqual(undefined);

        billAmtInput.value = 7;
        tipAmtInput.value = 0;
        expect(createCurPayment()).toEqual({
            billAmt: '7',
            tipAmt: '0',
            tipPercent: 0
        });
    });

    it("should acurately add to html the summary of all payments", function() {
        submitPaymentInfo();
        expect(summaryTds[0].innerText).toEqual('$80');
        expect(summaryTds[1].innerText).toEqual('$12');
        expect(summaryTds[2].innerText).toEqual("15%");

        billAmtInput.value = 100;
        tipAmtInput.value = 20;
        submitPaymentInfo()
        expect(summaryTds[0].innerText).toEqual('$180');
        expect(summaryTds[1].innerText).toEqual('$32');
        expect(summaryTds[2].innerText).toEqual("18%");
    });

    afterEach(function() {
        billAmtInput.value = '';
        tipAmtInput.value = '';
        paymentTbody.innerHTML = '';
        serverTbody.innerHTML = '';
        paymentId = 0;
        allPayments = {};
        summaryTds[0].innerHTML = '';
        summaryTds[1].innerHTML = '';
        summaryTds[2].innerHTML = '';
    });
});