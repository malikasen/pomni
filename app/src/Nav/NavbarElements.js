import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  background: #0f899e;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  padding: 0.5rem calc((100vw - 1000px) / 6);
  z-index: 10;
  // additional
  // margin-top: -80px;
  font-size: 1rem;
  position: sticky;
  top: 0;
  flex-shrink: 0;

  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;

export const NavLink = styled(Link)`
  color: #fff;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  white-space: nowrap;

  &.active {
    color: #f2ed01;
    border-bottom: solid #f2ed01;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #f2ed01;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  width: 100vw;
  white-space: nowrap;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  justify-content: flex-end;
  width: 10vw;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
