import React, { Component } from 'react';
import { BsMoonFill, BsPencilSquare, BsSearch, BsSun, BsTrash } from 'react-icons/bs';
import '../styles/dashboard.css';
import Logo from '../img/logo512.png';
import maleAvatar from '../img/avatar/avatar-illustrated-02.png';

import AuthService from '../services/auth.service';
import CreateTask from './createTask';
import { DashboardPages, TaskStatus } from './enums';
import { Table, Modal, Button } from 'react-bootstrap';
import Profile from './profile';

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: AuthService.getCurrentUser().id,
            pageTitle: "Dashboard",
            activePage: DashboardPages.BOARD,
            menuShowing: true,
            darkMode: false,
            showNewTaskModal: false,
            newTaskModalTitle: '',
            showProfileModal: false,
            profileModalTitle: '',
            taskList: [],
            selectedTask: {
                color: "",
                comments: [],
                deadline: "",
                description: "",
                id: 0,
                parentId: 0,
                priority: "",
                status: "",
                tags: "",
                title: "",
              },
            alertDialogState: {
                show: false,
                title: "",
                message: "",
                isConfirm: false,
                okButton: "",
                cancelButton: "",
                onClose: () => this.closeAlertDialog(),
                onOk: () => this.closeAlertDialog()
            }
        }
        this.loadTasks = this.loadTasks.bind(this);
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

    handleShow = (page, task) => {
        switch (page) {
            case DashboardPages.EDIT_PROFILE:
                this.setState({
                    showProfileModal: true,
                    profileModalTitle: 'Edit profile',
                });
                return;
            case DashboardPages.CREATE_TASK:
                this.setState({
                    showNewTaskModal: true,
                    newTaskModalTitle: 'Create new Task',
                    selectedTask: {}
                });
                return;
            case DashboardPages.EDIT_TASK:
                if (task) {
                    this.setState({
                        showNewTaskModal: true,
                        newTaskModalTitle: 'Edit TaskId ' + task.id,
                        selectedTask: task
                    });
                    // console.log(this.state.newTaskModalTitle);
                }
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
        if (fromModal && fromModal.msg) {
            alert(fromModal.msg);// TODO if model was ok refresh list of tasks
        }
        this.setState({
            showNewTaskModal: false
        });
    };

    handleProfileModalClose = () => {
        this.setState({
            showProfileModal: false
        });
    };

    handleDeleteTask = (task) => {
        this.setState({
            alertDialogState: {
                show: true,
                isConfirm: true,
                okButton: "Yes",
                cancelButton: "No",
                message: "Are you sure?",
                title: "Delete Task",
                onClose: () => this.closeAlertDialog(),
                onOk: async () => {
                    this.closeAlertDialog();

                    let url = 'http://localhost:8080/tasks/' + task.id;
                    const settings = {
                        method: 'DELETE',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Token': AuthService.getCurrentUser().token
                        }
                    };

                    try {
                        const res = await fetch(url, settings);

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
                        this.loadTasks(this.state.activePage);
                    } catch (err) {
                        console.log(err.message);
                    }
                }
            }
        });
    };

    closeAlertDialog = () => {
        this.setState({ alertDialogState: {show: false }});
    }

    logout() {
        localStorage.removeItem("user");
        this.props.history.push("/sign-in");
    }

    componentDidMount() {
        this.loadTasks();
    }

    async loadTasks(page = DashboardPages.BOARD) {
        let url = 'http://localhost:8080/tasks/user/' + this.state.userId;
        const settings = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Token' : AuthService.getCurrentUser().token
            }
        };
        switch (page) {
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
            const res = await fetch(url, settings);

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
            this.setState({
                taskList: result.data
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    render() {
        const { menuShowing, darkMode } = this.state;
        return (
            <div className="page-flex">
                <aside className={this.toggleMenu()}>
                    <div className="sidebar-start">
                        <div className="sidebar-head">
                            <a href="/" className="logo-wrapper" title="Home">
                                <span className="sr-only">Home</span>
                                <img src={Logo} alt="Logo" className="icon logo" aria-hidden="true" />
                                <div className="logo-text">
                                    <span className="logo-title">XToDo</span>
                                    <span className="logo-subtitle">Dashboard</span>
                                </div>

                            </a>
                            <button className="sidebar-toggle transparent-btn" title="Menu" type="button" onClick={() => this.setState({ menuShowing: !menuShowing })}>
                                <span className="sr-only">Toggle menu</span>
                                <span className="icon menu-toggle" aria-hidden="true"></span>
                            </button>
                        </div>
                        <div className="sidebar-body">
                            <ul className="sidebar-body-menu">
                                <li>
                                    <a href="##" role="button" onClick={() => this.handleShow(DashboardPages.CREATE_TASK)}>
                                        <span className="icon new_task" aria-hidden="true"></span>New Task
                                    </a>
                                    <CreateTask
                                        show={this.state.showNewTaskModal}
                                        title={this.state.newTaskModalTitle}
                                        userId={this.state.userId}
                                        selectedTask={this.state.selectedTask}
                                        onClick={this.handleCreateTaskModalClose}
                                        onHide={this.handleCreateTaskModalClose} />
                                    <Profile
                                        show={this.state.showProfileModal}
                                        title={this.state.profileModalTitle}
                                        userId={this.state.userId}
                                        onClick={this.handleProfileModalClose}
                                        onHide={this.handleProfileModalClose} />
                                </li>
                                <li>
                                    <a className={this.state.activePage === DashboardPages.BOARD ? "active" : ""} href="##"
                                        onClick={() => this.handleShow(DashboardPages.BOARD)}>
                                        <span className="icon document" aria-hidden="true"></span>Board (all)
                                    </a>
                                </li>
                                <li>
                                    <a className={this.state.activePage === DashboardPages.TODO ? "active" : ""} href="##"
                                        onClick={() => this.handleShow(DashboardPages.TODO)}>
                                        <span className="icon task-todo" aria-hidden="true"></span>Todo Tasks
                                    </a>
                                </li>
                                <li>
                                    <a className={this.state.activePage === DashboardPages.IN_PROGRESS ? "active" : ""} href="##"
                                        onClick={() => this.handleShow(DashboardPages.IN_PROGRESS)}>
                                        <span className="icon task-inprogress" aria-hidden="true"></span>In Progress Tasks
                                    </a>
                                </li>
                                <li>
                                    <a className={this.state.activePage === DashboardPages.DONE ? "active" : ""} href="##"
                                        onClick={() => this.handleShow(DashboardPages.DONE)}>
                                        <span className="icon task-done" aria-hidden="true"></span>Done Tasks
                                    </a>
                                </li>
                            </ul>
                            <span className="system-menu__title">system</span>
                            <ul className="sidebar-body-menu">
                                <li>
                                    <a className={this.state.activePage === DashboardPages.SETTINGS ? "active" : ""} href="##"
                                        onClick={() => this.handleShow(DashboardPages.SETTINGS)}>
                                        <span className="icon setting" aria-hidden="true"></span>Settings
                                    </a>
                                </li>
                                <li>
                                    <a href="##"
                                        onClick={() => this.logout()}>
                                        <span aria-hidden="true"></span>Log out
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </aside>
                <div className="main-wrapper">
                    <nav className="main-nav--bg">
                        <div className="container main-nav">
                            <div className="main-nav-start">
                                <div className="search-wrapper">
                                    <i aria-hidden="true"><BsSearch /></i>
                                    <input type="text" placeholder="Enter keywords ..." required />
                                </div>
                            </div>
                            <div className="main-nav-end">
                                <button className="sidebar-toggle transparent-btn" title="Menu" type="button" onClick={() => this.setState({ menuShowing: !menuShowing })}>
                                    <span className="sr-only">Toggle menu</span>
                                    <span className="icon menu-toggle--gray" aria-hidden="true"></span>
                                </button>
                                <button className="theme-switcher gray-circle-btn" type="button" title="Switch theme" onClick={() => { this.setState({ darkMode: !darkMode }); this.toggleTheme() }}>
                                    <span className="sr-only">Switch theme</span>
                                    <i className="sun-icon" aria-hidden="true"><BsSun /></i>
                                    <i className="moon-icon" aria-hidden="true"><BsMoonFill /></i>
                                </button>
                                <div className="notification-wrapper">
                                    <button className="gray-circle-btn dropdown-btn" title="To messages" type="button">
                                        <span className="sr-only">To messages</span>
                                        <span className="icon notification active" aria-hidden="true"></span>
                                    </button>
                                    <ul className="users-item-dropdown notification-dropdown dropdown">
                                        <li>
                                            <a href="##">
                                                <div className="notification-dropdown-icon info">
                                                    <i data-feather="check"></i>
                                                </div>
                                                <div className="notification-dropdown-text">
                                                    <span className="notification-dropdown__title">System just updated</span>
                                                    <span className="notification-dropdown__subtitle">The system has been successfully upgraded. Read more
                                                        here.</span>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="##">
                                                <div className="notification-dropdown-icon danger">
                                                    <i data-feather="info" aria-hidden="true"></i>
                                                </div>
                                                <div className="notification-dropdown-text">
                                                    <span className="notification-dropdown__title">The cache is full!</span>
                                                    <span className="notification-dropdown__subtitle">Unnecessary caches take up a lot of memory space and
                                                        interfere ...</span>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="##">
                                                <div className="notification-dropdown-icon info">
                                                    <i data-feather="check" aria-hidden="true"></i>
                                                </div>
                                                <div className="notification-dropdown-text">
                                                    <span className="notification-dropdown__title">New Subscriber here!</span>
                                                    <span className="notification-dropdown__subtitle">A new subscriber has subscribed.</span>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="link-to-page" href="##">Go to Notifications page</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="nav-user-wrapper">
                                    <button href="##" className="nav-user-btn dropdown-btn" title="My profile" type="button" onClick={() => this.handleShow(DashboardPages.EDIT_PROFILE)}>
                                        <span className="sr-only">My profile</span>
                                        <span className="nav-user-img">
                                            <img src={maleAvatar} alt="User name" />
                                        </span>
                                    </button>
                                    <ul className="users-item-dropdown nav-user-dropdown dropdown">
                                        <li><a href="##">
                                            <i data-feather="user" aria-hidden="true"></i>
                                            <span>Profile</span>
                                        </a></li>
                                        <li><a href="##">
                                            <i data-feather="settings" aria-hidden="true"></i>
                                            <span>Account settings</span>
                                        </a></li>
                                        <li><a className="danger" href="##">
                                            <i data-feather="log-out" aria-hidden="true"></i>
                                            <span>Log out</span>
                                        </a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <main className="main users" id="skip-target">
                        <div className="container">
                            <h2 className="main-title">{this.state.pageTitle}</h2>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="users-table table-wrapper">
                                        <Table responsive>
                                            <thead>
                                                <tr className="users-table-info">
                                                    <th>Task ID</th>
                                                    <th>Title</th>
                                                    <th>Deadline</th>
                                                    <th>Last Modification</th>
                                                    <th>priority</th>
                                                    <th>Status</th>
                                                    <th>Edit</th>
                                                    <th>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.taskList.map((item, index) => {
                                                    return [
                                                        <tr key={item.id}>
                                                            <td>{item.id}</td>
                                                            <td>{item.title}</td>
                                                            <td>{item.deadline}</td>
                                                            <td>{item.modifiedTime}</td>
                                                            <td>{item.priority}</td>
                                                            <td>{[
                                                                item.status === "SUSPENDED" ? <span className="badge-disabled">Suspended</span> : null,
                                                                item.status === "IN_PROGRESS" ? <span className="badge-active">In Progress</span> : null,
                                                                item.status === "SUSPENDED" ? <span className="badge-pending">Suspended</span> : null,
                                                                item.status === "DONE" ? <span className="badge-success">Done</span> : null
                                                            ]
                                                            }
                                                            </td>
                                                            <td>
                                                                <span className="p-relative">
                                                                    <button className="dropdown-btn transparent-btn" type="button" title="More info" value={item}
                                                                    onClick={() => this.handleShow(DashboardPages.EDIT_TASK, item)}>
                                                                        <div className="sr-only">Edit</div>
                                                                        <i aria-hidden="true"><BsPencilSquare/></i>
                                                                    </button>
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span className="p-relative">
                                                                    <button className="dropdown-btn transparent-btn" type="button" title="More info"
                                                                    onClick={() => this.handleDeleteTask(item)}>
                                                                        <div className="sr-only">Delete</div>
                                                                        <i aria-hidden="true"><BsTrash/></i>
                                                                    </button>
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
                <div>
                    <Modal show={this.state.alertDialogState.show} onHide={() => this.state.alertDialogState.onClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>{this.state.alertDialogState.title}</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>{this.state.alertDialogState.message}</Modal.Body>

                        <Modal.Footer>
                            {this.state.alertDialogState.isConfirm ? (
                                <Button variant="secondary" onClick={this.state.alertDialogState.onClose}>
                                    {this.state.alertDialogState.cancelButton}
                                </Button>
                            ) : (
                                <Button variant="secondary" onClick={this.state.alertDialogState.onClose}>
                                    TEST
                                </Button>
                            )}
                            <Button variant="primary" onClick={this.state.alertDialogState.onOk}>
                                {this.state.alertDialogState.okButton}
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default Dashboard;