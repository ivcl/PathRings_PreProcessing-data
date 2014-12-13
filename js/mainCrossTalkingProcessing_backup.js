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
                url: "./cross-talking-protein_to_pathways.txt",
                dataType: "text",
                success: function (protein2pathways) {
                    var proteinpathways = protein2pathways.split("\r\n");

                    var _proteinPathways = {};
                    _proteinPathways.uniProtIds = [];
                    _proteinPathways.pathwayNames = [];
                    for(var i=0; i<proteinpathways.length; ++i)
                    {
                        if(proteinpathways[i] == "")
                            continue;
                        var arrays2 = proteinpathways[i].split("\t");
                        _proteinPathways.uniProtIds.push( arrays2[0] );
                        _proteinPathways.pathwayNames.push( arrays2[2] );
                    }
                    var resultString = "";
                    for(var i=0; i<_proteinPathways.uniProtIds.length; ++i)
                    {
                        var index = _uniproIdSymbols.uniProtIds.indexOf(_proteinPathways.uniProtIds[i]);
                        if(index!==-1)
                        {
                            var symbol = _uniproIdSymbols.symbols[index];
                            resultString += symbol;
                            resultString += "\t";
                            resultString += _proteinPathways.pathwayNames[i];
                            resultString += "\n";
                        }
                    }

                    $.ajax({
                        url: 'fileText.php',
                        type: "POST",  // type should be POST
                        data: {
                            fileName: "crossTalkings.txt",
                            txt: resultString
                        }, // send the string directly
                        dataType: "text",
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