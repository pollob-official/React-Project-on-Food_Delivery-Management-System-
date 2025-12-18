<?php
class Restaurant extends Model implements JsonSerializable{
	public $id;
	public $user_id;
	public $name;
	public $description;
	public $phone;
	public $address;
	public $open_hours;
	public $is_active;
	public $created_at;

	public function __construct(){
	}
	public function set($id,$user_id,$name,$description,$phone,$address,$open_hours,$is_active,$created_at){
		$this->id=$id;
		$this->user_id=$user_id;
		$this->name=$name;
		$this->description=$description;
		$this->phone=$phone;
		$this->address=$address;
		$this->open_hours=$open_hours;
		$this->is_active=$is_active;
		$this->created_at=$created_at;

	}
	public function save(){
		global $db,$tx;
		$db->query("insert into {$tx}restaurants(user_id,name,description,phone,address,open_hours,is_active,created_at)values('$this->user_id','$this->name','$this->description','$this->phone','$this->address','$this->open_hours','$this->is_active','$this->created_at')");
		return $db->insert_id;
	}
	public function update(){
		global $db,$tx;
		$db->query("update {$tx}restaurants set user_id='$this->user_id',name='$this->name',description='$this->description',phone='$this->phone',address='$this->address',open_hours='$this->open_hours',is_active='$this->is_active',created_at='$this->created_at' where id='$this->id'");
	}
	public static function delete($id){
		global $db,$tx;
		$db->query("delete from {$tx}restaurants where id={$id}");
	}
	public function jsonSerialize():mixed{
		return get_object_vars($this);
	}
	public static function all(){
		global $db,$tx;
		$result=$db->query("select id,user_id,name,description,phone,address,open_hours,is_active,created_at from {$tx}restaurants");
		$data=[];
		while($restaurant=$result->fetch_object()){
			$data[]=$restaurant;
		}
			return $data;
	}
	public static function pagination($page=1,$perpage=10,$criteria=""){
		global $db,$tx;
		$top=($page-1)*$perpage;
		$result=$db->query("select id,user_id,name,description,phone,address,open_hours,is_active,created_at from {$tx}restaurants $criteria limit $top,$perpage");
		$data=[];
		while($restaurant=$result->fetch_object()){
			$data[]=$restaurant;
		}
			return $data;
	}
	public static function count($criteria=""){
		global $db,$tx;
		$result =$db->query("select count(*) from {$tx}restaurants $criteria");
		list($count)=$result->fetch_row();
			return $count;
	}
	public static function find($id){
		global $db,$tx;
		$result =$db->query("select id,user_id,name,description,phone,address,open_hours,is_active,created_at from {$tx}restaurants where id='$id'");
		$restaurant=$result->fetch_object();
			return $restaurant;
	}
	
	static function get_last_id(){
		global $db,$tx;
		$result =$db->query("select max(id) last_id from {$tx}restaurants");
		$restaurant =$result->fetch_object();
		return $restaurant->last_id;
	}
	public function json(){
		return json_encode($this);
	}
	public function __toString(){
		return "		Id:$this->id<br> 
		User Id:$this->user_id<br> 
		Name:$this->name<br> 
		Description:$this->description<br> 
		Phone:$this->phone<br> 
		Address:$this->address<br> 
		Open Hours:$this->open_hours<br> 
		Is Active:$this->is_active<br> 
		Created At:$this->created_at<br> 
";
	}

	//-------------HTML----------//

	static function html_select($name="cmbRestaurant"){
		global $db,$tx;
		$html="<select id='$name' name='$name' class=\"form-select\">  ";
		$result =$db->query("select id,name from {$tx}restaurants");
		while($restaurant=$result->fetch_object()){
			$html.="<option value ='$restaurant->id'>$restaurant->name</option>";
		}
		$html.="</select>";
		return $html;
	}
	static function html_table($page = 1,$perpage = 10,$criteria="",$action=true){
		global $db,$tx,$base_url;
		$count_result =$db->query("select count(*) total from {$tx}restaurants $criteria ");
		list($total_rows)=$count_result->fetch_row();
		$total_pages = ceil($total_rows /$perpage);
		$top = ($page - 1)*$perpage;
		$result=$db->query("select id,user_id,name,description,phone,address,open_hours,is_active,created_at from {$tx}restaurants $criteria limit $top,$perpage");
		$html="<table class='table'>";
			$html.="<tr><th colspan='3'>".Html::link(["class"=>"btn btn-success","route"=>"restaurant/create","text"=>"New Restaurant"])."</th></tr>";
		if($action){
			$html.="<tr><th>Id</th><th>User Id</th><th>Name</th><th>Phone</th><th>Address</th><th>Open Hours</th><th>Is Active</th><th>Action</th></tr>";
		}else{
			$html.="<tr><th>Id</th><th>User Id</th><th>Name</th><th>Phone</th><th>Address</th><th>Open Hours</th><th>Is Active</th></tr>";
		}
		while($restaurant=$result->fetch_object()){
			$action_buttons = "";
			if($action){
				$action_buttons = "<td><div class='btn-group' style='display:flex;'>";
				$action_buttons.= Event::button(["name"=>"show", "value"=>"Show", "class"=>"btn btn-info", "route"=>"restaurant/show/$restaurant->id"]);
				$action_buttons.= Event::button(["name"=>"edit", "value"=>"Edit", "class"=>"btn btn-primary", "route"=>"restaurant/edit/$restaurant->id"]);
				$action_buttons.= Event::button(["name"=>"delete", "value"=>"Delete", "class"=>"btn btn-danger", "route"=>"restaurant/confirm/$restaurant->id"]);
				$action_buttons.= "</div></td>";
			}
			$html.="<tr><td>$restaurant->id</td><td>$restaurant->user_id</td><td>$restaurant->name</td><td>$restaurant->phone</td><td>$restaurant->address</td><td>$restaurant->open_hours</td><td>$restaurant->is_active</td> $action_buttons</tr>";
		}
		$html.="</table>";
		$html.= pagination($page,$total_pages);
		return $html;
	}
	static function html_row_details($id){
		global $db,$tx,$base_url;
		$result =$db->query("select id,user_id,name,description,phone,address,open_hours,is_active,created_at from {$tx}restaurants where id={$id}");
		$restaurant=$result->fetch_object();
		$html="<table class='table'>";
		$html.="<tr><th colspan=\"2\">Restaurant Show</th></tr>";
		$html.="<tr><th>Id</th><td>$restaurant->id</td></tr>";
		$html.="<tr><th>User Id</th><td>$restaurant->user_id</td></tr>";
		$html.="<tr><th>Name</th><td>$restaurant->name</td></tr>";
		$html.="<tr><th>Description</th><td>$restaurant->description</td></tr>";
		$html.="<tr><th>Phone</th><td>$restaurant->phone</td></tr>";
		$html.="<tr><th>Address</th><td>$restaurant->address</td></tr>";
		$html.="<tr><th>Open Hours</th><td>$restaurant->open_hours</td></tr>";
		$html.="<tr><th>Is Active</th><td>$restaurant->is_active</td></tr>";
		$html.="<tr><th>Created At</th><td>$restaurant->created_at</td></tr>";

		$html.="</table>";
		return $html;
	}
}
?>
