import "./Card.scss";

const Card = ({ id, clickHandler, country, region, temperature, showTemp }) => {
  const getRandomColor = () => {
    const colorArr = ["#FFC09F", "#FFEE93", "#FCF5C7", "#ADF7B6"];

    return colorArr[Math.floor(Math.random() * colorArr.length)];
  };

  //by having key={region} we ensure that the DOM element remounts everytime the region change (after every click).
  //This ensures the animation runs each time the user clicks on an option and a new option is displayed.
  return (
    <div
      className="card"
      key={region}
      style={
        id == 2
          ? { backgroundColor: getRandomColor() }
          : { backgroundColor: "#79ADDC" }
      }
      onClick={() => clickHandler(temperature, id)}
    >
      <h1 class="card__country">{country}</h1>
      <h3 class="card__region">{region}</h3>

      {showTemp && <h1 class="card__temperature">{temperature}°C </h1>}
    </div>
  );
};

export default Card;
