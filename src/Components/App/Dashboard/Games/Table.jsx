import {React, useEffect, useState, useContext} from "react";
import Row from "./Row";
import { AppContext } from "../../../../Context/AppContext";
import axios from "axios";

export default function Table({games}) {
    const [values, setValues] = useState([]);
    const { user } = useContext(AppContext);

    const transformGames = (data) => {
        if (!data) return [];
        
        return data.map(game => ({
            id: game.id,
            venue_id: game.venue?.id,
            creator_id: game.creator?.id,
            creator_name: game.creator?.username,
            venue_name: game.venue?.name,
            venue_location: game.venue?.location,
            court_number: game.court_number,
            game_date: game.game_date,
            start_time: game.start_time,
            end_time: game.end_time,
            current_players: game.current_players,
            max_players: game.max_players,
            skill_level_required: game.skill_level_required
        }));
    }

    useEffect(() => {
        if (games) {
            const transformedGames = transformGames(games);
            setValues(transformedGames);
        }
    }, [games]);

    return (
        <div className="overflow-x-auto pb-20">
            <table className="w-full">
                <thead className="bg-gray-50 text-sm">
                    <tr>
                        {['Tên sân', 'Ngày & Giờ', 'Số người', 'Trình độ', 'Chi tiết', 'Thao tác'].map((heading) => (
                            <th key={heading} className="whitespace-nowrap px-6 py-4 text-left font-medium text-gray-500">
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y text-sm">
                    {values.map((value) => (
                        <Row key={value.id} {...value} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}