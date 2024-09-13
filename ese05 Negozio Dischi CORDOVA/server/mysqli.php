<?php
     
	function openConnection(){
		define('DBNAME', '4b_dischi');
		define('DBHOST', 'localhost');
		define('DBUSER', 'root');
		define('DBPASS', '');
		mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
		try
		{
			$con = new mysqli(DBHOST, DBUSER, DBPASS, DBNAME);
			$con->set_charset("utf8");
			return $con;
		}
		catch (mysqli_sql_exception $ex)
		{
			http_response_code(503);
			die ("<b>Errore connessione db:</b> " . $ex->getMessage());
		}
	}


	function eseguiQuery($con, $sql){
		try{
			$rs=$con->query($sql);
			if(!is_bool($rs)){
				$data=$rs->fetch_all(MYSQLI_ASSOC);
			}
			else{
				// tutti comandi DML restituiscono true/false
				$data=$rs;
			}
			return $data;			
		}
		catch (mysqli_sql_exception $ex)
		{  
			$con->close();
			http_response_code(500);
			die("<b>Errore esecuzione query:</b> " . $ex->getMessage());
		}
	}	
	
	function checkParam($param){
		if(isset($_REQUEST[$param]))
			return $_REQUEST[$param];
		else{
			http_response_code(400);
			die ("Parametro mancante $param");
		}
	}
?>