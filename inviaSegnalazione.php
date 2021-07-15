<?php
session_start();
require_once 'configDB.php';
echo $_POST['lat'];
echo $_POST['lon'];
echo $_POST['dimensioneBuca'];
echo $_POST['descrizione'];
echo date("d/m/y");
echo $_SESSION['nome'];
echo $_POST['Cfeatures'];
// echo sizeof($_POST['Cfeature']);
// $target_dir = "/Applications/XAMPP/xamppfiles/htdocs/SitoSit/fileup/";
// $target_file = $target_dir . basename($_FILES["fileCaricato"]["name"]);
// $uploadOk = 1;
// $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
// // Check if image file is a actual image or fake image
// if(isset($_POST["inviaSegnalazione"])) {
//   $check = getimagesize($_FILES["fileCaricato"]["tmp_name"]);
//   if($check !== false) {
//     echo "File is an image - " . $check["mime"] . ".";
//     $uploadOk = 1;
//   } else {
//     echo "File is not an image.";
//     $uploadOk = 0;
//   }
// }

$uploaddir = '/Applications/XAMPP/xamppfiles/htdocs/SitoSit/fileup/';
$uploadfile = $uploaddir . basename($_FILES['fileCaricato']['name']);

echo '<pre>';
if (move_uploaded_file($_FILES['fileCaricato']['tmp_name'], $uploadfile)) {
    echo "File is valid, and was successfully uploaded.\n";
} else {
    echo "Possible file upload attack!\n";
}

echo 'Here is some more debugging info:';
print_r($_FILES);

print "</pre>";

try {
    $dsn = "pgsql:host=$host;port=5432;dbname=$db;";
    // make a database connection
    $pdo = new PDO($dsn, $user, $password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    if ($pdo) {
        $stmt = $pdo->prepare("INSERT INTO segnal (email, descrizione, geometry, dim, data ) VALUES (:email, :descrizione, :geometry, :dim, :data)");
        $stmt->bindParam(':email', $_SESSION['email'], PDO::PARAM_STR);
        $stmt->bindParam(':descrizione', $_POST['descrizione'], PDO::PARAM_STR);
        $stmt->bindParam(':dim', $_POST['dimensioneBuca'], PDO::PARAM_STR);
        $stmt->bindParam(':geometry', $_POST['Cfeatures'], PDO::PARAM_STR);
        $stmt->bindParam(':data', date("d/m/y"), PDO::PARAM_STR);
        $stmt->execute();
        $_SESSION['RegistrazioneRiuscita']='Complimenti ti sei registrato adesso puoi accedere';
        
    }
} catch (PDOException $e) {
    die($e->getMessage());
} finally {
    $pdo=null;
}



?>