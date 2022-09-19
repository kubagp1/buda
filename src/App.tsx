import React, { useState, useRef } from "react";
import { ReactElement } from "react";

import data from "./data.json";

function NewlineText(props) {
  const text = props.text;
  const newText = text.split("\n").map((str) => <p>{str}</p>);

  return newText;
}

export default function App() {
  const [selectedCompanyId, selectCompanyId] = useState("");

  const popupContainerRef = useRef(null);

  const cardsDOM: ReactElement[] = [];
  for (let companyId in data) {
    const company = data[companyId];
    cardsDOM.push(
      <div
        className="card"
        onClick={() => {
          selectCompanyId(companyId);
        }}
      >
        {company.name}
      </div>
    );
  }

  const selectedCompany = data[selectedCompanyId];

  const popup =
    selectedCompanyId === "" ? null : (
      <div
        className="popupContainer"
        ref={popupContainerRef}
        onClick={(e) => {
          if (e.target === popupContainerRef.current) selectCompanyId("");
        }}
      >
        <div className="popup">
          <div className="topRow">
            <div className="name">{selectedCompany.name}</div>
            <div className="logo">
              <img
                src={selectedCompany.picture}
                alt={selectedCompany.name + "'s logo"}
              />
            </div>
          </div>
          <div className="bottomRow">
            <div className="compatibleWith">
              <ul>
                {selectedCompany.compatibleWith.map((el) => (
                  <li>{el}</li>
                ))}
              </ul>
            </div>
            <div className="address">
              <NewlineText text={selectedCompany.address}></NewlineText>
            </div>
            <div className="map">
              <iframe
                width="600"
                height="400"
                frameBorder="0"
                referrerPolicy="no-referrer-when-downgrade"
                src={selectedCompany.map}
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <React.Fragment>
      {popup}
      <header>Partnerzy ZST</header>
      <div className="container">{cardsDOM}</div>
    </React.Fragment>
  );
}
