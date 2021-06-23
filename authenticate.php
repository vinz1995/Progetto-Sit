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

		/*$sql = "SELECT * FROM utenti WHERE email = ? AND password = ?";

		$sth = $pdo->prepare($sql);
		$sth->execute(array($_POST['email'], $_POST['password']));
		$result = $sth->fetchAll();

			print_r($result);
		*/
		$stmt = $pdo->prepare("SELECT * FROM utenti WHERE email=?");
		$stmt->execute([$_POST['email']]); 
		$user = $stmt->fetch();
		print_r($user);
		}
} catch (PDOException $e) {
	die($e->getMessage());
} finally {
	$pdo=null;
}
