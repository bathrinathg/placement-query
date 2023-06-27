import React from "react";

const moviesList = [
	{
		name: "Kanye West, 'Stronger'",
		rating: 9.1,
		coverImg:
			"https://www.rollingstone.com/wp-content/uploads/2021/09/497-kanye-west-stronger.jpg?w=500",
		genre: "2007",
		desc: "Explaining the tighter, broader-reaching songs on his third album, Graduation, Kanye West said, “I applied a lot of the things I learned on tour [in 2006] with U2 and the Rolling Stones, about songs that rock stadiums. And they worked!” West found the inspiration for his most grandiose statement to date.",
	},
	{
		name: "The Supremes, 'Baby Love'",
		rating: 8.5,
		coverImg:
			"https://www.rollingstone.com/wp-content/uploads/2021/09/324-the-supremes-baby-love.jpeg?w=306",
		genre: "1964",
		desc: "Diana Ross wasn’t the strongest vocalist in the Supremes, but as the Motown production team discovered, when she sang in a lower register, her voice worked its sultry magic.",
	},
	{
		name: "Townes Van Zandt, 'Pancho and Lefty'",
		rating: 8.3,
		coverImg:
			"https://www.rollingstone.com/wp-content/uploads/2021/09/late-great-townes-van-zandt.jpeg?w=1024",
		genre: "1972",
		desc: "When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman is forced to investigate the citys hidden corruption and question his familys involvement.",
	},
	{
		name: "Lizzo, 'Truth Hurts'",
		rating: 7.5,
		coverImg:
			"https://www.rollingstone.com/wp-content/uploads/2021/09/496-lizzo-truth-hurts.jpg?w=500",
		genre: "2017",
		desc: "“That song is my life and its words are my truth,” Lizzo wrote at the time. She had to tack on a writing credit to British singer Mina Lioness, who had tweeted its iconic line “I just took a DNA test, turns out I’m 100 percent that bitch,” but the power of this gale-force breakup banger was pure Lizzo, uproariously swaggering and endearingly soulful.",
	},
	{
		name: "Miles Davis, 'So What'",
		rating: 7.1,
		coverImg:
			"https://www.rollingstone.com/wp-content/uploads/2021/09/492-miles-davis-so-what.jpeg?w=1024",
		genre: "1959",
		desc: "It’s likely that no song on this list has soundtracked more dinner parties than Kind of Blue’s warm, welcoming first track. But at the time it was a jarring departure, trading bebop chord changes for a more open-ended modal style.",
	},
	{
		name: "Lil Nas X, 'Old Town Road'",
		rating: 6.9,
		coverImg:
			"https://www.rollingstone.com/wp-content/uploads/2021/09/500-lil-nas-x-old-town-road.jpg?w=500",
		genre: "2019",
		desc: "Montero Hill was an Atlanta college dropout sleeping on his sister’s couch and looking to break into music when he came across a track he liked by a Dutch 19-year-old called YoungKio that was based around a banjo sample from a Nine Inch Nails track.",
	},
];

const Music = () => {
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
			{moviesList.map(({ name, rating, coverImg, genre, desc }) => (
				<div
					style={{
						boxShadow: "3px 3px 6px 5px #ccc",
						margin: 10,
						padding: 10,
						borderRadius: 5,
						display: "flex",
						flexDirection: "column",
						width: 240,
					}}
				>
					<img
						src={coverImg}
						height={330}
						width={220}
						alt={name}
						style={{
							borderRadius: 5,
							alignSelf: "center",
							objectFit: "cover",
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
							<p style={{ margin: "0", marginTop: 5 }}>{genre}</p>
						</p>
						<div style={{ display: "flex", alignItems: "center" }}>
							<svg
								role="img"
								height="24"
								width="24"
								viewBox="0 0 24 24"
								class="Svg-sc-1bi12j5-0 jgfuCe"
							>
								<path d="M8.667 1.912a6.257 6.257 0 00-7.462 7.677c.24.906.683 1.747 1.295 2.457l7.955 9.482a2.015 2.015 0 003.09 0l7.956-9.482a6.188 6.188 0 001.382-5.234l-.49.097.49-.099a6.303 6.303 0 00-5.162-4.98h-.002a6.24 6.24 0 00-5.295 1.65.623.623 0 01-.848 0 6.257 6.257 0 00-2.91-1.568z"></path>
							</svg>
							<p
								style={{
									display: "inline",
									fontSize: 18,
									marginLeft: 10,
								}}
							>
								{rating}
							</p>
						</div>
					</div>
					<p>{desc}</p>
				</div>
			))}
		</div>
	);
};

export default Music;
