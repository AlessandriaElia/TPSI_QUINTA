<?php

header('Content-type: application/json; charset=utf-8');
require("mysqli.php");


$con = openConnection();
$sql = "SELECT * FROM dischi";  
$data = eseguiQuery($con, $sql);

// se NON ci sono dati, fetch_all restituisce un vettore enumerativo vuoto.
// PERFETTO !!!!
http_response_code(200);  
echo(json_encode($data));
// echo(json_encode($data[0]['autore']));

$con->close();	

?>