<?php
   header("Content-type: application/json");
   $json = $_POST['json'];
   $file = fopen('hierarchicalPathwayWithProteins111.json','w+');
   fwrite($file, $json);
   fclose($file);
?>


