import { Link } from "react-router-dom";
import useStock from "../hooks/UseStock.js";
import Button from "react-bootstrap/Button";
import DeleteButton from "./DeleteButton.jsx";

export default function ItemsTable() {
  const { items } = useStock();

  return (
    <div>
      <table className="table table-dark table-striped-columns mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Em Estoque</th>
            <th>Categoria</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.quantity} Unid.</td>
              <td>{item.category}</td>
              <td className="d-flex gap-3">
                <Link to={`/items/${item.id}`} className="btn btn-primary">
                  Ver
                </Link>
                <Link
                  to={`/items/${item.id}/update`}
                  className="btn btn-secondary"
                >
                  Atualizar
                </Link>
                <DeleteButton itemName={item.name} itemId={item.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
