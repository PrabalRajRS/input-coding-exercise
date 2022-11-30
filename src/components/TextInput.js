import React, { useEffect, useState } from "react";
import { countries, products } from "../constants";

const TextInput = () => {
    const [text, setText] = useState(""); //displays in input field.
    const [showSuggestion, setShowSuggestion] = useState(false);
    const [temp, setTemp] = useState('');
    const [currentItem, setCurrentItem] = useState(countries); //current item to display in suggestion.

    const handleChange = (e) => {
        const { value } = e.target;
        setTemp(value);  //setting temporary value while typing.
        setShowSuggestion(true);
        setText(value)
    }

    useEffect(() => {
        //setting current item to display in suggestions.
        if (text.charAt(text.length - 1) === ".") {
            setTemp("")
            if (temp.length > 1) {
                setCurrentItem(products);
            }
        } else if (text.charAt(text.length - 1) === " ") {
            setTemp("")
            setCurrentItem(countries);
        } else if (text.length == 0) {
            setTemp("")
            setCurrentItem(countries);
        }
    }, [temp])

    //to display onclicking the suggestion word
    const addText = (item) => {
        setTemp("")
        setText(text + item)
        setShowSuggestion(false)
    }

    //get the last word of the sentence we type
    const renderWord = (words) => {
        var n = words.split(" ");
        if (currentItem === countries) {
            return n[n.length - 1];
        } else if (currentItem === products) {
            return n[n.length - 1].substr(n[n.length - 1].indexOf('.') + 1);
        }
    }

    return (
        <div className="textinput">
            <textarea onChange={handleChange} type="textarea" value={text} />
            {(showSuggestion && currentItem) &&
                <div className="suggestionContainer">
                    {
                        //rendering the suggestion menu.
                        currentItem.filter((item) => item.toLowerCase().indexOf(renderWord(temp).toLowerCase()) > -1)
                            .map((item) => (
                                <div className="suggestion-item" onClick={() => addText(item)}>{item}</div>
                            ))}
                </div>}
        </div>
    )
}

export default TextInput;