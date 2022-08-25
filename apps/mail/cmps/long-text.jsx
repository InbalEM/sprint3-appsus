

export function LongTxt({text, isLongTxtShown, descriptionLength, setIsExpanded }){
    const fullText = text

    const toggleText = () => {
        setIsExpanded(!isLongTxtShown)
      }

    return <article className="long-txt">
        <div className="description">
            {isLongTxtShown ? fullText : `${fullText.slice(0, descriptionLength)}...`}
            <span onClick={toggleText} className='toggle-button'>
            {/* {isLongTxtShown ? ' less' : ' more'} */}
            </span>
        </div>
    </article>
}   