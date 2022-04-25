<?php
$to = "theenglish.post1@gmail.com";
$subject = "ЗАБОР ".$_POST['sort']." ".$_POST['city'];
$message = $_POST['phone']." "."\r\n"  ;
if(trim(!empty($_POST['length']))){
    $message .= " Длина: ".$_POST['length']." "."\r\n" ;
}
if(trim(!empty($_POST['height']))){
    $message .= " Высота: ".$_POST['height']." "."\r\n" ;
}
if(trim(!empty($_POST['gates']))){
    $message .= " Ворот: ".$_POST['gates']." "."\r\n" ;
}
if(trim(!empty($_POST['gate']))){
    $message .= " Калиток: ".$_POST['gate']." "."\r\n" ;
}
if(trim(!empty($_POST['message']))){
    $message .= " Вопрос клиента: ".$_POST['message']." "."\r\n" ;
}
if(trim(!empty($_POST['policy']))){
    $message .= " Согласен на передачу данных: ".$_POST['policy']." "."\r\n" ;
}
$from = "user@mail.com";
$headers = "From: $from";
mail($to,$subject,$message,$headers);
echo "Mail Sent.";
?>
