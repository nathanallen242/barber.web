<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

$name = $_POST['client_name'];
$email = $_POST['client_email'];
$subject = $_POST['client_subject'];
$message = $_POST['client_message'];

if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    echo 'Please fill in all fields.';
} else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo 'Invalid email format.';
} else {
    // Create email message
    $emailMessage = "Name: " . $name . "\nEmail: " . $email . "\nSubject: " . $subject . "\nMessage: " . $message;
    $headers = "From: " . $email . "\r\n";
    $to = "nathan.noel.allen@gmail.com"; // Company email address
    $emailSubject = "New Contact Form Submission";

    if (mail($to, $emailSubject, $emailMessage, $headers)) {
        echo "Email sent successfully!";
    } else {
        echo "Error sending email.";
    }
}

?>

