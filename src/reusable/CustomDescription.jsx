import React from 'react'

const CustomDescription = ({row}) => {
    return (
        
          <div
            data-tag="allowRowEvents"
            style={{
              overflow: "hidden",
              whiteSpace: "wrap",
              textOverflow: "ellipses",
            }}
          >
            {row.description}
          </div>
     
    )
}

export default CustomDescription
