//* START Exercise

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Header = (props) => {
  return (
    <div>
      <h1>Course name: {props.course}</h1>
    </div>
  );
};

const Content = (props) => {
  return (
    <>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
      <Part part={props.parts[3].name} exercises={props.parts[3].exercises} />
    </>
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

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <h3>Total number of exercises</h3>
      {totalExercises}
    </div>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        id: 1,
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        id: 2,
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        id: 3,
        name: "State of a component",
        exercises: 14,
      },
      {
        id: 4,
        name: "Redux",
        exercises: 11,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;

//! END Exercise
