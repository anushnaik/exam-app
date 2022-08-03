import { React, useState } from "react";
import Axios from "axios";
import "./App.css";
import { FaSearch } from "react-icons/fa";
import { FcSpeaker } from "react-icons/fc";

function Search() {
const [data, setData] = useState("");
const [searchWord, setSearchWord] = useState("");
function getMeaning() {
	Axios.get(
	`https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`
	).then((response) => {
	setData(response.data[0]);
	});
}
function playAudio() {
	let audio = new Audio(data.phonetics[0].audio);
	audio.play();
}
return (
	<div className="App">
	<h1>Dictionary</h1>
	<div className="searchBox">
		<input
		type="text"
		placeholder="Enter the word"
		onChange={(e) => {
			setSearchWord(e.target.value);
		}}
		/>
		<button
		onClick={() => {
			getMeaning();
		}}
		>
		<text>Search</text>
		</button>
	</div>
	{data && (
		<div className="showResults">
		<h2>
			{data.word}{" "}
			<button
			onClick={() => {
				playAudio();
			}}
			>
			<FcSpeaker size="26px" />
			</button>
		</h2>
		<h3>The Entered Word:</h3>
		
<p>{data.word}</p>
		<h3>Parts of speech:</h3>
		
<p>{data.meanings[0].partOfSpeech}</p>

		<h3>Definition:</h3>
		
<p>{data.meanings[0].definitions[0].definition}</p>

		<h3>Example:</h3>
		
<p>{data.meanings[0].definitions[0].example}</p>
		</div>
	)}
	</div>
);
}
export default Search;