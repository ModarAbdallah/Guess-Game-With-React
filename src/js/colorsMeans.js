import React from "react";

export default function Colors(){

  return(
      <div class="key-colors" >
            <h2>Key Colors</h2>
                <div class="key-color"
                
                >
                    <div class="key in-place"
                    style={{
                      backgroundColor:'green',
                      width:'20px',
                      height:'20px',
                      borderRadius:'50%'
                    }}
                    ></div>
                    <p>letter is Correct</p>
                </div>
                <div class="key-color">
                    <div class="key not-in-place"
                    style={{
                        backgroundColor:'yellow',
                        width:'20px',
                        height:'20px',
                        borderRadius:'50%'
                      }}
                    ></div>
                    <p>Letter is not in place</p>
                </div>
                <div class="key-color">
                    <div class="key wrong" style={{
                      backgroundColor:'red',
                      width:'20px',
                      height:'20px',
                      borderRadius:'50%'
                    }}>
                    
                    </div>
                    <p>Letter is Wrong</p>
                </div>
      </div>
  );
} 