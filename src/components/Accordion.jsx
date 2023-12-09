// components/Accordion.js
import PropTypes from "prop-types";
import { useState, useContext } from "react";
import { ThemeContext } from "../context/theme.context";
const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const { theme } = useContext(ThemeContext);

  const handleItemClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {items.map((item, index) => (
        <div
          key={index}
          className={`${theme === "dark"
              ? " text-gray-300 bg-gray-800 border "
              : " text-gradient bg-base-purple border-light-purple"
            } accordion-item  m-2 rounded-md`}
        >
          <div
            className={`accordion-header ${openIndex === index ? "open" : ""}`}
            onClick={() => handleItemClick(index)}
          >
            {item.title}
          </div>
          {openIndex === index && (
            <div className="accordion-content">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
};
Accordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node,
      content: PropTypes.node,
    })
  ),
};

export default Accordion;
