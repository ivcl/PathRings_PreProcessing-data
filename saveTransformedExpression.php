<?php
   header("Content-type: application/text");
   $textData = $_POST['textData'];
   $file = fopen('./Expression/TGF0expression.txt','w+');
   fwrite($file, $textData);
   fclose($file);
?>


