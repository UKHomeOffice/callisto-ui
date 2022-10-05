import React from 'react';
import { ApplicationContext } from '../../../context/ApplicationContext';
import ApplicationError from '../ApplicationError';
import ServiceError from '../ServiceError';
import PropTypes from 'prop-types';

export class ErrorBoundary extends React.Component {
  static contextType = ApplicationContext;

  constructor(props) {
    super(props);
    this.state = { appError: false };
  }

  static getDerivedStateFromError() {
    return { appError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error);
    console.error(errorInfo);
  }

  render() {
    const { serviceError } = this.context;

    let error;
    if (this.state.appError) error = <ApplicationError />;
    else if (serviceError) error = <ServiceError />;

    return (
      <>
        {error}
        {!this.state.appError && this.props.children}
      </>
    );
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};
