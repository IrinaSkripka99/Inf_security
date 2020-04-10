window.addEventListener("load", function readFromTextBox()
    {
      if(document.getElementById("buttonGr"))document.getElementById("buttonGr").addEventListener("click", function ()
      {
         var str = document.getElementById("textGr").value;
         var str2 = document.getElementById("keyGr").value;
           
         var result = convert(str,str2);
      

         document.getElementById("textGr2").value = result;    
     });

   if(document.getElementById("buttonGr2"))document.getElementById("buttonGr2").addEventListener("click", function ()
   {
      var str = document.getElementById("textGr").value;
      var str2 = document.getElementById("keyGr").value;
           
      var result1 = reconvert(str,str2);
      

      document.getElementById("textGr2").value = result1;    
  });
 
   });
   function convert(text,key)
   {
   var value1 = text;
   var value2 = key;
       
   while (value2.length<value1.length)
   {
      value2+=value2;
   }
   
   var final=[];
   var val1Unicode="";
   var val2SingleInt="";
   var convertedLetter ="";

   for(var i =0;i<value1.length;i++)
   {
      val1Unicode=value1.charCodeAt(i);
  
      val2SingleInt =parseInt(value2.charAt(i));
    
      convertedLetter= String.fromCharCode(val1Unicode + val2SingleInt);
   
      final.push(convertedLetter);
       
   }  
   final.push(" ");
   return final.join("");
}

function reconvert(text,key)
{
var value1 = text;
var value2 = key;
    
while (value2.length<value1.length)
{
   value2+=value2;
}

var final=[];
var val1Unicode="";
var val2SingleInt="";
var convertedLetter ="";

for(var i =0;i<value1.length;i++)
{
   val1Unicode=value1.charCodeAt(i);

   val2SingleInt =parseInt(value2.charAt(i));
 
   convertedLetter= String.fromCharCode(val1Unicode - val2SingleInt);

   final.push(convertedLetter);
    
}  
console.log(final);
return final.join("");
}