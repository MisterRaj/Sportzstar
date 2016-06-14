<?php
include "db.php";

$params = json_decode(file_get_contents('php://input'),true);

$conn = new conn('localhost','root','aspire@123','sportstar');
$conn->getArticle($params['id']);
?>