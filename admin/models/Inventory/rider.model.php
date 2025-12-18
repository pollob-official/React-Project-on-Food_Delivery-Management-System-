<?php
class Rider extends Model implements JsonSerializable{
	public $id;
	public $name;
	public $vehicle_type;
	public $is_active;
	public $is_available;
	public $password;
	public $photo;
	public $car_number;
	public $car_photo;
	public $mobile;
	public $email;

	public function __construct(){
	}
	public function set($id,$name,$vehicle_type,$is_active,$is_available,$password,$photo,$car_number,$car_photo,$mobile,$email){
		$this->id=$id;
		$this->name=$name;
		$this->vehicle_type=$vehicle_type;
		$this->is_active=$is_active;
		$this->is_available=$is_available;
		$this->password=$password;
		$this->photo=$photo;
		$this->car_number=$car_number;
		$this->car_photo=$car_photo;
		$this->mobile=$mobile;
		$this->email=$email;

	}
	public function save(){
		global $db,$tx;
		$db->query("insert into {$tx}riders(name,vehicle_type,is_active,is_available,password,photo,car_number,car_photo,mobile,email)values('$this->name','$this->vehicle_type','$this->is_active','$this->is_available','$this->password','$this->photo','$this->car_number','$this->car_photo','$this->mobile','$this->email')");
		return $db->insert_id;
	}
	public function update(){
		global $db,$tx;
		$db->query("update {$tx}riders set name='$this->name',vehicle_type='$this->vehicle_type',is_active='$this->is_active',is_available='$this->is_available',password='$this->password',photo='$this->photo',car_number='$this->car_number',car_photo='$this->car_photo',mobile='$this->mobile',email='$this->email' where id='$this->id'");
	}
	public static function delete($id){
		global $db,$tx;
		$db->query("delete from {$tx}riders where id={$id}");
	}
	public function jsonSerialize():mixed{
		return get_object_vars($this);
	}
	public static function all(){
		global $db,$tx;
		$result=$db->query("select id,name,vehicle_type,is_active,is_available,password,photo,car_number,car_photo,mobile,email from {$tx}riders");
		$data=[];
		while($rider=$result->fetch_object()){
			$data[]=$rider;
		}
			return $data;
	}
	public static function pagination($page=1,$perpage=10,$criteria=""){
		global $db,$tx;
		$top=($page-1)*$perpage;
		$result=$db->query("select id,name,vehicle_type,is_active,is_available,password,photo,car_number,car_photo,mobile,email from {$tx}riders $criteria limit $top,$perpage");
		$data=[];
		while($rider=$result->fetch_object()){
			$data[]=$rider;
		}
			return $data;
	}
	public static function count($criteria=""){
		global $db,$tx;
		$result =$db->query("select count(*) from {$tx}riders $criteria");
		list($count)=$result->fetch_row();
			return $count;
	}
	public static function find($id){
		global $db,$tx;
		$result =$db->query("select id,name,vehicle_type,is_active,is_available,password,photo,car_number,car_photo,mobile,email from {$tx}riders where id='$id'");
		$rider=$result->fetch_object();
			return $rider;
	}
	static function get_last_id(){
		global $db,$tx;
		$result =$db->query("select max(id) last_id from {$tx}riders");
		$rider =$result->fetch_object();
		return $rider->last_id;
	}
	public function json(){
		return json_encode($this);
	}
	public function __toString(){
		return "		Id:$this->id<br> 
		Name:$this->name<br> 
		Vehicle Type:$this->vehicle_type<br> 
		Is Active:$this->is_active<br> 
		Is Available:$this->is_available<br> 
		Password:$this->password<br> 
		Photo:$this->photo<br> 
		Car Number:$this->car_number<br> 
		Car Photo:$this->car_photo<br> 
		Mobile:$this->mobile<br> 
		Email:$this->email<br> 
";
	}

	//-------------HTML----------//

