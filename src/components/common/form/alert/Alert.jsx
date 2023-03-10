import { classBuilder } from '@not-govuk/component-helpers';
import { InsetText } from '@not-govuk/inset-text';
import PropTypes from 'prop-types';

import '../assets/Alert.scss';

export const Alert = ({
  children,
  classBlock = 'hods-alert',
  classModifiers,
  className,
  heading,
  ...attrs
}) => {
  const classes = classBuilder(
    'hods-alert',
    classBlock,
    classModifiers,
    className
  );

  return (
    <InsetText
      {...attrs}
      classBlock={'hods-alert'}
      classModifiers={classModifiers}
      className={className}
    >
      <h2 className={classes('heading')}>{heading}</h2>
      <p>{children}</p>
    </InsetText>
  );
};

export default Alert;

Alert.propTypes = {
  children: PropTypes.any,
  classBlock: PropTypes.any,
  classModifiers: PropTypes.any,
  className: PropTypes.any,
  heading: PropTypes.any,
};
