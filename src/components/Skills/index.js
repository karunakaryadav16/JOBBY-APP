import './index.css'

const Skills = props => {
  const {eachItem} = props
  const {imageUrl, name} = eachItem

  return (
    <li className="skills">
      <img className="logo" src={imageUrl} alt={name} />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default Skills
