<?php
class RiderApi {

    public function __construct() {}

    // ================================
    // GET ALL RIDERS + TOTAL ORDERS
    // ================================
    function index() {
        global $db, $tx;

        $sql = "
            SELECT r.*,
            (
                SELECT COUNT(*) 
                FROM {$tx}orders o 
                WHERE o.rider_id = r.id
            ) AS order_count
            FROM {$tx}riders r
            ORDER BY r.id ASC
        ";

        $result = $db->query($sql);

        $riders = [];
        while ($row = $result->fetch_assoc()) {
            $row["order_count"] = intval($row["order_count"] ?? 0);
            $riders[] = $row;
        }

        echo json_encode(["riders" => $riders]);
    }



    // ================================
    // PAGINATION
    // ================================
    function pagination($data) {
        $page = $data["page"] ?? 1;
        $perpage = $data["perpage"] ?? 10;

        echo json_encode([
            "riders" => Rider::pagination($page, $perpage),
            "total_records" => Rider::count()
        ]);
    }



    // ================================
    // FIND RIDER
    // ================================
    function find($data) {
        echo json_encode(["rider" => Rider::find($data["id"])]);
    }



    // ================================
    // FIND ORDERS BY RIDER ID
    // ================================
    function order_find_by_rider_id($data) {
        echo json_encode([
            "orders" => Order::find_by_rider_id($data["id"])
        ]);
    }



    // ================================
    // DELETE RIDER
    // ================================
    function delete($data) {
        Rider::delete($data["id"]);
        echo json_encode(["success" => "yes"]);
    }



    // ================================
    // CREATE RIDER
    // ================================
    function save($data, $file = []) {
        $rider = new Rider();

        $rider->name          = $data["name"] ?? "";
        $rider->vehicle_type  = $data["vehicle_type"] ?? "";
        $rider->car_number    = $data["car_number"] ?? "";
        $rider->mobile        = $data["mobile"] ?? "";
        $rider->email         = $data["email"] ?? "";
        $rider->password      = $data["password"] ?? "";
        $rider->is_active     = $data["is_active"] ?? 1;
        $rider->is_available  = $data["is_available"] ?? 1;

        // Upload photo
        if (isset($file["photo"]["name"]) && $file["photo"]["name"] !== "") {
            $rider->photo = upload($file["photo"], "../img", $data["name"]);
        } else {
            $rider->photo = "";
        }

        // Car photo
        $rider->car_photo = $data["car_photo"] ?? "";

        $rider->save();

        echo json_encode(["success" => "yes"]);
    }



    // ================================
    // UPDATE RIDER
    // ================================
    function update($data, $file = []) {
        $rider = new Rider();

        $rider->id            = $data["id"];
        $rider->name          = $data["name"] ?? "";
        $rider->vehicle_type  = $data["vehicle_type"] ?? "";
        $rider->car_number    = $data["car_number"] ?? "";
        $rider->mobile        = $data["mobile"] ?? "";
        $rider->email         = $data["email"] ?? "";
        $rider->password      = $data["password"] ?? "";
        $rider->is_active     = $data["is_active"] ?? 1;
        $rider->is_available  = $data["is_available"] ?? 1;

        // Keep old image if new not uploaded
        if (isset($file["photo"]["name"]) && $file["photo"]["name"] !== "") {
            $rider->photo = upload($file["photo"], "../img", $data["name"]);
        } else {
            $rider->photo = Rider::find($data["id"])->photo;
        }

        // Car photo
        $rider->car_photo = $data["car_photo"] ?? "";

        $rider->update();

        echo json_encode(["success" => "yes"]);
    }
}
?>
