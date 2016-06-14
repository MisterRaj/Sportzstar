<?php
include "db.php";

function addQuotes($key, $val){
	return '"'.$val.'"';
}

$tmp_name="";
$fields = $_POST;
$error = 0;

if(isset($_FILES['file']['error']) & $_FILES['file']['error'] === 0){
	$tmp_name = $_FILES["file"]["tmp_name"];
    $name = $_FILES["file"]["name"];
    
	if(move_uploaded_file($tmp_name, "/var/www/uploads/".$name)){
		echo "Success";
	}
	else
		echo "file not uploaded";
} else {
	$error = 1;
}

if($tmp_name != "" & $error === 0){
	$fields['image'] = $name;
	$fields['author_id'] = 3175;
}

foreach ($fields as $key=>$val){
	$fields[$key]="`".$val."`";
}

$conn = new conn('localhost','root','root','sportzstar');
$values = implode(",", array_values($fields));
$conn->addArticles($values);

?>
