<?php
    header("Content-type: application/json");
   $json = $_POST['json'];
   $file = fopen('./Data/hierarchyHuman_ortholog.json','w+');
   fwrite($file, $json);
   echo $json;
   fclose($file);

?>


