const PhaseBanner = () => {
  return (
    <>
      <div
        class="govuk-phase-banner"
        style={{ backgroundColor: "white", borderTop: "1px solid #b1b4b6" }}
      >
        <p class="govuk-phase-banner__content">
          <strong class="govuk-tag govuk-phase-banner__content__tag">
            beta
          </strong>
          <span class="govuk-phase-banner__text">
            This is a new service – your{" "}
            <a class="govuk-link" href="#">
              feedback
            </a>{" "}
            will help us to improve it.
          </span>
        </p>
      </div>
    </>
  );
};

export default PhaseBanner;
