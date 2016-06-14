<?php
class conn{
	public $connection = "";
	public function __construct($host="",$username="",$password="",$db){
		if($host!="" && $username!="" && $password!=""){
			$this->connection = new mysqli($host,$username,$password,$db);
		}
	}

	public function addUser($fields=""){
		if($fields!=""){
			$sql = "INSERT INTO `sportstar`.`user` (`name`, `user_name`, `email`, `password`, `phone` ) VALUES (".$fields.")";
			
			if($this->connection->query($sql) === TRUE){
				echo "Record created successfully";
			} else {
				echo "Record not created";
			}
		}
	}

	public function getUsers($fields=""){
		if($fields!=""){
			$fields = substr($fields, 0, strlen($fields)-1);
			$sql = "SELECT ".$fields." FROM `sportstar`.`user`";
			$result = $this->connection->query($sql);
			
			$output = array();
			if ($result->num_rows > 0) {
			    while($row = $result->fetch_assoc()) {
			        $output[] =$row;
			    }
			}
		}
		echo json_encode($output);
	}
}
?>