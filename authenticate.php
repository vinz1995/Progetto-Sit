<?php
session_start();
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
		$stmt = $pdo->prepare("SELECT password, email, cognome, nome FROM utenti WHERE email=:email");
		$stmt->bindParam(':email', $_POST['email'], PDO::PARAM_STR);
		$stmt->execute(); 
		$stmt->bindColumn('password', $password);
		$stmt->bindColumn('email', $email);
		$stmt->bindColumn('nome', $nome);
		$stmt->bindColumn('cognome', $cognome);
		
		$user = $stmt->fetch();
		// echo $_POST['password'];
		// echo $password;
		// if ($_POST['password'] === $password) {
		// 	// code...
		// 	echo "ok";
		// }
		// else{
		// 	echo 'no';
		// }
		if ($_POST['password'] === $password) {
			session_regenerate_id();
			$_SESSION['loggedin'] = TRUE;
			$_SESSION['nome'] = $nome;
			$_SESSION['cognome']=$cognome;
			$_SESSION['email']=$email;
			$_SESSION['id'] = session_id();
			//$_SESSION['id'] = $id;
			header('Location: home.php');
		}
		else{
			echo 'email o password sbagliate';
		}

		}
} catch (PDOException $e) {
	die($e->getMessage());
} finally {
	$pdo=null;
}
