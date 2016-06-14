<?php
include "db.php";
$fields = array("title", "content", "id");
$select_fields = "";


foreach ($fields as $key=>$val){
	$select_fields.=$val.",";
}
$conn = new conn('localhost','root','root','sportzstar');
$conn->getArticles($select_fields);
?>