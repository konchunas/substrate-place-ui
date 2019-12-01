import React from "react";
import { Label } from "semantic-ui-react";
import { If } from "oo7-react";
import { runtime, chain, system, nodeService } from "oo7-substrate";

import { Pretty } from "./Pretty";

class Heading extends React.Component {
  render() {
    return (
      <div>
        <If
          condition={nodeService().status.map(x => !!x.connected)}
          then={
            <Label>
              Connected{" "}
              <Label.Detail>
                <Pretty
                  className="value"
                  value={nodeService().status.sub("connected")}
                />
              </Label.Detail>
            </Label>
          }
          else={<Label>Not connected</Label>}
        />
        <Label>
          Name{" "}
          <Label.Detail>
            <Pretty className="value" value={system.name} /> v
            <Pretty className="value" value={system.version} />
          </Label.Detail>
        </Label>
        <Label>
          Chain{" "}
          <Label.Detail>
            <Pretty className="value" value={system.chain} />
          </Label.Detail>
        </Label>
        <Label>
          Runtime{" "}
          <Label.Detail>
            <Pretty className="value" value={runtime.version.specName} /> v
            <Pretty className="value" value={runtime.version.specVersion} /> (
            <Pretty className="value" value={runtime.version.implName} /> v
            <Pretty className="value" value={runtime.version.implVersion} />)
          </Label.Detail>
        </Label>
        <Label>
          Height{" "}
          <Label.Detail>
            <Pretty className="value" value={chain.height} /> (with{" "}
            <Pretty className="value" value={chain.lag} /> lag)
          </Label.Detail>
        </Label>
        <Label>
          Total issuance{" "}
          <Label.Detail>
            <Pretty className="value" value={runtime.balances.totalIssuance} />
          </Label.Detail>
        </Label>
      </div>
    );
  }
}

export default Heading;
