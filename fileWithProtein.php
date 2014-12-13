<?php
   header("Content-type: application/json");
   $json = $_POST['json'];
   $file = fopen('hierarchicalGallus_ortholog.json','w');
   fwrite($file, $json);
   fclose($file);
?>


