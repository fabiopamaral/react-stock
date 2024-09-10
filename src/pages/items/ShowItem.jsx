import { Link, useParams } from "react-router-dom";
import useStock from "../../hooks/UseStock";
import DeleteButton from "../../components/DeleteButton";
import "../../index.css";

export default function ShowItem() {
  const { getItem } = useStock();
  const { id } = useParams();

  const item = getItem(id);
  return (
    <div className="item mt-3">
      <div className="item-options">
        <h2>{item.name}</h2>
        <Link to={`/items/${item.id}/update`} className="btn btn-secondary">
          Atualizar
        </Link>{" "}
        <DeleteButton itemName={item.name} itemId={item.id}></DeleteButton>
      </div>
      <div className="item-info">
        <span>Categoria: {item.category}</span>
        <span>Quantidade em estoque: {item.quantity} </span>
        <span>Preço R$: {item.price}</span>
      </div>
      <p>{item.description}</p>
      <div className="item-date">
        <p>Cadastrado em: {item.createdAt.toDateString()}</p>
        <p>Atualizado em: {item.updatedAt.toDateString()}</p>
      </div>
    </div>
  );
}
