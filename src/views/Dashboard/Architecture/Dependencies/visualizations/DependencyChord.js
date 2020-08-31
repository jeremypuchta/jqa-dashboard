import React from "react";
import DashboardAbstract, {
    databaseCredentialsProvided
} from "../../../AbstractDashboardComponent";
import { ResponsiveChord } from "@nivo/chord";
import DependenciesModel from "../../../../../api/models/Dependencies";

class DependencyChord extends DashboardAbstract {
    constructor(props) {
        super(props);

        this.state = {
            finalMatrixData: [],
            finalMatrixKeys: []
        };
    }

    componentDidMount() {
        super.componentDidMount();

        if (databaseCredentialsProvided) {
            var dependenciesModel = new DependenciesModel();
            dependenciesModel.readDependencies(this);
        }
    }

    handleAction(event) {
        var action = event.action;
        switch (action.actionType) {
            case "EXPERT_QUERY":
                if (databaseCredentialsProvided) {
                    var dependenciesModel = new DependenciesModel();
                    dependenciesModel.readDependencies(this);
                }
                break;
            default:
                return true;
        }
    }

    render() {
        var redirect = super.render();
        if (redirect.length > 0) {
            return redirect;
        }

        if (this.state.finalMatrixData.length === 0) {
            return "";
        }

        return (
            <div className={"visualization-wrapper"}>
                <div style={{ height: "700px" }}>
                    <ResponsiveChord
                        matrix={this.state.finalMatrixData}
                        keys={this.state.finalMatrixKeys}
                        margin={{
                            top: 170,
                            right: 170,
                            bottom: 170,
                            left: 170
                        }}
                        padAngle={0.02}
                        innerRadiusRatio={0.96}
                        innerRadiusOffset={0.02}
                        arcOpacity={1}
                        arcBorderWidth={1}
                        arcBorderColor="inherit:darker(0.4)"
                        ribbonOpacity={0.5}
                        ribbonBorderWidth={1}
                        ribbonBorderColor="inherit:darker(0.4)"
                        enableLabel={true}
                        label="id"
                        labelOffset={12}
                        labelRotation={-90}
                        labelTextColor="inherit:darker(1)"
                        colors="nivo"
                        isInteractive={true}
                        arcHoverOpacity={1}
                        arcHoverOthersOpacity={0.25}
                        ribbonHoverOpacity={0.75}
                        ribbonHoverOthersOpacity={0.01}
                        animate={true}
                        motionStiffness={90}
                        motionDamping={7}
                    />
                </div>
            </div>
        );
    }
}

export default DependencyChord;
