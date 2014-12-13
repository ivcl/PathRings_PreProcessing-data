/**
 * Created by Yongnan on 7/23/2014.
 */
function File(objects, root, gallusOrth) {

    function animate() {
        var results = [];
        $.ajax({
            type: "GET",
            url: "(cross-talking-pathways)uniprot_2_pathways.txt",
            dataType: "text",
            success: function (txt) {
                if (txt.length !== 0) {
                    var lines = txt.split("\n");
                    for(var i=0; i<lines.length; ++i)
                    {
                        var objs = lines[i].split("\t");
                        if(objs.length !== 4)
                        {
                            continue;
                        }
                        var object = {};
                        object.proteinId = objs[0];
                        var indexs = objs[1].split(":");

                        object.uniProtId = indexs[1];
                        var process = objs[2].split("]:");
                        if(process.length ==2)
                        {
                            if(process[1].indexOf(";")!==-1)
                            {
                                var pathwayNames = process[1].split(";");
                            }
                            else
                            {
                                var pathwayNames = [];
                                pathwayNames.push(process[1]);
                            }
                        }
                        else
                        {
                            var pathwayNames = [];
                            pathwayNames.push(process[0]);
                        }
                        object.pathwayNames = pathwayNames;
                        results.push(object);
                    }
                }

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

            },
            error: function () {
            }
        });
        requestAnimationFrame(animate);
    }

    animate();
}
