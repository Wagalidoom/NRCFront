import NavWrapper from "./Header.style";

const Header = () => {
  let page = 'home';

  function tt() {
    alert('dd');
  }

  return (
    <NavWrapper id="navbar">
      <div className="container">
        <div className="bithu_menu_sect">
          <div className="bithu_menu_right_sect bithu_v1_menu_right_sect" style={{height: "100%"}}>
            <div className="bithu_menu_list" style={{height: "100%"}}>
              <ul style={{height: "100%"}}>
                <li onClick={() => tt} style={{height: "100%", width: "18%", padding: "2.5%"}}>
                  <div style={{height: "100%"}}>
                    <a>Home</a>
                    <div className="barreBleu" style={{width: "69px", margin: "auto", "margin-bottom": "3px", display : page === 'home' ? "inline-block" : "none"}}></div>
                  </div>
                </li>
                <li onClick={() => {page = 'buy'}} style={{height: "100%", width: "26%", padding: "2.5%"}}>
                  <a>King's Auction</a>
                  <div className="barreBleu" style={{width: "70px", margin: "auto", "margin-bottom": "3px", display : page === 'buy' ? "inline-block" : "none"}}></div>
                </li>
                <li onClick={() => {page = 'buy_sell'}} style={{height: "100%", width: "20%", padding: "2.5%"}}>
                  <a>Market</a>
                  <div className="barreBleu" style={{width: "83px", margin: "auto", "margin-bottom": "3px", display : page === 'buy_sell' ? "inline-block" : "none"}}></div>
                </li>
                <li onClick={() => {page = 'profile'}} style={{height: "100%", width: "22%", padding: "2.5%"}}>
                  <a>Profile</a>
                  <div className="barreBleu" style={{width: "92px", margin: "auto", "margin-bottom": "3px", display : page === 'profile' ? "inline-block" : "none"}}></div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </NavWrapper>
  );
};

export default Header;
