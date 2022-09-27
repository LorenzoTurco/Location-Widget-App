import "./Card.scss";

const Card = ({ id, clickHandler, country, region, temperature }) => {
  const getRandomColor = () => {
    const colorArr = ["#FF595E", "#FFCA3A", "#8AC926", "#1982C4v", "#6A4C93"];

    return colorArr[Math.floor(Math.random() * colorArr.length)];
  };

  return (
    <div
      className="card"
      style={{ backgroundColor: getRandomColor() }}
      onClick={() => clickHandler(temperature, id)}
    >
      <h1>{country}</h1>
      <h2>{region}</h2>
      <h3>{temperature}</h3>
    </div>
  );
};

export default Card;
