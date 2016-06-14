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
			$sql = "INSERT INTO `sportstar`.`article` (`title`, `category`, `content`, `status`, `image`, `author_id` ) VALUES (".$fields.")";
			
			if($this->connection->query($sql) === TRUE){
				echo "Record created successfully";
			} else {
				echo "Record not created";
			}
		}
	}

	public function updateArticle($fields=array()){
		if(!empty($fields)){
			$sql = "UPDATE `sportstar`.`article` ";
			foreach($fields as $key=>$value){
				$sql.=" `".$key."` = "." `".$value."`,";
			}
			$sql = substr($sql,0,strlen($sql)-1);
			$sql.=" where id =".$fields['id'];
			
			if($this->connection->query($sql) === TRUE){
				echo "Record updated successfully";
			} else {
				echo "Record not updated";
			}
		}
	}	

	public function getArticles($fields=""){
		if($fields!=""){
			$fields = substr($fields, 0, strlen($fields)-1);
			$sql = "SELECT ".$fields." FROM `sportstar`.`article`";
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

	public function getArticle($id=""){
		if($id!=""){
			$sql = "SELECT * FROM `sportstar`.`article` where id = ".$id;
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