const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Part = (props) => {
  return <p>{props.part} {props.exercise}</p>
}


const Content = (props) => {
  const { parts } = props
  return (
    <>
      {parts.map((part) => (
        <Part part={part.name} exercise={part.exercises} />
      ))}
    </>
  )
}

const Total = (props) => {
  return <p>Number of exercises {props.total}</p>
}

function App() {
  const course = 'Half Stack application development'
  const parts = [
    { name: 'Fundamentals of React', exercises: 10 },
    { name: 'Using props to pass data', exercises: 7 },
    { name: 'State of a component', exercises: 14 },
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total total={parts.reduce((acc, part) => (acc + part.exercises), 0)} />
    </div>
  )
}

export default App;