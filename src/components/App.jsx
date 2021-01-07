import React from "react";
import Particles from 'react-particles-js';
import Calculator from "./Calculator";

const particlesOptions = {
    particles: {
      line_linked: {
        shadow: {
          enable: true,
          color: "#ffa500"
        }
      },
      density: {
        enable: true,
        value_area: 800
      }
    }
  }

  const headerStyle = {
    textAlign : 'center', 
    color: '#ffa500',
    fontSize: '40px' 
  }

const App = () => {
  return (
    <div>
      <Particles 
        params={ particlesOptions }
        style={{
            width: '100%',
            backgroundColor:'#333',
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: -1
        }}
      />
        <h1 style={ headerStyle }>CALCULATOR APP</h1>
        <Calculator />
    </div>
  );
};

export default App;
