

<?php
// We need to use sessions, so you should always start sessions using the below code.
session_start();
// If the user is not logged in redirect to the login page...
if (!isset($_SESSION['loggedin'])) {
    header('Location: index.html');
    exit;
}
?>

<!doctype html>
<html lang="en" class="h-100">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
    <meta name="generator" content="Hugo 0.83.1">
    <title>Sticky Footer Navbar Template · Bootstrap v5.0</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="canonical" href="https://getbootstrap.com/docs/5.0/examples/sticky-footer-navbar/">



    <!-- Bootstrap core CSS -->
    
    <style>
      .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }
    </style>


    <!-- Custom styles for this template -->
    <link href="css/sticky-footer-navbar.css" rel="stylesheet">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.5.0/css/ol.css" type="text/css">
    <!-- <script src="https://unpkg.com/elm-pep"></script> -->
    <style>
      .map {
        height: 400px;
        width: 100%;
      }
    </style>
    
    <title>OpenLayers example</title>
  </head>
  <body class="d-flex flex-column h-100">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.5.0/build/ol.js"></script>

<header class="p-1 bg-dark text-white">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"/></svg>
        </a>
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-1 justify-content-center mb-md-0">
          <li><a href="#" class="nav-link px-2 text-secondary">Home</a></li>
          <li><a href="#" class="nav-link px-2 text-white">Features</a></li>
          <li><a href="#" class="nav-link px-2 text-white">Pricing</a></li>
          <li><a href="#" class="nav-link px-2 text-white">FAQs</a></li>
          <li><a href="#" class="nav-link px-2 text-white">About</a></li>
        </ul>
        <div class="text-end">
          <strong class="me-2"><?php echo $_SESSION['nome'].' '.$_SESSION['cognome'];?></strong>

          <a class="btn btn-outline-light me-2" href="logout.php" role="button">Esci</a>

        </div>
      </div>
    </div>
  </header>



<!-- Begin page content -->
<main class="flex-shrink-0">
  <div class="container">
    <div class="container mt-1">
      <div class="row row-cols-lg-2 row-cols-md-2 row-cols-sm-1 row-cols-1">
        <div class="col mt-1">
          <h3>utente</h3>
     <!--  echo $_COOKIE['profile_viewer_uid'];  -->

            <form>
                    <div class="form-floating">
                  <input type="text" class="form-control" id="lat" >
                  <label for="floatingPassword">lat</label>
                </div>
                <div class="form-floating">
                  <input type="text" class="form-control" id="lon" >
                  <label for="floatingPassword">lon</label>
                </div>
            </form>
      </div>
    <div class="col mt-1">
  <div id="map" class="map"></div>
  <div id="info" style="display: none;"></div>
    <label for="track">
      track position
      <input id="track" type="checkbox"/>
    </label>
    <p>
      position accuracy : <code id="accuracy"></code>&nbsp;&nbsp;
      <!-- altitude accuracy : <code id="altitudeAccuracy"></code>&nbsp;&nbsp;
      heading : <code id="heading"></code>&nbsp;&nbsp;
      speed : <code id="speed"></code> -->
    </p>
    <script src="mappaConPosizione.js"></script>
    
    </div>
    
  </div>
</div>
</main>

<footer class="footer mt-auto py-3 bg-light">
  <div class="container text-center">
    <span class="text-muted f-ce" >Place sticky footer content here.</span>
  </div>
   <h1 class="visually-hidden">Sidebars examples</h1>


</footer>

  </body>
</html>
