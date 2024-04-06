import './index.css'

const Filters = props => {
  const {eachType, employment} = props
  const {label, employmentTypeId} = eachType

  const onChangeEMPType = e => {
    employment(e.target.id, e.target.checked)
  }

  return (
    <li className="checkbox-list">
      <input
        onChange={onChangeEMPType}
        className="checkbox"
        type="checkbox"
        id={employmentTypeId}
      />
      <label className="label" htmlFor={employmentTypeId}>
        {label}
      </label>
    </li>
  )
}

export default Filters
