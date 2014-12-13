/**
 * Created by Yongnanzhu on 5/12/2014.
 */

//Global variable for counting the bubble number
var levels = [];
var level1 = [];
var level2 = [];
var level3 = [];
var level4 = [];
var level5 = [];
var level6 = [];
$(document).ready(function () {
    var root = {};
    $.ajax({
        type: "GET",
        url: "homo-sapiens.xml",
        dataType: "text",
        success: function (xml) {
            if (typeof xml === 'string' || xml instanceof String) {
                var $doc = $.parseXML(xml);
                $($doc).find('Pathways').each(function () {
                    var rootName = $(this).attr('species');
                    rootName = rootName.replace(/[<>:,&.'"\/\\|?*]+/g, '');  //& < > " ' xml special characters
                    root.name = rootName;
                    root.dbId = 0;
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
                                            if (child5.children.length == 0)
                                                child5.size = 1;
                                            level6.push(childName5);
                                            child4.children.push(child5);
                                        });
                                        if (child4.children.length == 0)
                                            child4.size = 1;
//                                        child4.linkIds = root.dbId + "." + object.dbId + "." + child1.dbId+ "." + child2.dbId+ "." + child3.dbId+ "." + child4.dbId;
                                        level5.push(childName4);
                                        child3.children.push(child4);
                                    });
                                    if (child3.children.length == 0)
                                        child3.size = 1;
//                                    child3.parent = child2;
                                    level4.push(childName3);
                                    child2.children.push(child3);
                                });
                                if (child2.children.length == 0)
                                    child2.size = 1;
                                level3.push(childName2);
                                child1.children.push(child2);
                            });
                            if (child1.children.length == 0)
                                child1.size = 1;
                            level2.push(childName);
                            object.children.push(child1);
                        });
                        level1.push(objName);
                        root.children.push(object);
                    });
                });
                levels.push(level1);
                levels.push(level2);
                levels.push(level3);
                levels.push(level4);
                levels.push(level5);
                levels.push(level6);

                $.ajax({
                    url: 'json_.php',
                    type: "POST",  // type should be POST
                    data: {
                        fileName: "pathwaysLevels.json",
                        json: JSON.stringify(levels)
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
        }
    });

});