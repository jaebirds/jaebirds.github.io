<?php

// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
\Stripe\Stripe::setApiKey("sk_test_BQokikJOvBiI2HlWgH4olfQ2");

// Token is created using Stripe.js or Checkout!
// Get the payment token submitted by the form:
$token = $_POST['stripeToken'];

// Charge the user's card:
$charge = \Stripe\Charge::create(array(
  "amount" => 1000,
  "currency" => "usd",
  "description" => "Example charge",
  "source" => $token,
));

?>
