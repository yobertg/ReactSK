const Label = ({ forLabel, classname, tulisanLabel}) => {
    return <>
      <label for={forLabel} className={classname}>{tulisanLabel}</label>
    </>
}
export default Label;