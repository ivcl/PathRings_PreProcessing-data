/**
 * Created by Yongnan on 7/23/2014.
 */
function File(objects, root, gallusOrth) {
    var _this = this;
    var processedIdex = 0;

    function animate() {
//        var dbId = objects[processedIdex].dbId;
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
                        var count=0;
//                        var sharedSymbols = [];

                        for (var j = 0; j < objects[processedIdex].symbols.length; ++j) {
                            for (var k = 0; k < gallusOrth.length; ++k) {
                                if (gallusOrth[k].dataBaseId !== "\N") {
                                    if(typeof objects[processedIdex].symbols[j] == "string")
                                    if (objects[processedIdex].symbols[j].toUpperCase() == gallusOrth[k].symbol.toUpperCase()) {
                                        count++;
                                        objects[processedIdex].gallusOrth.sharedSymbols.push(gallusOrth[k].symbol);
                                        break;
                                    }
                                }
                            }
                        }
                        objects[processedIdex].gallusOrth.count = count;
                        if (count === objects[processedIdex].symbols.length) {
                            objects[processedIdex].gallusOrth.type = "Complete";
                        }
                        else if (count === 0&&0 !== objects[processedIdex].symbols.length) {
                            objects[processedIdex].gallusOrth.type = "Empty";

                        }
                        else {
                            objects[processedIdex].gallusOrth.type = "Part";
                        }
                        processedIdex++;

                    }
                    else {
                        objects[processedIdex].gallusOrth.type = "Empty";
                        processedIdex++;
                    }

                },
                error: function () {
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
