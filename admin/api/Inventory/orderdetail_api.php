<?php
class OrderDetailApi{
	public function __construct(){
	}
	function index(){
		echo json_encode(["order_details"=>OrderDetail::all()]);
	}
	function pagination($data){
		$page=$data["page"];
		$perpage=$data["perpage"];
		echo json_encode(["order_details"=>OrderDetail::pagination($page,$perpage),"total_records"=>OrderDetail::count()]);
	}
	function find($data){
		// echo json_encode(["orderdetail"=>OrderDetail::find($data["id"])]);
		echo json_encode(["orderdetail"=>OrderDetail::all_by_order_id($data["id"])]);
	}
	
	function all_by_order_id($data){
		echo json_encode(["orderdetail"=>OrderDetail::all_by_order_id($data["id"])]);
	}
	function delete($data){
		OrderDetail::delete($data["id"]);
		echo json_encode(["success" => "yes"]);
	}
	function save($data,$file=[]){
		$orderdetail=new OrderDetail();
		$orderdetail->qty=$data["qty"];
		$orderdetail->notes=$data["notes"];
		$orderdetail->created_at=$data["created_at"];

		$orderdetail->save();
		echo json_encode(["success" => "yes"]);
	}
	function update($data,$file=[]){
		$orderdetail=new OrderDetail();
		$orderdetail->id=$data["id"];
		$orderdetail->qty=$data["qty"];
		$orderdetail->notes=$data["notes"];
		$orderdetail->created_at=$data["created_at"];

		$orderdetail->update();
		echo json_encode(["success" => "yes"]);
	}
}
?>
