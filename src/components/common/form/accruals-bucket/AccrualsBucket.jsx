import React from 'react';

const AccrualsBucket = ({
    bucketTitle,
    bucketValue,
    bucketInfo
  }) => {

    var showDetailedViewNonState = false;

    const [state, setState] = React.useState({
        showDetailedView: false
    })

    const toggleDetailedView = () => {
        console.log("here");
        const _state = {...state};
        let showDetailedView = _state.showDetailedView;
        showDetailedView = !showDetailedView;
        showDetailedViewNonState = showDetailedView;
        setState({ ..._state, showDetailedView});
    }

    return (
        <div class="accruals-bucket__container">
            <div className="accruals-bucket__title-container">
                <h2 className="govuk-body-m accruals-bucket__title">
                    {bucketTitle}    
                </h2>
                {bucketValue &&
                    <div className="govuk-body-m accruals-bucket__value"> 
                        {bucketValue}
                    </div>
                }
            </div>
            {showDetailedViewNonState &&
                <img src="./src/assets/images/caret-down.png" className="accruals-bucket__hide-detailed-view" onClick={() => toggleDetailedView()}/>
            }
            {!showDetailedViewNonState &&
                <img src="./src/assets/images/caret-left.png" className="accruals-bucket__show-detailed-view" onClick={() => toggleDetailedView()}/>
            }
            <div class = "accruals-bucket__info-container">
                    {bucketInfo.map((bucket, i) => 
                        <div key={i} className={`accruals-bucket__row`}>
                            <div class={`govuk-body-xs accruals-bucket__row-name-column`}>
                                {bucket.bucketName}
                            </div>
                            <div class={`govuk-body-xs accruals-bucket__row-value-column`}>
                                {bucket.value}
                            </div>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default AccrualsBucket;