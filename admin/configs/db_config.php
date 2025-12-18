<?php   
   //Remote
   
    define("SERVER","localhost");
    define("USER","pollob");
    define("DATABASE","wdpf66_pollob");
    define("PASSWORD","3234@;;");


   //Local

    //  define("SERVER","localhost");
    //  define("USER","root");
    //  define("DATABASE","food_delivery");
    //  define("PASSWORD","");


   
   

    $db=new mysqli(SERVER,USER,PASSWORD,DATABASE);
    $tx="";
    

?>