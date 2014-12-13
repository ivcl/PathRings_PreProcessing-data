<?php
   header("Content-type: application/text");
   $textData = $_POST['textData'];
   $file = fopen('hierarchicalPathwayName.txt','w+');
   fwrite($file, $textData);
   fclose($file);
?>


