/**
 * @author      Yongnan
 * @version     1.0
 * @time        11/18/2014
 * @name        humanProtein
 */
function File(objects, root) {
    var _this = this;
    var processedIdex = 0;

    function animate() {
        if (processedIdex != objects.length) {
            var fileName = "";
            fileName += objects[processedIdex].dbId;
            fileName += "_7protein.txt";
            $.ajax({
                type: "GET",
                url: "./pathFiles/" + fileName,
                dataType: "text",
                async: false, //blocks window close
                success: function (resultProtein) {
                    objects[processedIdex].symbols = [];
                    objects[processedIdex].gallusOrth = {};
                    objects[processedIdex].gallusOrth.sharedSymbols = [];
                    if (resultProtein.length !== 0) {

                        var lines = resultProtein.split("\t\n");
                        for (var j = 0; j < lines.length; ++j) {
                            if (lines[j] !== "") {
                                var array = lines[j].split("\t");
                                var symbol = array[2].split(" ")[1];
                                objects[processedIdex].symbols.push(symbol);
                            }
                        }

                        objects[processedIdex].gallusOrth.count = objects[processedIdex].symbols.length;
                        objects[processedIdex].gallusOrth.type = "Complete";
                        objects[processedIdex].gallusOrth.sharedSymbols = objects[processedIdex].symbols;
                        processedIdex++;

                    }
                    else
                    {   objects[processedIdex].gallusOrth.sharedSymbols = [];
                        objects[processedIdex].gallusOrth.type = "Empty";
                        objects[processedIdex].gallusOrth.count =0;
                        processedIdex++;
                    }
                },
                error: function () {
                    objects[processedIdex].symbols = [];
                    objects[processedIdex].gallusOrth = {};
                    objects[processedIdex].gallusOrth.sharedSymbols = [];
                    objects[processedIdex].gallusOrth.type = "Empty";
                    objects[processedIdex].gallusOrth.count =0;
                    processedIdex++;
                }
            });
            requestAnimationFrame(animate);
        }
        else
        {
            $.ajax({
                url: 'fileProteinOrth.php',
                type: "POST",  // type should be POST
                data: {
                    json: JSON.stringify(root)
                }, // send the string directly
                dataType: "json",
                success: function (data) {
                    alert("Saved. Thanks!");
                    return true;
                },
                error: function (data) {
                    alert("Sorry, your work can not be saved, Please try it again!");
                    return false;
                }
            });
        }
    }

    animate();
}