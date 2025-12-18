<?php
class Order extends Model implements JsonSerializable
{
	public $id;
	public $customer_id;
	public $rider_id;
	public $restaurant_id;
	public $delivery_address;
	public $total_amount;
	public $delivery_fee;
	public $tax_amount;
	public $coupon_id;
	public $tracking_id;
	public $payment_status;
	public $created_at;
	public $updated_at;
	public $version;

	public function __construct() {}
	public function set($id, $customer_id, $rider_id, $restaurant_id, $delivery_address, $total_amount, $delivery_fee, $tax_amount, $coupon_id, $tracking_id, $payment_status, $created_at, $updated_at, $version)
	{
		$this->id = $id;
		$this->customer_id = $customer_id;
		$this->rider_id = $rider_id;
		$this->restaurant_id = $restaurant_id;
		$this->delivery_address = $delivery_address;
		$this->total_amount = $total_amount;
		$this->delivery_fee = $delivery_fee;
		$this->tax_amount = $tax_amount;
		$this->coupon_id = $coupon_id;
		$this->tracking_id = $tracking_id;
		$this->payment_status = $payment_status;
		$this->created_at = $created_at;
		$this->updated_at = $updated_at;
		$this->version = $version;
	}
	public function save()
	{
		global $db, $tx;
		$db->query("insert into {$tx}Orders(customer_id,rider_id,restaurant_id,delivery_address,total_amount,delivery_fee,tax_amount,coupon_id,tracking_id,payment_status,created_at,updated_at,version)values('$this->customer_id','$this->rider_id','$this->restaurant_id','$this->delivery_address','$this->total_amount','$this->delivery_fee','$this->tax_amount','$this->coupon_id','$this->tracking_id','$this->payment_status','$this->created_at','$this->updated_at','$this->version')");
		return $db->insert_id;
	}
	public function update()
	{
		global $db, $tx;
		$db->query("update {$tx}Orders set customer_id='$this->customer_id',rider_id='$this->rider_id',restaurant_id='$this->restaurant_id',delivery_address='$this->delivery_address',total_amount='$this->total_amount',delivery_fee='$this->delivery_fee',tax_amount='$this->tax_amount',coupon_id='$this->coupon_id',tracking_id='$this->tracking_id',payment_status='$this->payment_status',created_at='$this->created_at',updated_at='$this->updated_at',version='$this->version' where id='$this->id'");
	}
	public function update_by_tracking_id()
	{
		global $db, $tx;
		$db->query("update {$tx}Orders set tracking_id='$this->tracking_id' where id='$this->id'");
	}
	public function update_by_rider_id()
	{
		global $db, $tx;
		$db->query("update {$tx}Orders set rider_id='$this->rider_id' where id='$this->id'");
	}
	public static function delete($id)
	{
		global $db, $tx;
		$db->query("delete from {$tx}Orders where id={$id}");
	}
	public function jsonSerialize(): mixed
	{
		return get_object_vars($this);
	}
	public static function all()
	{
		global $db, $tx;
		$result = $db->query("select id,customer_id,rider_id,restaurant_id,delivery_address,total_amount,delivery_fee,tax_amount,coupon_id,tracking_id,payment_status,created_at,updated_at,version from {$tx}Orders");
		$data = [];
		while ($order = $result->fetch_object()) {
			$data[] = $order;
		}
		return $data;
	}
	public static function find_by_rider_id($id, $tracking_id="" )
	{
		global $db, $tx;
		$data = [];
		if ($tracking_id != "") {
			$result = $db->query("select id,customer_id,rider_id,restaurant_id,delivery_address,total_amount,delivery_fee,tax_amount,coupon_id,tracking_id,payment_status,created_at,updated_at,version from {$tx}Orders where rider_id=$id and tracking_id=$tracking_id");
	
			while ($order = $result->fetch_object()) {
				$data[] = $order;
			}
		} else {
			$result = $db->query("select id,customer_id,rider_id,restaurant_id,delivery_address,total_amount,delivery_fee,tax_amount,coupon_id,tracking_id,payment_status,created_at,updated_at,version from {$tx}Orders where rider_id=$id ");
	
			while ($order = $result->fetch_object()) {
				$data[] = $order;
			}
		}

		return $data;
	}

