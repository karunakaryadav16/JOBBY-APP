import './index.css'

const SalaryRangeFilter = props => {
  const {eachRange, ChangePackage} = props
  const {label, salaryRangeId} = eachRange

  const onChangeSalary = e => {
    ChangePackage(e.target.id)
  }

  return (
    <li>
      <input
        onChange={onChangeSalary}
        type="radio"
        className="radio"
        id={salaryRangeId}
        name="salary"
      />
      <label htmlFor={salaryRangeId} className="salary-range">
        {label}
      </label>
    </li>
  )
}

export default SalaryRangeFilter
