<?php
error_reporting ( error_reporting () & ~ E_NOTICE );
date_default_timezone_set('Etc/UTC');
require 'phpmailer/PHPMailerAutoload.php';
class Cotizacion {

	private static $connection;
	private static $logger;
	function __construct($db) {
		self::$connection = $db->getConnection ( 'dsd' );
		
	}
	function fetch() {
		if (isset ( self::$connection )) {
			return self::execute_sel ();
		} else {
			return array ();
		}
	}
	private function execute_sel($prepareStatement, $arrayString) {
		try {
			$stmt = self::$connection->prepare ($prepareStatement, $arrayString );
			$stmt->execute ( array () );
			return $stmt->fetchAll ( PDO::FETCH_ASSOC );
		} catch ( PDOException $e ) {
			//self::$logger->error ("File: customers_db.php;	Method Name: execute_sel();	Functionality: Select Customers;	Log:" . $e->getMessage () );
		}
	}
	private function execute_ins($prepareStatement, $arrayString) {
		try {
			$stmt = self::$connection->prepare ( $prepareStatement );
			$stmt->execute ( $arrayString );
			$lastid = self::$connection->lastInsertId ();
			return $lastid;
		} catch ( PDOException $e ) {
			self::$logger->error ("File: customers_db.php;	Method Name: execute_ins();	Functionality: Insert/ Update Customeres;	Log:" . $e->getMessage () );
		}
	}
	function insert($prepareStatement, $arrayString) {
		
		return $result = self::execute_ins ( $prepareStatement, $arrayString );
		
	}
	function select($prepareStatement, $arrayString) {
		 
		return $result = self::execute_sel ( $prepareStatement, $arrayString );

		 
	}

}

include 'DBConnection.php';
$cotizacion = new Cotizacion ( $db );


$tipo = $_GET["tipo"];
$cat = $_GET["cat"];
$carritocompras = $_GET["cotizacion"];


if($tipo == 'cotizar') {



}

if($tipo == 'catalogo') {

	$sql = "Select catalogo.id,catalogo.nombre,catalogo.descripcion,catalogo.precio,tipos.id categoria_id,catalogo.imagen,tipos.nombre nombre_cat 
from catalogo,tipos where catalogo.categoria_id = tipos.id and tipos.nombre like '$cat' ";
	$rows = $cotizacion->select($sql,array());

	echo json_encode($rows);
}

if($tipo == 'sendMail') {

    $total = 0;
    $cotiza = "<h2>Saludos ".$_GET["nombre"]."</h2>";
    $cotiza .= "<p>Recibimos tu Solicitud para un evento el dia ".$_GET["fecha"]."</p>";
            
    $cotiza .= "<table class='table'>";

    foreach($_GET["cotizacion"] as $data) {
        
        $cotiza .= "<tr><td>".$data['nombre']."</td><td>".$data['cantidad']."</td><td>".$data['costo']."</td><td>";
        $total = $total + $data['costo'];
    }
    
    $cotiza .= "<tr><td></td><td>Total:</td><td>".$total."</td>";
    $cotiza .= "</table>";

    //Create a new PHPMailer instance
    $mail = new PHPMailer;
    //Tell PHPMailer to use SMTP
    $mail->isSMTP();
    $mail->SMTPDebug = 2;
    $mail->Debugoutput = 'html';
    $mail->Host = "smtp.gmail.com";
    $mail->SMTPSecure = 'tls';
    //Set the SMTP port number - likely to be 25, 465 or 587
    $mail->Port = 587;
    $mail->Mailer = 'gmail';
    //Whether to use SMTP authentication
    $mail->SMTPAuth = true;

    //Username to use for SMTP authentication
    $mail->Username = "mauricio.deleon.c13@gmail.com";
    //Password to use for SMTP authentication
    $mail->Password = "mauri130199";
    //Set who the message is to be sent from
    $mail->setFrom('ventas@madnesseventos.com', 'Madness Eventos');
    //Set an alternative reply-to address
    //$mail->addReplyTo('soporte@agricolanyr.com', 'First Last');
    //Set who the message is to be sent to 
    $mail->addAddress($_GET["email"], $_GET["nombre"]);
    //Set the subject line
    $mail->Subject = 'Cotizacion Madness '. date('Y-m-d H:i:s');
    //Read an HTML message body from an external file, convert referenced images to embedded,
    //convert HTML into a basic plain-text alternative body
    //$mail->msgHTML(file_get_contents('contents.html'), dirname(__FILE__));
    //Replace the plain text body with one created manually
    $mail->Body = $cotiza;
    //Attach an image file
    //$mail->AddStringAttachment($archivo,'Asistencias'.date('Y-m-d H:i:s').'.txt');
    //send the message, check for errors
    if (!$mail->send()) {
        echo "Error Envio de Cotizacion por Correo: " . $mail->ErrorInfo;
    } else {
        echo "Gracias la cotizacion fue enviada  por Correo!";
    }

     
}


?>