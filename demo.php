<!DOCTYPE html>
<?php

// Error reporting:
error_reporting(E_ALL^E_NOTICE);

// Including the DB connection file:
require 'connect.php';

// Removing notes that are older than an hour:
mysql_query("DELETE FROM notes WHERE id>3 AND dt<SUBTIME(NOW(),'0 1:0:0')");

$query = mysql_query("SELECT * FROM notes ORDER BY id DESC");

$notes = '';
$left='';
$top='';
$zindex='';

while($row=mysql_fetch_assoc($query))
{
	// The xyz column holds the position and z-index in the form 200x100x10:
	list($left,$top,$zindex) = explode('x',$row['xyz']);

	$notes.= '
	<div class="note '.$row['color'].'" style="left:'.$left.'px;top:'.$top.'px;z-index:'.$zindex.'">
		'.htmlspecialchars($row['text']).'
		<div class="author">'.htmlspecialchars($row['name']).'</div>
		<span class="data">'.$row['id'].'</span>
		<a href="'.$row['id'].'" class="trash">Trash</a>
	</div>';
}

?>


<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Sticky Notes With AJAX, PHP &amp; jQuery | Tutorialzine demo</title>

<link rel="stylesheet" type="text/css" href="styles.css" />
<link rel="stylesheet" href="fancybox/source/jquery.fancybox.css?v=2.1.5" type="text/css" media="screen" />

<script type="text/javascript" src="https://code.jquery.com/jquery-3.0.0.js"></script>
<script type="text/javascript" src="https://code.jquery.com/jquery-migrate-3.0.0.js"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
<script type="text/javascript" src="fancybox/source/jquery.fancybox.pack.js?v=2.1.5"></script>

<script type="text/javascript" src="script.js"></script>

</head>

<body>

<h1>Sticky Notes With AJAX, PHP &amp; jQuery</h1>
<h2>Go back <a href="http://tutorialzine.com/2010/01/sticky-notes-ajax-php-jquery/">to the tutorial &raquo;</a></h2>


<div id="main">
	<a id="addButton" class="green-button fancybox.ajax" href="add_note.html">Add a note</a>
    
	<?php echo $notes ?>
    
</div>

<p class="tutInfo">This is a tutorialzine demo. View the <a href="http://tutorialzine.com/2010/01/sticky-notes-ajax-php-jquery/">original tutorial</a>, or download the <a href="demo.zip">source files</a>.</p>


</body>
</html>
