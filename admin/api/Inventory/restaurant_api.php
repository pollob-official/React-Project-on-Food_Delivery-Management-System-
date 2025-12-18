<?php
class RestaurantApi {

    public function __construct() {}

    // ================================
    // GET ALL RESTAURANTS
    // ================================
	function index() {
		global $db, $tx;

		$sql = "
			SELECT r.*, 
			(SELECT COUNT(*) FROM {$tx}orders o WHERE o.restaurant_id = r.id) AS order_count
			FROM {$tx}restaurants r
			ORDER BY r.id asc
		";

		$result = $db->query($sql);

		$restaurants = [];
		while ($row = $result->fetch_assoc()) {
			$row["order_count"] = intval($row["order_count"]); // convert null to 0
			$restaurants[] = $row;
		}

		echo json_encode(["restaurants" => $restaurants]);
	}


    // ================================
    // PAGINATION
    // ================================
    function pagination($data) {
        $page = $data["page"] ?? 1;
        $perpage = $data["perpage"] ?? 10;

        echo json_encode([
            "restaurants" => Restaurant::pagination($page, $perpage),
            "total_records" => Restaurant::count()
        ]);
    }

    // ================================
    // FIND RESTAURANT
    // ================================
    function find($data) {
        echo json_encode(["restaurant" => Restaurant::find($data["id"])]);
    }

    // ================================
    // DELETE RESTAURANT
    // ================================
    function delete($data) {
        Restaurant::delete($data["id"]);
        echo json_encode(["success" => "yes"]);
    }

    // ================================
    // CREATE RESTAURANT
    // ================================
    function save($data, $file = []) {
        $restaurant = new Restaurant();

        $restaurant->name        = $data["name"] ?? "";
        $restaurant->description = $data["description"] ?? "";
        $restaurant->phone       = $data["phone"] ?? "";
        $restaurant->address     = $data["address"] ?? "";
        $restaurant->open_hours  = $data["open_hours"] ?? "";
        $restaurant->is_active   = $data["is_active"] ?? 1;

        // Auto timestamp
        $restaurant->created_at = date("Y-m-d H:i:s");

        $restaurant->save();

        echo json_encode(["success" => "yes"]);
    }

    // ================================
    // UPDATE RESTAURANT
    // ================================
    function update($data, $file = []) {
        $restaurant = new Restaurant();

        $restaurant->id          = $data["id"];
        $restaurant->name        = $data["name"] ?? "";
        $restaurant->description = $data["description"] ?? "";
        $restaurant->phone       = $data["phone"] ?? "";
        $restaurant->address     = $data["address"] ?? "";
        $restaurant->open_hours  = $data["open_hours"] ?? "";
        $restaurant->is_active   = $data["is_active"] ?? 1;

        // Do not update created_at (static)
        $restaurant->created_at = $data["created_at"] ?? "";

        $restaurant->update();

        echo json_encode(["success" => "yes"]);
    }
}
?>
