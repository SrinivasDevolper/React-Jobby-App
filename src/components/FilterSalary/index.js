import './index.css'

const FilterSalary = props => {
  const {eachSalaryList, checkedRadio} = props
  const onSelectRadio = event => {
    checkedRadio(event.target.value)
  }
  return (
    <li className="radio-cont" onChange={onSelectRadio}>
      <input
        type="radio"
        id={eachSalaryList.salaryRangeId}
        name="salary"
        className="check-input"
        value={eachSalaryList.salaryRangeId}
      />
      <label htmlFor={eachSalaryList.salaryRangeId} className="radio-cont">
        {eachSalaryList.label}
      </label>
    </li>
  )
}

export default FilterSalary
