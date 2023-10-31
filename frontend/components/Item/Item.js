import "./Item.css";

export function Item(props) {
  const { item, deleteItem } = props;

  return (
    <div className="Item">
      <div className="Item__content">{item.content}</div>
      <div className="Item__delete-icon" onClick={()=> deleteItem(item._id)}></div>
    </div>
  );
}
