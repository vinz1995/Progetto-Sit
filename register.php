<?php
session_start();
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
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
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
    <link href="sticky-footer-navbar.css" rel="stylesheet">
  </head>
  <body class="d-flex flex-column h-100">
<header>
  <!-- Fixed navbar -->
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark ">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Fixed navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="index.html">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </li>
        </ul>
        
      </div>
    </div>
  </nav>
</header>

<!-- Begin page content -->
<main class="form-signin">
  <div class="container">
    <form method="POST" action="controlloReg.php">
    <h1 class="h3 mb-3 fw-normal">Registrati</h1>
    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="Inserisci il nome" name="nome" required>
      <label for="floatingInput"  >Nome</label>
    </div>
    <div class="form-floating ">
      <input type="text" class="form-control" id="floatingInput" placeholder="Inserisci il cognome" name="cognome" required>
      <label for="floatingInput">Cognome</label>
    </div>
    <div class="form-floating ">
      <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" name="email" required>
      <label for="floatingInput">Email</label>
    </div>
    <div class="form-floating ">
      <input type="text" class="form-control" id="floatingInput" placeholder="Inserisci il nome" name="codicefiscale" pattern="[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]" required>
      <label for="floatingInput">Codice Fiscale</label>
    </div>
     <div class="form-floating">
      <input type="tel" class="form-control" id="floatingPassword" placeholder="10" name="telefono" pattern="[0-9]{10}" required>
      <label for="floatingPassword">Numero di telefono</label>
    </div>
    <div class="form-floating ">
      <input type="password" class="form-control" id="floatingInput" placeholder="Inserisci il nome" name="password" required>
      <label for="floatingInput">Password</label>
    </div>
    <div class="form-floating ">
      <input type="password" class="form-control" id="floatingInput" placeholder="Inserisci il nome" name="ripetiPassword" required>
      <label for="floatingInput">Ripeti password</label>
    </div>
    <button class="w-100 btn btn-lg btn-primary" type="submit" name="SignIn">Registrati</button>
    <span><?php  echo $_SESSION['erroreEmail']; session_destroy();?></span>
    <span><?php  echo $_SESSION['errorePassword']; session_destroy();?></span>
    <span><?php  echo $_SESSION['erroreCodicefiscale']; session_destroy();?></span>
    </form>
</main>


<footer class="footer mt-auto py-3 bg-light">
  <div class="container text-center">
    <span class="text-muted">Place sticky footer content here.</span>
  </div>
</footer>
      
  </body>
</html>
