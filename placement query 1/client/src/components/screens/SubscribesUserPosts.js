import React, { useState, useEffect } from "react";

const Home = () => {
	const [data, setData] = useState([]);
	useEffect(() => {
		fetch("/file", {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("jwt"),
			},
		})
			.then((res) => res.json())
			.then((result) => {
				console.log(result);
				setData(result.files);
			});
	}, []);

	return (
		<div className="home">
			{data.map(({ name, description, fileUrl, _id } = {}) => {
				return (
					<div
						className="card home-card"
						key={_id}
						style={{ padding: 10 }}
					>
						<h5 style={{ padding: "5px" }}>{name}</h5>
						<p style={{ padding: "5px" }}>{description}</p>
						<div className="card-image">
							<img src={fileUrl} alt={name} />
						</div>
						<a
							href={fileUrl}
							target="_blank"
							style={{
								color: "blue",
								marginTop: 10,
								alignSelf: "center",
							}}
						>
							<button className="btn waves-effect waves-light #64b5f6 blue darken-1">
								Click here to Download
							</button>
						</a>
					</div>
				);
			})}
		</div>
	);
};

export default Home;
