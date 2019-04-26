import React from 'react';
import ReactDOM from 'react-dom';
import { RouteComponentProps, Route, BrowserRouter as Router } from 'react-router-dom';

import Pagination from '../../src/Pagination';
import '../../src/pagination.scss';

import './index.scss';

interface State {
  curPage: number;
}

class App extends React.Component<{}, State> {
  state = {
    curPage: 0,
  };

  totalItems = 100;
  pageSize = 20;
  pageCount: number;

  constructor(props: {}) {
    super(props);

    this.pageCount = this.totalItems / this.pageSize;
  }

  changePage = (pageNumber: number) => {
    this.setState({ curPage: pageNumber - 1 });
  }

  renderPage = ({ location, history }: RouteComponentProps<any>) => {
    return (
      <>
        <div>
          <div className="pages-container">
            {Array.from({ length: this.pageCount }, (__, i) => (
              <div key={i} className={`page ${this.state.curPage === i ? 'cur' : ''}`}>
                Page #{i + 1}
              </div>
            ))}
          </div>
          <Pagination
            history={history}
            location={location}
            totalItems={this.totalItems}
            pageSize={this.pageSize}
            onChange={this.changePage}
          />
        </div>
        <h2>Pagination with more then 10 pages:</h2>
        <div>
          <Pagination
            marginTop={40}
            history={history}
            location={location}
            totalItems={300}
            pageSize={20}
            onChange={() => {}}
          />
        </div>
        <h2>Pagination with more then 10 pages and extended center button group:</h2>
        <div>
          <Pagination
            marginTop={40}
            history={history}
            location={location}
            btnGroupLength={9}
            totalItems={400}
            pageSize={20}
            onChange={() => {}}
            showPageInput
          />
        </div>
      </>
    );
  }

  render() {
    return (
      <Router>
        <Route component={this.renderPage} />
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
