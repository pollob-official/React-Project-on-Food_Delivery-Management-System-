<?php
class MenuItemApi {
    public function __construct() {}

    function index() {
        echo json_encode(["menu_items" => MenuItem::all()]);
    }

    function pagination($data) {
        $page = $data["page"];
        $perpage = $data["perpage"];
        echo json_encode([
            "menu_items" => MenuItem::pagination($page, $perpage),
            "total_records" => MenuItem::count()
        ]);
    }

    function find($data) {
        echo json_encode(["menuitem" => MenuItem::find($data["id"])]);
    }

    function delete($data) {
        MenuItem::delete($data["id"]);
        echo json_encode(["success" => "yes"]);
    }

    function save($data, $file = []) {
        $menuitem = new MenuItem();

        $menuitem->restaurant_id = $data["restaurant_id"];
        $menuitem->name = $data["name"];
        $menuitem->description = $data["description"];
        $menuitem->price = $data["price"];
        $menuitem->is_available = $data["is_available"];
        $menuitem->category = $data["category"];
        $menuitem->photo = upload($file["photo"], "../assets/images/product", $data["name"]);
        $menuitem->created_at = $data["created_at"];

        $menuitem->save();
        echo json_encode(["success" => "yes"]);
    }

    function update($data, $file = []) {
        $menuitem = new MenuItem();

        $menuitem->id = $data["id"];
        $menuitem->restaurant_id = $data["restaurant_id"];
        $menuitem->name = $data["name"];
        $menuitem->description = $data["description"];
        $menuitem->price = $data["price"];
        $menuitem->is_available = $data["is_available"];
        $menuitem->category = $data["category"];

        // handle photo
        if (isset($file["photo"]) && $file["photo"]["name"] != "") {
            $menuitem->photo = upload($file["photo"], "../assets/images/product", $data["name"]);
        } else {
            $menuitem->photo = MenuItem::find($data["id"])->photo;
        }

        $menuitem->created_at = $data["created_at"];

        $menuitem->update();
        echo json_encode(["success" => "yes"]);
    }
}
?>
