import "./Item.css";

export function Item(props) {
  const { item, deleteThisItem } = props;

  return (
    <div className="Item">
      <div className="Item__content">{item.content}</div>
      <div className="Item__delete-icon" onClick={deleteThisItem}></div>
    </div>
  );
}
