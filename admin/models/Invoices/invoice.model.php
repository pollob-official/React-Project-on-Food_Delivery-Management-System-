<?php
class Invoice extends Model implements JsonSerializable{
	public $id;
	public $order_id;
	public $customer_id;
	public $restaurant_id;
	public $total_amount;
	public $tax_amount;
	public $discount_amount;
	public $grand_total;
	public $payment_method;
	public $payment_status;
	public $created_at;
	public $updated_at;

	public function __construct(){
	}
	public function set($id,$order_id,$customer_id,$restaurant_id,$total_amount,$tax_amount,$discount_amount,$grand_total,$payment_method,$payment_status,$created_at,$updated_at){
		$this->id=$id;
		$this->order_id=$order_id;
		$this->customer_id=$customer_id;
		$this->restaurant_id=$restaurant_id;
		$this->total_amount=$total_amount;
		$this->tax_amount=$tax_amount;
		$this->discount_amount=$discount_amount;
		$this->grand_total=$grand_total;
		$this->payment_method=$payment_method;
		$this->payment_status=$payment_status;
		$this->created_at=$created_at;
		$this->updated_at=$updated_at;

	}
	public function save(){
		global $db,$tx;
		$db->query("insert into {$tx}invoices(order_id,customer_id,restaurant_id,total_amount,tax_amount,discount_amount,grand_total,payment_method,payment_status,created_at,updated_at)values('$this->order_id','$this->customer_id','$this->restaurant_id','$this->total_amount','$this->tax_amount','$this->discount_amount','$this->grand_total','$this->payment_method','$this->payment_status','$this->created_at','$this->updated_at')");
		return $db->insert_id;
	}
	public function update(){
		global $db,$tx;
		$db->query("update {$tx}invoices set order_id='$this->order_id',customer_id='$this->customer_id',restaurant_id='$this->restaurant_id',total_amount='$this->total_amount',tax_amount='$this->tax_amount',discount_amount='$this->discount_amount',grand_total='$this->grand_total',payment_method='$this->payment_method',payment_status='$this->payment_status',created_at='$this->created_at',updated_at='$this->updated_at' where id='$this->id'");
	}
	public static function delete($id){
		global $db,$tx;
		$db->query("delete from {$tx}invoices where id={$id}");
	}
	public function jsonSerialize():mixed{
		return get_object_vars($this);
	}
	public static function all(){
		global $db,$tx;
		$result=$db->query("select id,order_id,customer_id,restaurant_id,total_amount,tax_amount,discount_amount,grand_total,payment_method,payment_status,created_at,updated_at from {$tx}invoices");
		$data=[];
		while($invoice=$result->fetch_object()){
			$data[]=$invoice;
		}
			return $data;
	}
	public static function pagination($page=1,$perpage=10,$criteria=""){
		global $db,$tx;
		$top=($page-1)*$perpage;
		$result=$db->query("select id,order_id,customer_id,restaurant_id,total_amount,tax_amount,discount_amount,grand_total,payment_method,payment_status,created_at,updated_at from {$tx}invoices $criteria limit $top,$perpage");
		$data=[];
		while($invoice=$result->fetch_object()){
			$data[]=$invoice;
		}
			return $data;
	}
	public static function count($criteria=""){
		global $db,$tx;
		$result =$db->query("select count(*) from {$tx}invoices $criteria");
		list($count)=$result->fetch_row();
			return $count;
	}
	public static function find($id){
		global $db,$tx;
		$result =$db->query("select id,order_id,customer_id,restaurant_id,total_amount,tax_amount,discount_amount,grand_total,payment_method,payment_status,created_at,updated_at from {$tx}invoices where id='$id'");
		$invoice=$result->fetch_object();
			return $invoice;
	}
	static function get_last_id(){
		global $db,$tx;
		$result =$db->query("select max(id) last_id from {$tx}invoices");
		$invoice =$result->fetch_object();
		return $invoice->last_id;
	}
	public function json(){
		return json_encode($this);
	}
	public function __toString(){
		return "		Id:$this->id<br> 
		Order Id:$this->order_id<br> 
		Customer Id:$this->customer_id<br> 
		Restaurant Id:$this->restaurant_id<br> 
		Total Amount:$this->total_amount<br> 
		Tax Amount:$this->tax_amount<br> 
		Discount Amount:$this->discount_amount<br> 
		Grand Total:$this->grand_total<br> 
		Payment Method:$this->payment_method<br> 
		Payment Status:$this->payment_status<br> 
		Created At:$this->created_at<br> 
		Updated At:$this->updated_at<br> 
";
	}

	//-------------HTML----------//

