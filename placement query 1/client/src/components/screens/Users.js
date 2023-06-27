import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Orders = () => {
	const [data, setData] = useState([]);
	const history = useHistory();

	const adunc = () => {
		fetch("/user", {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("jwt"),
			},
		})
			.then((res) => res.json())
			.then((result) => {
				console.log("yooo", result);
				setData(result.result);
			});
	};
	let state = true;
	useEffect(adunc, []);

	const handleMovieClick = (movieId) => {
		history.push(`/movies/${movieId}`);
	};
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				flexWrap: "wrap",
				columnGap: 10,
				rowGap: 10,
				justifyContent: "center",
				padding: 15,
			}}
		>
			{data && data.length
				? data.map(
						({
							_id: orderId,
							pic,
							email,
							isAdmin,
							admissionYear,
							branch,
							name,
							rollNumber,
							userType,
							teacherDepartment,
							teacherId,
							teacherNumber,
						} = {}) => {
							return (
								<div
									style={{
										boxShadow: "3px 3px 6px 5px #ccc",
										margin: 10,
										padding: 10,
										borderRadius: 5,
										display: "flex",
										cursor: "pointer",
										flexDirection: "column",
										width: 300,
									}}
								>
									<img
										src={pic}
										height={330}
										width={280}
										alt={name}
										style={{
											borderRadius: 5,
											alignSelf: "center",
										}}
									/>
									<div
										style={{
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
										}}
									>
										<p>
											<span
												style={{
													fontSize: 18,
													fontWeight: "700",
												}}
											>
												{name}
											</span>
											<p
												style={{
													margin: "0",
													marginTop: 5,
												}}
											>
												Email: {email}
											</p>
											<p
												style={{
													margin: "0",
													marginTop: 5,
												}}
											>
												Is Admin:{" "}
												{isAdmin ? "Yes" : "No"}
											</p>
										</p>
									</div>
									{rollNumber ? (
										<p>
											Roll Number:{" "}
											{state ? rollNumber : "loading"}
										</p>
									) : null}
									{admissionYear ? (
										<p>
											Admission Year:{" "}
											{state ? admissionYear : "loading"}
										</p>
									) : null}
									{branch ? (
										<p>
											Branch: {state ? branch : "loading"}
										</p>
									) : null}
									{teacherDepartment ? (
										<p>
											Teacher Department:{" "}
											{state
												? teacherDepartment
												: "loading"}
										</p>
									) : null}
									{teacherId ? (
										<p>
											Teacher ID:{" "}
											{state ? teacherId : "loading"}
										</p>
									) : null}
									{teacherNumber ? (
										<p>
											Teacher Number:{" "}
											{state ? teacherNumber : "loading"}
										</p>
									) : null}
									{userType ? (
										<p>
											User Type:{" "}
											{state ? userType : "loading"}
										</p>
									) : null}
								</div>
							);
						}
				  )
				: null}
		</div>
	);
};

export default Orders;
