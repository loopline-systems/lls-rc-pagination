import React, { ReactNode, PureComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';

interface Props extends DefaultProps, Pick<RouteComponentProps, 'history' | 'location'> {
  totalItems: number;
  onChange: (pageNumber: number) => void;
  marginTop?: number;
}

interface DefaultProps {
  defaultCurrPage: number;
  /** Maximum displayed buttons until view will switch to group mode. */
  maxViewBtnLength: number;
  /** The length of displayed button group, supports only odd numbers. */
  btnGroupLength: number;
  pageSize: number;
  leftBtnTxt: string;
  rightBtnTxt: string;
}

interface State {
  buttons: number[];
  showLeftArr: boolean;
  showRightArr: boolean;
  curPageIndex: number;
}

export default class Pagination extends PureComponent<Props, State> {
  static defaultProps: DefaultProps = {
    maxViewBtnLength: 10,
    defaultCurrPage: 1,
    btnGroupLength: 5,
    pageSize: 100,
    leftBtnTxt: 'Previous page',
    rightBtnTxt: 'Next page',
  };

  defaultCurrPage = 1;
  btnGroupLength = 5;

  constructor(props: Props) {
    super(props);
    const pages = Math.ceil(props.totalItems / props.pageSize);

    if (pages < props.defaultCurrPage) {
      this.updateHistory(1);
    } else {
      this.defaultCurrPage = props.defaultCurrPage;
    }

    if (props.btnGroupLength % 2 === 1) {
      this.btnGroupLength = props.btnGroupLength;
    }

    this.state = {
      buttons: Array.from({ length: pages }, (btn, i) => i + 1),
      showLeftArr: false,
      showRightArr: false,
      curPageIndex: this.defaultCurrPage - 1,
    };
  }

  componentDidMount() {
    this.updateArrsVis(this.defaultCurrPage - 1);
  }

  changeCur = (index: number) => {
    if (this.state.curPageIndex === index) { return; }

    this.setState({ curPageIndex: index });

    const curPage = index + 1;
    this.props.onChange(curPage);
    this.updateArrsVis(index);
    this.updateHistory(curPage);
  }

  updateHistory = (curPage: number) => {
    const searchObj = {
      ...queryString.parse(this.props.location.search),
      page: curPage,
    };

    this.props.history.push({ search: queryString.stringify(searchObj) });
  }

  goTo = (direction: 'next' | 'prev') => {
    let newIndex: number;
    if (direction === 'next') {
      newIndex = this.state.curPageIndex + 1;
    } else {
      newIndex = this.state.curPageIndex - 1;
    }

    this.changeCur(newIndex);
  }

  goToPrev = () => this.goTo('prev');

  goToNext = () => this.goTo('next');

  updateArrsVis = (curIndex: number) => {
    this.setState({
      showLeftArr: !!this.state.buttons[curIndex - 1],
      showRightArr: !!this.state.buttons[curIndex + 1],
    });
  }

  renderBtn = (btn: number, i: number) => {
    const changeCurrent = () => this.changeCur(i);
    return (
      <button
        key={i}
        className={`lls-page-btn lls-button ${this.state.curPageIndex === i ? 'cur' : ''}`}
        onClick={changeCurrent}
      >
        {btn}
      </button>
    );
  }

  renderDotsBox = (i: number) => <div key={i} className="lls-dots-box">...</div>;

  renderButtons = (): ReactNode => {
    let buttonNodes: ReactNode = null;

    // Render all buttons mode
    if (this.props.maxViewBtnLength >= this.state.buttons.length) {
      buttonNodes = this.state.buttons.map((btn, i) => (
        this.renderBtn(btn, i)
      ));
    // Render group buttons mode
    } else {
      const curIndex = this.state.curPageIndex;
      const btnsLength = this.state.buttons.length;
      const lastBtnGroupIndex = btnsLength - (this.btnGroupLength + 1);
      const lastBtnIndex = btnsLength - 1;
      const centralBtnGroupGap = Math.floor(this.btnGroupLength / 2);
      // Render start buttons group, dots marker and last page button
      if (curIndex < this.btnGroupLength) {
        buttonNodes = this.state.buttons.map((btn, i) => {
          if (i < this.btnGroupLength || i === lastBtnIndex) {
            return this.renderBtn(btn, i);
          } else if (i === this.btnGroupLength) {
            return this.renderDotsBox(i);
          }
        });
      // Render first page button, dots marker and last buttons group
      } else if (curIndex > lastBtnGroupIndex) {
        buttonNodes = this.state.buttons.map((btn, i) => {
          if (i === 0 || i > lastBtnGroupIndex) {
            return this.renderBtn(btn, i);
          } else if (i === lastBtnGroupIndex) {
            return this.renderDotsBox(i);
          }
        });
      // Render first page button, first dots marker, central group, last dots marker and last page button
      } else {
        buttonNodes = this.state.buttons.map((btn, i) => {
          if (
            i === 0
            || i === lastBtnIndex
            || (i >= curIndex - centralBtnGroupGap && i <= curIndex + centralBtnGroupGap)
          ) {
            return this.renderBtn(btn, i);
          } else if (i === 1 || i === (btnsLength - 2)) {
            return this.renderDotsBox(i);
          }
        });
      }
    }

    return buttonNodes;
  }

  render() {
    const { marginTop, leftBtnTxt, rightBtnTxt } = this.props;
    return this.state.buttons.length > 1 && (
      <div className="lls-pagination-container" style={{ marginTop }}>
        <div className="lls-button-box">
          <button
            className="lls-arr-btn-left lls-button"
            onClick={this.goToPrev}
            style={{ visibility: this.state.showLeftArr ? 'visible' : 'hidden' }}
          >
            <span>{leftBtnTxt}</span>
          </button>
          {this.renderButtons()}
          <button
            className="lls-arr-btn-right lls-button"
            onClick={this.goToNext}
            style={{ visibility: this.state.showRightArr ? 'visible' : 'hidden' }}
          >
            <span>{rightBtnTxt}</span>
          </button>
        </div>
      </div>
    );
  }
}
