const Header = (props) => {
  console.log(props);
  return <h1>{props.course}</h1>;
}

const Part = (props) => {
  return <p>{props.part} {props.exercise}</p>;
}


const Content = (props) => {
  const { parts } = props;
  return (
    <>
      {parts.map((part) => (
        <Part key={part.name} part={part.name} exercise={part.exercises} />
      ))}
    </>
  );
}

const Total = (props) => {
  const { parts } = props;
  return <p>Number of exercises {parts.reduce((acc, part) => acc + part.exercises, 0)}</p>;
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;

