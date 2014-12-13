/**
 * Created by Yongnanzhu on 5/12/2014.
 */

//Global variable for counting the bubble number
var objects = [];
$(document).ready(function () {
    var dataString="";
    $.ajax({
        type: "GET",
        url: "homo-sapiens.xml",
        dataType: "text",
        success: function (xml) {
            if (typeof xml === 'string' || xml instanceof String) {
                var $doc = $.parseXML(xml);
                $($doc).find('Pathways').each(function () {

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
                                            if (child5.children.length == 0)
                                                child5.size = 1;
//                                            child5.parent = child4;
//                                            child5.linkIds = root.dbId + "." + object.dbId + "." + child1.dbId+ "." + child2.dbId+ "." + child3.dbId+ "." + child4.dbId+ "." + child5.dbId;
//                                            objects.push(child5);
                                            dataString += child5.dbId;
                                            dataString += "\t";
                                            dataString += child5.name;
                                            dataString += "\r\n";
                                            child4.children.push(child5);
                                        });
                                        if (child4.children.length == 0)
                                            child4.size = 1;
//                                        child4.linkIds = root.dbId + "." + object.dbId + "." + child1.dbId+ "." + child2.dbId+ "." + child3.dbId+ "." + child4.dbId;
                                        dataString += child4.dbId;
                                        dataString += "\t";
                                        dataString += child4.name;
                                        dataString += "\r\n";
                                        objects.push(child4);
                                        child3.children.push(child4);
                                    });
                                    if (child3.children.length == 0)
                                        child3.size = 1;
//                                    child3.linkIds = root.dbId + "." + object.dbId + "." + child1.dbId+ "." + child2.dbId+ "." + child3.dbId;
//                                    child3.parent = child2;
                                    dataString += child3.dbId;
                                    dataString += "\t";
                                    dataString += child3.name;
                                    dataString += "\r\n";
                                    objects.push(child3);
                                    child2.children.push(child3);
                                });
                                if (child2.children.length == 0)
                                    child2.size = 1;
                                dataString += child2.dbId;
                                dataString += "\t";
                                dataString += child2.name;
                                dataString += "\r\n";
//                                child2.linkIds = root.dbId + "." + object.dbId + "." + child1.dbId+ "." + child2.dbId;
                                objects.push(child2);
                                child1.children.push(child2);
                            });
                            if (child1.children.length == 0)
                                child1.size = 1;
                            dataString += child1.dbId;
                            dataString += "\t";
                            dataString += child1.name;
                            dataString += "\r\n";
//                            child1.linkIds = root.dbId + "." + object.dbId + "." + child1.dbId;
                            objects.push(child1);
                            object.children.push(child1);
                        });
//                        object.linkIds = root.dbId + "." + object.dbId;
                        objects.push(object);
//                        root.children.push(object);
                    });

                });

                $.ajax({
                    type: "POST",
                    url: "savePathwayNames.php",
                    data: {
                        textData: dataString
                    },
                    success: function () {
                        alert("saved!");
                    }
                });
                return false;
            }
        }
    });

});