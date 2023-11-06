import React from "react";

function SelectCategories({ categories, selectedFunc, selected_id }) {
    console.log(selected_id);
    return (
        <select className="form-control" onChange={selectedFunc}>
            <option value=""> -- filter by category --</option>
            {categories.map((category) => {
                return (
                    <option
                        key={category.id}
                        value={category.id}
                        selected={selected_id == category.id}
                    >
                        {category.name}
                    </option>
                );
            })}
        </select>
    );
}

export default SelectCategories;
