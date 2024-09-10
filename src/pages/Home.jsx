import { Link } from "react-router-dom";
import useStock from "../hooks/UseStock";
import "../index.css";

export default function Home() {
  const { items } = useStock();

  const diversity = items.length;
  const inventory = items.reduce((sum, item) => +sum + +item.quantity, 0);

  const today = new Date();
  const limitDate = new Date();
  limitDate.setDate(limitDate.getDate() - 10);
  const recentItems = items.filter(
    (item) => item.createdAt >= limitDate && item.createdAt <= today
  );
  const recentTotal = recentItems.length;

  const lowQuantityItems = items.filter((item) => item.quantity < 10);
  const lowQuantityTotal = lowQuantityItems.length;

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="row-dash mt-4">
        <div className="dash-block">
          Diversidade de items
          <span>{diversity}</span>
        </div>
        <div className="dash-block">
          Inventário total
          <span>{inventory}</span>
        </div>
        <div className="dash-block">
          Itens recentes
          <span>{recentTotal}</span>
        </div>
        <div className="dash-block">
          Itens acabando
          <span>{lowQuantityTotal}</span>
        </div>
      </div>

      <div className="tables-container">
        <table className="table table-dark mt-3">
          <thead>
            <tr>
              <th>Itens Recentes</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {recentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>

                <td>
                  {" "}
                  <Link to={`/items/${item.id}`} className="btn btn-secondary">
                    Ver{" "}
                  </Link>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="table table-dark table-striped-columns mt-3 container-table">
          <thead>
            <tr>
              <th>Itens Acabando</th>
              <th>Qtd.</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {lowQuantityItems.map((item) => (
              <tr key={item.id}>
                <td className="align-middle">{item.name}</td>
                <td>{item.quantity}</td>
                <td className="">
                  {" "}
                  <Link to={`/items/${item.id}`} className="btn btn-secondary">
                    Ver{" "}
                  </Link>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
