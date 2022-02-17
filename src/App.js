import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import { useContext } from 'react';
// import Home from "./pages/Home/Home";
import DashBoard from './pages/Dashboard/DashBoard';
import Enrollment from './pages/Enrollments/Enrollment';
import Achievement from './pages/Achievements/Achievement';
import Forum from './pages/Forum/Forum';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import NavBar from './components/NavBar/NavBar';
import ProfilePage from './pages/Profile/ProfilePage';
import Login from './pages/LoginPage/Login';
import CoursePage from './pages/CoursePage/CoursePage';
import UserContext from './context/authContext';
import Assignment from './pages/AssignmentPage/Assignment';
import QuizPage from './pages/QuizPage/QuizPage2';

const App = () => {
	const { userDetails } = useContext(UserContext);

	return (
		<Router>
			<div className="App">
				{userDetails && <NavBar />}
				<Switch>
					<Route exact path="/">
						{!userDetails ? <Login /> : <Redirect to="/dashboard" />}
					</Route>
					<Route exact path="/dashboard">
						{userDetails ? <DashBoard /> : <Redirect to="/" />}
					</Route>
					<Route exact path="/enrollment">
						{userDetails ? <Enrollment /> : <Redirect to="/" />}
					</Route>
					<Route exact path="/achievement">
						{userDetails ? <Achievement /> : <Redirect to="/" />}
					</Route>
					<Route exact path="/forum">
						{userDetails ? <Forum /> : <Redirect to="/" />}
					</Route>
					<Route exact path="/profile">
						{userDetails ? <ProfilePage /> : <Redirect to="/" />}
					</Route>
					<Route exact path="/course/:id">
						{userDetails ? <CoursePage /> : <Redirect to="/" />}
					</Route>
					<Route exact path="/quiz/:id">
						{userDetails ? <QuizPage /> : <Redirect to="/" />}
					</Route>
					<Route exact path="/assignment/:id">
						{userDetails ? <Assignment /> : <Redirect to="/" />}
					</Route>
					<Route path="*">
						<ErrorPage />
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
