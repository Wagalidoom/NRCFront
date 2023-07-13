import styled from "styled-components";

const NavWrapper = styled.nav`
  z-index: 999;
  .container {
    max-width: 600px;
    border-left: 1px solid ${props => props.theme.colors.border};
    border-right: 1px solid ${props => props.theme.colors.border};
    padding-left: 0;
    padding-right: 0;
  }
  @media screen and (max-width: 600px){
    .container {
        border-left: 0;
        border-right: 0;
    }
  }
  .bithu_v1_menu_right_sect {
    width: 100% !important;
  }
  .barreBleu {
    height: 4px;
    align-self: center;
    background-color: rgb(29, 155, 240);
    width: 100%;
    display: inline-flex;
    border-radius: 9999px;
    z-index:2;
    position:relative;
    @media screen and (max-width:600px){
      top:-2px;
    }
  }
  li {
    font-size: 12px;
    padding-top: 16px;
    padding-bottom: 16px;
  }
  li:hover {
    background-color: rgba(247, 247, 247, 0.1);
    color: white;
  }
  &.bithu_header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    margin-top: 1px;
    height: 53px;
    transition: all 0.3s;

    &.sticky {
      position: fixed;
      top: 0;
      width: 100%;
      background: rgba(27, 34, 38, 0.8);
      backdrop-filter: blur(15px);
      z-index: 1000;
      margin-top: 0px;
      transition: all 0.2s;
    }
  }

  .bithu_menu_sect {
    height: 40px;
    max-width:599px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color:${props => props.theme.colors.background};
    border-color:${props => props.theme.colors.border};
  }
  #scroll-nav{
    height:40px;
    max-width:599px;
    width: 100%;
    background-color:${props => props.theme.colors.background};
    border-bottom:1px solid ${props => props.theme.colors.border};
    border-right:1px solid ${props=>props.theme.colors.border};
  }

  .bithu_menu_left_sect {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 15%;

    .logo {
      a {
        display: inline-block;
      }
    }
  }

  .bithu_menu_right_sect {
    width: 85%;
    display: flex;
    align-items: center;
    justify-content: end;
  }
  .bithu_menu_list {
    width: 100%;
    ul {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0;
      padding: 0;
      li {
        position: relative;
        cursor: pointer;
        transition-duration: 0.2s;
        text-align: center;

        a, div {
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 22px;
          text-align: center;
          color:${props => props.theme.colors.text};
        }
       
        

        /* submenu */
        &.submenu {
          .sub_menu_sect {
            background: transparent;
            border-top: 50px solid transparent;
            position: absolute;
            top: -50px;
            left: -20px;
            width: 190px;
            visibility: hidden;
            opacity: 0;
            z-index: -100;
            transition: all 0.5s;

            .sub_menu_list {
              padding: 15px 20px;
              background: #171f25;
              flex-wrap: wrap;
              li {
                a {
                  font-style: normal;
                  font-weight: 400;
                  font-size: 16px;
                  line-height: 40px;
                  color: rgba(255, 255, 255, 0.8);
                  text-transform: capitalize;
                }

                &:hover {
                  a {
                    color: #00ffa3;
                  }
                }
              }
            }
          }

          &:hover {
            .sub_menu_sect {
              top: 7px;
              visibility: visible;
              opacity: 1;
              z-index: 99;
            }
          }
        }
      }
    }
  }
.mobile-menu{
  position: -webkit-fixed !important; 
  position:fixed !important;
  bottom:0px !important;
  height:50px !important;
  display: -webkit-flex !important; 
  display:flex !important;
  width:100% !important;
  -webkit-justify-content: space-around !important;
  justify-content:space-around !important;
  background-color: ${props => props.theme.name === 'Dark Theme' ? 'rgb(21,32,43, 0.9)' : 'rgb(255,255,255,0.9)'};
  z-index:10;
  border-top: 1px solid ${props => props.theme.colors.border};
}
.mobile-link{
width:25% !important;
display: -webkit-flex !important;
display:flex !important;
webkit-justify-content: center !important; 
justify-content:center !important;
align-items:center !important;
}
.mobile-link:not(:nth-child(2)) > img{
  max-width:32px
}
.mobile-link:nth-child(2) > img{
  max-width:30px;
}
@media screen and (min-width:500px){
  .mobile-menu{
    display:none !important;
  }
}
.navbar-link{
height: 100%;
padding: 2%;
padding-bottom: 0;
padding-top: 1.5%;
flex-grow:1;
}

.navbar-link>div{
display:inline-block !important;
font-weight:700 !important;
font-size:16px !important;
@media screen and (max-width:450px){
  font-size:14px !important;
}
}
.navbar-link>div>div{
  width: 100%;
  margin-bottom: 7px;
}
@media screen and (max-width:400px){
  .navbar-link>div>div{
    margin-bottom: 2px;
  }
}
@media screen and (max-width:363px){
  .navbar-link{
    padding-left:0px !important;
    padding-right:0px ! important;
  }
}
`;

export default NavWrapper;
