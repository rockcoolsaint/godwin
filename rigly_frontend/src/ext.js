      
    var payment_received = false;
    var paywall = document.querySelector('#paywall')
    var charge_id = ''
    var api_key = 'a8445019-8bf7-4d03-ab50-ed4ff8957ae4'; // Replace with your actual API key

    function showSuccessMessage() {
      document.getElementById('paywall').style.display = 'block';

      const myTimeout = setTimeout(showRegisterForm, 3000);
    }

    function hideSuccessMessage() {
      document.getElementById('paywall').style.display = 'none';
    }

    function hidePaywallContent() {
      document.getElementById('content').style.display = 'none';
    }

    function showRegisterForm() {
      hideSuccessMessage();
      hidePaywallContent();
      document.getElementById('register').style.display = 'block';
    }
    
    function hideRegisterForm() {
      document.getElementById('register').style.display = 'none';
    }

    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + api_key,
      },
      body: JSON.stringify({
        amount: 20,
      }),
    };

    if (localStorage.getItem('depositPaid') === 'true') {
      paywall.style.display = 'block';
      hidePaywallContent();
      showRegisterForm();
      hideSuccessMessage()
    } else {
      fetch('https://api.opennode.com/v1/charges', options)
        .then((response) => response.json())
        .then((data) => {
          if (data.data) {
            charge_id = data.data.id;
            // Display the lightning invoice
            document.getElementById('invoice-copy').style.display = 'flex';
            document.getElementById('invoice').innerHTML = data.data.lightning_invoice.payreq;
            //display the qr code
            new window.QRCode(document.getElementById('qrcode'), data.data.lightning_invoice.payreq);
            // Check if the payment was received
            setTimeout(function checkPayment() {
              var checkOptions = {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + api_key,
                },
              };
              fetch(`https://api.opennode.com/v2/charge/${charge_id}`, checkOptions)
                .then((response) => response.json())
                .then((data) => {
                  if (data.data.status == 'paid') {
                    payment_received = true;
                    showSuccessMessage();
                    hidePaywallContent();
                    localStorage.setItem('depositPaid', true);
                  } else {
                    setTimeout(checkPayment, 5000);
                  }
                })
                .catch((error) => console.log(error));
            }, 5000);
          } else {
            console.log('there was an error');
          }
        });
    }

    