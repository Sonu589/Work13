import React, { Component } from "react";
import Modal from "react-modal";
import "./css/Calculator.css";
import { Link } from "react-router-dom";
import ParticlesBg from "particles-bg";

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayValue: "0",
      history: [],
      isScientificMode: false,
      isHistoryModalOpen: false,
      calculatorBackgroundColor: "#f5f5f5",
      isHelpModalOpen: false,
      isMobileMenuOpen: false,
      profileImageUrl: "",
    };
  }

  componentDidMount() {
    fetch(
      "https://picsum.photos/id/" + Math.floor(Math.random() * 1000) + "/info"
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ profileImageUrl: data.download_url });
      })
      .catch((error) => {
        console.error("Error fetching profile image:", error);
      });
  }

  handleDigitClick = (digit) => {
    const { displayValue } = this.state;
    let newDisplayValue = displayValue === "0" ? digit : displayValue + digit;
    this.setState({ displayValue: newDisplayValue });
  };

  handleOperatorClick = (operator) => {
    const { displayValue } = this.state;
    if (!isNaN(displayValue[displayValue.length - 1])) {
      let newDisplayValue = displayValue + operator;
      this.setState({ displayValue: newDisplayValue });
    }
  };

  handleScientificModeToggle = () => {
    this.setState((prevState) => ({
      isScientificMode: !prevState.isScientificMode,
      calculatorBackgroundColor: this.getRandomColor(),
    }));
  };

  openHistoryModal = () => {
    this.setState({ isHistoryModalOpen: true });
  };

  getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  handleEqualClick = () => {
    const { displayValue } = this.state;
    if (!isNaN(displayValue[displayValue.length - 1])) {
      try {
        const result = eval(displayValue);
        const newHistory = [...this.state.history];
        if (newHistory.length === 50) {
          newHistory.shift();
        }
        newHistory.push(displayValue + " = " + result);
        this.setState({ displayValue: result.toString(), history: newHistory });
      } catch (error) {
        this.setState({ displayValue: "Error" });
      }
    }
  };

  handleClearClick = () => {
    this.setState({ displayValue: "0" });
  };

  openHelpModal = () => {
    this.setState({ isHelpModalOpen: true });
  };

  closeHelpModal = () => {
    this.setState({ isHelpModalOpen: false });
  };

  closeHistoryModal = () => {
    this.setState({ isHistoryModalOpen: false });
  };

  toggleMobileMenu = () => {
    this.setState((prevState) => ({
      isMobileMenuOpen: !prevState.isMobileMenuOpen,
    }));
  };

  closeMobileMenu = () => {
    this.setState({ isMobileMenuOpen: false });
  };

  render() {
    const calculatorStyle = {
      backgroundColor: this.state.calculatorBackgroundColor,
    };

    return (
      <div>
        <div className="menu-bar">
          <span className="menu-text">Calculator</span>
          <div className="menu-options">
            <Link to="/task">
              <h2 className="Backed">TaskBoard</h2>
            </Link>
            <Link to="/task/Weather">
              <h2 className="Backed">Weather</h2>
            </Link>

            <h2 className="Backed">
              <Link to="/task" style={{ color: "white" }}>
                Back
              </Link>
            </h2>
            <div className="mobile-menu-icon" onClick={this.toggleMobileMenu}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            {this.state.profileImageUrl && (
              <div className="profile-logo">
                <img
                  src={this.state.profileImageUrl}
                  alt="Profile"
                  className="profile-image"
                />
              </div>
            )}
          </div>
        </div>
        <div
          className={`mobile-menu ${this.state.isMobileMenuOpen ? "open" : ""}`}
        >
          <Link to="/task">
            <h2>TaskBoard</h2>
          </Link>
          <Link to="/task/Weather">
            <h2>Weather</h2>
          </Link>
          <h2 onClick={this.closeMobileMenu}>Back</h2>
        </div>
        <ParticlesBg type="fountain" bg={true} />
        <div className="calculators" style={calculatorStyle}>
          <div className="display">
            <input
              className="texti"
              type="text"
              value={this.state.displayValue}
              readOnly
              style={{ color: "black" ,fontSize:"50px"}}
            />
          </div>
          <div className="buttons">
            <button onClick={() => this.handleDigitClick("7")}>7</button>
            <button onClick={() => this.handleDigitClick("8")}>8</button>
            <button onClick={() => this.handleDigitClick("9")}>9</button>
            <button onClick={() => this.handleOperatorClick("+")}>+</button>
            <button onClick={() => this.handleDigitClick("4")}>4</button>
            <button onClick={() => this.handleDigitClick("5")}>5</button>
            <button onClick={() => this.handleDigitClick("6")}>6</button>
            <button onClick={() => this.handleOperatorClick("-")}>-</button>
            <button onClick={() => this.handleDigitClick("1")}>1</button>
            <button onClick={() => this.handleDigitClick("2")}>2</button>
            <button onClick={() => this.handleDigitClick("3")}>3</button>
            <button onClick={() => this.handleOperatorClick("*")}>*</button>
            <button onClick={() => this.handleDigitClick("0")}>0</button>
            <button onClick={() => this.handleOperatorClick(".")}>.</button>
            <button onClick={() => this.handleEqualClick()}>=</button>
            <button onClick={() => this.handleOperatorClick("/")}>/</button>
            <button onClick={() => this.handleClearClick()}>C</button>
            <button onClick={() => this.handleScientificModeToggle()}>
              {this.state.isScientificMode ? "Normal" : "Scientific"}
            </button>
            <button onClick={this.openHistoryModal}>History</button>
            <button onClick={this.openHelpModal}>Help</button>
          </div>
          {this.state.isHistoryModalOpen && (
            <div className="history-modal">
              <div className="history-content">
                <h2>Calculation History</h2>
                <ul>
                  {this.state.history.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <button onClick={this.closeHistoryModal}>Close</button>
              </div>
            </div>
          )}
          <Modal
            isOpen={this.state.isHelpModalOpen}
            onRequestClose={this.closeHelpModal}
            contentLabel="Help Modal"
            ariaHideApp={false}
          >
            <div className="help-modal">
              <div className="help-content">
                <h2>Calculator Instructions</h2>
                <p>
                  This calculator supports basic arithmetic operations: addition
                  (+), subtraction (-), multiplication (*), and division (/).
                  Enter numbers using the numeric buttons, and use the operator
                  buttons to perform calculations. Click the "=" button to see
                  the result.
                </p>
                <button onClick={this.closeHelpModal}>Close</button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Calculator;