	static function html_select($name="cmbInvoice"){
		global $db,$tx;
		$html="<select id='$name' name='$name'> ";
		$result =$db->query("select id,name from {$tx}invoices");
		while($invoice=$result->fetch_object()){
			$html.="<option value ='$invoice->id'>$invoice->name</option>";
		}
		$html.="</select>";
		return $html;
	}
	static function html_table($page = 1,$perpage = 10,$criteria="",$action=true){
		global $db,$tx,$base_url;
		$count_result =$db->query("select count(*) total from {$tx}invoices $criteria ");
		list($total_rows)=$count_result->fetch_row();
		$total_pages = ceil($total_rows /$perpage);
		$top = ($page - 1)*$perpage;
		$result=$db->query("select id,order_id,customer_id,restaurant_id,total_amount,tax_amount,discount_amount,grand_total,payment_method,payment_status,created_at,updated_at from {$tx}invoices $criteria limit $top,$perpage");
		$html="<table class='table'>";
			$html.="<tr><th colspan='3'>".Html::link(["class"=>"btn btn-success","route"=>"invoice/create","text"=>"New Invoice"])."</th></tr>";
		if($action){
			$html.="<tr><th>Id</th><th>Order Id</th><th>Customer Id</th><th>Restaurant Id</th><th>Total Amount</th><th>Tax Amount</th><th>Discount Amount</th><th>Grand Total</th><th>Payment Method</th><th>Payment Status</th><th>Created At</th><th>Updated At</th><th>Action</th></tr>";
		}else{
			$html.="<tr><th>Id</th><th>Order Id</th><th>Customer Id</th><th>Restaurant Id</th><th>Total Amount</th><th>Tax Amount</th><th>Discount Amount</th><th>Grand Total</th><th>Payment Method</th><th>Payment Status</th><th>Created At</th><th>Updated At</th></tr>";
		}
		while($invoice=$result->fetch_object()){
			$action_buttons = "";
			if($action){
				$action_buttons = "<td><div class='btn-group' style='display:flex;'>";
				$action_buttons.= Event::button(["name"=>"show", "value"=>"Show", "class"=>"btn btn-info", "route"=>"invoice/show/$invoice->id"]);
				$action_buttons.= Event::button(["name"=>"edit", "value"=>"Edit", "class"=>"btn btn-primary", "route"=>"invoice/edit/$invoice->id"]);
				$action_buttons.= Event::button(["name"=>"delete", "value"=>"Delete", "class"=>"btn btn-danger", "route"=>"invoice/confirm/$invoice->id"]);
				$action_buttons.= "</div></td>";
			}
			$html.="<tr><td>$invoice->id</td><td>$invoice->order_id</td><td>$invoice->customer_id</td><td>$invoice->restaurant_id</td><td>$invoice->total_amount</td><td>$invoice->tax_amount</td><td>$invoice->discount_amount</td><td>$invoice->grand_total</td><td>$invoice->payment_method</td><td>$invoice->payment_status</td><td>$invoice->created_at</td><td>$invoice->updated_at</td> $action_buttons</tr>";
		}
		$html.="</table>";
		$html.= pagination($page,$total_pages);
		return $html;
	}
	static function html_row_details($id){
		global $db,$tx,$base_url;
		$result =$db->query("select id,order_id,customer_id,restaurant_id,total_amount,tax_amount,discount_amount,grand_total,payment_method,payment_status,created_at,updated_at from {$tx}invoices where id={$id}");
		$invoice=$result->fetch_object();
		$html="<table class='table'>";
		$html.="<tr><th colspan=\"2\">Invoice Show</th></tr>";
		$html.="<tr><th>Id</th><td>$invoice->id</td></tr>";
		$html.="<tr><th>Order Id</th><td>$invoice->order_id</td></tr>";
		$html.="<tr><th>Customer Id</th><td>$invoice->customer_id</td></tr>";
		$html.="<tr><th>Restaurant Id</th><td>$invoice->restaurant_id</td></tr>";
		$html.="<tr><th>Total Amount</th><td>$invoice->total_amount</td></tr>";
		$html.="<tr><th>Tax Amount</th><td>$invoice->tax_amount</td></tr>";
		$html.="<tr><th>Discount Amount</th><td>$invoice->discount_amount</td></tr>";
		$html.="<tr><th>Grand Total</th><td>$invoice->grand_total</td></tr>";
		$html.="<tr><th>Payment Method</th><td>$invoice->payment_method</td></tr>";
		$html.="<tr><th>Payment Status</th><td>$invoice->payment_status</td></tr>";
		$html.="<tr><th>Created At</th><td>$invoice->created_at</td></tr>";
		$html.="<tr><th>Updated At</th><td>$invoice->updated_at</td></tr>";

		$html.="</table>";
		return $html;
	}
}
?>
