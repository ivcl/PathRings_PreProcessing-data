<?php
   header("Content-type: application/txt");
   $txt = $_POST['txt'];
   $fileName = $_POST['fileName'];
   $file = fopen($fileName,'w+');
   fwrite($file, $txt);
   fclose($file);
?>


