 <?php 
// echo '<pre>';
//                     session_start();
//                     require_once 'configDB.php';
//                     try {
//                             $dsn = "pgsql:host=$host;port=5432;dbname=$db;";
//                             // make a database connection
//                             $pdo = new PDO($dsn, $user, $password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
//                             if ($pdo) {
//                                 $stmt = $pdo->prepare("SELECT * FROM segnalazioni WHERE email=:email");
//                                 $stmt->bindParam(':email', $_SESSION['email'], PDO::PARAM_STR);
//                                 $stmt->execute();
//                                 $user = $stmt->fetchall(PDO::FETCH_ASSOC);
//                                 print_r($user);
//                             }
//                         } catch (PDOException $e) {
//                             die($e->getMessage());
//                         } finally {
//                             $pdo=null;
//                         }

?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>WFS - GetFeature</title>
    <!-- Pointer events polyfill for old browsers, see https://caniuse.com/#feat=pointer -->
    <script src="https://unpkg.com/elm-pep"></script>
    <!-- The line below is only needed for old environments like Internet Explorer and Android 4.x -->
    <script src="https://cdn.polyfill.io/v3/polyfill.min.js?features=fetch,requestAnimationFrame,Element.prototype.classList,URL,TextDecoder,Number.isInteger"></script>
    <style>
      .map {
        width: 100%;
        height:400px;
      }
    </style>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.5.0/css/ol.css" type="text/css">
  </head>
  <body>
    <script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.5.0/build/ol.js"></script>
    <div id="map" class="map"></div>
    <script src="main.js"></script>
  </body>
</html>