import { deleteById, getLikesByTheatreId, getMyLikeByTheatreId, getTheatreById,  likeTheatre } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (theatre, isOwner, onDelete, likes, showLikeButton, onLike) => html`
     <!--Details Page-->
     <section id="detailsPage">
            <div id="detailsBox">
                <div class="detailsInfo">
                    <h1>Title: ${theatre.title}</h1>
                    <div>
                        <img src=${theatre.imageUrl} />
                    </div>
                </div>

                <div class="details">
                    <h3>Theater Description</h3>
                    <p>${theatre.description}</p>
                    <h4>Date: ${theatre.date}</h4>
                    <h4>Author: ${theatre.author}</h4>
                    <div class="buttons">
                    ${theatreControlTemplate(theatre, isOwner, onDelete)}
                    ${likeControlTemplate(showLikeButton,onLike)}
                        
                       
                    </div>
                    <p class="likes">Likes: ${likes}</p>
                </div>
            </div>
        </section>

       
`;

const theatreControlTemplate = (theatre, isOwner, onDelete) => {
    if (isOwner) {
        return html`
          <a @click=${onDelete} class="btn-delete" href="#">Delete</a>
          <a class="btn-edit" href="/edit/${theatre._id}">Edit</a>
          `;
    } else {
        return null;
    }
}

const likeControlTemplate = (showLikeButton,onLike) => {
    if (showLikeButton) {
      return html` <a @click=${onLike} class="btn-like" href="/like">Like</a>`
        
    }else{
      return null;
    }
  }



export async function detailsPage(ctx) {
    const userData = await getUserData();

    const [theatre, likes, hasLike] = await Promise.all([
        getTheatreById(ctx.params.id),
        getLikesByTheatreId(ctx.params.id),

        userData ? getMyLikeByTheatreId(ctx.params.id, userData.id) : 0
    ])
    const isOwner = userData && userData.id == theatre._ownerId;
    const showLikeButton = !isOwner && hasLike == 0 && userData != null;

    ctx.render(detailsTemplate(theatre, isOwner, onDelete, likes, showLikeButton, onLike));

    async function onDelete() {
        const choice = confirm(`Are you sure you want to delete this entry?`);

        if (choice) {
            await deleteById(ctx.params.id);
            ctx.page.redirect(`/`);
        }
    }

    async function onLike(e) {
        e.preventDefault();
        await likeTheatre(ctx.params.id);
        ctx.page.redirect(`/details/` + ctx.params.id);
        //Refresh on the page witch one will make count of likes + 1
    }
}