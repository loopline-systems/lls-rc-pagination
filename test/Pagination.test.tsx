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
    const onChangeFunc = jest.fn();
    const component = shallow(
      <Pagination
        history={history}
        location={{ search: '', pathname: '', state: '', hash: '' }}
        totalItems={100}
        pageSize={20}
        onChange={onChangeFunc}
      />,
    );
    expect(toJson(component)).toMatchSnapshot();

    const pageBtns = component.find('.lls-button-box button');
    const arrBtnRight = component.find('.lls-arr-btn-right');

    expect(component.find('.lls-arr-btn-left').prop('style')).toEqual({ visibility: 'hidden' });
    expect(component.find('.lls-button-box button.cur').text()).toBe('1');
    expect(arrBtnRight.prop('style')).toEqual({ visibility: 'visible' });
    expect(pageBtns).toHaveLength(7);
    expect(component.find('.lls-dots-box')).toHaveLength(0);
    pageBtns.at(pageBtns.length - 2).simulate('click');
    expect(onChangeFunc).toHaveBeenCalled();
    expect(arrBtnRight.prop('isVisible')).toBeFalsy();
    expect(
      component
        .find('.lls-button-box button')
        .at(pageBtns.length - 2)
        .hasClass('cur'),
    ).toBeTruthy();
  });

  test('renders correctly with more then 10 pages', async () => {
    const history = createMemoryHistory();
    const onChangeFunc = jest.fn();
    const component = shallow(
      <Pagination
        history={history}
        location={{ search: '', pathname: '', state: '', hash: '' }}
        totalItems={300}
        pageSize={20}
        onChange={onChangeFunc}
      />,
    );
    expect(toJson(component)).toMatchSnapshot();

    expect(component.find('.lls-goto-input').exists()).toBeFalsy();
    const pageBtns = component.find('.lls-button-box button');
    expect(pageBtns).toHaveLength(8);
    expect(component.find('.lls-dots-box')).toHaveLength(1);

    expect(onChangeFunc).not.toHaveBeenCalled();
    pageBtns.at(2).simulate('click');
    expect(onChangeFunc).toHaveBeenCalled();
    expect(
      component
        .find('.lls-button-box button')
        .at(2)
        .hasClass('cur'),
    ).toBeTruthy();
    expect(component.find('.lls-arr-btn-left').prop('style')).toEqual({ visibility: 'visible' });
  });
});

test('renders correctly with page input', () => {
  const history = createMemoryHistory();
  const onChangeFunc = jest.fn();
  const component = shallow(
    <Pagination
      history={history}
      location={{ search: '', pathname: '', state: '', hash: '' }}
      totalItems={300}
      pageSize={20}
      onChange={onChangeFunc}
      showPageInput
    />,
  );
  expect(toJson(component)).toMatchSnapshot();
  const pageInput = component.find('.lls-goto-input');
  expect(pageInput.exists()).toBeTruthy();
});
