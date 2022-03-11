import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header
        className='govuk-header'
        style={{ backgroundColor: "#FFF", color: "#000" }}
        role='banner'
      >
        <div
          style={{
            align: "center",
            justifyContent: "space-between",
            wrap: "wrap",
            padding: "1em",
            flex: "0 1 auto",
            borderBottom: "1px solid #e6e6e6",
          }}
        >
          <div
            style={{
              display: "flex",
              align: "center",
              marginRight: "5",
            }}
          >
            <h2>
              <Link to='/'>Mats</Link>
            </h2>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
