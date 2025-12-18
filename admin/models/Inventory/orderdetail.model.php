<?php
class OrderDetail extends Model implements JsonSerializable{
	public $id;
	public $order_id;
	public $menu_item_id;
	public $qty;
	public $unit_price;
	public $total_price;
	public $notes;
	public $created_at;

	public function __construct(){
	}
	public function set($id,$order_id,$menu_item_id,$qty,$unit_price,$total_price,$notes,$created_at){
		$this->id=$id;
		$this->order_id=$order_id;
		$this->menu_item_id=$menu_item_id;
		$this->qty=$qty;
		$this->unit_price=$unit_price;
		$this->total_price=$total_price;
		$this->notes=$notes;
		$this->created_at=$created_at;

	}
	public function save(){
		global $db,$tx;
		$db->query("insert into {$tx}order_details(order_id,menu_item_id,qty,unit_price,total_price,notes,created_at)values('$this->order_id','$this->menu_item_id','$this->qty','$this->unit_price','$this->total_price','$this->notes','$this->created_at')");
		return $db->insert_id;
	}
	public function update(){
		global $db,$tx;
		$db->query("update {$tx}order_details set order_id='$this->order_id',menu_item_id='$this->menu_item_id',qty='$this->qty',unit_price='$this->unit_price',total_price='$this->total_price',notes='$this->notes',created_at='$this->created_at' where id='$this->id'");
	}
	public static function delete($id){
		global $db,$tx;
		$db->query("delete from {$tx}order_details where id={$id}");
	}
	public function jsonSerialize():mixed{
		return get_object_vars($this);
	}
	public static function all(){
		global $db,$tx;
		$result=$db->query("select id,order_id,menu_item_id,qty,unit_price,total_price,notes,created_at from {$tx}order_details");
		$data=[];
		while($orderdetail=$result->fetch_object()){
			$data[]=$orderdetail;
		}
			return $data;
	}
	public static function all_by_order_id($id){
		global $db,$tx;
		$result=$db->query("select mi.name item_name, od.id,od.order_id,od.menu_item_id,od.qty,od.unit_price,od.total_price,od.notes,od.created_at from {$tx}order_details od, {$tx}menu_items mi  where order_id='$id' and od.menu_item_id = mi.id ");
		$data=[];
		while($orderdetail=$result->fetch_object()){
			$data[]=$orderdetail;
		}
			return $data;
	}
	public static function pagination($page=1,$perpage=10,$criteria=""){
		global $db,$tx;
		$top=($page-1)*$perpage;
		$result=$db->query("select id,order_id,menu_item_id,qty,unit_price,total_price,notes,created_at from {$tx}order_details $criteria limit $top,$perpage");
		$data=[];
		while($orderdetail=$result->fetch_object()){
			$data[]=$orderdetail;
		}
			return $data;
	}
	public static function count($criteria=""){
		global $db,$tx;
		$result =$db->query("select count(*) from {$tx}order_details $criteria");
		list($count)=$result->fetch_row();
			return $count;
	}
	public static function find($id){
		global $db,$tx;
		$result =$db->query("select id,order_id,menu_item_id,qty,unit_price,total_price,notes,created_at from {$tx}order_details where id='$id'");
		$orderdetail=$result->fetch_object();
			return $orderdetail;
	}
	static function get_last_id(){
		global $db,$tx;
		$result =$db->query("select max(id) last_id from {$tx}order_details");
		$orderdetail =$result->fetch_object();
		return $orderdetail->last_id;
	}
	public function json(){
		return json_encode($this);
	}
	public function __toString(){
		return "		Id:$this->id<br> 
		Order Id:$this->order_id<br> 
		Menu Item Id:$this->menu_item_id<br> 
		Qty:$this->qty<br> 
		Unit Price:$this->unit_price<br> 
		Total Price:$this->total_price<br> 
		Notes:$this->notes<br> 
		Created At:$this->created_at<br> 
";
	}

	//-------------HTML----------//

