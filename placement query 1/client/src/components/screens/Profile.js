import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";

const Profile = () => {
	const [mypics, setPics] = useState([]);
	const { state, dispatch } = useContext(UserContext);
	const [image, setImage] = useState("");
	useEffect(() => {
		fetch("/mypost", {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("jwt"),
			},
		})
			.then((res) => res.json())
			.then((result) => {
				console.log(result);
				setPics(result.mypost);
			});
	}, []);
	useEffect(() => {
		if (image) {
			const data = new FormData();
			data.append("file", image);
			data.append("upload_preset", "insta-clone");
			data.append("cloud_name", "cnq");
			fetch("https://api.cloudinary.com/v1_1/cnq/image/upload", {
				method: "post",
				body: data,
			})
				.then((res) => res.json())
				.then((data) => {
					fetch("/updatepic", {
						method: "put",
						headers: {
							"Content-Type": "application/json",
							Authorization:
								"Bearer " + localStorage.getItem("jwt"),
						},
						body: JSON.stringify({
							pic: data.url,
						}),
					})
						.then((res) => res.json())
						.then((result) => {
							console.log(result);
							localStorage.setItem(
								"user",
								JSON.stringify({ ...state, pic: result.pic })
							);
							dispatch({
								type: "UPDATEPIC",
								payload: result.pic,
							});
							//window.location.reload()
						});
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [image]);
	const updatePhoto = (file) => {
		setImage(file);
	};
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
						justifyContent: "space-around",
					}}
				>
					{/* <div>
						<img
							style={{
								width: "160px",
								height: "160px",
								borderRadius: "80px",
							}}
							src={state ? state.pic : "loading"}
						/>
					</div> */}
					<div>
						<h4>Name: {state ? state.name : "loading"}</h4>
						<h5>Email: {state ? state.email : "loading"}</h5>
						<h5>
							Has Admin Access: {state?.isAdmin ? "Yes" : "No"}
						</h5>
						{!state?.isAdmin ? (
							<>
								{state?.rollNumber ? (
									<h5>
										Roll Number:{" "}
										{state ? state.rollNumber : "loading"}
									</h5>
								) : null}
								{state?.admissionYear ? (
									<h5>
										Admission Year:{" "}
										{state
											? state.admissionYear
											: "loading"}
									</h5>
								) : null}
								{state?.phoneNumber ? (
									<h5>
										Phone Number:{" "}
										{state ? state.phoneNumber : "loading"}
									</h5>
								) : null}
								{state?.branch ? (
									<h5>
										Branch:{" "}
										{state ? state.branch : "loading"}
									</h5>
								) : null}
								{state?.teacherDepartment ? (
									<h5>
										Teacher Department:{" "}
										{state
											? state.teacherDepartment
											: "loading"}
									</h5>
								) : null}
								{state?.teacherId ? (
									<h5>
										Teacher ID:{" "}
										{state ? state.teacherId : "loading"}
									</h5>
								) : null}
								{state?.teacherNumber ? (
									<h5>
										Teacher Number:{" "}
										{state
											? state.teacherNumber
											: "loading"}
									</h5>
								) : null}
								{state?.userType ? (
									<h5>
										User Type:{" "}
										{state ? state.userType : "loading"}
									</h5>
								) : null}
							</>
						) : null}
					</div>
				</div>
			</div>
			<div className="gallery">
				{(mypics || []).map((item) => {
					return (
						<img
							key={item._id}
							className="item"
							src={item.photo}
							alt={item.title}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Profile;
