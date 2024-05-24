import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/App.css";

import CurrencyConverter from "./CurrencyConverter";

function App() {
  return (
    <div className="container">
      <h1 className="mt-3">
        <span id="currencytxt"> Currency </span>
        <span id="converterTxt">Converter</span>
      </h1>
      <div className="App">
        <div className="currencyConverter">
          <CurrencyConverter />
        </div>
      </div>
      <div className="footer mt-5">
        <footer>
          {" "}
          Developed by{" "}
          <a
            href="https://www.linkedin.com/in/patricia-gracia/"
            target="_blank"
          >
            Patricia Gracia
          </a>{" "}
          {""}. Open-sourced on {""}
          <a
            href="https://github.com/Patriciagracia/currency-conversion"
            target="_blank"
          >
            Github
          </a>
          .
          <div id="credits">
            <a
              href="https://www.flaticon.com/free-icons/exchange"
              title="exchange icons"
            >
              Exchange icons
            </a>{" "}
            created by Freepik - Flaticon.
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
