<?php
class TrackingApi{
	public function __construct(){
	}
	function index(){
		echo json_encode(["trackings"=>Tracking::all()]);
	}
	function pagination($data){
		$page=$data["page"];
		$perpage=$data["perpage"];
		echo json_encode(["trackings"=>Tracking::pagination($page,$perpage),"total_records"=>Tracking::count()]);
	}
	function find($data){
		echo json_encode(["tracking"=>Tracking::find($data["id"])]);
	}
	function delete($data){
		Tracking::delete($data["id"]);
		echo json_encode(["success" => "yes"]);
	}
	function save($data,$file=[]){
		$tracking=new Tracking();
		$tracking->name=$data["name"];

		$tracking->save();
		echo json_encode(["success" => "yes"]);
	}
	function update($data,$file=[]){
		$tracking=new Tracking();
		$tracking->id=$data["id"];
		$tracking->name=$data["name"];

		$tracking->update();
		echo json_encode(["success" => "yes"]);
	}
}
?>