	static function html_select($name="cmbOrderDetail"){
		global $db,$tx;
		$html="<select id='$name' name='$name'> ";
		$result =$db->query("select id,name from {$tx}order_details");
		while($orderdetail=$result->fetch_object()){
			$html.="<option value ='$orderdetail->id'>$orderdetail->name</option>";
		}
		$html.="</select>";
		return $html;
	}
	static function html_table($page = 1,$perpage = 10,$criteria="",$action=true){
		global $db,$tx,$base_url;
		$count_result =$db->query("select count(*) total from {$tx}order_details $criteria ");
		list($total_rows)=$count_result->fetch_row();
		$total_pages = ceil($total_rows /$perpage);
		$top = ($page - 1)*$perpage;
		$result=$db->query("select id,order_id,menu_item_id,qty,unit_price,total_price,notes,created_at from {$tx}order_details $criteria limit $top,$perpage");
		$html="<table class='table'>";
			$html.="<tr><th colspan='3'>".Html::link(["class"=>"btn btn-success","route"=>"orderdetail/create","text"=>"New OrderDetail"])."</th></tr>";
		if($action){
			$html.="<tr><th>Id</th><th>Order Id</th><th>Menu Item Id</th><th>Qty</th><th>Unit Price</th><th>Total Price</th><th>Notes</th><th>Created At</th><th>Action</th></tr>";
		}else{
			$html.="<tr><th>Id</th><th>Order Id</th><th>Menu Item Id</th><th>Qty</th><th>Unit Price</th><th>Total Price</th><th>Notes</th><th>Created At</th></tr>";
		}
		while($orderdetail=$result->fetch_object()){
			$action_buttons = "";
			if($action){
				$action_buttons = "<td><div class='btn-group' style='display:flex;'>";
				$action_buttons.= Event::button(["name"=>"show", "value"=>"Show", "class"=>"btn btn-info", "route"=>"orderdetail/show/$orderdetail->id"]);
				$action_buttons.= Event::button(["name"=>"edit", "value"=>"Edit", "class"=>"btn btn-primary", "route"=>"orderdetail/edit/$orderdetail->id"]);
				$action_buttons.= Event::button(["name"=>"delete", "value"=>"Delete", "class"=>"btn btn-danger", "route"=>"orderdetail/confirm/$orderdetail->id"]);
				$action_buttons.= "</div></td>";
			}
			$html.="<tr><td>$orderdetail->id</td><td>$orderdetail->order_id</td><td>$orderdetail->menu_item_id</td><td>$orderdetail->qty</td><td>$orderdetail->unit_price</td><td>$orderdetail->total_price</td><td>$orderdetail->notes</td><td>$orderdetail->created_at</td> $action_buttons</tr>";
		}
		$html.="</table>";
		$html.= pagination($page,$total_pages);
		return $html;
	}
	static function html_row_details($id){
		global $db,$tx,$base_url;
		$result =$db->query("select id,order_id,menu_item_id,qty,unit_price,total_price,notes,created_at from {$tx}order_details where id={$id}");
		$orderdetail=$result->fetch_object();
		$html="<table class='table'>";
		$html.="<tr><th colspan=\"2\">OrderDetail Show</th></tr>";
		$html.="<tr><th>Id</th><td>$orderdetail->id</td></tr>";
		$html.="<tr><th>Order Id</th><td>$orderdetail->order_id</td></tr>";
		$html.="<tr><th>Menu Item Id</th><td>$orderdetail->menu_item_id</td></tr>";
		$html.="<tr><th>Qty</th><td>$orderdetail->qty</td></tr>";
		$html.="<tr><th>Unit Price</th><td>$orderdetail->unit_price</td></tr>";
		$html.="<tr><th>Total Price</th><td>$orderdetail->total_price</td></tr>";
		$html.="<tr><th>Notes</th><td>$orderdetail->notes</td></tr>";
		$html.="<tr><th>Created At</th><td>$orderdetail->created_at</td></tr>";

		$html.="</table>";
		return $html;
	}
}
?>
