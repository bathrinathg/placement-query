import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";

const Dashboard = () => {
	const [mypics, setPics] = useState({});
	const { state, dispatch } = useContext(UserContext);
	const [image, setImage] = useState("");
	useEffect(() => {
		fetch("/query/stats", {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("jwt"),
			},
		})
			.then((res) => res.json())
			.then((result) => {
				console.log(result);
				setPics(result.counts);
			});
	}, []);
	console.log({ state });
	return (
		<div style={{ maxWidth: "550px", margin: "0px auto" }}>
			<div
				style={{
					margin: "18px 0px",
				}}
			>
				<div
					style={{
						display: "flex",
						width: "100%",
						justifyContent: "space-between",
					}}
				>
					<div
						style={{
							textAlign: "center",
							margin: 10,
						}}
					>
						<h5>Total Number of Queries</h5>
						<h5>{mypics.totalCount}</h5>
					</div>

					<div
						style={{
							textAlign: "center",
							margin: 10,
						}}
					>
						<h5>Unsolved Queries</h5>
						<h5>{mypics.completedCount}</h5>
					</div>
					<div
						style={{
							textAlign: "center",
							margin: 10,
						}}
					>
						<h5>Solved Queries</h5>
						<h5>{mypics.pendingCount}</h5>
					</div>
					<div
						style={{
							textAlign: "center",
							margin: 10,
						}}
					>
						<h5>Meet In Person Queries</h5>
						<h5>{mypics.meetInPersonCount}</h5>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
