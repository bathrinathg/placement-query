import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Orders = () => {
	const [data, setData] = useState([]);
	const history = useHistory();

	const adunc = () => {
		fetch("/order", {
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
	useEffect(adunc, []);

	const createBuyOrder = async (bookId, isApprove) => {
		try {
			await fetch(`/order/${bookId}`, {
				method: "put",
				headers: {
					Authorization: "Bearer " + localStorage.getItem("jwt"),
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					status: isApprove ? "ADMIN_APPROVED" : "ADMIN_DECLINED",
					lentAt: new Date().toISOString(),
				}),
			}).then((res) => res.json());
			adunc();
		} catch (error) {
			console.log(error);
		}
	};
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
							bookId: {
								_id: movieId,
								name,
								avgRating: rating,
								images: [coverImg] = [],
								genre,
								description: desc,
								price,
								totalRating,
							} = {},
							lentAt,
							status,
							expectedReturnDate = new Date().toISOString(),
							createdAt,
						} = {}) => {
							const diff =
								new Date().getTime() -
								new Date(expectedReturnDate).getTime();
							const daydiff = diff / (1000 * 60 * 60 * 24);
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
									onClick={() => {
										handleMovieClick(movieId);
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
											<p
												style={{
													margin: "0",
													marginTop: 5,
												}}
											>
												{genre}
											</p>
											<p
												style={{
													margin: "0",
													marginTop: 5,
													color: "green",
												}}
											>
												₹ {price}
											</p>
										</p>
										<div
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
												{Number.parseFloat(
													rating
												).toFixed(2)}{" "}
												({totalRating})
											</span>
										</div>
									</div>
									<p>
										Current Status: <b>{status}</b>
									</p>
									<p>
										Return Date:{" "}
										{new Date(
											expectedReturnDate
										).toLocaleDateString("en-US", {
											weekday: "long",
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</p>
									<p>
										Due Days: {daydiff > 0 ? daydiff : 0}{" "}
										Days
									</p>
									<p>
										Issued at:{" "}
										{new Date(
											lentAt || createdAt
										).toLocaleDateString("en-US", {
											weekday: "long",
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</p>
									{lentAt ? (
										<p>
											Book lent at:{" "}
											{new Date(
												lentAt
											).toLocaleDateString("en-US", {
												weekday: "long",
												year: "numeric",
												month: "long",
												day: "numeric",
											})}
										</p>
									) : null}
									<p style={{ flex: 1 }}>{desc}</p>
									{status === "REQUESTED" ? (
										<>
											<button
												className="btn waves-effect waves-light #64b5f6 blue darken-1"
												onClick={(e) => {
													e.preventDefault();
													e.stopPropagation();
													createBuyOrder(
														orderId,
														true
													);
												}}
											>
												Approve
											</button>

											<button
												style={{ marginTop: 10 }}
												className="btn waves-effect waves-light #64b5f6 blue darken-1"
												onClick={(e) => {
													e.preventDefault();
													e.stopPropagation();
													createBuyOrder(orderId);
												}}
											>
												Reject
											</button>
										</>
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
