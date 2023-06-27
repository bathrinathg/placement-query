import React, { useContext } from "react";
import {
	ProSidebar,
	Menu,
	MenuItem,
	SubMenu,
	SidebarHeader,
	SidebarFooter,
	SidebarContent,
} from "react-pro-sidebar";
import { Link, useHistory } from "react-router-dom";
import {
	FaTachometerAlt,
	FaGem,
	FaList,
	FaGithub,
	FaRegLaughWink,
	FaHeart,
} from "react-icons/fa";
import { UserContext } from "../App";
import "react-pro-sidebar/dist/css/styles.css";

const Aside = ({ collapsed, toggled, handleToggleSidebar = () => {} } = {}) => {
	const { state, dispatch } = useContext(UserContext);
	const history = useHistory();
	const { userType } = state || {};
	return (
		<ProSidebar
			image={false}
			collapsed={collapsed}
			toggled={toggled}
			breakPoint="md"
			onToggle={handleToggleSidebar}
			className="sidebar"
			style={{ height: "calc(100vh - 60px)" }}
		>
			<Menu>
				<Link to="/" className="sidebar-link">
					<MenuItem>
						<span style={{ color: "#fff" }}>My Profile</span>
					</MenuItem>
				</Link>
				{state.isAdmin ? (
					<>
						<Link to="/dashboard" className="sidebar-link">
							<MenuItem>
								<span style={{ color: "#fff" }}>Dashboard</span>
							</MenuItem>
						</Link>
						<Link to="/queries-unsolved" className="sidebar-link">
							<MenuItem>
								<span style={{ color: "#fff" }}>
									View Unsolved Queries
								</span>
							</MenuItem>
						</Link>
						<Link to="/books" className="sidebar-link">
							<MenuItem>
								<span style={{ color: "#fff" }}>
									View All Queries
								</span>
							</MenuItem>
						</Link>
						<Link to="/books" className="sidebar-link">
							<MenuItem>
								<span style={{ color: "#fff" }}>
									Reset Password
								</span>
							</MenuItem>
						</Link>
						<Link to="/admin-ann" className="sidebar-link">
							<MenuItem>
								<span style={{ color: "#fff" }}>
									Create New Announcement
								</span>
							</MenuItem>
						</Link>
					</>
				) : null}
				{userType === "STUDENT" && !state.isAdmin ? (
					<>
						<Link to="/create" className="sidebar-link">
							<MenuItem>
								<span style={{ color: "#fff" }}>
									Add New Query
								</span>
							</MenuItem>
						</Link>
						<Link to="/myquery" className="sidebar-link">
							<MenuItem>
								<span style={{ color: "#fff" }}>
									View My Queries
								</span>
							</MenuItem>
						</Link>
					</>
				) : null}
				{userType === "TEACHER" && !state.isAdmin ? (
					<Link to="/books" className="sidebar-link">
						<MenuItem>
							<span style={{ color: "#fff" }}>All Queries</span>
						</MenuItem>
					</Link>
				) : null}
				{state.isAdmin ? (
					<>
						<Link to="/users" className="sidebar-link">
							<MenuItem>
								<span style={{ color: "#fff" }}>All Users</span>
							</MenuItem>
						</Link>
					</>
				) : null}

				<Link to="/announcement" className="sidebar-link">
					<MenuItem>
						<span style={{ color: "#fff" }}>Announcements</span>
					</MenuItem>
				</Link>
				<MenuItem
					style={{ paddingLeft: 15 }}
					onClick={() => {
						localStorage.clear();
						dispatch({ type: "CLEAR" });
						history.push("/signin");
					}}
				>
					Logout
				</MenuItem>
			</Menu>
		</ProSidebar>
	);
};

export default Aside;
