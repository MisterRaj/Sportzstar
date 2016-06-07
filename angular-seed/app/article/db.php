<?php
class conn{
	public $connection = "";
	public function __construct($host="",$username="",$password="",$db){
		if($host!="" && $username!="" && $password!=""){
			$this->connection = new mysqli($host,$username,$password,$db);
		}
	}
	public function addArticles($fields=""){
		if($fields!=""){
			$sql = "INSERT INTO `sportzstar`.`article` (`title`, `category`, `content`, `status`, `image`, `author_id`, ) VALUES (".$fields.")";
			echo $sql;exit;
			if($this->connection->query($sql) === TRUE){
				echo "Record created successfully";
			} else {
				echo "Record not created";
			}
		}
	}
}
?>