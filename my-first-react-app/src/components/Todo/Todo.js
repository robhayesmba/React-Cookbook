import React, {Component} from 'react';
import uuidv4 from 'uuid/v4';
import List from './List';
import './Todo.css';


class Todo extends Component {
    constructor() {
        super();

        //initial state...
        this.state = {
            task: '',
            items: []
        };
    }

    componentWillMount() {
        this.setState({
            items: [
                {
                    id: uuidv4(),
                    task: 'Pay the Rent',
                    completed: false
                },
                {
                    id: uuidv4(),
                    task: 'Go to the gym',
                    completed: false
                },
                {
                    id: uuidv4(),
                    task: 'Do my homework',
                    completed: false
                }   
            ]
        });
    }

    handleOnChange = e => {
        const { target: { value } } = e;

        this.setState({
            task: value
        });
    }

    handleOnSubmit = e => {
        //Prevent default to avoid the actual form submit
        e.preventDefault();

        if (this.state.task.trim() !== '') {
            this.setState({
                task: '',
                items: [
                    ...this.state.items,
                    {
                        id: uuidv4(),
                        task: this.state.task,
                        completed: false
                    }
                ]
            });
        }
    }

    markAsCompleted = id => {
        //finding the task by id...
        const foundTask = this.state.items.find(
            task => task.id === id
        );

        foundTask.completed = true;

        this.setState({
            items: [
                ...this.state.items,
            ]
        });
    }

    removeTask = id => {
        const filteredTasks = this.state.items.filter(
            task => task.id !== id
        );

        this.setState({
            items: filteredTasks
        });
    }

    render() {
        return (
            <div className="Todo">
                <h1>New Task:</h1>

                <form onSubmit={this.handleOnSubmit}>
                    <input
                        value={this.state.task}
                        onChange={this.handleOnChange}
                    />
                </form>

                <List
                    items={this.state.items}
                    markAsCompleted={this.markAsCompleted}
                    removeTask={this.removeTask}
                />
            </div>
        );
    }
}

export default Todo;