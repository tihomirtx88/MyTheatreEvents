import { editTheatre, getTheatreById} from "../api/data.js";

import { html } from "../lib.js";


const editTemplate = (theatre,onSubmit) => html`
   <!--Edit Page-->
   <section id="editPage">
            <form @submit=${onSubmit} class="theater-form">
                <h1>Edit Theater</h1>
                <div>
                    <label for="title">Title:</label>
                    <input id="title" name="title" type="text" placeholder="Theater name" .value=${theatre.title}>
                </div>
                <div>
                    <label for="date">Date:</label>
                    <input id="date" name="date" type="text" placeholder="Month Day, Year" .value=${theatre.date}>
                </div>
                <div>
                    <label for="author">Author:</label>
                    <input id="author" name="author" type="text" placeholder="Author"
                    .value=${theatre.author}>
                </div>
                <div>
                    <label for="description">Theater Description:</label>
                    <textarea id="description" name="description"
                        placeholder="Description" .value=${theatre.description}></textarea>
                </div>
                <div>
                    <label for="imageUrl">Image url:</label>
                    <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url"
                    .value=${theatre.imageUrl}>
                </div>
                <button class="btn" type="submit">Submit</button>
            </form>
        </section>
`;

export async function editPage(ctx){
    const theatre = await getTheatreById(ctx.params.id);
    ctx.render(editTemplate(theatre, onSubmit));

    async function onSubmit(event){
        event.preventDefault();

        const formData = new FormData(event.target);

        const title = formData.get(`title`).trim();
        const date = formData.get(`date`).trim();
        const author = formData.get(`author`).trim();
        const description = formData.get(`description`).trim();
        const imageUrl = formData.get(`imageUrl`).trim();

        if (title == `` || description == `` || imageUrl == `` || date == `` || author == ``) {
            return alert(`All fields are required!`);
        }

        await editTheatre(ctx.params.id,{
            title,
            date,
            author,
            description,
            imageUrl
        });
        
        ctx.page.redirect(`/details/${theatre._id}`);
    }
}