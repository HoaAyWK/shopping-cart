var stripe = Stripe('pk_test_51JNerUA5N5of65pzSCQbaazNoZtgjQJhU9aPfdGEqP8wXaQzFPmgiPsvkw46hHGXr5BC5cfJby8YVBAO65ifyMUO00fYccTgE3');

var elements = stripe.elements();

var style = {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        fontFamily: 'Arial, sans-serif',
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    };
var card = elements.create('card', { style: style });
card.mount('#card-element');

card.on("change", function (event) {
      // Disable the Pay button if there are no card details in the Element
      document.querySelector("button").disabled = event.empty;
      document.querySelector("#card-error").textContent = event.error ? event.error.message : "";
    });
var form = document.getElementById("checkout-form");

var stripeTokenHandler = token => {
    var hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('value', token.id);
    form.appendChild(hiddenInput);

    console.log(form)
    form.submit();
}

form.addEventListener('submit', event => {
    event.preventDefault();
    stripe.createToken(card).then(result => {
        if (result.error) errorEl.textContent = res.error.message;
        else {
            console.log(result.token)
            stripeTokenHandler(result.token);
        }
    });
});