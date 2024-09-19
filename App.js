import React from "react"
import Header from "./components/Header.js"
import Location from "./components/Location.js"
import data from "./data.js"

export default function App() {
    const locations = data.map((item) => {
        return (
            <Location key={item.id} item={item} />
        );
    });
    return (
        <div className="content">
          <Header />
          <div className="list">
            {locations}
          </div>  
        </div>  
    );
}