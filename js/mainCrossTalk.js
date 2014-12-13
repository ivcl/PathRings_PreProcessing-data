/**
 * Created by Yongnanzhu on 5/12/2014.
 */

//Global variable for counting the bubble number

var Data = {};
Data.compartments = [];
Data.arrows = [];
Data.inhibitions = [];
Data.activations = [];
var graphs =[];
var springy = null;
var objects = [];
$(document).ready(function () {
    var root = {};
    $.ajax({
        type: "GET",
        url: "pathwayHierarchy.xml",
        dataType: "text",
        success: function (xml) {
            if (typeof xml === 'string' || xml instanceof String) {
                var $doc = $.parseXML(xml);
                $($doc).find('Pathways').each(function() {
                    var rootName = $(this).attr('species');
                    rootName = rootName.replace(/[<>:,&.'"\/\\|?*]+/g, '');  //& < > " ' xml special characters
                    root.name = rootName;
                    root.children = [];

                    $(this).children('Pathway').each(function () {
                        var object = {};
                        object.dbId = $(this).attr('dbId');
                        var objName = $(this).attr('displayName');
                        objName = objName.replace(/[<>:,&.'"\/\\|?*]+/g, '');  //& < > " ' xml special characters
                        object.name = objName;
                        object.children = [];
                        $(this).children('Pathway').each(function () {
                            var child1 = {};
                            child1.dbId = $(this).attr('dbId');
                            var childName = $(this).attr('displayName');
                            childName = childName.replace(/[<>:,&.'"\/\\|?*]+/g, '');  //& < > " ' xml special characters
                            child1.name = childName;
                            child1.children = [];
                            $(this).children('Pathway').each(function () {
                                var child2 = {};
                                child2.dbId = $(this).attr('dbId');
                                var childName2 = $(this).attr('displayName');
                                childName2 = childName2.replace(/[<>:,&.'"\/\\|?*]+/g, '');  //& < > " ' xml special characters
                                child2.name = childName2;
                                child2.children = [];
                                $(this).children('Pathway').each(function () {
                                    var child3 = {};
                                    child3.dbId = $(this).attr('dbId');
                                    var childName3 = $(this).attr('displayName');
                                    childName3 = childName3.replace(/[<>:,&.'"\/\\|?*]+/g, '');  //& < > " ' xml special characters
                                    child3.name = childName3;
                                    child3.children = [];
                                    $(this).children('Pathway').each(function () {
                                        var child4 = {};
                                        child4.dbId = $(this).attr('dbId');
                                        var childName4 = $(this).attr('displayName');
                                        childName4 = childName4.replace(/[<>:,&.'"\/\\|?*]+/g, '');  //& < > " ' xml special characters
                                        child4.name = childName4;
                                        child4.children = [];
                                        $(this).children('Pathway').each(function () {
                                            var child5 = {};
                                            child5.dbId = $(this).attr('dbId');
                                            var childName5 = $(this).attr('displayName');
                                            childName5 = childName5.replace(/[<>:,&.'"\/\\|?*]+/g, '');  //& < > " ' xml special characters
                                            child5.name = childName5;
                                            child5.children = [];
                                            if(child5.children.length==0)
                                                child5.size = 1;
                                            objects.push(child5);
                                            child4.children.push(child5);
                                        });
                                        if(child4.children.length==0)
                                            child4.size = 1;
                                        objects.push(child4);
                                        child3.children.push(child4);
                                    });
                                    if(child3.children.length==0)
                                        child3.size = 1;
                                    objects.push(child3);
                                    child2.children.push(child3);
                                });
                                if(child2.children.length==0)
                                    child2.size = 1;
                                objects.push(child2);
                                child1.children.push(child2);
                            });
                            if(child1.children.length==0)
                                child1.size = 1;
                            objects.push(child1);
                            object.children.push(child1);
                        });
                        objects.push(object);
                        root.children.push(object);
                    });

                });
                var crosstalk = [];
                $.ajax({
                    type: "GET",
                    url: "./(cross-talking-pathways)uniprot_2_pathways.txt",
                    dataType: "text",
                    success: function (result) {
                        if (result) {
                            var lines = result.split("\r\n");
                            for(var i=0; i<lines.length; ++i)
                            {
                                var arrays = lines[i].split("\t");
                                if(arrays.length !==4)
                                    continue;
                                var protein = arrays[0];

                                var pathwayName = arrays[2];
                                if( pathwayName.indexOf("]:") == -1)
                                {
                                    continue;
                                }
                                else
                                {
                                    var splits = pathwayName.split("]:");

                                    var names = splits[1].split(";");
                                    for(var k=0;k<names.length; ++k)
                                    {
                                        var pathwayN = names[k].replace( /[<>:,."\/\\|?*]+/g, '' );
                                        for(var j=0;j<crosstalk.length; ++j )
                                        {
                                            if(crosstalk[j].pathwayName == pathwayN )
                                            {
                                                break;
                                            }
                                        }
                                        if(j >= crosstalk.length)
                                        {
                                            var object ={};
                                            object.pathwayName = pathwayN;
                                            object.children =[];
                                            object.children.push(protein);
                                            crosstalk.push(object);
                                        }
                                        else
                                        {
                                            crosstalk[j].children.push(protein);
                                        }
                                    }
                                }
                            }

                                for(var jj=0; jj<crosstalk.length; ++jj)
                                {
                                    for(var ii=0; ii<objects.length; ++ii)
                                    {
                                    if(objects[ii].name.replace(/^\s\s*/, '').replace(/\s\s*$/, '') == crosstalk[jj].pathwayName.replace(/^\s\s*/, '').replace(/\s\s*$/, '') )
                                    {
                                        objects[ii].crossTalkProtein = crosstalk[jj].children;
                                    }
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
                                alert("Saved. Thanks!");
                                return false;
                            }
                        });
                        }
                    }
                });
            }

//                $.ajax({
//                    url: 'json.php',
//                    type: "POST",  // type should be POST
//                    data: {
//                        json: JSON.stringify(root)
//                    }, // send the string directly
//                    dataType: "json",
//                    success: function (data) {
//                        alert("Saved. Thanks!");
//                        return true;
//                    },
//                    complete: function () {
//                    },
//                    error: function (xhr, textStatus, errorThrown) {
//                        alert("Sorry, your work can not be saved, Please try it again!");
//                        return false;
//                    }
//                });
//            }
        }
    });
});