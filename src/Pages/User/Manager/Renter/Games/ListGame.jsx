import { React, useContext, useState, useEffect } from "react";
import Layout from "../../../../../Layouts/Layout";
import Nav from "../../../../../Components/App/Dashboard/Nav";
import axios from "axios";
import { AppContext } from "../../../../../Context/AppContext";
import Table from "../../../../../Components/App/Dashboard/Games/Table";
import Pagination from "../../../../../Components/App/Dashboard/Booking/Pagination";

export default function ListGame() {
    const { user } = useContext(AppContext);
    const [games, setGames] = useState([]);

    useEffect(() => {
        if (user) {
            fetchGames();
        }
    }, [user]);

    const fetchGames = async () => {
        try {
            const response = await axios.get(`/api/getParticipatingGames/${user.id}`);
            setGames(response.data.data);
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    }

    return (
        <Layout>
            <Nav />
            <div className="max-h-screen bg-gray-50/50 p-8">
                <div className="rounded-xl bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Game đang tham gia</h1>
                            <p className="text-gray-500">Danh sách các game bạn đang tham gia</p>
                            <p className="text-gray-500 mt-2">Điểm hiện tại: {user?.point || 0}</p>
                        </div>
                    </div>
                    <Table games={games} />
                    <Pagination />
                </div>
            </div>
        </Layout>
    );
}