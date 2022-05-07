import React, {useState, useEffect} from "react"
import { StaticImage } from "gatsby-plugin-image"
  
function Buses(props) {
    let [busList, setBusList] = useState(null);

    const fetchBuses = () => {
        let stops = props.info.stops;
        let route = props.info.routeLabel;
  
        let url = `${process.env.GATSBY_LAMBDA_EP_BUSES}?route=${route}&stops=${stops}`;
  
        fetch(url, { mode: "cors" })
          .then(response => response.json())
          .then(data => setBusList(data["bustime-response"]["prd"]))
          .catch(e => console.error(e))
    };
      
    useEffect(() => {
        fetchBuses();
        const interval = setInterval(() => {
            fetchBuses();
        }, process.env.GATSBY_REQUEST_REFRESH_DELAY);
        return () => clearInterval(interval);
    }, []);

    console.log(props)

    return (
        <tbody className={props.info.name}>
            {busList && busList.map((item, index) => <Bus 
                key={index}
                info={props.info}
                direction={item.rtdir}
                prediction={item.prdctdn}
                destination={item.des} />)}
        </tbody>
    );
}

function Bus(props) {
    let formatPrediction = (prediction) => {
        return (isNaN(prediction) ? '' : ' min');
    }

    return (
        <tr className={props.info.name + ' ' + props.direction} style={{ backgroundColor: props.info[props.direction] }}>
            <td className="routeLabel fit">#{props.info.routeLabel}</td>
            <td className="fit">
                <span className="routeLabel">{props.info.name}</span><br />
                {props.direction}<br />
                to <strong>{props.destination}</strong>                
            </td>
            <td className={'fit arrow-image ' + props.direction}>
                <StaticImage
                    src="../images/arrow.png"
                    className="arrow-image"
                    width={100}
                    quality={100}
                    formats={["PNG"]}
                />
            </td>
            <td className="prediction"><strong>{props.prediction}</strong>{formatPrediction(props.prediction)}</td>
        </tr>
    )
}

export default Buses