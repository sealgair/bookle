import React from 'react'
import {withTranslation} from "react-i18next";

import ServerComponent from "./ServerComponent";
import Passage from "./Passage";
import Guesses from "./Guesses";

import './App.css';
import Info from "./Info";
import HowTo from "./HowTo";
import Settings from "./Settings";
import Statistics from "./Statistics";

class App extends ServerComponent {
    constructor(props) {
        super(props);
        this.state = {
            puzzle: {
                lines: [
                    "Welcome to Bookle!"
                ]
            },
            modal: null,
        }

        this.openInfo = this.openInfo.bind(this);
        this.openHelp = this.openHelp.bind(this);
        this.openSettings = this.openSettings.bind(this);
        this.openStats = this.openStats.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openInfo() {
        this.setState({modal: "info"});
    }

    openHelp() {
        this.setState({modal: "help"});
    }

    openSettings() {
        this.setState({modal: "settings"});
    }

    openStats() {
        this.setState({modal: "stats"});
    }

    closeModal() {
        this.setState({modal: null});
    }

    render() {
        let t = this.props.t;
        let font = "";
        return (
            <div className="Container">
                {font}
                <div className="MainColumn" aria-hidden={this.state.modal ? "true" : "false"}>
                    <div className="Buffer"/>
                    <div className="ContentWrapper">
                        <header className="Header">
                            <span className="IconSet Left">
                                <button className="Help Icon TipBelow" title={t("titles.how-to")} onClick={this.openHelp}>
                                    <i className="fa-solid fa-circle-question"></i>
                                </button>
                                <button className="Info Icon TipBelow" title={t("titles.credits")} onClick={this.openInfo}>
                                    <i className="fa-solid fa-circle-info"></i>
                                </button>
                            </span>
                            <h1>Bookle</h1>
                            <span className="IconSet Right">
                                <button className="Settings Icon TipBelow" title={t("titles.settings")} onClick={this.openSettings}>
                                    <i className="fa-solid fa-gear"></i>
                                </button>
                                <button className="Stats Icon TipBelow" title={t("titles.score")} onClick={this.openStats}>
                                    <i className="fa-solid fa-square-poll-horizontal"></i>
                                </button>
                            </span>
                        </header>
                        <Passage lines={this.state.puzzle.lines}/>
                        <div className="Body">
                            <Guesses puzzle={this.state.puzzle} key={this.state.puzzle.order}/>
                        </div>
                    </div>
                </div>
                <Info on={this.state.modal === "info"} onClose={this.closeModal}/>
                <HowTo on={this.state.modal === "help"} onClose={this.closeModal}/>
                <Settings on={this.state.modal === "settings"} word={this.state.word} onClose={this.closeModal}/>
                <Statistics on={this.state.modal === "stats"} onClose={this.closeModal}/>
            </div>
        );
    }

    componentDidMount() {
        this.fetch("/today.json?tz=" + new Date().getTimezoneOffset(),
            (result) => {
                this.setState({
                    puzzle: result,
                });
            });
    }
}

export default withTranslation()(App);
