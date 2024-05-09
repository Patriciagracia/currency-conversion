import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CurrencyConverter from "./CurrencyConverter";

function App() {
  return (
    <div className="container">
      <h1 className="mt-4">Currency Converter</h1>
      <div className="App">
        <div className="currencyConverter">
          <CurrencyConverter />
        </div>
      </div>
      <div className="footer">
        <footer> programado por patri, enlace a github </footer>
      </div>
    </div>
  );
}

export default App;
