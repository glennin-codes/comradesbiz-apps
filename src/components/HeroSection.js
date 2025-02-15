import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../styles/Button";
import styled from "styled-components";
const HeroSection = ({ myData }) => {
  // console.log(myData)
  const { name } = myData;
  return (
    <Wrapper>
      <div className="container">
        <div className="grid grid-two-column">
          <div className="hero-section-data">
            <p className="intro-data">Welcome to </p>
            <h1>{name}</h1>
            <p>
              Where buying and selling secondhand products has never been
              easier. Our marketplace is designed to help students save money
              and reduce waste by giving their pre-loved items a new life.
            </p>
            <p>
              With comradeBiz, you can find textbooks, electronics, furniture,
              and more at prices that won't break the bank. Say goodbye to
              overpriced items and hello to affordable options.
            </p>
            <p>
              But it's not just about buying. If you have items you no longer
              need, you can sell them on our platform and earn some extra cash.
              It's a win-win situation.
            </p>
            <p>
              Join our comrades community of savvy shoppers and sellers today.
              Sign up as a vendor and start selling your pre-loved items, or
              browse our selection and shop now.
            </p>

            <NavLink to="/products" style={{ marginRight: "4rem" }}>
              <Button>Shop Now</Button>
            </NavLink>
            <NavLink to="/login">
              <Button>SignUp as a Vender</Button>
            </NavLink>
          </div>
          <div className="hero-section-image">
            <figure>
              <img
                src="images/hero.jpg"
                alt="hero-section-photo"
                className="img-style"
              />
            </figure>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  padding: 12rem 0;
  img {
    min-width: 10rem;
    height: 10rem;
  }
  .hero-section-data {
    p {
      margin: 2rem 0;
    }
    h1 {
      text-transform: capitalize;
      font-weight: bold;
    }
    .intro-data {
      margin-bottom: 0;
    }
  }
  .hero-section-image {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  figure {
    position: relative;
    &::after {
      content: "";
      width: 60%;
      height: 80%;
      background-color: rgba(81, 56, 238, 0.4);
      position: absolute;
      left: 50%;
      top: -5rem;
      z-index: -1;
    }
  }
  .img-style {
    width: 100%;
    height: auto;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid {
      gap: 10rem;
    }
    figure::after {
      content: "";
      width: 50%;
      height: 100%;
      left: 0;
      top: 10%;
      /* bottom: 10%; */
      background-color: rgba(81, 56, 238, 0.4);
    }
  }
`;
export default HeroSection;
