import React, { Component } from "react";
import Table from "../Component/Table";
import { updateExpression } from "@babel/types";
import { updateNameAction } from "../actions";
import { message } from "antd";
import { PageHeader } from "antd";

class List extends Component {
  state = {
    shipments: []
  };

  updateName = newData => {
    updateNameAction(newData)
      .then(newShipmentData => {
        message.success("Changes Saved");
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { history} = this.props;
    const { shipments } = this.state;
    return (
      <>
        <div className='headerWrapper elementBorder'>
               <h2>Shipment List</h2>
        </div>
        {shipments ? (
          <div className='tableWrapper'>
          <Table history={history} updateName={this.updateName} shipments={shipments} />
          </div>
        ) : null}
      </>
    );
  }
}

export default List;
