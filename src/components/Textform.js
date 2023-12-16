import React, { useState } from 'react'


export default function TextForm(props) {
    const handleUpCLick = () => {
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("converted to uppercase!", "success");
    }
    const handleDownCLick = () => {
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("converted to lowercase!", "success");
    }

    const handleOnChange = (event) => {
        setText(event.target.value);
    }

    const handleFindChange = (event) => {
        findWord(event.target.value);
    };
    const handleReplaceChange = (event) => {
      console.log(replaceWord(event.target.value)) ;
    };
    const handleReplaceClick = () => {
        let newText = text.replaceAll(fWord,rWord);
        if(text.length > 0 && text.search(fWord) >= 0){
            setText(newText);
            props.showAlert("word has been replaced!", "success");
        }
        else{
            props.showAlert("couldn't replace!", "danger");
        }
    };
    const handleClearClick = () => {
        let newText= '';
        setText(newText);
        findWord(newText);
        replaceWord(newText);
        props.showAlert("text cleared!", "success");
    };

    const handleCopy = ()=> {
        navigator.clipboard.writeText(text);
        props.showAlert("copied to clipboard!", "success");
    }

    const handleSpaces = ()=> {
        let removeEmptyLines = str => str.split(/\r?\n/).filter(line => line.trim() !== '').join('\n')
        setText(removeEmptyLines);
        props.showAlert("removed extra spaces!", "success");
    };
    
    const handleSpeak = () => {
        let msg = new SpeechSynthesisUtterance();
        msg.text = text;
        window.speechSynthesis.speak(msg);
        props.showAlert("Listen now!", "success");
    }

    const handleSentenceCaseClick = () => {
        let lowerCase = text.toLowerCase();
        let regex = /([^.!?]+[!?.\d\s]+)/g;
        let sentences = lowerCase.match(regex);
        let newText = sentences
          .map((sentence) => {
            return (sentence.charAt(0) >= "a" && sentence.charAt(0) <= "z"
              ? sentence.charAt(0).toUpperCase() + sentence.slice(1)
              : sentence);
          })
          .join("");
    
        setText(newText);
        props.showAlert("text formatted!", "success");
      };

      const handleCapitalizeWordClick = () => {
        let lowercase = text.toLowerCase();
        let words = lowercase.split(" ");
        let newWords = words.map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        });
        let newText = newWords.join(" ");
        setText(newText);
        props.showAlert("text formatted!", "success");
      };


    const [text, setText] = useState('');

    const [fWord, findWord] = useState("");
    const [rWord, replaceWord] = useState("");
    

    return (
        <>
            <div className='container' style={{color: props.mode==='dark'?'white':'black'}}>
                <h1 className='mb-4'>{props.heading} </h1>
                <div className="mb-3">
                    <textarea className="form-control" value={text} onChange={handleOnChange} style={{backgroundColor: props.mode==='dark'?'grey':'white', color: props.mode==='dark'?'white':'black'}} id="myBox" rows="8"></textarea>
                    <div className='input-group my-2'>
                    <input className="form-control" style={{backgroundColor: props.mode==='dark'?'grey':'white', color: props.mode==='dark'?'white':'black'}}value={fWord} onChange={handleFindChange} placeholder='To find' id="myBox" rows="1"></input>
                    <input className="form-control" style={{backgroundColor: props.mode==='dark'?'grey':'white', color: props.mode==='dark'?'white':'black'}} value={rWord} onChange={handleReplaceChange} placeholder='To replace' id="myBox" rows="1"></input>
                    <button disabled={text.length===0} className="btn btn-primary" onClick={handleReplaceClick}>Replace</button>
                    </div>
                </div>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleUpCLick}>Uppercase</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleDownCLick}>Lowercase</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleSpaces}>Trim extra spaces</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleSentenceCaseClick}>Format text</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleCapitalizeWordClick}>Format text - II</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleSpeak}>Listen now</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleCopy}>Copy</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleClearClick}>Clear text</button>

            </div>

            <div className="container my-3" style={{color: props.mode==='dark'?'white':'black'}}>
                <h2>Your text summary</h2>
                <p><b>{text.split(/\s+/).filter((element)=>{return element.length!==0}).length}</b> word{text.split(" ").filter((element)=>{return element.length!==0}).length>1?"s ":" "}& <b>{text.length}</b> character{text.length>1?"s ":" "}</p>
                <p><b>{0.008 * text.split(" ").filter((element)=>{return element.length!==0}).length}</b> minutes to read</p>
                <h2>Preview</h2>
                <p>{text.length>0?text:'Nothing to preview'}</p>
            </div>
        </> 

    );
}
