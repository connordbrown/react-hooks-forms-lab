import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchVal, setSearchVal] = useState("");
  const [updatedItems, setUpdatedItems] = useState(items);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleSearchChange(event) {
    setSearchVal(event.target.value);
  }

  function addElement(element) {
    const newItemList = [...updatedItems, element];
    setUpdatedItems(newItemList);
  }

  const itemsToDisplay = updatedItems.filter((item) => {
    if (selectedCategory === "All") return true;

    else return item.category === selectedCategory;
  }); 

  const searchedItems = itemsToDisplay.filter((item) => {
    if (searchVal === "") return true;

    else return item.name.toLowerCase().includes(searchVal.toLowerCase());
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={addElement}/>
      <Filter search={searchVal} select={selectedCategory} onCategoryChange={handleCategoryChange} onSearchChange={handleSearchChange} />
      <ul className="Items">
        {searchedItems.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
