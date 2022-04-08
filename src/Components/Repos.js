import React from "react";

function Repos({ data, filterKeyword }) {

    const getHighlightedElement = (text) => {
        //Split the text including separator in list using below logic
        const splittedData = text.split(
            new RegExp(`(?=${filterKeyword})|(?<=${filterKeyword})`, "gi")
        );
        return (
            <li>
                {splittedData.map((item) => {
                    //Now when the sepator which filtered keyword is encountered then return span element
                    const pattern = new RegExp(item, "gi")
                    if (pattern.test(filterKeyword)) {
                        return <span className="highlight">{item}</span>;
                    }
                    return item;
                })}
            </li>
        );
    };

    return (
        <ul className="repos-container">
            {data.map((item, index) => {
                return getHighlightedElement(item);
            })}
        </ul>
    );
}

export default Repos;
