import { useNavigate } from "react-router-dom";
import useStock from "../hooks/UseStock";

export default function DeleteButton({ itemName, itemId }) {
  const { deleteItem } = useStock();
  const navigate = useNavigate();

  const handleDelete = () => {
    if (confirm(`Tem certeza que deseja excluir o item ${itemName}?`)) {
      deleteItem(itemId);
      navigate("/items");
    }
  };

  return (
    <div>
      <button className="btn btn-danger" onClick={handleDelete}>
        Excluir
      </button>
    </div>
  );
}
