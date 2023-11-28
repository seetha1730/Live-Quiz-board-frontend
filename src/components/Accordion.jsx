// components/Accordion.js
import React, { useState } from 'react';

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleItemClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {items.map((item, index) => (
        <div key={index} className="accordion-item">
          <div
            className={`accordion-header ${openIndex === index ? 'open' : ''}`}
            onClick={() => handleItemClick(index)}
          >
            {item.title}
          </div>
          {openIndex === index && (
            <div className="accordion-content">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
