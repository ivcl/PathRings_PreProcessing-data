/**
 * Created by Yongnanzhu on 5/12/2014.
 */
//Global variable for counting the bubble number
var objects = [];
$(document).ready(function () {
    var root = {};
    var type = "Human";   //Turtle Gallus Alligator
    $.ajax({
        type: "GET",
        url: "./Data/hierarchy"+type+"_ortholog.json",
        dataType: "json",
        success: function (root) {
            var hierarchObjects = [];
            traverseNodes(root);

            function traverseNodes(root){
                hierarchObjects.push(root);
                for(var i=0; i<root.children.length; ++i)
                {
                    traverseNodes(root.children[i]);
                }
            }

            for(var it=0; it<hierarchObjects.length;it++ )
            {
                var fileName = hierarchObjects[it].name;

                $.ajax({
                    url: 'fileLevelOrthology.php',
                    type: "POST",  // type should be POST
                    data: {
                        fileName: "./Data/" +type +"/" + fileName + '.json',
                        json: JSON.stringify(hierarchObjects[it])
                    }, // send the string directly
                    dataType: "json",
                    success: function (data) {
                        //alert("Saved. Thanks!");
                        console.log(it);
                        //++it;
                        return true;
                    },
                    complete: function () {
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        //alert("Saved. Thanks!");
                        console.log(it);
                        //++it;
                        return false;
                    }
                });
            }
        }
    });
});