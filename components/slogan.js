import React from "react";
import Typical from "react-typical";

function Slogan() {
  return (
    <div>
      <h4
        className="lead sloganhover"
        style={{ fontSize: "20px", color: "#737373" }}
      >
        <Typical
          steps={["Think it better", 1000, "Make it better!", 1500]}
          loop={Infinity}
          wrapper="p"
        />
      </h4>
    </div>
  );
}

export default Slogan;
