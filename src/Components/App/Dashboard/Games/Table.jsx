import {React, useEffect, useState, useContext} from "react";
import Row from "./Row";
import { AppContext } from "../../../../Context/AppContext";
import axios from "axios";

export default function Table({games}) {
    const [values, setValues] = useState([]);
    const { user } = useContext(AppContext);


    const transformGames = (data) => {
        if (!data)return [];

            return {
                id: data.id, 
                venue_id: data.venue_id,
                creator_id: data.creator_id,
                creator_name: user.username,
                court_number: data.court_number,
                game_date: data.game_date, 
                start_time: data.start_time,
                end_time: data.end_time,
                current_players: data.current_players,
                max_players: data.max_players,
                skill_level_required: data.skill_level_required
            };
    }

    useEffect(() => {
        if (games){
            const transformedGames = games.flatMap(transformGames);
            setValues(transformedGames);
        }
    }
    , [games]);

    return (
        <div className="overflow-x-auto pb-20">
          <table className="w-full">
            <thead className="bg-gray-50 text-sm">
              <tr>
                {['Tên sân', 'Ngày & Giờ', 'Số người', 'Trình độ', 'Chi tiết','Thao tác'].map((heading) => (
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