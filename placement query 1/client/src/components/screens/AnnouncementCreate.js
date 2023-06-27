import React, { useState, useEffect } from "react";
import M from "materialize-css";
import { useHistory } from "react-router-dom";
import { storage } from "../../utils/firebase";

const AnnouncementCreate = () => {
	const history = useHistory();
	const [subject, setTitle] = useState("");
	const [genre, setGenre] = useState("");
	const [author, setAuthor] = useState("");
	const [publisher, setpublisher] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState("");
	const [url, setUrl] = useState("");
	const [fileUploadLoading, setFileUploadLoading] = useState(false);

	const submit = ({ photo } = {}) => {
		fetch("/announcement", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("jwt"),
			},
			body: JSON.stringify({
				subject,
				details: description,
				photo,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error) {
					setFileUploadLoading(false);
					M.toast({
						html: data.error,
						classes: "#c62828 red darken-3",
					});
				} else {
					M.toast({
						html: "Uploaded file Successfully",
						classes: "#43a047 green darken-1",
					});
					setFileUploadLoading(false);
					// history.push("/books");
				}
			})
			.catch((err) => {
				console.log(err);
				setFileUploadLoading(false);
			});
	};

	const handleFireBaseUpload = async () => {
		setFileUploadLoading(true);
		if (image) {
			const path = `/files/${image.name}`;
			const ref = storage.ref(path);
			await ref.put(image);
			const fireDBurl = await ref.getDownloadURL();
			console.log({ fireDBurl });
			setUrl(fireDBurl);
			return submit({ photo: fireDBurl });
		}
		return submit();
	};

	return (
		<div
			className="card input-filed"
			style={{
				margin: "30px auto",
				maxWidth: "500px",
				padding: "20px",
				textAlign: "center",
			}}
		>
			<input
				type="text"
				placeholder="Subject"
				value={subject}
				onChange={(e) => setTitle(e.target.value)}
			/>
			{/* <input
				type="text"
				placeholder="Student Email / ID"
				value={publisher}
				onChange={(e) => setpublisher(e.target.value)}
			/> */}
			{/* <input
				type="text"
				placeholder="Query Type"
				value={author}
				onChange={(e) => setAuthor(e.target.value)}
			/> */}
			{/* <input
				type="date"
				placeholder="Issue Found At"
				value={genre}
				onChange={(e) => setGenre(e.target.value)}
			/> */}
			<input
				type="text"
				placeholder="Details"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<div style={{ display: "flex", alignItems: "center" }}>
				<p style={{ marginRight: 10, fontSize: 18 }}>Image:</p>
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
				onClick={(e) => {
					if (!fileUploadLoading) {
						handleFireBaseUpload(e);
					}
				}}
			>
				{fileUploadLoading ? "Creating..." : "Add New Announcement"}
			</button>
		</div>
	);
};

export default AnnouncementCreate;
