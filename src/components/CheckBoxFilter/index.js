import './index.css'

const CheckBoxFilter = props => {
  const {eachEmployeeList, checkedFilterValue} = props
  const onSelectCheckBox = event => {
    console.log(event.target.value)
    checkedFilterValue(event.target.value)
  }
  return (
    <li className="checkBox-cont" onChange={onSelectCheckBox}>
      <input
        type="checkbox"
        id={eachEmployeeList.employmentTypeId}
        value={eachEmployeeList.employmentTypeId}
      />
      <label htmlFor={eachEmployeeList.employmentTypeId}>
        {eachEmployeeList.label}
      </label>
    </li>
  )
}

export default CheckBoxFilter
