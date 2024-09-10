import { useRef, useState } from "react";
import StockItem, { CATEGORIES } from "../model/StockItem";
import useStock from "../hooks/UseStock";

export default function ItemForm({ itemToUpdate }) {
  const defaultItem = {
    name: "",
    quantity: 0,
    price: 0,
    category: "",
    description: "",
  };

  const [item, setItem] = useState(itemToUpdate ? itemToUpdate : defaultItem);
  const { addItem, updateItem } = useStock();
  const inputRef = useRef(null);

  const handleChange = (ev) => {
    setItem((currentState) => {
      return {
        ...currentState,
        [ev.target.name]: ev.target.value,
      };
    });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    try {
      if (itemToUpdate) {
        updateItem(itemToUpdate.id, item);
        alert("Item atualizado com sucesso!");
      } else {
        const validItem = new StockItem(item);
        addItem(validItem);
        setItem(defaultItem);
        inputRef.current.focus();
        alert("Item cadastrado com sucesso!");
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      inputRef.current.focus();
    }
  };

  return (
    <form className="form-container">
      <div className="first-row-form">
        <div className="input">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            name="name"
            id="name"
            value={item.name}
            ref={inputRef}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input">
          <label htmlFor="quantity">Quantidade</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            required
            value={item.quantity}
            onChange={handleChange}
            min={0}
            step={1}
          />
        </div>
        <div className="input">
          <label htmlFor="price">Preço</label>
          <input
            type="number"
            name="price"
            id="price"
            required
            value={item.price}
            onChange={handleChange}
            min={0.0}
            step={0.01}
          />
        </div>
        <div className="input">
          <label htmlFor="category">Categoria</label>
          <select
            name="category"
            id="category"
            required
            value={item.category}
            onChange={handleChange}
          >
            <option disabled value="">
              Selecione uma categoria...
            </option>
            {CATEGORIES.map((category) => (
              <option
                key={category}
                value={category}
                defaultChecked={item.category === category}
              >
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="description-block">
        <label htmlFor="description">Descrição</label>
        <textarea
          name="description"
          id="description"
          required
          rows={6}
          value={item.description}
          onChange={handleChange}
        ></textarea>
        <button
          onClick={handleSubmit}
          className="mt-3 btn btn-primary submit-btn"
        >
          Salvar
        </button>
      </div>
    </form>
  );
}
