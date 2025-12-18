<?php
class CustomerApi {
    public function __construct(){}

    // All customers
    function index(){
        echo json_encode(["customers" => Customer::all()]);
    }

    // Pagination (optional)
    function pagination($data){
        $page = $data["page"];
        $perpage = $data["perpage"];
        echo json_encode([
            "customers" => Customer::pagination($page, $perpage),
            "total_records" => Customer::count()
        ]);
    }

    // Get single customer
    function find($data){
        echo json_encode(["customer" => Customer::find($data["id"])]);
    }

    // Save customer (expects { customer: { name,email,phone } } )
    function save($data, $file = []){
        $data = $data['customer'];

        $customer = new Customer();
        $customer->name = $data["name"];
        $customer->email = $data["email"];
        $customer->phone = $data["phone"];
        $customer->created_at = date("Y-m-d H:i:s");
        $customer->updated_at = date("Y-m-d H:i:s");
        $customer->save();

        echo json_encode(["success" => "yes"]);
    }

    // Update customer (expects { customer: { id,name,email,phone } } )
    function update($data, $file = []){
        $data = $data['customer'];

        $customer = new Customer();
        $customer->id = $data["id"];
        $customer->name = $data["name"];
        $customer->email = $data["email"];
        $customer->phone = $data["phone"];
        $customer->updated_at = date("Y-m-d H:i:s");
        $customer->update();

        echo json_encode(["success" => "yes"]);
    }

    // Delete customer
    function delete($data){
        Customer::delete($data["id"]);
        echo json_encode(["success" => "yes"]);
    }
}
?>

