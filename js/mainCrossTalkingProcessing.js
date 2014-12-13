/**
 * Created by Yongnanzhu on 5/12/2014.
 */
//Global variable for counting the bubble number
$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "./uniproId2Symbols.txt",
        dataType: "text",
        success: function (uniproId2Symbols) {
            var uniproIdSymbols = uniproId2Symbols.split("\r\n");
            var _uniproIdSymbols = {};
            _uniproIdSymbols.uniProtIds = [];
            _uniproIdSymbols.symbols = [];
            for(var i=0; i<uniproIdSymbols.length; ++i)
            {
                if(uniproIdSymbols[i] == "")
                    continue;
                var arrays = uniproIdSymbols[i].split("\t");
                _uniproIdSymbols.uniProtIds.push( arrays[0] );
                _uniproIdSymbols.symbols.push( arrays[1] );
            }
            $.ajax({
                type: "GET",
                url: "./(cross-talking-pathways)uniprot_2_pathways.txt",
                dataType: "text",
                success: function (protein2pathways) {
                    var proteinpathways = protein2pathways.split("\r\n");

//                    var _proteinPathways = {};
//                    _proteinPathways.uniProtIds = [];
//                    _proteinPathways.symbols = [];
//                    _proteinPathways.pathwayNames = [];
                    var _proteinPathways = [];

                    for(var i=0; i<proteinpathways.length; ++i)
                    {
                        if(proteinpathways[i] == "")
                            continue;
                        var arrays2 = proteinpathways[i].split("\t");
                        if(arrays2[2].indexOf("]:")==-1)
                        {
                            continue;
                        }

                        var index = _uniproIdSymbols.uniProtIds.indexOf(arrays2[0]);
                        if(index!==-1)
                        {
//                            _proteinPathways.uniProtIds.push( arrays2[0] );
//                            var pathways = arrays2[2].split("]:")[1].split(";");
//                            var symbol = _uniproIdSymbols.symbols[index];
//                            _proteinPathways.symbols.push(symbol);
//                            _proteinPathways.pathwayNames.push( pathways );
                            var obj = {};
                            obj.uniProtIds= arrays2[0] ;
                            var pathways = arrays2[2].split("]:")[1].split(";");
                            var symbol = _uniproIdSymbols.symbols[index];
                            obj.symbols=symbol;
                            obj.pathwayNames= pathways ;
                            _proteinPathways.push(obj);
                        }

                    }

                    $.ajax({
                        url: 'fileJson.php',
                        type: "POST",  // type should be POST
                        data: {
                            fileName: "crossTalkingPathways.json",
                            json: JSON.stringify(_proteinPathways)
                        }, // send the string directly
                        dataType: "json",
                        success: function (data) {
                            return true;
                        },
                        complete: function () {
                        },
                        error: function (xhr, textStatus, errorThrown) {
                            return false;
                        }
                    });
                }
                });

        }
    });
});