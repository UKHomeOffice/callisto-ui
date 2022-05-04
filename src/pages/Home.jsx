import AccrualsBucket from '../components/common/form/accruals-bucket/AccrualsBucket';

const Home = () => {
  return (
    <div>
      <h1 className="govuk-heading-xl">Home page</h1>
      <AccrualsBucket bucketTitle="Hours Worked" bucketValue="2 Remaining" bucketInfo={[
        {bucketName:"This Week", value:23},
        {bucketName:"Next Week", value:42}
      ]}/>
    </div>
  );
};

export default Home;
