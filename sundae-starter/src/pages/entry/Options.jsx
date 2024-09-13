import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOptions from "./ScoopOptions";
import Row from "react-bootstrap/Row";
import ToppingsOption from "./ToppingsOption";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants";
import { formatCurrency } from './../../../../react-code/8-05-QUIZ-order-confirmation-server-error/src/utilities/index';
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const { totals } = useOrderDetails();

  // optionType is 'scoops' or 'toppings'
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => {
        console.log(response.data);
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  const ItemComponent = optionType === "scoops" ? ScoopOptions : ToppingsOption;

  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionsItem = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])}</p>
      <p>{title} total: {totals[optionType]}</p>
      <Row>{optionsItem}</Row>
    </>
  );
}
