import React from "react"

export default function Location(props) {
    return (
        <div className="location">
          <img src={props.item.imageUrl} width="125px" height="168px" />
          <div className="info">
            <img src="../images/google-maps-logo.png" width="7px" height="10px" /><div className="country">{props.item.location}</div><div className="link-to-map">View on Google Maps</div>
            <h1 className="venue">{props.item.title}</h1>
            <div className="stay-days">{props.item.startDate} - {props.item.endDate}</div>
            <p className="description">{props.item.description}</p>
          </div>
        </div>    
    );
}