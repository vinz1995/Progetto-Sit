<?php
session_start();
$host= 'localhost';
$db = 'gis2021';
$user = 'postgres';
$password = '306090120'; // change to your password
// Now we check if the data was submitted, isset() function will check if the data exists.
// if (!isset($_POST['username'], $_POST['password'], $_POST['email'])) {
// 	// Could not get the data that should have been sent.
// 	exit('Please complete the registration form!');
// }
// // Make sure the submitted registration values are not empty.
// if (empty($_POST['username']) || empty($_POST['password']) || empty($_POST['email'])) {
// 	// One or more values are empty.
// 	exit('Please complete the registration form');
// }

try {
	$dsn = "pgsql:host=$host;port=5432;dbname=$db;";
	// make a database connection
	$pdo = new PDO($dsn, $user, $password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
	if ($pdo) {
		echo "Connected to the $db database successfully!";
		$stmt = $pdo->prepare("SELECT email FROM utenti WHERE email=:email");
		$stmt->bindParam(':email', $_POST['email'], PDO::PARAM_STR);

		$stmt->execute(); 
		//non serve non voglio leg i res del DB
		// $stmt->bindColumn('email', $email);// restituita
		
		// $user = $stmt->fetch(PDO::FETCH_ASSOC);
		// echo $email;

		
		if ($stmt->rowCount()>0) {
			echo 'email exists, please choose another!';

		}
		else{
			//insert
			
		}


		}
} catch (PDOException $e) {
	die($e->getMessage());
} finally {
	$pdo=null;
}

?>