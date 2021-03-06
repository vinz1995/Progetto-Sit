<?php
// We need to use sessions, so you should always start sessions using the below code.
session_start();
// If the user is not logged in redirect to the login page...
if (isset($_SESSION['loggedin'])) {
      header('Location: home.php');
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

  <link rel="canonical" href="https://getbootstrap.com/docs/5.0/examples/sticky-footer-navbar/">
  <link href="css/sticky-footer-navbar.css" rel="stylesheet">


  <!-- Bootstrap core CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="canonical" href="https://getbootstrap.com/docs/5.0/examples/sticky-footer-navbar/">
  


  <!-- Custom styles for this template -->
  <link href="sticky-footer-navbar.css" rel="stylesheet">
</head>

<body class="d-flex flex-column h-100">

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.5.0/build/ol.js"></script>
<header class="p-2 bg-dark text-white">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"/></svg>
        </a>
        <ul class="nav col-12 col-lg-auto col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><a href="home.php" class="nav-link px-1 text-white">Home</a></li>
        </ul>

        <div class="text-end">
          <ul class="nav col-12 col-lg-auto me-lg-auto mb-1 justify-content-center mb-md-0">
            <li> <a href="profilo.php" class="nav-link px-2 text-white"><?php echo $_SESSION['nome'].' '.$_SESSION['cognome'];?></a></li>
           <li> <a class="btn btn-outline-light me-2" href="register.php" role="button">Registrati</a></li>
          </ul>
        </div>
      </div>
    </div>
</header>

  <!-- Begin page content -->
  <main class="flex-shrink-0 ">
    <div class="form-signin">
      <form method="POST" action="authenticate.php">
        <img class="mb-4" src="img/sublogo_3.png" alt="" width="300" height="150">
        <h1 class="h3 mb-3 fw-normal">
          <?php 
          if (isset($_SESSION['RegistrazioneRiuscita'])) {
               echo $_SESSION['RegistrazioneRiuscita'];
               session_destroy();
          }
          else{
           echo 'Please sign in';
          }
          ?>
            
        </h1>
        <div class="form-floating">
          <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" name="email" required>
          <label for="floatingInput">Email address</label>
          <!-- <small id="passwordHelpInline" class="text-muted ">
      Must be 8-20 characters long.
    </small> -->
        </div>
        <div class="form-floating">
          <input type="password" class="form-control" id="floatingPassword" placeholder="Password" name="password" required>
          <label for="floatingPassword">Password</label>
        </div>
        <div class="container">
          <small class="text-muted ">
          <?php  
            echo $_SESSION['erroreEmail']; 
            session_destroy();
          ?>
        </small>
        </div>
        <!-- <span><?php  
            echo $_SESSION['erroreEmail']; 
            session_destroy();
          ?></span> -->
        <button class="w-100 btn btn-lg btn-primary" type="submit" name="SignIn">Sign in</button>
      </form>

      <form method="POST" action="register.php">
        <button class="w-100 btn btn-primary" type="submit" name="SignUp">Sign Up</button>
      </form>
    </div>
  </main>


  <footer class="footer mt-auto py-3 bg-dark">
    <div class="container text-center">
      <span class="text-white">Place sticky footer content here.</span>
    </div>
  </footer>

</body>

</html>