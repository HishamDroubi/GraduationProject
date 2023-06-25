import React from 'react'

const ButtonSubmit = ({ onClickHandler }) => {
    console.log(onClickHandler)

    if (onClickHandler)
        return (
            <button onClick={onClickHandler} class="h-10 text-white bg-sky-800 hover:bg-sky-900  rounded  text-l px-4 py-2.5 text-center mr-2 mb-2">submit</button>

        )
    else {
        return (
            <button type="submit" class="text-white bg-sky-800 hover:bg-sky-900 h-10  rounded  text-l px-4 py-2.5 text-center mr-2 mb-2">submit</button>
        )
    }
}

export default ButtonSubmit