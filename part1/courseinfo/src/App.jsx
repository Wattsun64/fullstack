const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  ) 
}

const Part = (props) => {
  return (
    <>
      <p>{props.part} {props.exercises}</p>
    </>
  )
}

const Content = (props) => {
  const part1 = props.parts[0];
  const part2 = props.parts[1];
  const part3 = props.parts[2];
  return (
    <>
      <Part part={part1.name} exercises={part1.exercises} /> 
      <Part part={part2.name} exercises={part2.exercises} /> 
      <Part part={part3.name} exercises={part3.exercises} /> 
    </>
  )
}

const Total = (props) => {
  const ex1 = props.parts[0].exercises;
  const ex2 = props.parts[1].exercises;
  const ex3 = props.parts[2].exercises;
  return (
    <>
      <p>Number of exercises {ex1 + ex2 + ex3}</p>
    </>
  )
}



const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      { name: 'Using props to pass data',
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
  )
}
export default App
