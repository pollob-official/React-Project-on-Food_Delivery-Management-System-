<?php
class MenuItem extends Model implements JsonSerializable{
	public $id;
	public $restaurant_id;
	public $name;
	public $description;
	public $price;
	public $is_available;
	public $category;
	public $photo;
	public $created_at;

	public function __construct(){
	}
	public function set($id,$restaurant_id,$name,$description,$price,$is_available,$category,$photo,$created_at){
		$this->id=$id;
		$this->restaurant_id=$restaurant_id;
		$this->name=$name;
		$this->description=$description;
		$this->price=$price;
		$this->is_available=$is_available;
		$this->category=$category;
		$this->photo=$photo;
		$this->created_at=$created_at;

	}
	public function save(){
		global $db,$tx;
		$db->query("insert into {$tx}menu_items(restaurant_id,name,description,price,is_available,category,photo,created_at)values('$this->restaurant_id','$this->name','$this->description','$this->price','$this->is_available','$this->category','$this->photo','$this->created_at')");
		return $db->insert_id;
	}
	public function update(){
		global $db,$tx;
		$db->query("update {$tx}menu_items set restaurant_id='$this->restaurant_id',name='$this->name',description='$this->description',price='$this->price',is_available='$this->is_available',category='$this->category',photo='$this->photo',created_at='$this->created_at' where id='$this->id'");
	}
	public static function delete($id){
		global $db,$tx;
		$db->query("delete from {$tx}menu_items where id={$id}");
	}
	public function jsonSerialize():mixed{
		return get_object_vars($this);
	}
	public static function all(){
		global $db,$tx;
		$result=$db->query("select id,restaurant_id,name,description,price,is_available,category,photo,created_at from {$tx}menu_items");
		$data=[];
		while($menuitem=$result->fetch_object()){
			$data[]=$menuitem;
		}
			return $data;
	}
	public static function pagination($page=1,$perpage=10,$criteria=""){
		global $db,$tx;
		$top=($page-1)*$perpage;
		$result=$db->query("select id,restaurant_id,name,description,price,is_available,category,photo,created_at from {$tx}menu_items $criteria limit $top,$perpage");
		$data=[];
		while($menuitem=$result->fetch_object()){
			$data[]=$menuitem;
		}
			return $data;
	}
	public static function count($criteria=""){
		global $db,$tx;
		$result =$db->query("select count(*) from {$tx}menu_items $criteria");
		list($count)=$result->fetch_row();
			return $count;
	}
	public static function find($id){
		global $db,$tx;
		$result =$db->query("select id,restaurant_id,name,description,price,is_available,category,photo,created_at from {$tx}menu_items where id='$id'");
		$menuitem=$result->fetch_object();
			return $menuitem;
	}
	static function get_last_id(){
		global $db,$tx;
		$result =$db->query("select max(id) last_id from {$tx}menu_items");
		$menuitem =$result->fetch_object();
		return $menuitem->last_id;
	}
	public function json(){
		return json_encode($this);
	}
	public function __toString(){
		return "		Id:$this->id<br> 
		Restaurant Id:$this->restaurant_id<br> 
		Name:$this->name<br> 
		Description:$this->description<br> 
		Price:$this->price<br> 
		Is Available:$this->is_available<br> 
		Category:$this->category<br> 
		Photo:$this->photo<br> 
		Created At:$this->created_at<br> 
";
	}

	//-------------HTML----------//

	static function html_select($id="menuItemsSelect", $restaurant_id=null){
    global $db,$tx;
    $html = "<select class='form-select' id='$id' name='menu_item_id'>";
    $html .= "<option value=''>Select Menu Item</option>";

    $sql = "SELECT id, name, price FROM {$tx}menu_items WHERE 1";
    if($restaurant_id) $sql .= " AND restaurant_id=" . intval($restaurant_id);

    $result = $db->query($sql);
    while($menuitem = $result->fetch_object()){
        $price = number_format($menuitem->price, 2, '.', '');
        $html .= "<option value='{$menuitem->id}' data-price='{$price}'>{$menuitem->name} - {$price}</option>";
    }

    $html .= "</select>";
    return $html;
}

	static function html_table($page = 1,$perpage = 10,$criteria="",$action=true){
		global $db,$tx,$base_url;
		$count_result =$db->query("select count(*) total from {$tx}menu_items $criteria ");
		list($total_rows)=$count_result->fetch_row();
		$total_pages = ceil($total_rows /$perpage);
		$top = ($page - 1)*$perpage;
		$result=$db->query("select id,restaurant_id,name,description,price,is_available,category,photo,created_at from {$tx}menu_items $criteria limit $top,$perpage");
		$html="<table class='table'>";
			$html.="<tr><th colspan='3'>".Html::link(["class"=>"btn btn-success","route"=>"menuitem/create","text"=>"New MenuItem"])."</th></tr>";
		if($action){
			$html.="<tr><th>Id</th><th>Name</th><th>Price</th><th>Is Available</th><th>Category</th><th>Action</th></tr>";
		}else{
			$html.="<tr><th>Id</th><th>Name</th><th>Price</th><th>Is Available</th><th>Category</th></tr>";
		}
		while($menuitem=$result->fetch_object()){
			$action_buttons = "";
			if($action){
				$action_buttons = "<td><div class='btn-group' style='display:flex;'>";
				$action_buttons.= Event::button(["name"=>"show", "value"=>"Show", "class"=>"btn btn-info", "route"=>"menuitem/show/$menuitem->id"]);
				$action_buttons.= Event::button(["name"=>"edit", "value"=>"Edit", "class"=>"btn btn-primary", "route"=>"menuitem/edit/$menuitem->id"]);
				$action_buttons.= Event::button(["name"=>"delete", "value"=>"Delete", "class"=>"btn btn-danger", "route"=>"menuitem/confirm/$menuitem->id"]);
				$action_buttons.= "</div></td>";
			}
			$html.="<tr><td>$menuitem->id</td><td>$menuitem->name</td><td>$menuitem->price</td><td>$menuitem->is_available</td><td>$menuitem->category</td> $action_buttons</tr>";
		}
		$html.="</table>";
		$html.= pagination($page,$total_pages);
		return $html;
	}
	static function html_row_details($id){
		global $db,$tx,$base_url;
		$result =$db->query("select id,restaurant_id,name,description,price,is_available,category,photo,created_at from {$tx}menu_items where id={$id}");
		$menuitem=$result->fetch_object();
		$html="<table class='table'>";
		$html.="<tr><th colspan=\"2\">MenuItem Show</th></tr>";
		$html.="<tr><th>Id</th><td>$menuitem->id</td></tr>";
		$html.="<tr><th>Restaurant Id</th><td>$menuitem->restaurant_id</td></tr>";
		$html.="<tr><th>Name</th><td>$menuitem->name</td></tr>";
		$html.="<tr><th>Description</th><td>$menuitem->description</td></tr>";
		$html.="<tr><th>Price</th><td>$menuitem->price</td></tr>";
		$html.="<tr><th>Is Available</th><td>$menuitem->is_available</td></tr>";
		$html.="<tr><th>Category</th><td>$menuitem->category</td></tr>";
		$html.="<tr><th>Photo</th><td><img src='$base_url/img/$menuitem->photo' width='100' /></td></tr>";
		$html.="<tr><th>Created At</th><td>$menuitem->created_at</td></tr>";

		$html.="</table>";
		return $html;
	}
}
?>
