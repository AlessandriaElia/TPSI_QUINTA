<?php

require("mysqli.php");
header('Content-type: application/json; charset=utf-8');
$con = openConnection();

// id
if(isset($_REQUEST["id"]))
	$id = $_REQUEST["id"];
else{
	http_response_code(400);
	die ("Parametro mancante ID");
}

// autore
if(isset($_REQUEST["autore"]))
	$autore = $con->real_escape_string($_REQUEST["autore"]);
else{
	http_response_code(400);
	die ("Parametro mancante autore");
}

// titolo
if(isset($_REQUEST["titolo"]))
	$titolo = $_REQUEST["titolo"];
else{
	http_response_code(400);
	die ("Parametro mancante titolo");
}

// anno
if(isset($_REQUEST["anno"]))
	$anno = intval($_REQUEST["anno"]);
else{
	http_response_code(400);
	die ("Parametro mancante anno");
}


$sql = "update dischi SET autore='$autore', titolo='$titolo', anno=$anno WHERE id = $id";
// anche senza real_escape_string si potrebbe fare una cosa del tipo
$sql = "update dischi SET autore=\"$autore\", titolo=\"$titolo\", anno=$anno WHERE id = $id";

$data = eseguiQuery($con,$sql);

http_response_code(200);  
echo(json_encode($data));

$con->close();	

?>