import React from "react";
import { Link } from "react-router-dom";
import { AppLayoutPage, PageHeader } from "saagie-ui/react";

export class NewAchievement extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
      isCreated: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.createAchievement().then(() => {
      this.setState({
        ...this.state,
        isCreated: true,
      });
    });
    event.preventDefault();
  }

  async createAchievement() {
    try {
      await fetch("/api/achievement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ goal: this.state.value }),
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { isCreated, value } = this.state;
    return (
      <div className="sui-l-app-layout">
        <div className="sui-l-app-layout__subapp">
          <AppLayoutPage>
            <PageHeader title="SaagieVements">
              <Link to="/" className="sui-a-button as--primary">
                Back to achievements list
              </Link>
            </PageHeader>
            {!isCreated && (
              <React.Fragment>
                <h3>What's your achievement goal ?</h3>
                <div style={{ display: 'flex', flexDirection: "column", alignItems:'start' }}>
                  <input
                    type="text"
                    value={value}
                    onChange={this.handleChange}
                  ></input>
                  <button
                    type="submit"
                    onClick={this.handleSubmit}
                    disabled={!value.length}
                  >
                    Create
                  </button>
                </div>
              </React.Fragment>
            )}
            {isCreated && <h3>Your new achievement was created.</h3>}
          </AppLayoutPage>
        </div>
      </div>
    );
  }
}
