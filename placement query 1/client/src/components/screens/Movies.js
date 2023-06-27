import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";

const Movies = ({ isUnsolved, isStudentView = false } = {}) => {
	const [data, setData] = useState([]);
	const [statusUp, setStatusUp] = useState({});
	const { state, dispatch } = useContext(UserContext);
	const history = useHistory();

	const fetchAPI = () => {
		fetch(
			isStudentView
				? "/mypost"
				: `/allpost${isUnsolved ? "?status=PENDING" : ""}`,
			{
				headers: {
					Authorization: "Bearer " + localStorage.getItem("jwt"),
				},
			}
		)
			.then((res) => res.json())
			.then((result) => {
				console.log("yooo", result);
				setData(result.posts);
			});
	};

	useEffect(() => {
		fetchAPI();
	}, [isUnsolved]);
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
			<table>
				<thead>
					<tr>
						<th>S.No</th>
						<th>UserName</th>
						<th>Subject</th>
						<th>Issue Date</th>
						<th>Issue Time</th>
						<th>Details</th>
						<th>Status</th>
						{!isStudentView ? <th>Actions</th> : null}
					</tr>
				</thead>
				<tbody>
					{data && data.length
						? data.map(
								(
									{
										_id: id,
										raisedBy: { name: userName } = {},
										createdAt = "",
										details,
										subject,
										status,
									},
									index
								) => (
									<tr
										key={id}
										style={{ cursor: "pointer" }}
										onClick={() => handleMovieClick(id)}
									>
										<td>{index + 1}</td>
										<td>{userName}</td>
										<td>{subject}</td>
										<td>
											{new Date(
												createdAt
											).toLocaleDateString()}
										</td>
										<td>
											{new Date().toLocaleTimeString()}
										</td>
										<td>{details}</td>
										<td
											style={{
												color:
													status === "COMPLETED"
														? "green"
														: "red",
											}}
										>
											{status}
										</td>
										{!isStudentView ? (
											<td
												style={{
													display: "flex",
													alignItems: "center",
													justifyContent:
														"space-between",
												}}
												onClick={(e) =>
													e.stopPropagation()
												}
											>
												<select
													defaultValue={""}
													value={statusUp[id]}
													onChange={(e) =>
														setStatusUp({
															[id]: e.target
																.value,
														})
													}
													style={{
														display: "block",
														marginRight: 10,
													}}
												>
													<option value="">
														Select a status
													</option>

													{status !== "PENDING" ? (
														<option value="PENDING">
															Pending
														</option>
													) : null}
													{status !== "COMPLETED" ? (
														<option value="COMPLETED">
															Completed
														</option>
													) : null}

													{status !==
													"MEET IN PERSON" ? (
														<option value="MEET IN PERSON">
															Meet in Person
														</option>
													) : null}
												</select>
												<button
													className="btn #c62828 green darken-3"
													onClick={() => {
														const updatedStatus =
															statusUp[id];
														if (updatedStatus) {
															fetch(
																`/query/${id}`,
																{
																	method: "put",
																	headers: {
																		"Content-Type":
																			"application/json",
																		Authorization:
																			"Bearer " +
																			localStorage.getItem(
																				"jwt"
																			),
																	},
																	body: JSON.stringify(
																		{
																			status: updatedStatus,
																		}
																	),
																}
															)
																.then((res) =>
																	res.json()
																)
																.then(
																	(
																		result
																	) => {
																		fetchAPI();
																	}
																);
														}
													}}
												>
													Submit
												</button>
											</td>
										) : null}
									</tr>
								)
						  )
						: null}
				</tbody>
			</table>
		</div>
	);
};

export default Movies;
