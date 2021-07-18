<?php
// We need to use sessions, so you should always start sessions using the below code.
session_start();
require_once 'configDB.php';
// If the user is not logged in redirect to the login page...
if (!isset($_SESSION['loggedin'])) {
    header('Location: index.html');
    exit;
}

                    try {
                            $dsn = "pgsql:host=$host;port=5432;dbname=$db;";
                            // make a database connection
                            $pdo = new PDO($dsn, $user, $password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
                            if ($pdo) {
                                $stmt = $pdo->prepare("SELECT st_astext(geometry) as geomwkt,foto FROM segnalazioni where email=:id");
                                $stmt->bindParam(':id', $_SESSION['email'], PDO::PARAM_STR);
                                $stmt->execute();
                                $stmt->bindColumn('geomwkt', $geomwkt);
                                $stmt->bindColumn('foto', $fotoDB);
                                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                                echo $geomwkt;
                                
                            }
                        } catch (PDOException $e) {
                            die($e->getMessage());
                        } finally {
                            $pdo=null;
                        }

?>

<!-- <?php
// We need to use sessions, so you should always start sessions using the below code.
session_start();
require_once 'configDB.php';

// If the user is not logged in redirect to the login page...
if (!isset($_SESSION['loggedin'])) {
    header('Location: index.html');
    exit;
}

$i='66';
                    try {
                            $dsn = "pgsql:host=$host;port=5432;dbname=$db;";
                            // make a database connection
                            $pdo = new PDO($dsn, $user, $password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
                            if ($pdo) {
                                $stmt = $pdo->prepare("SELECT st_astext(geometry) as geomwkt FROM segnalazioni where id=:id");
                                $stmt->bindParam(':id', $i, PDO::PARAM_STR);
                                $stmt->execute();
                                $stmt->bindColumn('geomwkt', $geomwkt);
                                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                                echo $geomwkt;
                                
                            }
                        } catch (PDOException $e) {
                            die($e->getMessage());
                        } finally {
                            $pdo=null;
                        }

?> -->