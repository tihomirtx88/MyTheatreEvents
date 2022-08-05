import { register } from "../api/api.js";
import { html } from "../lib.js";


const registerTemplate = (onSubmit) => html`
    <!--Register Page-->
    <section id="registerPage">
            <form @submit=${onSubmit} class="registerForm">
                <h2>Register</h2>
                <div class="on-dark">
                    <label for="email">Email:</label>
                    <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
                </div>

                <div class="on-dark">
                    <label for="password">Password:</label>
                    <input id="password" name="password" type="password" placeholder="********" value="">
                </div>

                <div class="on-dark">
                    <label for="repeatPassword">Repeat Password:</label>
                    <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
                </div>

                <button class="btn" type="submit">Register</button>

                <p class="field">
                    <span>If you have profile click <a href="/login">here</a></span>
                </p>
            </form>
        </section>

`;

export function registerPage(ctx){
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        
        
        const email = formData.get(`email`).trim();
        const password = formData.get(`password`).trim();
        const repeatPass = formData.get(`repeatPassword`).trim();
        

        if (email == `` || password == `` || repeatPass == ``) {
            return alert(`All field are reqiured`);
        }

        if (password != repeatPass) {
            return alert(`Password don/t match!`);
        }

        await register(email,password);
        ctx.updateUserNav();
        ctx.page.redirect(`/`);
    }
}