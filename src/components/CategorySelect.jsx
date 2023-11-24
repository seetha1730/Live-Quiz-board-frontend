import React from 'react'

function CategorySelect() {
  return (


      <select>
              {category.map((cat, i) => (
                <option key={i}>{cat}</option>
              ))}
            </select>
  )
}

export default CategorySelect