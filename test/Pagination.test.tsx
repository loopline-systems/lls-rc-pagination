import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { createMemoryHistory } from 'history';

import Pagination from '../src/Pagination';

describe('Pagination', () => {
  beforeAll(() => {
    Enzyme.configure({ adapter: new Adapter() });
  });

  test('renders correctly', () => {
    const history = createMemoryHistory();
    const component = shallow(
      <Pagination
        history={history}
        location={{ search: '', pathname: '', state: '', hash: '' }}
        totalItems={100}
        pageSize={20}
        onChange={() => {}}
      />,
    );

    expect(component.find('.lls-arr-btn-left').getElement().props.style).toEqual({ visibility: 'hidden', });
    expect(component.find('.lls-button-box button.cur').text()).toBe('1');
    expect(component.find('.lls-arr-btn-right').getElement().props.style).toEqual({ visibility: 'visible', });
    expect(component.find('.lls-button-box button')).toHaveLength(7);
    expect(component.find('.lls-dots-box')).toHaveLength(0);
    expect(toJson(component)).toMatchSnapshot();
  });

  test('renders correctly with more then 10 pages', () => {
    const history = createMemoryHistory();
    const component = shallow(
      <Pagination
        history={history}
        location={{ search: '', pathname: '', state: '', hash: '' }}
        totalItems={300}
        pageSize={20}
        onChange={() => {}}
      />,
    );

    expect(component.find('.lls-button-box button')).toHaveLength(8);
    expect(component.find('.lls-dots-box')).toHaveLength(1);
    expect(toJson(component)).toMatchSnapshot();
  });
});
