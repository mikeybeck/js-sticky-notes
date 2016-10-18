<?php

// Error reporting
error_reporting(E_ALL^E_NOTICE);

require "../connect.php";

// Validating the input data:
if(!is_numeric($_GET['id']))
die("0");

// Escaping:
$id = (int)$_GET['id'];

// Delete note:
mysqli_query($link, "DELETE FROM notes WHERE id=".$id);

?>