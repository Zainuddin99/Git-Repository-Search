import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Repos from "./Components/Repos";

const initialInputs = { user: "", filterKeyword: "" };

function App() {
    const [inputs, setInputs] = useState(initialInputs);
    const [userRepos, setUserRepos] = useState([]);
    const [filteredUserRepos, setFilteredUserRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
    };

    const fetchRepo = async (e) => {
        e.preventDefault();
        setLoading(true)
        if(error){
            setError('');
        }
        try {
            const response = await axios.get(
                `https://api.github.com/users/${inputs.user}/repos`
            );
            const repoNames = response.data.map((item) => item.name);
            setUserRepos(repoNames);
        } catch (error) {
            if (error?.response?.status === 404) {
                setError("No user found!");
            } else {
                setError("Something went wrong!");
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        const filteredData = userRepos.filter((item) => {
            const pattern = new RegExp(inputs.filterKeyword, "gi");
            if (pattern.test(item)) {
                return true;
            }
            return false;
        });
        setFilteredUserRepos(filteredData);
    }, [inputs.filterKeyword, userRepos]);

    const clearData = () => {
        setUserRepos([]);
        setFilteredUserRepos([]);
        setInputs(initialInputs);
    };

    const clearFilterInput = () =>
        setInputs((prev) => ({ ...prev, filterKeyword: "" }));

    const { user, filterKeyword } = inputs;
    return (
        <div className="App">
            <div className="inputs">
                <form onSubmit={fetchRepo}>
                    <input
                        type="text"
                        placeholder="Enter any github user name to search repositories Eg. Zainuddin"
                        value={user}
                        name="user"
                        onChange={handleInputChange}
                        required
                    />
                    <button type="submit">Go</button>
                    <button type="button" onClick={clearData}>
                        Clear
                    </button>
                </form>
                <div>
                    <input
                        type="text"
                        placeholder="Enter some keyword to filter eg. algo"
                        value={filterKeyword}
                        name="filterKeyword"
                        onChange={handleInputChange}
                    />
                    <button type="button" onClick={clearFilterInput}>
                        Clear
                    </button>
                </div>
            </div>
            {loading ? (
                <div className="loading">Loading...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : (
                <Repos data={filteredUserRepos} filterKeyword={filterKeyword} />
            )}
        </div>
    );
}

export default App;
