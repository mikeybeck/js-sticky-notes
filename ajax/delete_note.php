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
mysql_query("DELETE FROM notes WHERE id=".$id);

?>