# lls-rc-pagination

Lightweight, customizable pagination widget using TypesScript and React 16

## Demo

For example of the lls-rc-pagination, go to https://loopline-systems.github.io/lls-rc-pagination.

OR

To run that demo on your own computer:
* Clone this repository
* `npm i`
* `npm start`
* Visit http://localhost:3001/

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
  defaultCurrPage: number;
  maxViewBtnLength: number;
  btnGroupLength: number;
  pageSize: number;
  leftBtnTxt: string;
  rightBtnTxt: string;
  totalItems: number;
  marginTop?: number;
  onChange(pageNumber: number): void;
}
```
