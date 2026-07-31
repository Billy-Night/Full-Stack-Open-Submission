//* START Exercise 1.1 - 1.5 Course Information step 3 - Course Information step 5

const Header = (props) => {
  return (
    <div>
      <h1>Course name: {props.course}</h1>
    </div>
  );
};

const Part = (props) => {
  return (
    <div>
      <h2>Part: {props.part}</h2>
      <p>Number of exercises: {props.exercises}</p>
    </div>
  );
};

const Content = (props) => {
  return (
    <>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
    </>
  );
};

const Total = (props) => {
  return (
    <div>
      <h3>Total number of exercises</h3>
      {props.parts[0].exercises +
        props.parts[1].exercises +
        props.parts[2].exercises}
    </div>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
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

//! END Exercise 1.1 - 1.5 Course Information step 3 - Course Information step 4
