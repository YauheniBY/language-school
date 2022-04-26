<?php
$to = "client@gmail.com";
$subject = "Заявка - Курсы английского ".$_POST['sort']." ".$_POST['city'];
$message = $_POST['phone']." "."\r\n"  ;
$from = "user@mail.com";
$headers = "From: $from";
mail($to,$subject,$message,$headers);
echo "Mail Sent.";
?>
