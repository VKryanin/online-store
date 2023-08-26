import React from "react";

export const CreateItem = ({ formHidden, setFormHidden, formFor }) => {
    if (formFor === 'type') {
        return <div className="createItem">
            {formFor}
        </div>
    } else if (formFor === 'brand') {
        return <div className="createItem">
            {formFor}
        </div>
    } else {
        return <div className="createItem">
            {formFor}
        </div>
    }


}