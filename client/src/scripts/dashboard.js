import React, { Component } from 'react';
import { BsMoonFill, BsSearch, BsSun } from 'react-icons/bs';
import '../styles/dashboard.css';
import Logo from '../img/logo512.png';
import maleAvatar from '../img/avatar/avatar-illustrated-02.png';
import femaleAvatar from '../img/avatar/avatar-illustrated-01.png';

import NewTaskPopup from './new_task';

class Dashboard extends Component {
    state = { menuShowing: true, darkMode: false , showNewTaskPopup: false};

    toggleMenu() {
        if (this.state.menuShowing)
            return "sidebar"
        else
            return "sidebar hidden"
    }

    toggleTheme() {
        if (!this.state.darkMode) {
            document.body.classList.add('darkmode');
            this.setState({ darkMode: true });
        } else {
            document.body.classList.remove('darkmode');
            this.setState({ darkMode: false });
        }
    }

    render() {
        const { menuShowing, darkMode, showNewTaskPopup } = this.state;
        return (
            <div class="page-flex">
                <aside class={this.toggleMenu()}>
                    <div class="sidebar-start">
                        <div class="sidebar-head">
                            <a href="/" class="logo-wrapper" title="Home">
                                <span class="sr-only">Home</span>
                                {/* <span class="icon logo" aria-hidden="true"></span> */}
                                <img src={Logo} alt="Logo" class="icon logo" aria-hidden="true"/>
                                <div class="logo-text">
                                    <span class="logo-title">XToDo</span>
                                    <span class="logo-subtitle">Dashboard</span>
                                </div>

                            </a>
                            <button class="sidebar-toggle transparent-btn" title="Menu" type="button" onClick={() => this.setState({ menuShowing: !menuShowing })}>
                                <span class="sr-only">Toggle menu</span>
                                <span class="icon menu-toggle" aria-hidden="true"></span>
                            </button>
                        </div>
                        <div class="sidebar-body">
                            <ul class="sidebar-body-menu">
                                <li>
                                    <a class="active" href="#" role="button" onClick={() => this.setState({ showNewTaskPopup: !showNewTaskPopup })}><span class="icon new_task" aria-hidden="true"></span>New Task</a>
                                    <NewTaskPopup show={showNewTaskPopup} onHide={ () => this.setState({ showNewTaskPopup: !showNewTaskPopup })} />
                                </li>
                                <li>
                                    <a class="show-cat-btn" href="##">
                                        <span class="icon document" aria-hidden="true"></span>Posts
                                        <span class="category__btn transparent-btn" title="Open list">
                                            <span class="sr-only">Open list</span>
                                            <span class="icon arrow-down" aria-hidden="true"></span>
                                        </span>
                                    </a>
                                    <ul class="cat-sub-menu">
                                        <li>
                                            <a href="posts.html">All Posts</a>
                                        </li>
                                        <li>
                                            <a href="new-post.html">Add new post</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a class="show-cat-btn" href="##">
                                        <span class="icon folder" aria-hidden="true"></span>Categories
                                        <span class="category__btn transparent-btn" title="Open list">
                                            <span class="sr-only">Open list</span>
                                            <span class="icon arrow-down" aria-hidden="true"></span>
                                        </span>
                                    </a>
                                    <ul class="cat-sub-menu">
                                        <li>
                                            <a href="categories.html">All categories</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a class="show-cat-btn" href="##">
                                        <span class="icon image" aria-hidden="true"></span>Media
                                        <span class="category__btn transparent-btn" title="Open list">
                                            <span class="sr-only">Open list</span>
                                            <span class="icon arrow-down" aria-hidden="true"></span>
                                        </span>
                                    </a>
                                    <ul class="cat-sub-menu">
                                        <li>
                                            <a href="media-01.html">Media-01</a>
                                        </li>
                                        <li>
                                            <a href="media-02.html">Media-02</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a class="show-cat-btn" href="##">
                                        <span class="icon paper" aria-hidden="true"></span>Pages
                                        <span class="category__btn transparent-btn" title="Open list">
                                            <span class="sr-only">Open list</span>
                                            <span class="icon arrow-down" aria-hidden="true"></span>
                                        </span>
                                    </a>
                                    <ul class="cat-sub-menu">
                                        <li>
                                            <a href="pages.html">All pages</a>
                                        </li>
                                        <li>
                                            <a href="new-page.html">Add new page</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="comments.html">
                                        <span class="icon message" aria-hidden="true"></span>
                                        Comments
                                    </a>
                                    <span class="msg-counter">7</span>
                                </li>
                            </ul>
                            <span class="system-menu__title">system</span>
                            <ul class="sidebar-body-menu">
                                <li>
                                    <a href="appearance.html"><span class="icon edit" aria-hidden="true"></span>Appearance</a>
                                </li>
                                <li>
                                    <a class="show-cat-btn" href="##">
                                        <span class="icon category" aria-hidden="true"></span>Extentions
                                        <span class="category__btn transparent-btn" title="Open list">
                                            <span class="sr-only">Open list</span>
                                            <span class="icon arrow-down" aria-hidden="true"></span>
                                        </span>
                                    </a>
                                    <ul class="cat-sub-menu">
                                        <li>
                                            <a href="extention-01.html">Extentions-01</a>
                                        </li>
                                        <li>
                                            <a href="extention-02.html">Extentions-02</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a class="show-cat-btn" href="##">
                                        <span class="icon user-3" aria-hidden="true"></span>Users
                                        <span class="category__btn transparent-btn" title="Open list">
                                            <span class="sr-only">Open list</span>
                                            <span class="icon arrow-down" aria-hidden="true"></span>
                                        </span>
                                    </a>
                                    <ul class="cat-sub-menu">
                                        <li>
                                            <a href="users-01.html">Users-01</a>
                                        </li>
                                        <li>
                                            <a href="users-02.html">Users-02</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="##"><span class="icon setting" aria-hidden="true"></span>Settings</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </aside>
                <div class="main-wrapper">
                    <nav class="main-nav--bg">
                        <div class="container main-nav">
                            <div class="main-nav-start">
                                <div class="search-wrapper">
                                    <i aria-hidden="true"><BsSearch/></i>
                                    <input type="text" placeholder="Enter keywords ..." required />
                                </div>
                            </div>
                            <div class="main-nav-end">
                                <button class="sidebar-toggle transparent-btn" title="Menu" type="button" onClick={() => this.setState({ menuShowing: !menuShowing })}>
                                    <span class="sr-only">Toggle menu</span>
                                    <span class="icon menu-toggle--gray" aria-hidden="true"></span>
                                </button>
                                <button class="theme-switcher gray-circle-btn" type="button" title="Switch theme" onClick={() => {this.setState({ darkMode: !darkMode }); this.toggleTheme()}}>
                                    <span class="sr-only">Switch theme</span>
                                    <i class="sun-icon" aria-hidden="true"><BsSun/></i>
                                    <i class="moon-icon" aria-hidden="true"><BsMoonFill/></i>
                                </button>
                                <div class="notification-wrapper">
                                    <button class="gray-circle-btn dropdown-btn" title="To messages" type="button">
                                        <span class="sr-only">To messages</span>
                                        <span class="icon notification active" aria-hidden="true"></span>
                                    </button>
                                    <ul class="users-item-dropdown notification-dropdown dropdown">
                                        <li>
                                            <a href="##">
                                                <div class="notification-dropdown-icon info">
                                                    <i data-feather="check"></i>
                                                </div>
                                                <div class="notification-dropdown-text">
                                                    <span class="notification-dropdown__title">System just updated</span>
                                                    <span class="notification-dropdown__subtitle">The system has been successfully upgraded. Read more
                                                        here.</span>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="##">
                                                <div class="notification-dropdown-icon danger">
                                                    <i data-feather="info" aria-hidden="true"></i>
                                                </div>
                                                <div class="notification-dropdown-text">
                                                    <span class="notification-dropdown__title">The cache is full!</span>
                                                    <span class="notification-dropdown__subtitle">Unnecessary caches take up a lot of memory space and
                                                        interfere ...</span>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="##">
                                                <div class="notification-dropdown-icon info">
                                                    <i data-feather="check" aria-hidden="true"></i>
                                                </div>
                                                <div class="notification-dropdown-text">
                                                    <span class="notification-dropdown__title">New Subscriber here!</span>
                                                    <span class="notification-dropdown__subtitle">A new subscriber has subscribed.</span>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a class="link-to-page" href="##">Go to Notifications page</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="nav-user-wrapper">
                                    <button href="##" class="nav-user-btn dropdown-btn" title="My profile" type="button">
                                        <span class="sr-only">My profile</span>
                                        <span class="nav-user-img">
                                            <img src={maleAvatar} alt="User name" />

                                        </span>
                                    </button>
                                    <ul class="users-item-dropdown nav-user-dropdown dropdown">
                                        <li><a href="##">
                                            <i data-feather="user" aria-hidden="true"></i>
                                            <span>Profile</span>
                                        </a></li>
                                        <li><a href="##">
                                            <i data-feather="settings" aria-hidden="true"></i>
                                            <span>Account settings</span>
                                        </a></li>
                                        <li><a class="danger" href="##">
                                            <i data-feather="log-out" aria-hidden="true"></i>
                                            <span>Log out</span>
                                        </a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <main class="main users chart-page" id="skip-target">
                        <div class="container">
                            <h2 class="main-title">Dashboard</h2>
                            <div class="row stat-cards">
                                <div class="col-md-6 col-xl-3">
                                    <article class="stat-cards-item">
                                        <div class="stat-cards-icon primary">
                                            <i data-feather="bar-chart-2" aria-hidden="true"></i>
                                        </div>
                                        <div class="stat-cards-info">
                                            <p class="stat-cards-info__num">1478 286</p>
                                            <p class="stat-cards-info__title">Total visits</p>
                                            <p class="stat-cards-info__progress">
                                                <span class="stat-cards-info__profit success">
                                                    <i data-feather="trending-up" aria-hidden="true"></i>4.07%
                                                </span>
                                                Last month
                                            </p>
                                        </div>
                                    </article>
                                </div>
                                <div class="col-md-6 col-xl-3">
                                    <article class="stat-cards-item">
                                        <div class="stat-cards-icon warning">
                                            <i data-feather="file" aria-hidden="true"></i>
                                        </div>
                                        <div class="stat-cards-info">
                                            <p class="stat-cards-info__num">1478 286</p>
                                            <p class="stat-cards-info__title">Total visits</p>
                                            <p class="stat-cards-info__progress">
                                                <span class="stat-cards-info__profit success">
                                                    <i data-feather="trending-up" aria-hidden="true"></i>0.24%
                                                </span>
                                                Last month
                                            </p>
                                        </div>
                                    </article>
                                </div>
                                <div class="col-md-6 col-xl-3">
                                    <article class="stat-cards-item">
                                        <div class="stat-cards-icon purple">
                                            <i data-feather="file" aria-hidden="true"></i>
                                        </div>
                                        <div class="stat-cards-info">
                                            <p class="stat-cards-info__num">1478 286</p>
                                            <p class="stat-cards-info__title">Total visits</p>
                                            <p class="stat-cards-info__progress">
                                                <span class="stat-cards-info__profit danger">
                                                    <i data-feather="trending-down" aria-hidden="true"></i>1.64%
                                                </span>
                                                Last month
                                            </p>
                                        </div>
                                    </article>
                                </div>
                                <div class="col-md-6 col-xl-3">
                                    <article class="stat-cards-item">
                                        <div class="stat-cards-icon success">
                                            <i data-feather="feather" aria-hidden="true"></i>
                                        </div>
                                        <div class="stat-cards-info">
                                            <p class="stat-cards-info__num">1478 286</p>
                                            <p class="stat-cards-info__title">Total visits</p>
                                            <p class="stat-cards-info__progress">
                                                <span class="stat-cards-info__profit warning">
                                                    <i data-feather="trending-up" aria-hidden="true"></i>0.00%
                                                </span>
                                                Last month
                                            </p>
                                        </div>
                                    </article>
                                </div>
                            </div>
                            <div class="row">
                                
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

export default Dashboard;