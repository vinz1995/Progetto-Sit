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
	}
} catch (PDOException $e) {
	die($e->getMessage());
} /*finally {
	if ($pdo) {
		$pdo = null;
	}
}*/

$data = $pdo->query("SELECT * FROM tabella_spaziale")->fetchAll();
// and somewhere later:
foreach ($data as $row) {
	echo 'ok';
    print_r( $row)."<br />\n";
}