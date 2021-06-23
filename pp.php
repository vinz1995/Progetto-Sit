<?php

$db = pg_connect("host=localhost port=5432 dbname=gis2021 user=postgres password=306090120");

$result = pg_query($db, "SELECT * FROM tabella_spaziale") or die('connection failed');
$row = pg_fetch_assoc($result);
print_r($row)

?>