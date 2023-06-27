import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { useParams } from "react-router-dom";
import M from "materialize-css";
import { storage } from "../../utils/firebase";
import { useHistory } from "react-router-dom";

const MovieDetail = (props) => {
	const { productId } = useParams();
	const [data, setData] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [rating, setRating] = useState(0);
	const [title, setTitle] = useState("");
	const [reviewType, setReviewType] = useState("hostelAndFood");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState("");
	const [fileUploadLoading, setFileUploadLoading] = useState(false);

	const history = useHistory();

	useEffect(() => {
		const elems = document.querySelectorAll(".dropdown-trigger");
		const instances = M.Dropdown.init(elems);
	}, []);

	const createBuyOrder = async (bookId) => {
		try {
			await fetch("/order", {
				method: "post",
				headers: {
					Authorization: "Bearer " + localStorage.getItem("jwt"),
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					bookId,
				}),
			}).then((res) => res.json());
			history.push(`/book-orders`);
		} catch (error) {
			console.log(error);
		}
	};
	const fetchProductData = async () => {
		try {
			const result = await fetch(`/product/${productId}`, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("jwt"),
				},
			}).then((res) => res.json());
			setData(result.result);
			setIsLoading(false);
		} catch (err) {
			console.log(err);
			setIsLoading(false);
		}
	};
	console.log({ data, isLoading });
	useEffect(() => {
		fetchProductData();
	}, []);
	const {
		subject: name,
		avgRating,
		// images: [coverImg] = [],
		photo: coverImg,
		details: desc,
		totalRating,
		reviews,
		status,
		raisedBy: { name: userName } = {},
		address,
		phoneNumber,
		type,
	} = data || {};

	const handleFireBaseUpload = async () => {
		setFileUploadLoading(true);
		let fireDBurl = "";
		if (image) {
			const path = `/files/${image.name}`;
			const ref = storage.ref(path);
			await ref.put(image);
			fireDBurl = await ref.getDownloadURL();
			console.log({ fireDBurl });
		}

		fetch(`/product/${productId}/rating`, {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("jwt"),
			},
			body: JSON.stringify({
				title,
				rating,
				type: reviewType,
				description,
				images: [fireDBurl],
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error) {
					M.toast({
						html: data.error,
						classes: "#c62828 red darken-3",
					});
					setFileUploadLoading(false);
				} else {
					M.toast({
						html: "Posted Review Successfully",
						classes: "#43a047 green darken-1",
					});
					setFileUploadLoading(false);
					window.location.reload();
				}
			})
			.catch((err) => {
				console.log(err);
				setFileUploadLoading(false);
			});
	};
	return (
		<div
			style={{
				padding: 15,
				margin: "auto",
			}}
		>
			{isLoading ? (
				<div class="preloader-wrapper big active">
					<div class="spinner-layer spinner-blue">
						<div class="circle-clipper left">
							<div class="circle"></div>
						</div>
						<div class="gap-patch">
							<div class="circle"></div>
						</div>
						<div class="circle-clipper right">
							<div class="circle"></div>
						</div>
					</div>
				</div>
			) : (
				<>
					<div
						style={{
							margin: 10,
							padding: 10,
							borderRadius: 5,
							display: "flex",
							cursor: "pointer",
							flexDirection: "column",
						}}
					>
						<img
							src={coverImg}
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
									Subject: {name}
								</span>
								<p
									style={{
										margin: "0",
										marginTop: 5,
									}}
								>
									Student Name: {userName}
								</p>
								<p
									style={{
										margin: "0",
										marginTop: 5,
										color:
											status === "COMPLETED"
												? "green"
												: status === "MEET IN PERSON"
												? "yellow"
												: "red",
									}}
								>
									Status: {status}
								</p>
							</p>
							{/* <div
								style={{
									display: "flex",
									alignItems: "center",
									flexDirection: "column",
									minWidth: 80,
								}}
							>
								<div
									style={{
										display: "flex",
										alignItems: "center",
										marginBottom: 15,
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
												avgRating < 2.5
													? "red"
													: "green",
										}}
									>
										Average Rating:{" "}
										{Number.parseFloat(avgRating).toFixed(
											2
										)}{" "}
										(Total Ratings: {totalRating})
									</span>
								</div>
								<button
									className={`btn waves-effect waves-light #64b5f6 blue darken-1 ${
										status !== "AVAILABLE" ? "grey" : "blue"
									} `}
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										if (status === "AVAILABLE") {
											createBuyOrder(productId);
										}
									}}
								>
									Issue Book
								</button>
							</div> */}
						</div>
						{/* <p
							style={{
								margin: "0",
								marginTop: 5,
							}}
						>
							Student Email / ID: {address}
						</p> */}
						<p>Query Details: {desc}</p>
					</div>
					{reviews && reviews.length ? (
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								padding: 15,
							}}
						>
							<h4
								style={{
									textAlign: "left",
									alignSelf: "flex-start",
								}}
							>
								Conversations:
							</h4>
							{reviews.map(
								({
									images: [reviewImg] = [],
									rating: reviewRating,
									title: reviewTitle,
									type,
									description: revDesc,
									createdAt,
									createdBy: { name: createdBy } = {},
								} = {}) => {
									const dateOptions = {
										weekday: "long",
										year: "numeric",
										month: "long",
										day: "numeric",
									};
									const cread = new Date(createdAt);
									const displayDate =
										cread.toLocaleDateString(
											"en-US",
											dateOptions
										);
									return (
										<div
											style={{
												display: "flex",
											}}
										>
											<div style={{ marginRight: 10 }}>
												<p>{createdBy}</p>
												<p>
													{cread.toLocaleTimeString()}
												</p>
											</div>
											<div
												style={{
													boxShadow:
														"3px 3px 6px 5px #ccc",
													margin: 10,
													padding: 10,
													borderRadius: 5,
													display: "flex",
													flexDirection: "column",
													marginTop: 15,
													flex: 1
												}}
											>
												{reviewImg ? (
													<img
														src={reviewImg}
														height="300"
														style={{
															objectFit:
																"contain",
														}}
													/>
												) : null}
												{/* <p>Rating: {reviewRating} / 5</p> */}
												<p
													style={{
														fontWeight: "bold",
													}}
												>
													{reviewTitle}
												</p>
												{/* <p>Type: {type}</p> */}
												<p>{revDesc}</p>
												<p>
													Sent at: {displayDate},{" "}
													{cread.toLocaleTimeString()}
												</p>
											</div>
										</div>
									);
								}
							)}
						</div>
					) : null}
				</>
			)}
			<div
				className="input-filed"
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					padding: 15,
				}}
			>
				<h4
					style={{
						textAlign: "left",
						alignSelf: "flex-start",
					}}
				>
					Start a conversation:
				</h4>
				<input
					type="text"
					placeholder="Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>

				<input
					type="text"
					placeholder="Description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<div style={{ display: "flex", alignItems: "center" }}>
					<p style={{ marginRight: 10, fontSize: 18 }}>
						Image(Optional):
					</p>
					<div className="file-field input-field">
						<div className="btn #64b5f6 blue darken-1">
							<span>Select file</span>
							<input
								type="file"
								onChange={(e) => setImage(e.target.files[0])}
							/>
						</div>
						<div className="file-path-wrapper">
							<input className="file-path validate" type="text" />
						</div>
					</div>
				</div>
				<button
					className="btn waves-effect waves-light #64b5f6 blue darken-1"
					onClick={() => {
						if (!fileUploadLoading) {
							handleFireBaseUpload();
						}
					}}
				>
					{fileUploadLoading ? "Posting..." : "Post Message"}
				</button>
			</div>
		</div>
	);
};

export default MovieDetail;
