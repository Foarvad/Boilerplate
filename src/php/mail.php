<?php

$name = trim(isset($_GET['name']) ? $_GET['name'] : undefined);
$email = trim(isset($_GET['email']) ? $_GET['email'] : undefined);
$subject = trim(isset($_GET['subject']) ? $_GET['subject'] : undefined);
$message = trim(isset($_GET['message']) ? $_GET['message'] : undefined);
$header = $email . "Content-type: text/plain; charset=\"windows-1251\"";

$mailto = "some@gmail.com";
$letter = "Name: " . $name . "\r\nEmail: " . $email . "\r\nSubject: " . $subject . "\r\nMessage: " . $message;

mail($mailto, $subject, $letter, $header);

?>