	static function html_select($name="cmbRider", $id=1){
		global $db,$tx;
		$html="<select  class='form-select $name' id='$name' name='$name'> ";
		
		$result =$db->query("select id,name from {$tx}riders");
		while($rider=$result->fetch_object()){

			$select = ($rider->id == $id) ? "selected" : "";
			$html.="<option value ='$rider->id' $select>$rider->name</option>";
		}
		$html.="</select>";
		return $html;
	}
	static function html_table($page = 1,$perpage = 10,$criteria="",$action=true){
		global $db,$tx,$base_url;
		$count_result =$db->query("select count(*) total from {$tx}riders $criteria ");
		list($total_rows)=$count_result->fetch_row();
		$total_pages = ceil($total_rows /$perpage);
		$top = ($page - 1)*$perpage;
		$result=$db->query("select id,name,vehicle_type,is_active,is_available,password,photo,car_number,car_photo,mobile,email from {$tx}riders $criteria limit $top,$perpage");
		$html="<table class='table'>";
			$html.="<tr><th colspan='3'>".Html::link(["class"=>"btn btn-success","route"=>"rider/create","text"=>"New Rider"])."</th></tr>";
		if($action){
			$html.="<tr><th>Id</th><th>Name</th><th>Vehicle Type</th>
			<th>Car Number</th><th>Mobile</th><th>Email</th><th>Action</th></tr>";
		}else{
			$html.="<tr><th>Id</th><th>Name</th><th>Vehicle Type</th>
			<th>Car Number</th><th>Mobile</th><th>Email</th></tr>";
		}
		while($rider=$result->fetch_object()){
			$action_buttons = "";
			if($action){
				$action_buttons = "<td><div class='btn-group' style='display:flex;'>";
				$action_buttons.= Event::button(["name"=>"show", "value"=>"Order", "class"=>"btn btn-secondary", "route"=>"rider/show/$rider->id"]);
				//$action_buttons.= Event::button(["name"=>"show", "value"=>"Show", "class"=>"btn btn-info", "route"=>"rider/show/$rider->id"]);
				//$action_buttons.= Event::button(["name"=>"edit", "value"=>"Edit", "class"=>"btn btn-primary", "route"=>"rider/edit/$rider->id"]);
				//$action_buttons.= Event::button(["name"=>"delete", "value"=>"Delete", "class"=>"btn btn-danger", "route"=>"rider/confirm/$rider->id"]);
				$action_buttons.= "</div></td>";
			}
			$html.="<tr><td>$rider->id</td><td>$rider->name</td><td>$rider->vehicle_type</td><td>$rider->car_number</td><td>$rider->mobile</td><td>$rider->email</td> $action_buttons</tr>";
		}
		$html.="</table>";
		$html.= pagination($page,$total_pages);
		return $html;
	}
	static function html_row_details($id){
		global $db,$tx,$base_url;
		$result =$db->query("select id,name,vehicle_type,is_active,is_available,password,photo,car_number,car_photo,mobile,email from {$tx}riders where id={$id}");
		$rider=$result->fetch_object();
		$html="<table class='table'>";
		$html.="<tr><th colspan=\"2\">Rider Show</th></tr>";
		$html.="<tr><th>Id</th><td>$rider->id</td></tr>";
		$html.="<tr><th>Name</th><td>$rider->name</td></tr>";
		$html.="<tr><th>Vehicle Type</th><td>$rider->vehicle_type</td></tr>";
		$html.="<tr><th>Is Active</th><td>$rider->is_active</td></tr>";
		$html.="<tr><th>Is Available</th><td>$rider->is_available</td></tr>";
		$html.="<tr><th>Password</th><td>$rider->password</td></tr>";
		$html.="<tr><th>Photo</th><td><img src='$base_url/img/$rider->photo' width='100' /></td></tr>";
		$html.="<tr><th>Car Number</th><td>$rider->car_number</td></tr>";
		$html.="<tr><th>Car Photo</th><td>$rider->car_photo</td></tr>";
		$html.="<tr><th>Mobile</th><td>$rider->mobile</td></tr>";
		$html.="<tr><th>Email</th><td>$rider->email</td></tr>";

		$html.="</table>";
		return $html;
	}
}
?>