	public static function find_order_by_restuarant_id($id){
		global $db,$tx;
		$result =$db->query("select id,customer_id,rider_id,restaurant_id,delivery_address,total_amount,delivery_fee,tax_amount,coupon_id,tracking_id,payment_status,created_at,updated_at,version from {$tx}Orders where restaurant_id='$id' and tracking_id != 11 ");
		$data=[];
		while($restaurant=$result->fetch_object()){
			$data[]=$restaurant;
		}
			return $data;
		
	}
	public static function pagination($page = 1, $perpage = 10, $criteria = "")
	{
		global $db, $tx;
		$top = ($page - 1) * $perpage;
		$result = $db->query("select id,customer_id,rider_id,restaurant_id,delivery_address,total_amount,delivery_fee,tax_amount,coupon_id,tracking_id,payment_status,created_at,updated_at,version from {$tx}Orders $criteria limit $top,$perpage");
		$data = [];
		while ($order = $result->fetch_object()) {
			$data[] = $order;
		}
		return $data;
	}
	public static function count($criteria = "")
	{
		global $db, $tx;
		$result = $db->query("select count(*) from {$tx}Orders $criteria");
		list($count) = $result->fetch_row();
		return $count;
	}
	public static function find($id)
	{
		global $db, $tx;
		$result = $db->query("select id,customer_id,rider_id,restaurant_id,delivery_address,total_amount,delivery_fee,tax_amount,coupon_id,tracking_id,payment_status,created_at,updated_at,version from {$tx}Orders where id='$id'");
		$order = $result->fetch_object();
		return $order;
	}
	public static function total_order()
	{
		global $db, $tx;
		$result = $db->query("select sum(total_amount) as total_amount from {$tx}Orders");
		$order = $result->fetch_object();
		return $order;
	}
	public static function pending_order()
	{
		global $db, $tx;
		$result = $db->query("select count(*) from {$tx}Orders where tracking_id=1");
		list($count) = $result->fetch_row();
		return $count;
	}
	static function get_last_id()
	{
		global $db, $tx;
		$result = $db->query("select max(id) last_id from {$tx}Orders");
		$order = $result->fetch_object();
		return $order->last_id;
	}
	public function json()
	{
		return json_encode($this);
	}
	public function __toString()
	{
		return "		Id:$this->id<br> 
		Customer Id:$this->customer_id<br> 
		Rider Id:$this->rider_id<br> 
		Restaurant Id:$this->restaurant_id<br> 
		Delivery Address:$this->delivery_address<br> 
		Total Amount:$this->total_amount<br> 
		Delivery Fee:$this->delivery_fee<br> 
		Tax Amount:$this->tax_amount<br> 
		Coupon Id:$this->coupon_id<br> 
		Tracking Id:$this->tracking_id<br> 
		Payment Status:$this->payment_status<br> 
		Created At:$this->created_at<br> 
		Updated At:$this->updated_at<br> 
		Version:$this->version<br> 
";
	}

	//-------------HTML----------//

