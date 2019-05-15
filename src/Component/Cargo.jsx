import React, { Component } from "react";
import {Table} from 'antd';

const Cargo = ({cargo}) => {
   
      
      const columns = [
        {
          title: 'Type',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Volume',
          dataIndex: 'volume',
          key: 'volume',
        },
      ];
      
     return <Table  pagination='false' size='small' dataSource={cargo}  rowKey={record => record.description} columns={columns} />;
};

export default Cargo;