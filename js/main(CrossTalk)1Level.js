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
var level1 = [];
var level2 = [];
var level3 = [];
var level4 = [];
var level5 = [];
var level6 = [];
var links = [];
var levels = [];
$(document).ready(function () {
    var root = {};
    $.ajax({
        type: "GET",
        url: "pathwayHierarchy.xml",
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
                                            level6.push(child5);
                                            child4.children.push(child5);
                                        });
                                        if (child4.children.length == 0)
                                            child4.size = 1;
//                                        child4.linkIds = root.dbId + "." + object.dbId + "." + child1.dbId+ "." + child2.dbId+ "." + child3.dbId+ "." + child4.dbId;
                                        level5.push(child4);
                                        child3.children.push(child4);
                                    });
                                    if (child3.children.length == 0)
                                        child3.size = 1;
//                                    child3.parent = child2;
                                    level4.push(child3);
                                    child2.children.push(child3);
                                });
                                if (child2.children.length == 0)
                                    child2.size = 1;
                                level3.push(child2);
                                child1.children.push(child2);
                            });
                            if (child1.children.length == 0)
                                child1.size = 1;
                            level2.push(child1);
                            object.children.push(child1);
                        });
                        level1.push(object);
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
                        type: "GET",
                        url: "(cross-talking-pathways)uniprot_2_pathways.txt",
                        dataType: "text",
                        success: function (txt) {
                            var crossTalkPathways = [];
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
                                    if( objs[2].indexOf("]:") != -1)
                                    {
                                        var process = objs[2].split("]:");
                                        var names = process[1].split(";");
                                        object.name = names;
                                        crossTalkPathways.push(object);
                                    }
                                }

                                for (var ii = 0; ii < levels.length; ++ii) {
                                var leftLevel = levels[ii];
                                    var levelLinks = [];
                                    for (var k = 0; k < crossTalkPathways.length; ++k) {
                                        var tempPathways = [];
                                        var names = crossTalkPathways[k].name;
                                        if(names.length <2)
                                        {
                                            continue;
                                        }
                                        for (var kk = 0; kk < names.length; ++kk) {
                                            for (var j = 0; j < leftLevel.length; ++j) {
                                                if (names[kk].replace(/^\s\s*/, '').replace(/\s\s*$/, '') == leftLevel[j].name.replace(/^\s\s*/, '').replace(/\s\s*$/, '') ) {
                                                    tempPathways.push(leftLevel[j].name);
                                                }
                                            }
                                        }
                                        if(tempPathways.length <2)
                                        {
                                            continue;
                                        }
                                        var objt = {};
                                        objt.name = tempPathways[0];
                                        objt.imports = [];
                                        for (var kkt = 0; kkt < tempPathways.length; ++kkt) {
                                            objt.imports.push(tempPathways[kkt]);

                                        }
                                        for (var ft = 0; ft < levelLinks.length; ++ft) {
                                            if (levelLinks[ft].name == objt.name) {
                                                if(levelLinks[ft].imports.length == objt.imports.length)
                                                {
                                                    var count = 0;
                                                    for(var gg=0; gg<levelLinks[ft].imports.length;++gg)
                                                    {
                                                        if(levelLinks[ft].imports[gg] == objt.imports[gg])
                                                        {
                                                            count++;
                                                        }
                                                    }
                                                    if(count == levelLinks[ft].imports.length)
                                                    {
                                                        break;
                                                    }
                                                }

                                            }
                                        }
                                        if (ft >= levelLinks.length)
                                            levelLinks.push(objt);
                                    }
                                    links.push(levelLinks);
                                }

                                $.ajax({
                                    url: 'json_.php',
                                    type: "POST",  // type should be POST
                                    data: {
                                        fileName: "./crossTalkLevel/" + "data" + '.json',
                                        json: JSON.stringify(links)
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
            }
        }
    });

});