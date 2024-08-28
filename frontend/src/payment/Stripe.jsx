import * as React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_123');
const ClientSecret = "sk_test_51Oj2rRSGMq0PhwYkyYNYBZJxo4QPPD11JFlI0W7kUSf8v6jfE6tgZlFHOgrtXqZ0yj7N9gjeuBy4SFUSTKQ7nhvr006xEVOhXF"
const Stripe = (data) => {
//   const fetchClientSecret = useCallback(() => {
//     return fetch(`${URI}/api/user/addPlan`, {
//       method: "POST",
//     })
//       .then((res) => res.json())
//       .then((data) => data.clientSecret);
//   }, []);

  const options = {ClientSecret};

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}

export default Stripe