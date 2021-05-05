import React from 'react'
import { AmplifyAuthenticator } from '@aws-amplify/ui-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "../components/CheckoutForm";

const Checkout = () => {
    const stripePromise = loadStripe('pk_test_51InY48IfL8LIl5eQ1bydEqqmOcYtBSI13jxGq7RcqRCz9sy95WxHZuNlm6P6DnVys1UIyPXqZso7M7QSvTveUSxJ00MvnqwW5v');

    return (
        <section className="checkout-wrapper">
            <AmplifyAuthenticator>
                <Elements stripe={stripePromise}>
                    <section>
        
                        <h2>Time to Checkout?</h2>

                        <CheckoutForm />
                    </section>
                </Elements>
            </AmplifyAuthenticator>
        </section>
    )
}

export default Checkout
