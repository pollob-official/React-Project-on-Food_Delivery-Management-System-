<?php
class UserApi{
	public function __construct(){
	}
	function index(){
		echo json_encode(["users"=>User::all()]);
	}
	function pagination($data){
		$page=$data["page"];
		$perpage=$data["perpage"];
		echo json_encode(["users"=>User::pagination($page,$perpage),"total_records"=>User::count()]);
	}
	function find($data){
		echo json_encode(["user"=>User::find($data["id"])]);
	}
	function delete($data){
		User::delete($data["id"]);
		echo json_encode(["success" => "yes"]);
	}
	function save($data,$file=[]){
		$data=$data['user'];
		$user=new User();
		$user->email=$data["email"];
		$user->phone=$data["phone"];
		 $user->password_hash = password_hash($data["password_hash"], PASSWORD_BCRYPT);
		$user->role_id=$data["role_id"] ?? 4;
		$user->name=$data["name"];
		$user->created_at=$data["created_at"];
		$user->updated_at=$data["updated_at"];

		$user->save();
		echo json_encode(["success" => $data]);
	}
	function update($data,$file=[]){
		$user = new User();
		$user->id = $data["userid"];
		$user->email = $data["email"];
		$user->phone = $data["phone"];
		// $user->password_hash = $data["password_hash"] ?? ;
		$user->role_id = $data["role_id"];
		$user->name = $data["name"];
		$user->created_at = $data["created_at"];
		$user->updated_at = $data["updated_at"];
		$user->update();
		echo json_encode(["success" =>"yes"]);
}

	}

?>


