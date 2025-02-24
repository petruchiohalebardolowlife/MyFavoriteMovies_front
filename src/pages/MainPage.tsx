import {withAuth} from "../middlewares/withAuth";

function MainPage() {
  return (
    <div>
      <h1>Main Page</h1>
    </div>
  );
}

export default withAuth(MainPage);
