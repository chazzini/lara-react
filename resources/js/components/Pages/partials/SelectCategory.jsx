import React from "react";

function SelectCategories({ categories, selectedFunc }) {
    return (
        <select className="form-control" onChange={selectedFunc}>
            <option value=""> -- filter by category --</option>
            {categories.map((category) => {
                return (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                );
            })}
        </select>
    );
}

export default SelectCategories;
