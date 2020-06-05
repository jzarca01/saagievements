import React from "react";
import { Link } from "react-router-dom";
import {
  AppLayoutPage,
  Datalist,
  DatalistRow,
  DatalistCol,
  DatalistColActions,
  PageHeader,
  Icon,
} from "saagie-ui/react";
import Confetti from 'react-dom-confetti';

export class Achievements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      achievements: [],
      isConfettiVisible: false,
    };
    this.showConfettis = this.showConfettis.bind(this);
  }

  componentDidMount() {
    this.getAchievements();
  }

  getAchievements() {
    return fetch("/api/achievements")
      .then((body) => body.json())
      .then((achievements) => {
        this.setState({
          achievements,
        });
      });
  }

  async unlockAchievement(achievementId) {
    try {
      await fetch(`/api/achievement/${achievementId}/unlock`, {
        method: "POST",
      });
      this.getAchievements();
      this.showConfettis()
    } catch (err) {
      console.log(err);
    }
  }

  showConfettis() {
    this.setState({
      isConfettiVisible: true,
    })
    setTimeout(() => {
      this.setState({
        isConfettiVisible: false,
      })
    }, 2000)
  }

  async createAchievement(achievementGoal) {
    try {
      await fetch("/api/achievement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ goal: achievementGoal }),
      });
      this.getAchievements();
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { achievements, isConfettiVisible } = this.state;

    return (
      <div className="sui-l-app-layout">
        <div className="sui-l-app-layout__subapp">
          <AppLayoutPage>
          <Confetti active={ isConfettiVisible } />
            <PageHeader title="SaagieVements">
              <Link to="/new-achievement" className="sui-a-button as--primary">
                New achievement
              </Link>
            </PageHeader>
            <h3>Have fun to unlock the following achievements</h3>
            <Datalist isHover>
              {achievements.map((achievement) => {
                const { id, goal, unlocked } = achievement;

                return (
                  <DatalistRow
                    key={goal}
                    onClick={() => this.unlockAchievement(id)}
                  >
                    <DatalistCol isLink level="primary">
                      {goal}
                    </DatalistCol>
                    <DatalistColActions size="s">
                      <Icon
                        style={{ opacity: unlocked ? 1 : 0.4 }}
                        name={unlocked ? "fa-trophy" : "fa-times-circle"}
                        size="xl"
                      />
                      <Icon
                        style={{ opacity: 1 }}
                        name={"fa-plus"}
                        size="xl"
                        onClick={() => this.createAchievement('this is a new achievement')}
                      />
                    </DatalistColActions>
                  </DatalistRow>
                );
              })}
            </Datalist>
          </AppLayoutPage>
        </div>
      </div>
    );
  }
}
