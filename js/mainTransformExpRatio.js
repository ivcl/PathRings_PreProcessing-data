/**
 * Created by Yongnanzhu on 5/12/2014.
 */

//Global variable for counting the bubble number
var objects = [];
$(document).ready(function () {
    var dataString="";
    $.ajax({
        type: "GET",
        url: "TGF0expression.txt",
        dataType: "text",
        success: function (txt) {
            if(txt.length)
            {

                dataString += "gene_id";
                dataString += "\t";
                dataString += "simbol";
                dataString += "\t";
                dataString += "ratio";
                dataString += "\r\n";
                var lines = txt.split("\r\n");
                for(var i=1; i<lines.length; ++i)
                {
                    if(lines[i] === "")
                        continue;
                    var arrays = lines[i].split("\t");
//                    var obj = {};
                    var gene_id = arrays[0];
                    var simbol = arrays[1];
                    var left = parseFloat(arrays[2]);
                    var right = parseFloat(arrays[3]);
                    var ratio = right/left;
                    dataString += gene_id;
                    dataString += "\t";
                    dataString += simbol;
                    dataString += "\t";
                    dataString += ratio;
                    dataString += "\r\n";
//                    expression.push(obj);
                }

                $.ajax({
                    type: "POST",
                    url: "saveTransformedExpression.php",
                    data: {
                        textData: dataString
                    },
                    success: function () {
                        alert("saved!");
                    }
                });

            }
        }
    });


});