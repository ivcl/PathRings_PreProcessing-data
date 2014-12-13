/**
 * Created by Yongnan on 7/23/2014.
 */
function File(objects, root) {
    var _this = this;
    var processedIdex = 0;

    function animate() {
//        var dbId = objects[processedIdex].dbId;
        if (processedIdex == objects.length) {
            $.ajax({
                url: 'fileWithProtein.php',
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
        else
        {
            var fileName = "";
            fileName += objects[processedIdex].dbId;
            fileName += "_7protein.txt";
            $.ajax({
                type: "GET",
                url: "./pathFiles/" + fileName,
                dataType: "text",
                async: false, //blocks window close
                success: function (resultProtein) {
                    if (resultProtein.length !== 0) {
                        objects[processedIdex].proteins = [];
                        var lines = resultProtein.split("\t\n");
                        for (var j = 0; j < lines.length; ++j) {
                            if (lines[j] !== "") {
                                var array = lines[j].split("\t");
                                var simbol = array[2].split(" ")[1];
                                if(simbol != null)
                                {
                                    objects[processedIdex].proteins.push(simbol);
                                }
                            }
                        }
                    }
                    processedIdex++;
                },
                error: function () {
                    processedIdex++;
                }
            });

            requestAnimationFrame(animate);
        }


    }

    animate();
}
