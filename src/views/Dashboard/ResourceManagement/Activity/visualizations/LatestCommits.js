import React from "react";
import DashboardAbstract, {
    databaseCredentialsProvided
} from "../../../AbstractDashboardComponent";
import LatestCommitsModel from "../../../../../api/models/LatestCommits";
import ReactTable from "react-table";

class LatestCommits extends DashboardAbstract {
    constructor(props) {
        super(props);

        this.state = {
            startDate: "1970-01-01",
            endDate: "3000-12-31",
            latestCommits: []
        };
    }

    componentWillMount() {
        super.componentWillMount();
    }

    componentDidMount() {
        super.componentDidMount();
        if (databaseCredentialsProvided) {
            var latestCommitsModel = new LatestCommitsModel();
            latestCommitsModel.readLatestCommits(
                this,
                this.state.startDate,
                this.state.endDate
            );
        }
    }

    componentWillUnmount() {
        super.componentWillUnmount();
    }

    handleAction(event) {
        var action = event.action;
        var latestCommitsModel = "";
        switch (action.actionType) {
            case "EXPERT_QUERY":
                latestCommitsModel = new LatestCommitsModel();
                latestCommitsModel.readLatestCommits(
                    this,
                    this.state.startDate,
                    this.state.endDate
                );
                break;
            case "DATERANGEPICKER_MODIFIED":
                this.setState({
                    startDate: action.data.displayFrom,
                    endDate: action.data.displayTo
                });
                latestCommitsModel = new LatestCommitsModel();
                latestCommitsModel.readLatestCommits(
                    this,
                    this.state.startDate,
                    this.state.endDate
                );
                break;
            default:
                break;
        }
    }

    render() {
        var redirect = super.render();
        if (redirect.length > 0) {
            return redirect;
        }

        if (this.state.latestCommits.length === 0) {
            return "";
        }

        return (
            <div className={"visualization-wrapper display-block clear"}>
                <div style={{ minHeight: "409px" }}>
                    <ReactTable
                        data={this.state.latestCommits}
                        columns={[
                            {
                                Header: "Author",
                                accessor: "author"
                            },
                            {
                                Header: "Date",
                                accessor: "date"
                            },
                            {
                                Header: "Message",
                                accessor: "message"
                            }
                        ]}
                        pageSizeOptions={[10, 20]}
                        defaultPageSize={10}
                        className="-striped -highlight"
                    />
                </div>
            </div>
        );
    }
}

export default LatestCommits;
