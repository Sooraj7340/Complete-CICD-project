import React, {useState} from 'react'

export default function TextForm(props) {
    const handleUpClick =()=>{
        let newText = text.toUpperCase();
        setText(newText)
       // props.showAlert("Converted to uppercase!", "success");
    }

    const handleLoClick =()=>{
        let newText = text.toLowerCase();
        setText(newText)
       // props.showAlert("Converted to lowercase!", "success");
    }

    const handleClearClick = ()=>{ 
        let newText = '';
        setText(newText)
        //setText(newText);
       // props.showAlert("Text Cleared!", "success");
    }


    const handleCopy = ()=>{
        let text = document.getElementById("myBox");
        text.select();
        text.setSelectionRange(0, 9999);
        navigator.clipboard.writeText(text.value);
       // props.showAlert("Copied to Clipboard!", "success");
    }

    const handleExtraSpaces = ()=>{
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "))
       // props.showAlert("Extra spaces removed!", "success");
    }

    const handleOnChange =(event)=>{
        setText(event.target.value)
    }

    const [text, setText] = useState('');
    return (
        <>
        <div className="container" style={{color: props.mode==='dark'?'white':'#042743'}}>
            <h1>{props.heading}</h1>
            <div className="mb-3">
                <textarea className="form-control" value={text} style={{backgroundColor: props.mode==='dark'?'grey':'white', color: props.mode==='dark'?'white':'#042743'}} onChange={handleOnChange} id="exampleFormControlTextarea1" rows="8"></textarea>
            </div>
            <button type="button" className="btn btn-primary mx-2 my-2" onClick={handleUpClick}>Uppercase</button>
            <button type="button" className="btn btn-primary mx-2 my-2" onClick={handleLoClick}>Lowercase</button>
            <button type="button" className="btn btn-primary mx-2 my-2" onClick={handleCopy}>Copy</button>
            <button type="button" className="btn btn-primary mx-2 my-2" onClick={handleExtraSpaces}>Remove Spaces</button>
            <button type="button" className="btn btn-primary mx-1 my-2" onClick={handleClearClick}>Clear Text</button>
        </div>  
        <div className="container my-3" style={{color: props.mode==='dark'?'white':'#042743'}}>
            <h1>Your text summary</h1>
            <p>{text.split(" ").length} words and {text.length} characters</p>
            <p>{0.008 * text.split(" ").length} Minutes read</p>
            <h2>Preview</h2>
            <p>{text}</p>
        </div>
        </>
  )
}

