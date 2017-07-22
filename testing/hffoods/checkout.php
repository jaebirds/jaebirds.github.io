<?php

require_once('assets/stripe-php-5.0.0/init.php');

\Stripe\Stripe::setApiKey("sk_test_DZm953EMI0EiNkKy4ixkUeXk");

$token = $_POST['stripeToken'];

$amount = $_POST['amount'];

$name = trim($_POST['name']);
$email = trim($_POST['email']);
$phone = trim($_POST['phone']);
$address = trim($_POST['address']);
$user_info = array("Name" => $name, "Phone #" => $phone, "Email" => $email, "Address" => $address);

$amount = $_POST['amount'];

$charge = \Stripe\Charge::create(array(
  "amount" => $amount,
  "currency" => "cad",
  "description" => "Example charge",
  "source" => $token,
  "receipt_email" => $email,
  "metadata" => $user_info
));

header("Location: checkout-complete.html");
die();

?>
