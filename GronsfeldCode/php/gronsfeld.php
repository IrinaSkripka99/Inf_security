<?php

$fd = fopen("input.txt", 'r') or die("не удалось открыть файл");
while(!feof($fd))
{
    $str = htmlentities(fgets($fd));
}
fclose($fd);

$data = explode(' ',$str);

$str = $data[0];
$str2 = $data[1];

convert($str,$str2);

function charCodeAt($str, $i){
   return ord(substr($str, $i, 1));
 }

function convert($text,$key){

   $value1 = $text;
   $value2 = strval($key);

   while (strlen($value2)<strlen($value1))
   {
      $value2= $value2.$value2;
   }

   $final=[];
   $val1Unicode="";
   $val2SingleInt="";
   $convertedLetter ="";
   $value2 = str_split($value2);

   for($i =0;$i<strlen($value1);$i++){
      $val1Unicode=charCodeAt($value1,$i);
      $val2SingleInt =number_format($value2[$i]);
      print $value2[$i]." ";
      $convertedLetter= chr($val1Unicode + $val2SingleInt);
      array_push($final,$convertedLetter);
   }  

   array_push($final,'');
   $final = join("",$final);
   $fd = fopen("output.txt", 'w') or die("не удалось создать файл");
   fwrite($fd, $final);
   fclose($fd);
}
?>