interface Props {
    searches: string[];

    onLabelClicked: (term:string) => void;
}

export default function PreviousSearches({searches, onLabelClicked}:Props) {
  return (
    <>
    <div className="previous-searches">
            <h2>Búsquedas previas</h2>
            <ul className="previous-searches-list">
                {/* <li>Goku</li>
                <li>Saitama</li>
                <li>Goku</li>
                <li>Elden Ring</li> */}
                {
                    searches.map(term =>(
                        <li key={term}
                        onClick={()=> onLabelClicked(term)}>{term}</li>
                    ))
                }
            </ul>
        </div>
    
    </>
  )
}
