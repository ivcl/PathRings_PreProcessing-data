/**
 * Created by Yongnan on 7/23/2014.
 */
function File(objects, root, expression) {
    var _this = this;
    var processedIdex = 0;

    function animate() {
        var dbId = objects[processedIdex].dbId;
        var fileName = "";
        fileName += dbId;
        fileName += "_7protein.txt";
        $.ajax({
            type: "GET",
            url: "./pathFiles/" + fileName,
            dataType: "text",
            success: function (resultProtein) {
                objects[processedIdex].ups = [];
                objects[processedIdex].downs = [];
                if (resultProtein.length !== 0) {
                    var lines = resultProtein.split("\t\n");
                    for (var j = 0; j < lines.length; ++j) {
                        if (lines[j] !== "") {
                            var array = lines[j].split("\t");
                            var simbol = array[2].split(" ")[1];
                            for(var ii=0; ii<expression.length; ++ii)
                            {
                                if(expression[ii].simbol == simbol)
                                {
                                    if(expression[ii].Express == "Up")
                                    {
                                        objects[processedIdex].ups.push(simbol);
                                    }
                                    else if(expression[ii].Express == "Down")
                                    {
                                        objects[processedIdex].downs.push(simbol);
                                    }
                                    break;
                                }
                            }
                        }
                    }

                    processedIdex++;

                }
                else {

                    processedIdex++;
                }
                if (processedIdex == objects.length) {
                    $.ajax({
                        url: 'json.php',
                        type: "POST",  // type should be POST
                        data: {
                            json: JSON.stringify(root)
                        }, // send the string directly
                        dataType: "json",
                        success: function (data) {
                            alert("Saved. Thanks!");
                            return true;
                        },
                        complete: function () {
                        },
                        error: function (xhr, textStatus, errorThrown) {
                            alert("Sorry, your work can not be saved, Please try it again!");
                            return false;
                        }
                    });
                }
            },
            error: function () {
                objects[processedIdex].ups = [];
                objects[processedIdex].downs = [];
                processedIdex++;
            }
        });
        requestAnimationFrame(animate);
    }

    animate();
}