	static function html_select($name = "cmbOrder")
	{
		global $db, $tx;
		$html = "<select id='$name' name='$name'> ";
		$result = $db->query("select id,name from {$tx}Orders");
		while ($order = $result->fetch_object()) {
			$html .= "<option value ='$order->id'>$order->name</option>";
		}
		$html .= "</select>";
		return $html;
	}
	static function html_table($page = 1, $perpage = 10, $criteria = "", $action = true)
	{
		global $db, $tx, $base_url;
		$count_result = $db->query("select count(*) total from {$tx}Orders $criteria ");
		list($total_rows) = $count_result->fetch_row();
		$total_pages = ceil($total_rows / $perpage);
		$top = ($page - 1) * $perpage;
		$result = $db->query("select id,customer_id,rider_id,restaurant_id,delivery_address,total_amount,delivery_fee,tax_amount,coupon_id,tracking_id,payment_status,created_at,updated_at,version from {$tx}Orders order by id desc $criteria limit $top,$perpage");
		$html = "<table class='table'>";
		$html .= "<tr><th colspan='3'>" . Html::link(["class" => "btn btn-success", "route" => "order/create", "text" => "New Order"]) . "</th></tr>";
		if ($action) {
			$html .= "<tr><th>Id</th><th>Customer Id</th><th>Rider Id</th><th>Restaurant Id</th><th>Delivery Address</th><th>Total Amount</th><th>Delivery Fee</th><th>Tax Amount</th><th>Tracking Id</th><th>Payment Status</th><th>Action</th></tr>";
		} else {
			$html .= "<tr><th>Id</th><th>Customer Id</th><th>Rider Id</th><th>Restaurant Id</th><th>Delivery Address</th><th>Total Amount</th><th>Delivery Fee</th><th>Tax Amount</th><th>Tracking Id</th><th>Payment Status</th></tr>";
		}
		while ($order = $result->fetch_object()) {
			$action_buttons = "";
			$payment_status=Tracking::find($order->tracking_id);
			if ($action) {
				$action_buttons = "<td><div class='btn-group' style='display:flex;'>";
				$action_buttons .= Event::button(["name" => "show", "value" => "Show", "class" => "btn btn-info", "route" => "order/show/$order->id"]);
				$action_buttons .= Event::button(["name" => "edit", "value" => "Edit", "class" => "btn btn-primary", "route" => "order/edit/$order->id"]);
				$action_buttons .= Event::button(["name" => "delete", "value" => "Delete", "class" => "btn btn-danger", "route" => "order/confirm/$order->id"]);
				$action_buttons .= "</div></td>";
			}
			$html .= "<tr><td>$order->id</td><td>$order->customer_id</td><td>$order->rider_id</td><td>$order->restaurant_id</td><td>$order->delivery_address</td><td>$order->total_amount</td><td>$order->delivery_fee</td><td>$order->tax_amount</td><td>$order->tracking_id</td><td>	$payment_status->name</td> $action_buttons</tr>";
		}
		$html .= "</table>";
		$html .= pagination($page, $total_pages);
		return $html;
	}
	static function html_row_details($id)
	{
		global $db, $tx, $base_url;
		$result = $db->query("select id,customer_id,rider_id,restaurant_id,delivery_address,total_amount,delivery_fee,tax_amount,coupon_id,tracking_id,payment_status,created_at,updated_at,version from {$tx}Orders where id={$id}");
		$order = $result->fetch_object();
		$html = "<table class='table'>";
		$html .= "<tr><th colspan=\"2\">Order Show</th></tr>";
		$html .= "<tr><th>Id</th><td>$order->id</td></tr>";
		$html .= "<tr><th>Customer Id</th><td>$order->customer_id</td></tr>";
		$html .= "<tr><th>Rider Id</th><td>$order->rider_id</td></tr>";
		$html .= "<tr><th>Restaurant Id</th><td>$order->restaurant_id</td></tr>";
		$html .= "<tr><th>Delivery Address</th><td>$order->delivery_address</td></tr>";
		$html .= "<tr><th>Total Amount</th><td>$order->total_amount</td></tr>";
		$html .= "<tr><th>Delivery Fee</th><td>$order->delivery_fee</td></tr>";
		$html .= "<tr><th>Tax Amount</th><td>$order->tax_amount</td></tr>";
		$html .= "<tr><th>Coupon Id</th><td>$order->coupon_id</td></tr>";
		$html .= "<tr><th>Tracking Id</th><td>$order->tracking_id</td></tr>";
		$html .= "<tr><th>Payment Status</th><td>$order->payment_status</td></tr>";
		$html .= "<tr><th>Created At</th><td>$order->created_at</td></tr>";
		$html .= "<tr><th>Updated At</th><td>$order->updated_at</td></tr>";
		$html .= "<tr><th>Version</th><td>$order->version</td></tr>";

		$html .= "</table>";
		return $html;
	}
}
