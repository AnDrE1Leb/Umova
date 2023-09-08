<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';
    require 'phpmailer/src/SMTP.php';

    $mail = new PHPMailer(true);
    $mail->Charset = 'UTF-8';
    $mail->setLanguage('en', 'phpmailer/language/');
    $mail->IsHTML(true);

    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'and01web@gmail.com';
    $mail->Password = 'tbsmvmvyqrvojysx';
    $mail->Port = '587';
    $mail->SMTPSecure = 'TLS';

    $mail->setFrom('and01web@gmail.com', 'Andrei Lebediev test');

    $mail->addAddress($_POST['mail']);

    $mail->Subject = 'E-mail from Andrei!';

    $body = '<h1>Hi! It`s Andrei Lebediev</h1>';

    if(trim(!empty($_POST['name']))){
        $body .= "<p>Name: ".$_POST['name']."</p>";
    }
    if(trim(!empty($_POST['mail']))){
        $body .= "<p>E-mail: ".$_POST['mail']."</p>";
    }
    if(trim(!empty($_POST['phone']))){
        $body .= "<p>Phone: ".$_POST['phone']."</p>";
    }
    if(trim(!empty($_POST['password']))){
        $body .= "<p>Password: ".$_POST['password']."</p>";
    }
    if(trim(!empty($_POST['city']))){
        $body .= "<p>City: ".$_POST['city']."</p>";
    }


    $mail->Body = $body;


    $mail->send();
    $mail->smtpClose();


?>