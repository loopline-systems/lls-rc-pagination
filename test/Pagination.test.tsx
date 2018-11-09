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
        onChange={(n) => {}}
      />,
    );
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
        onChange={(n) => {}}
      />,
    );
    expect(toJson(component)).toMatchSnapshot();
  });
});
