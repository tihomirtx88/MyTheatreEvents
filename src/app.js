import { logout } from "./api/api.js";
import { page, render } from "./lib.js";
import { getUserData } from "./util.js";

import { createPage } from "./vews/createPage.js";
import { detailsPage } from "./vews/detailsPage.js";


import { editPage } from "./vews/editPage.js";
import { homePage } from "./vews/homePage.js";
import { loginPage } from "./vews/loginPage.js";
import { profilePage } from "./vews/profilePage.js";
import { registerPage } from "./vews/registerPage.js";


const root = document.getElementById(`content`);
document.getElementById(`logoutBtn`).addEventListener(`click`, onLogout);

page(decorateContext);
page(`/`, homePage);
page(`/login`, loginPage );
page(`/register`, registerPage);
page(`/create`, createPage);
page(`/profile`, profilePage);
page(`/details/:id`, detailsPage);
page(`/edit/:id`, editPage);

updateUserNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content,root);
    ctx.updateUserNav = updateUserNav;

    next();
}

function onLogout(){
  logout();
  updateUserNav();
  page.redirect(`/`);
}

function updateUserNav(){
    const userData = getUserData();

    if (userData) {
        document.querySelector(`.user`).style.display = `block`;
        document.querySelector(`.guest`).style.display = `none`;
        
    }else{
        document.querySelector(`.user`).style.display = `none`;
        document.querySelector(`.guest`).style.display = `block`;
    }
}