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

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => {
        return (
          <Part key={part.id} part={part.name} exercises={part.exercises} />
        );
      })}
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

export default Course;
