import React, { useEffect, createContext, useReducer, useContext } from "react";
import NavBar from "./components/Navbar";
import "./App.css";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Home from "./components/screens/Home";
import Signin from "./components/screens/SignIn";
import Profile from "./components/screens/Profile";
import Signup from "./components/screens/Signup";
import SideBar from "./components/sideBar";
import TeacherSignup from "./components/screens/TeacherSignup";
import CreatePost from "./components/screens/CreatePost";
import { reducer, initialState } from "./reducers/userReducer";
import UserProfile from "./components/screens/UserProfile";
import SubscribedUserPosts from "./components/screens/SubscribesUserPosts";
import Reset from "./components/screens/Reset";
import NewPassword from "./components/screens/Newpassword";
import Movies from "./components/screens/Movies";
import Orders from "./components/screens/Orders";
import Users from "./components/screens/Users";
import AdminOrders from "./components/screens/Admin/Orders";
import MovieDetail from "./components/screens/MovieDetail";
import Dashboard from "./components/screens/Dashboard";
import AnnouncementCreate from "./components/screens/AnnouncementCreate";
import Announcement from "./components/screens/Announcements";
export const UserContext = createContext();

const Routing = () => {
	const history = useHistory();
	const { state, dispatch } = useContext(UserContext);
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (user) {
			dispatch({ type: "USER", payload: user });
		} else {
			if (!history.location.pathname.startsWith("/reset"))
				history.push("/signin");
		}
	}, []);
	return (
		<Switch>
			<Route exact path="/">
				<Profile />
			</Route>
			<Route exact path="/dashboard">
				<Dashboard />
			</Route>
			<Route exact path="/books">
				<Movies />
			</Route>
			<Route exact path="/admin-ann">
				<AnnouncementCreate />
			</Route>
			<Route exact path="/announcement">
				<Announcement />
			</Route>
			<Route exact path="/queries-unsolved">
				<Movies isUnsolved />
			</Route>
			<Route exact path="/myquery">
				<Movies isStudentView />
			</Route>
			<Route path="/signin">
				<Signin />
			</Route>
			<Route path="/signup">
				<Signup />
			</Route>
			<Route path="/teacher/signup">
				<TeacherSignup />
			</Route>
			<Route exact path="/profile">
				<Profile />
			</Route>
			<Route exact path="/users">
				<Users />
			</Route>
			<Route path="/create">
				<CreatePost />
			</Route>
			<Route
				path="/top5hostel"
				component={() => <Orders sortType="hostelAndFood" />}
			></Route>
			<Route
				path="/top5transportation"
				component={() => <Orders sortType="transportation" />}
			></Route>
			<Route
				path="/top5jobOpportunities"
				component={() => <Orders sortType="jobOpportunities" />}
			></Route>
			<Route
				path="/top5studentFaculty"
				component={() => <Orders sortType="studentFaculty" />}
			></Route>
			<Route
				path="/top5infrastructure"
				component={() => <Orders sortType="infrastructure" />}
			></Route>
			<Route
				path="/top5sports"
				component={() => <Orders sortType="sports" />}
			></Route>
			<Route
				path="/top5extraCircular"
				component={() => <Orders sortType="extraCircular" />}
			></Route>
			<Route path="/admin/book-orders">
				<AdminOrders />
			</Route>
			<Route path="/movies/:productId">
				<MovieDetail />
			</Route>
			<Route path="/profile/:userid">
				<UserProfile />
			</Route>
			<Route path="/myfollowingpost">
				<SubscribedUserPosts />
			</Route>
			<Route exact path="/reset">
				<Reset />
			</Route>
			<Route path="/reset/:token">
				<NewPassword />
			</Route>
		</Switch>
	);
};

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	console.log({ state });
	return (
		<UserContext.Provider value={{ state, dispatch }}>
			<BrowserRouter>
				<NavBar />
				{state ? (
					<div style={{ display: "flex" }}>
						<SideBar />
						<div
							style={{
								flex: 1,
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<div style={{ flex: 1 }}>
								<Routing />
							</div>
							<h5
								style={{
									margin: 15,
								}}
							>
								For More Information contact us via this phone
								Number - xxxxxxxxxx
							</h5>
						</div>
					</div>
				) : (
					<Routing />
				)}
			</BrowserRouter>
		</UserContext.Provider>
	);
}

export default App;
