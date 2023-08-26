import React from "react";
import { LabelItem } from "../LabelItem/LabelItem";

export const CreateItem = ({ formHidden, setFormHidden, formFor }) => {


    return <div className="createItem">
        <form name={formFor}>
            {formFor === 'type'
                ? (<LabelItem title={"type"} name={formFor} />)
                : (formFor === 'brand'
                    ? <LabelItem />
                    : <LabelItem />
                )
            }
        </form>
    </div>


}
