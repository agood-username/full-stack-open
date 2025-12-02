const Header = ({courseName}) => {
  return <h1>{courseName}</h1>
}

const Content = ({parts}) => {
  return (
    <>
        {parts.map(part => (
            <Part key={part.id} name={part.name} exercises={part.exercises} />
        ))}
    </>
  )
}

const Part = ({name, exercises}) => {
  return  <p>{name} {exercises}</p>
}

const Total = ({parts}) => {
  const courseTotal = parts.reduce((sum, part) => sum + part.exercises, 0)
  
  return <p><strong>Total of {courseTotal} exercises</strong></p>
}

const Course = ({course}) => {
    return (
        <>
            <Header courseName={course.name}/>
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

export default Course