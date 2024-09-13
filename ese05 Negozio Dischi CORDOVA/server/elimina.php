<?php


header('Content-type: application/json; charset=utf-8');
require("mysqli.php");


if(isset($_REQUEST["id"]))
	$id = $_REQUEST["id"];
else{
	http_response_code(400);
	die ("Parametro mancante ID");
}

$con = openConnection();
$sql = "delete FROM dischi where id=$id";  
$data = eseguiQuery($con,$sql);

http_response_code(200);  
echo(json_encode($data));

/*
 echo('{"ris":"ok"}');
 $ris = array("ris"=>$data);
 echo(json_encode($ris));
*/

$con->close();	

?>