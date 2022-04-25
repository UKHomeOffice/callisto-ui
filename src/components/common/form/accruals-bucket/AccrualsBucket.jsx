const AccrualsBucket = ({
    bucketTitle,
    bucketInfo
  }) => {

    return (
        <div class="accruals-bucket__container">
            <h2 class="accruals-bucket__title">
                {bucketTitle}    
            </h2>
            <div class = "accruals-bucket__info-container">
                    {bucketInfo.map((bucketName, value) => {
                        <div class = {`accruals-bucket__row-${bucketName}`}>
                            <div class={`accruals-bucket__row-${bucketName}-name-column`}>
                                {bucketName}
                            </div>
                            <div class={`accruals-bucket__row-${bucketName}-value-column`}>
                                {value}
                            </div>
                        </div>
                    })}
            </div>
        </div>
    )
}

export default Home;