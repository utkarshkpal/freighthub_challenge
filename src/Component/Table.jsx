import React, { Component } from "react";
import { Table, Input, Button, Popconfirm, Form,Tag } from "antd";
import Search from "./Search";
import {Link} from 'react-router-dom';


const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false
  };


  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  render() {
    const { editing } = this.state;
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {form => {
              this.form = form;
              return editing ? (
                <FormItem >
                  {form.getFieldDecorator(dataIndex, {
                    rules: [
                      {
                        required: true,
                        message: `${title} is required.`
                      }
                    ],
                    initialValue: record[dataIndex]
                  })(
                    <Input
                      ref={node => (this.input = node)}
                      onPressEnter={this.save}
                      onBlur={this.save}
                    />
                  )}
                </FormItem>
              ) : (
                <div
                  className="editable-cell-value-wrap"
                  
                  onClick={this.toggleEdit}
                >
                  {restProps.children}
                </div>
              );
            }}
          </EditableContext.Consumer>
        ) : (
          restProps.children
        )}
      </td>
    );
  }
}

class EditableTable extends React.Component {
 
  
  constructor(props) {
    super(props);

    this.columns = [
      {
        title: "Shipment Id",
        dataIndex: "id",
        key: "id",
        sorter: this.lexicoSort,
        render: id => {
          return (
            <Link className='sid' to={`/detail/${id}`}>
              <Tag style={{cursor:'pointer'}} color='blue' key={id}>
              {id.toUpperCase()}
             </Tag>
            </Link>
            
          );
        }

      },
      {
        title: "Shipment Name",
        dataIndex: "name",
        width: "30%",
        editable: true,
        key: "name"
      },
      {
        title: "Mode",
        dataIndex: "mode",
        key: "mode"
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type"
      },
      {
        title: "Total",
        dataIndex: "total",
        key: "total",
        sorter: (a, b) => a.total - b.total
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: status => {
          let color = 'yellow'
         if (status === 'COMPLETED') {
            color = 'green';
          }
          return (
            <Tag color={color} key={status}>
              {status.toUpperCase()}
            </Tag>
          );
        }
      }
    ];

    this.state = {
      dataSource: [],
      count: null
    };
  }

  getShipments = () => {
    const url = "http://localhost:3004/shipments";
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        this.setState({ dataSource: data, count: data.length });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getShipments();
  }

  lexicoSort = (a, b) => {
    return 1;
  };

  handleSave = row => {
    const { updateName } = this.props;
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => {
      //   debugger;
      return row.id === item.id;
    });
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });

    this.setState({ dataSource: newData }, () => {
      const { dataSource } = this.state;
      updateName(dataSource[index]);
    });
  };

  render() {
    const { dataSource } = this.state;
    const {history} = this.props;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        })
      };
    });
    return dataSource.length ? (
      <div>
        {/* <Button
          onClick={this.handleAdd}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          Add a row
        </Button> */}
         <div className='searchWrapper'>
          <Search history={history} dataSource={dataSource} />
        </div>
        <Table
          
          size="medium"
          pagination={{ pageSize: 20 }}
          rowKey={record => record.id}
          history={history}
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    ) : null;
  }
}
export default EditableTable;
