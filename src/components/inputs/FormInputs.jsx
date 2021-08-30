import './style.css'
import PropTypes from 'prop-types'


const FormInputs = ({name,type,label,value,bg,id, onChange}) => {
  return (
    <div className='form__container'>
      <input
        className='input__email'
        name={name}
        style={{backgroundColor: bg}}
        type={type}
        required={true}
        value={value}
        onChange={onChange}
      />
      <label id={id} className='label-name' name={name}>
        <span className='content-email'>{label}</span>
      </label>
    </div>
  )
}

FormInputs.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string.isRequired || PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  bg: PropTypes.string,
}

export default FormInputs
