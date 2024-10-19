import {useState, useEffect} from 'react';
import MeetTheTeamStyles from './../styles/MeetTheTeamStyles.css';
import axios from 'axios';

export default function MeetTheTeam(){

const [teamData, setTeamData] = useState([]);

useEffect(() => {
    axios.get('https://'+window.location.hostname+':3003/getTeam')
    .then((response) => {setTeamData(response.data)});
},[]);

return (
    <div className='meet-the-team'>
        <div className='meet-the-team-container'>
            <h2>Meet the Team</h2>
            <ul className='y-split-parent'>
            {
                teamData.map(member => (
                    <li key={member.employee_id} className='mobile-y-split-parent y-split y-split-parent third'>
                        <div className='mobile-y-split y-split third'>
                            <img src={member.img_src}/>
                        </div>
                        <div className='mobile-y-split y-split two-thirds'>
                            <h4>{member.name}</h4>
                            <h5>{member.occupation}</h5>
                        </div>
                    </li>
                ))
            }
            </ul>
        </div>
    </div>
);

}