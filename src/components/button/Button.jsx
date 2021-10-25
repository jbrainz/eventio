import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrapper = styled.button`
  font-family: Hind;
  font-style: normal;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
`
export const FilledButton = styled(Wrapper)`
  border-width: 0px;
  border-radius: 4px;
  color: white;
  background-color: ${(props) =>
    props.variant === 'primary'
      ? '#2176ff'
      : props.variant === 'secondary'
      ? '#FF4081'
      : '#b9bcc0'};
  width: ${(props) =>
    props.size === 'main'
      ? '240px'
      : props.size === 'main-small'
      ? '100px'
      : '70px'};
  height: ${(props) =>
    props.size === 'main'
      ? '57px'
      : props.size === 'main-small'
      ? '32px'
      : '25px'};
  font-size: ${(props) =>
    props.size === 'main'
      ? '16px'
      : props.size === 'main-small'
      ? '14px'
      : '6px'};
  cursor: pointer;
  letter-spacing: 1px;
  :hover {
    background-color: ${(props) =>
      props.variant === 'primary'
        ? '#fdfffc'
        : props.variant === 'secondary'
        ? '#fdfffc'
        : '#2176ff'};
    color: #2e3238;
    border-color: #2176ff;
    border-width: 2px;
  }
`

const OutlinedButton = styled(Wrapper)`
  width: 113px;

  color: #ff4081;
  background-color: transparent;
  font-size: 12px;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-width: 0px;
`
const IconWrapper = styled.span`
  width: 16px;
  height: 16px;
  margin-top: 15px;
  border: 1.33333e-11px solid rgba(0, 0, 0, 0.00784314);
`
export const TextWrapper = styled.span`
  width: 100%;
  text-align: center;
  text-transform: uppercase;
`

const RoundedWrapper = styled.button`
  width: 56px;
  height: 56px;
  background: ${(props) =>
    props.variant === 'primary' ? '#323c46' : '#22d486'};
  box-shadow: 0px 6px 9px rgba(0, 0, 0, 0.15);
  color: #fff;
  border-width: 0px;
  border-radius: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

export const Button = ({
  label,
  size,
  variant,
  theme,
  icon,
  type,
  onClick,
}) => {
  if (theme === 'filled') {
    return (
      <FilledButton onClick={onClick} type={type} size={size} variant={variant}>
        {label}
      </FilledButton>
    )
  } else {
    return (
      <OutlinedButton
        onClick={onClick}
        type={type}
        size={size}
        variant={variant}
      >
        <IconWrapper>
          <i className='fas fa-trash'></i>
        </IconWrapper>
        {label}
      </OutlinedButton>
    )
  }
}

export const RoundedButon = ({ onClick, variant, icon }) => {
  if (icon === 'check') {
    return (
      <RoundedWrapper onClick={onClick} variant={variant} icon={icon}>
        <i className='fas fa-check'></i>
      </RoundedWrapper>
    )
  } else {
    return (
      <RoundedWrapper onClick={onClick} variant={variant}>
        <i className='fas fa-plus'></i>
      </RoundedWrapper>
    )
  }
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  variant: PropTypes.string,
  theme: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
}

RoundedButon.propTypes = {
  variant: PropTypes.string.isRequired,
}
Button.defaultProps = {
  label: 'Button',
  size: 'main',
  variant: 'primary',
  theme: 'filled',
}
