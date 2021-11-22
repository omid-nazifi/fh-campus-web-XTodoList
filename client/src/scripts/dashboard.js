import React, { Component } from 'react';
import { BsMoonFill, BsSearch, BsSun, BsThreeDots } from 'react-icons/bs';
import '../styles/dashboard.css';
import Logo from '../img/logo512.png';
import maleAvatar from '../img/avatar/avatar-illustrated-02.png';

import CreateTask from './createTask';
import { DashboardPages, TaskStatus } from './enums';
import { Table } from 'react-bootstrap';

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: 1, // TODO should be dynamic
            pageTitle: "Dashboard",
            activePage: DashboardPages.BOARD,
            menuShowing: true,
            darkMode: false,
            showNewTaskModal: false,
            newTaskModalTitle: '',
            taskList: []
        }
    }

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

    handleShow = (page) => {
        switch (page.page) {
            case DashboardPages.CREATE_TASK:
                this.setState({
                    showNewTaskModal: true,
                    newTaskModalTitle: 'Create new Task',
                });
                return;
            case DashboardPages.TODO:
                this.setState({
                    pageTitle: 'List of tasks which are not yet started',
                    activePage: DashboardPages.TODO,
                });
                break;
            case DashboardPages.IN_PROGRESS:
                this.setState({
                    pageTitle: 'List of tasks which are in progess',
                    activePage: DashboardPages.IN_PROGRESS,
                });
                break;
            case DashboardPages.DONE:
                this.setState({
                    pageTitle: 'List of tasks which have already done',
                    activePage: DashboardPages.DONE,
                });
                break;
            case DashboardPages.SETTINGS:
                this.setState({
                    pageTitle: 'Settings',
                    activePage: DashboardPages.SETTINGS,
                });
                break;
            default:
                this.setState({
                    pageTitle: 'List of all tasks',
                    activePage: DashboardPages.BOARD,
                });
                break;
        }
        this.loadTasks(page);
    };

    handleCreateTaskModalClose = (fromModal) => {
        if (fromModal.msg) {
            alert(fromModal.msg);// TODO if model was ok refresh list of tasks
        }
        this.setState({
            showNewTaskModal: false
        });
    };

    async loadTasks(page) {
        let url = 'http://localhost:8080/tasks/user/' + this.state.userId;
        switch (page.page) {
            case DashboardPages.TODO:
                url += '/status/' + TaskStatus.TODO;
                break;
            case DashboardPages.IN_PROGRESS:
                url += '/status/' + TaskStatus.IN_PROGRESS;
                break;
            case DashboardPages.DONE:
                url += '/status/' + TaskStatus.DONE;
                break;
            default:
                break;
        }

        try {
            console.log(url);
            const res = await fetch(url);

            if (!res.ok) {
                const message = `An error has occured: ${res.status} - ${res.statusText}`;
                throw new Error(message);
            }

            const data = await res.json();

            const result = {
                status: res.status + "-" + res.statusText,
                headers: {
                    "Content-Type": res.headers.get("Content-Type"),
                    "Content-Length": res.headers.get("Content-Length"),
                },
                length: res.headers.get("Content-Length"),
                data: data,
            };

            console.log(result.data);
            this.state.taskList = result.data;
        } catch (err) {
            console.log(err.message);
        }
    }

    render() {
        const { menuShowing, darkMode } = this.state;
        //this.handleShow({ page: DashboardPages.BOARD });
        return (
            <div class="page-flex">
                <aside class={this.toggleMenu()}>
                    <div class="sidebar-start">
                        <div class="sidebar-head">
                            <a href="/" class="logo-wrapper" title="Home">
                                <span class="sr-only">Home</span>
                                <img src={Logo} alt="Logo" class="icon logo" aria-hidden="true" />
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
                                    <a href="##" role="button" onClick={() => this.handleShow({ page: DashboardPages.CREATE_TASK })}>
                                        <span class="icon new_task" aria-hidden="true"></span>New Task
                                    </a>
                                    <CreateTask
                                        show={this.state.showNewTaskModal}
                                        title={this.state.newTaskModalTitle}
                                        userId={this.state.userId}
                                        onClick={this.handleCreateTaskModalClose}
                                        onHide={this.handleCreateTaskModalClose} />
                                </li>
                                <li>
                                    <a className={this.state.activePage === DashboardPages.BOARD ? "active" : ""} href="##"
                                        onClick={() => this.handleShow({ page: DashboardPages.BOARD })}>
                                        <span class="icon document" aria-hidden="true"></span>Board (all)
                                    </a>
                                </li>
                                <li>
                                    <a className={this.state.activePage === DashboardPages.TODO ? "active" : ""} href="##"
                                        onClick={() => this.handleShow({ page: DashboardPages.TODO })}>
                                        <span class="icon task-todo" aria-hidden="true"></span>Todo Tasks
                                    </a>
                                </li>
                                <li>
                                    <a className={this.state.activePage === DashboardPages.IN_PROGRESS ? "active" : ""} href="##"
                                        onClick={() => this.handleShow({ page: DashboardPages.IN_PROGRESS })}>
                                        <span class="icon task-inprogress" aria-hidden="true"></span>In Progress Tasks
                                    </a>
                                </li>
                                <li>
                                    <a className={this.state.activePage === DashboardPages.DONE ? "active" : ""} href="##"
                                        onClick={() => this.handleShow({ page: DashboardPages.DONE })}>
                                        <span class="icon task-done" aria-hidden="true"></span>Done Tasks
                                    </a>
                                </li>
                            </ul>
                            <span class="system-menu__title">system</span>
                            <ul class="sidebar-body-menu">
                                <li>
                                    <a className={this.state.activePage === DashboardPages.SETTINGS ? "active" : ""} href="##"
                                        onClick={() => this.handleShow({ page: DashboardPages.SETTINGS })}>
                                        <span class="icon setting" aria-hidden="true"></span>Settings
                                    </a>
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
                                    <i aria-hidden="true"><BsSearch /></i>
                                    <input type="text" placeholder="Enter keywords ..." required />
                                </div>
                            </div>
                            <div class="main-nav-end">
                                <button class="sidebar-toggle transparent-btn" title="Menu" type="button" onClick={() => this.setState({ menuShowing: !menuShowing })}>
                                    <span class="sr-only">Toggle menu</span>
                                    <span class="icon menu-toggle--gray" aria-hidden="true"></span>
                                </button>
                                <button class="theme-switcher gray-circle-btn" type="button" title="Switch theme" onClick={() => { this.setState({ darkMode: !darkMode }); this.toggleTheme() }}>
                                    <span class="sr-only">Switch theme</span>
                                    <i class="sun-icon" aria-hidden="true"><BsSun /></i>
                                    <i class="moon-icon" aria-hidden="true"><BsMoonFill /></i>
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
                    <main class="main users" id="skip-target">
                        <div class="container">
                            <h2 class="main-title">{this.state.pageTitle}</h2>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="users-table table-wrapper">
                                        <Table responsive>
                                            <thead>
                                                <tr class="users-table-info">
                                                    <th>Task ID</th>
                                                    <th>Title</th>
                                                    <th>Deadline</th>
                                                    <th>Last Modification</th>
                                                    <th>priority</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.taskList.map((item, index) => {
                                                    return [
                                                        <tr key={index}>
                                                            <td>{item.id}</td>
                                                            <td>{item.title}</td>
                                                            <td>{item.deadline}</td>
                                                            <td>{item.modifiedTime}</td>
                                                            <td>{item.priority}</td>
                                                            <td>{[
                                                                item.status === "SUSPENDED" ? <span class="badge-disabled">Suspended</span> : null,
                                                                item.status === "IN_PROGRESS" ? <span class="badge-active">In Progress</span> : null,
                                                                item.status === "SUSPENDED" ? <span class="badge-pending">Suspended</span>: null,
                                                                item.status === "DONE" ? <span class="badge-success">Done</span> : null
                                                            ]
                                                            }
                                                            </td>
                                                            <td>
                                                                <span class="p-relative">
                                                                    <button class="dropdown-btn transparent-btn" type="button" title="More info">
                                                                        <div class="sr-only">More info</div>
                                                                        <i aria-hidden="true"><BsThreeDots /></i>
                                                                    </button>
                                                                    <ul class="users-item-dropdown dropdown">
                                                                        <li><a href="##">Edit</a></li>
                                                                        <li><a href="##">Trash</a></li>
                                                                    </ul>
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ];
                                                })}
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

export default Dashboard;