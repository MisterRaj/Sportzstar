<?php
include "db.php";
$fields = array("title", "content", "id");
$select_fields = "";

$conn = new conn('localhost','root','root','sportzstar');
$conn->getArticle($select_fields);
?>