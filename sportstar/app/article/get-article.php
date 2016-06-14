<?php
include "db.php";

$params = json_decode(file_get_contents('php://input'),true);

$conn = new conn('localhost','root','root','sportzstar');
$conn->getArticle($params['id']);
?>