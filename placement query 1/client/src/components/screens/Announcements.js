import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";

const Announcements = () => {
	const [data, setData] = useState([]);
	const { state, dispatch } = useContext(UserContext);
	const history = useHistory();

	useEffect(() => {
		fetch("/announcement", {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("jwt"),
			},
		})
			.then((res) => res.json())
			.then((result) => {
				console.log("yooo", result);
				setData(result.result);
			});
	}, []);
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
							_id: movieId,
							subject: name,
							avgRating: rating,
							photo: coverImg,
							genre,
							details: desc,
							price,
							copies,
							address,
							author,
							phoneNumber,
							createdAt,
							type,
							publisher,
							status,
							totalRating,
						} = {}) => (
							<div
								style={{
									boxShadow: "3px 3px 6px 5px #ccc",
									margin: 10,
									padding: 10,
									borderRadius: 5,
									display: "flex",
									flexDirection: "column",
									width: 300,
								}}
							>
								<img
									src={coverImg}
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
										{/* <p
											style={{
												margin: "0",
												marginTop: 5,
											}}
										>
											Query Type: {type}
										</p> */}
										{/* <p
											style={{
												margin: "0",
												marginTop: 5,
												color:
													status === "SOLVED"
														? "green"
														: status === "IN_PROGRESS" ? 'yellow' : "red",
											}}
										>
											{status}
										</p> */}
									</p>
									{/* <div
										style={{
											display: "flex",
											alignItems: "center",
											minWidth: 80,
										}}
									>
										<span class="ipc-rating-star ipc-rating-star--baseAlt ipc-rating-star--rate">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												class="ipc-icon ipc-icon--star-border-inline"
												id="iconContext-star-border-inline"
												viewBox="0 0 24 24"
												fill="currentColor"
												role="presentation"
											>
												<path d="M22.724 8.217l-6.786-.587-2.65-6.22c-.477-1.133-2.103-1.133-2.58 0l-2.65 6.234-6.772.573c-1.234.098-1.739 1.636-.8 2.446l5.146 4.446-1.542 6.598c-.28 1.202 1.023 2.153 2.09 1.51l5.818-3.495 5.819 3.509c1.065.643 2.37-.308 2.089-1.51l-1.542-6.612 5.145-4.446c.94-.81.45-2.348-.785-2.446zm-10.726 8.89l-5.272 3.174 1.402-5.983-4.655-4.026 6.141-.531 2.384-5.634 2.398 5.648 6.14.531-4.654 4.026 1.402 5.983-5.286-3.187z"></path>
											</svg>
										</span>
										<span
											style={{
												display: "inline",
												fontSize: 18,
												marginLeft: 10,
												marginBottom: 5,
												color:
													rating < 2.5
														? "red"
														: "green",
											}}
										>
											{Number.parseFloat(rating).toFixed(
												2
											)}{" "}
											({totalRating})
										</span>
									</div> */}
								</div>
								<p
									style={{
										margin: "0",
										marginTop: 5,
									}}
								>
									Received At:{" "}
									{new Date(createdAt).toLocaleDateString()},{" "}
									{new Date(createdAt).toLocaleTimeString()}
								</p>
								<p style={{ flex: 1 }}>{desc}</p>

								{/* {!state?.isAdmin ? (
									<button
										className={`btn waves-effect waves-light #64b5f6 blue darken-1 ${
											status !== "AVAILABLE"
												? "grey"
												: "blue"
										} `}
										onClick={(e) => {
											e.preventDefault();
											e.stopPropagation();
											if (status === "AVAILABLE") {
												createBuyOrder(movieId);
											}
										}}
									>
										Issue Book
									</button>
								) : null} */}
							</div>
						)
				  )
				: null}
		</div>
	);
};

export default Announcements;
