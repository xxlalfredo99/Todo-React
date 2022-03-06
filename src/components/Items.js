import "./Items.css";
import { Item } from "./Item";

export function Items(props) {
  const { items, deleteItem } = props;

  return (
    <div className="Items">
      {/* Conditionally render some text if no items exist yet, otherwise
      render the list of items */}
      {items.length === 0 ? (
        <h2>No items added yet, try adding some.</h2>
      ) : (
        items.map((item, idx) => (
          <Item
            key={`item-idx-${idx}`}
            item={item}
            // The deleteItem received in props takes in the index of the item
            // to delete as an argument. However, the deleteItem expected in
            // the Item component is a function without parameters which will
            // delete the item that Item currently represents. As such, we can
            // do a little trick here where the deleteItem passed into Item is
            // an anonymous function that is setup beforehand to call
            // the version deleteItem that expects the item index
            deleteThisItem={() => deleteItem(idx)}
          />
        ))
      )}
    </div>
  );
}
