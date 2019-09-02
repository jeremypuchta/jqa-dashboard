import { neo4jSession } from "../../views/Dashboard/AbstractDashboardComponent";

class FileTypesModel {
    constructor(props) {
        const fileTypeQuery =
            "MATCH (f:Git:File) " +
            'WITH f, split(f.relativePath, ".") as splittedFileName ' +
            "RETURN splittedFileName[size(splittedFileName)-1] as filetype, count(f) as files " +
            "ORDER BY files DESC";
        localStorage.setItem("filetype_original_query", fileTypeQuery);

        this.state = {
            queryString: fileTypeQuery
        };

        if (!localStorage.getItem("filetype_expert_query")) {
            localStorage.setItem(
                "filetype_expert_query",
                this.state.queryString
            );
        } else {
            this.state.queryString = localStorage.getItem(
                "filetype_expert_query"
            );
        }
    }

    readFiletypes(thisBackup) {
        var aggregatedData = [];
        neo4jSession
            .run(this.state.queryString)
            .then(function(result) {
                var showSmallValues = result.records[0].get(1).low < 50;
                result.records.forEach(function(record) {
                    var recordConverted = {
                        id: record.get(0),
                        label: record.get(0),
                        value: record.get(1).low
                    };

                    if (
                        recordConverted.id !== null &&
                        (showSmallValues || recordConverted.value > 3)
                    ) {
                        //below 3 is considered too small to display
                        aggregatedData.push(recordConverted);
                    }
                });
            })
            .then(function(context) {
                thisBackup.setState({ filetypeData: aggregatedData });
            })
            .catch(function(error) {
                console.log(error);
            });
    }
}

export default FileTypesModel;
