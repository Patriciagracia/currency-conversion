import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/App.css";
import CurrencyConverter from "./CurrencyConverter";

function App() {
  return (
    <div className="container">
      <h1 className="mt-3">Currency Converter</h1>
      <div className="App">
        <div className="currencyConverter">
          <CurrencyConverter />
        </div>
      </div>
      <div className="footer mt-2">
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
        </footer>
      </div>
    </div>
  );
}

export default App;
