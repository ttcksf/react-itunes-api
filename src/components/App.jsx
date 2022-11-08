import React from "react";
import { getMusics } from "../api";
import ErrorPage from "../components/modules/error";
import NoResult from "../components/modules/no_result";
import Result from "../components/modules/result";
import { fromEvent, timer } from "rxjs";
import { debounce } from "rxjs";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: "",
      resultType: "init",
      items: [],
    };
  }

  componentDidMount() {
    this.subscription = fromEvent(this.input, "input")
      .pipe(debounce(() => timer(500)))
      .subscribe(this.onSearch.bind(this));
  }
  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  handleInputChange(e) {
    this.setState({
      keyword: e.target.value,
    });
  }

  onSearch() {
    getMusics(this.state.keyword)
      .then((res) => {
        const { data } = res;
        if (data.resultCount === 0) {
          this.setState({
            resultType: "no_result",
          });
        } else {
          this.setState({
            resultType: "success",
            items: data.results,
          });
        }
      })
      .catch((err) => {
        this.setState({
          resultType: "fail",
        });
      });
  }

  switchView(resultType) {
    switch (resultType) {
      case "no_result":
        return <NoResult />;
      case "success":
        return <Result items={this.state.items} />;
      case "fail":
        return <ErrorPage />;
      default:
        return <p>検索してみよう！</p>;
    }
  }

  render() {
    const Comp = this.switchView(this.state.resultType);
    return (
      <div>
        <div className="search-area">
          <input
            type="text"
            value={this.state.keyword}
            className="search-input-rx"
            ref={(input) => (this.input = input)}
            onChange={this.handleInputChange.bind(this)}
          />
          {/* <button className="search-button" onClick={this.onSearch.bind(this)}>
            検索
          </button> */}
        </div>
        {Comp}
      </div>
    );
  }
}
