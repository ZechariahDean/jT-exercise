describe("helpers test (with setup and teardown)", function() {

    it("should accurately return the total of payments of the given type with sumPaymentTotal", function() {
        billAmtInput.value = 10;
        tipAmtInput.value = 1;
        submitPaymentInfo();
        billAmtInput.value = 22;
        tipAmtInput.value = 3;
        submitPaymentInfo();
        billAmtInput.value = 101;
        tipAmtInput.value = 55;
        submitPaymentInfo();

        expect(sumPaymentTotal('tipAmt')).toEqual(59);
        expect(sumPaymentTotal('billAmt')).toEqual(133);
        expect(sumPaymentTotal('tipPercent')).toEqual(78);
    });

    it("should acurrately calculate tip percentage with calculateTipPercentage", function () {
        expect(calculateTipPercent(10, 1)).toEqual(10);
        expect(calculateTipPercent(131, 39)).toEqual(30);
        expect(calculateTipPercent(12, -22)).toEqual(-183);
    });

    it("should append a td to the end of a given tr with appentTd", function() {
        let newTr = document.createElement('tr');
        newTr.setAttribute('id', 'brocoli');
        appendTd(newTr, "mustard");

        expect(newTr.childElementCount).toEqual(1);
        expect(newTr.firstChild.innerText).toEqual('mustard');

        newTr.remove();
    })

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