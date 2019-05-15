import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { mount,shallow,render } from 'enzyme';
import Detail from './Pages/Detail';
import List from './Pages/List';
import Link from 'react-router-dom';
import {getShipmentDataById} from './actions.js';



describe('App', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<App debug />);
  
    expect(component).toMatchSnapshot();
  });
});

describe('Detail', () => {
  it('should render properly', () => {
    const component = shallow(<Detail/>);
  
    expect(component).toMatchSnapshot();
  });
});

describe('List', () => {
  it(' should render properly', () => {
    const component = shallow(<List/>);
  
    expect(component).toMatchSnapshot();
  });
});

// describe('List', () => {
//   it('button click should hide component', () => {
//     const component = mount(<List/>);
//     component
//       .find('.sid')
//       .simulate('click');
//     expect(getShipmentDataById).toHaveBeenCalled();
//     component.unmount();
//   });
 
// });

