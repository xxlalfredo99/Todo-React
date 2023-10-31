import { useRef } from "react";
import "./AddItemForm.css";

export function AddItemForm(props) {
    const { addItem } = props;

  // We need to have direct HTML access to the input for the item content
  // In vanilla JavaScript, we'd do this by using a query selector on the
  // element and then getting its value. However, doing this this is not
  // recommended in React. Instead we use a feature called refs (short for
  // references) which allow us to directly reference the HTML element object
  const itemContentRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const content = itemContentRef.current.value;
    addItem(content).then(function(){
         e.target.reset();
    });
  };

  return (
    <form className="AddItemForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="AddItemForm__item-content AddItemForm__element"
        placeholder="Enter your ToDo item"
        name="item"
        required
        // Define that we want itemContentRef to reference this input element
        ref={itemContentRef}
      />
    </form>
  );
}
