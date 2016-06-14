<?php
include "db.php";
$fields = array("title", "content", "id");
$select_fields = "";

$conn = new conn('localhost','root','aspire@123','sportstar');
$conn->getArticle($select_fields);
?>