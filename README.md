[![License](https://img.shields.io/npm/l/lls-rc-pagination.svg?style=flat-square)](http://opensource.org/licenses/MIT)
![Version](https://img.shields.io/npm/v/lls-rc-pagination.svg?style=flat-square)
![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/lls-rc-pagination.svg?style=flat-square)
![npm type definitions](https://img.shields.io/npm/types/lls-rc-pagination.svg?style=flat-square)
[![Build Status](http://img.shields.io/travis/loopline-systems/lls-rc-pagination.svg?style=flat-square)](https://travis-ci.com/loopline-systems/lls-rc-pagination)
[![Coverage Status](https://img.shields.io/coveralls/loopline-systems/lls-rc-pagination.svg?style=flat-square)](https://coveralls.io/github/loopline-systems/lls-rc-pagination?branch=master)

<!-- ![Version](https://img.shields.io/npm/dt/lls-rc-pagination.svg?style=flat-square) -->

# lls-rc-pagination

Lightweight, customizable pagination widget using TypesScript and React 16

## Demo

For example of the lls-rc-pagination, go to https://loopline-systems.github.io/lls-rc-pagination.

OR

To run that demo on your own computer:

- Clone this repository
- `npm i`
- `npm start`
- Visit http://localhost:3001/

## Getting Started

### Install

```
  npm i lls-rc-pagination -S
```

### Import in component

```
import Pagination from 'lls-rc-pagination'
import 'lls-rc-pagination/dist/pagination.css'
```

### Supported properties

```
{
  totalItems: number;
  onChange(pageNumber: number): void;
  defaultCurrPage?: number; // Default 1
  /** Maximum displayed buttons until view will switch to group mode. Default: 10 */
  maxViewBtnLength?: number;
  /** The length of displayed button group, supports only odd numbers. Default: 5 */
  btnGroupLength?: number;
  pageSize?: number; // Default: 100
  leftBtnTxt?: string; // Default: 'Previous page'
  rightBtnTxt?: string; // Default: 'Next page'
  marginTop?: number;
  /** To show page input element. Deafult: false */
  showPageInput?: boolean;
  pageInpLabel?: string; // Default: 'Go to:'
}
```
