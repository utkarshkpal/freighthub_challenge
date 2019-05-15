import React, {Component} from 'react';
import { PageHeader, Tag, Tabs, Button, Statistic, Row, Col } from 'antd';
import Cargo from '../Component/Cargo';
import {getShipmentDataById} from '../actions';
import { identifier } from '@babel/types';



const Content = ({origin,destination}) =>{
   
    return(
    
    <div className='elementBorder'>
    <Statistic title="Origin" value={origin}/>
    <Statistic title="Destination" value={destination}/>
    </div>
  )

}
const ExtraContent = ({total,userId}) =>{
   
    return(
        <Row>
        <Col span={12}>
          <Statistic className='elementBorder' title="UserId" value={userId} />
        </Col>
        <Col span={12}>
          <Statistic className='elementBorder' title="Total" value={total} />
        </Col>
      </Row>)

}


  
class Detail extends Component {

    state = {
        shipment:{}
    }
    componentDidMount() {

      if(this.props.match){
        const {match:{params:{id}}}= this.props;
        getShipmentDataById(id).then((res)=>{
           this.setState({shipment:res});
        });
      }
        
    }
    

    renderTag = () => {
        const {status} = this.state.shipment;
        let color = 'yellow';
        if(status.toUpperCase() == 'COMPLETED') {
            color = 'green'
        } 
        return <Tag color={color}>{status}</Tag>;
    }

    render() {
        const {shipment} = this.state;
        const { history} = this.props;
                if(Object.keys(shipment).length){
            const {
                id,name,cargo,mode,type,destination,origin,services,total,userId
            } = shipment;
            console.log(this.props.match.params.id);
            return (
              <>
               <div className='headerWrapper elementBorder'>
               <h2>Shipment Detail</h2>
               </div>
               <div className='detailContent'>
                <PageHeader
                className='detailHeader'
                onBack={() => history.push('/')}
                title={id+' ' + name}
                tags={this.renderTag()}
                extra={[
                  <span>Type : </span> ,
                  <Button key="2">{type}</Button>,
                  <span>Mode : </span> ,
                  <Button key="1" type="primary">
                    {mode.toUpperCase()}
                  </Button>
                ]}
              > 
                <Row>
                <Col span={1}/>
                    <Col span={10}>
                        <div className="wrap">
                        <div className="content padding"><Content origin={origin} destination={destination}/></div>
                        <div className="extraContent">{<ExtraContent total={total} userId={userId}/>}</div>
                        </div>
                    </Col>
                    <Col span={1} />
                    <Col span={12}>
                        <Cargo cargo={cargo}/>
                    </Col>
                </Row>
              </PageHeader>
              </div>
              </>
            );

        }else{
            return null;
        }
        
    }
}

export default Detail;