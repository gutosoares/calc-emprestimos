function calculate() {
    //pesquisa os elementos de entrada e saída no documento
    var amount = document.getElementById("amount");
    var apr = document.getElementById("apr");
    var years = document.getElementById("years");
    var zipcode = document.getElementById("zipcode");
    var payment = document.getElementById("payment");
    var total = document.getElementById("total");
    var totalinterest = document.getElementById("totalinterest");

    //Converte os juros de porcentagem para decimais e converte de taxa anual para mensal
    //Converte o período de pagamentos em anos para o número de pagamentos mensais
    var principal = parseFloat(amount.value);
    var interest = parseFloat(apr.value) / 100 / 12;
    var payments = parseFloat(years.value) * 12;

    //Calcula o valor do pagamento mensal
    var x = Math.pow(1 + interest, payments);
    var monthly = (principal * x * interest) / (x - 1);

    //Valores corretos
    if(isFinite(monthly)) {
        //Preenche os campos de saída, arredondando para 2 casas decimais
        payment.innerHTML = monthly.toFixed(2);
        total.innerHTML = (monthly * payments).toFixed(2);
        totalinterest.innerHTML = ((monthly * payments) - principal).toFixed(2);

        //Salva a entrada do usuário para ser usada posteriormente
        save(amount.value, apr.value, years.value, zipcode.value);

        try {
            getLenders(amount.value, apr.value, years.value, zipcode.value);
        }

        catch(e) {
            chart(principal, interest, monthly, payments);
        }
    }

    //Valores incorretos
    else {
        payment.innerHTML = "";
        total.innerHTML = "";
        totalinterest.innerHTML = "";
        chart();
    }

    //Salva a entrada do usuário. Esse recurso não ira funcionar em alguns navegadores
    function save(amount, apr, years, zipcode) {
        if(window.localStorage) {
            localStorage.loan_amount = amount;
            localStorage.loan_apr = apr;
            localStorage.loan_years = years;
            localStorage.loan_zipcode = zipcode;
        }
    }

    //Tenta restaurar os campos de entrada automaticamente quando o documento é carregado pela primeira vez
    window.onload = function() {
        if(window.localStorage && localStorage.loan_amount) {
            document.getElementById("amount").value = localStorage.loan_amount;
            document.getElementById("apr").value = localStorage.loan_apr;
            document.getElementById("years").value = localStorage.loan_years;
            document.getElementById("zipcode").value = localStorage.loan_zipcode;
        }
    };








}
