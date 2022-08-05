import { getMytheatres } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";


const profileTemplate = (theatre,userData) => html`
   <!--Profile Page-->
   <section id="profilePage">
            <div class="userInfo">
                <div class="avatar">
                    <img src="./images/profilePic.png">
                </div>
                <h2>${userData.email}</h2>
            </div>
            <div class="board">
                <!--If there are event-->
                ${theatre.length == 0 
              ? html`<div class="no-events">
                    <p>This user has no events yet!</p>
                </div>`
              : theatre.map(theatreCard)}
                
            </div>
        </section>
`;


const theatreCard = (card) => html`
  <div class="eventBoard">
                    <div class="event-info">
                        <img src=${card.imageUrl}>
                        <h2>${card.title}</h2>
                        <h6>${card.date}</h6>
                        <a href="/details/${card._id}" class="details-button">Details</a>
                    </div>
                </div>
`



export async function profilePage(ctx){
    const userData = await getUserData();
    const theatre = await getMytheatres(userData.id);
    ctx.render(profileTemplate(theatre,userData));
}