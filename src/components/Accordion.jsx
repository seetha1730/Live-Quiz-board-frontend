// components/Accordion.js
import PropTypes from 'prop-types';

import  { useState } from 'react';

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleItemClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {items.map((item, index) => (
        <div key={index} className="accordion-item bg-base-purple border-light-purple m-2 rounded-md">
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
Accordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
};


export default Accordion;
