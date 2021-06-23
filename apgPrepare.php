<?php

$host= 'localhost';
$db = 'gis2021';
$user = 'postgres';
$password = '306090120'; // change to your password

try {
	$dsn = "pgsql:host=$host;port=5432;dbname=$db;";
	// make a database connection
	$pdo = new PDO($dsn, $user, $password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
	if ($pdo) {
		echo "Connected to the $db database successfully!";
		$data = $pdo->query("SELECT * FROM utenti")->fetchALL();
	// and somewhere later:
	foreach ($data as $row) {

	    print_r( $row);
	}
		}
} catch (PDOException $e) {
	die($e->getMessage());
} finally {
	$pdo=null;
}

