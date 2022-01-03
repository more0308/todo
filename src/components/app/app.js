import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import AddNewItem from "../add-new-item";
import ItemStatusFilter from '../item-status-filter';

import './app.css';
import {logDOM} from "@testing-library/react";

export default class App extends Component {
    maxId = 100;
    state = {
        todoData: [
            this.createItem('Drink Coffee'),
            this.createItem('Make Awesome App'),
            this.createItem('Have a lunch')
        ],
        term: '',
        filter: 'all' // all, active, done
    };

    createItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        };
    };

    onDeleteItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
            return {
                todoData: newArr
            }
        });
    };
    onAddItem = (text) => {
        this.setState(({todoData}) => {
            const resArr = [...todoData, this.createItem(text)];
            return {
                todoData: resArr
            }
        });
    };
    toggleProperty = (arr, id, propName) => {
        const idx = arr.findIndex((el) => el.id === id);
        const oldTodo = arr[idx];
        const newElement = {...oldTodo, [propName]: !oldTodo[propName]}
        return [
            ...arr.slice(0, idx),
            newElement,
            ...arr.slice(idx + 1)
        ];
    };
    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        });
    };
    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        });
    };
    onSearchPanel = (text) => {
        this.setState({term: text});
    };
    onFilterPanel = (text) => {
        this.setState({filter: text});
    };

    search(all, term) {
        return all.filter((item) => item.label.toLowerCase().includes(term.toLowerCase()));
    };
    filter(all, filter) {
        switch (filter) {
            case 'all':
                return all;
            case 'active':
                return all.filter((el)=> !el.done);
            case 'done':
                return all.filter((el)=> el.done);
            default:
                return all;
        }
    };

    render() {
        let visibleItems = this.search(this.state.todoData, this.state.term);
        visibleItems = this.filter(visibleItems, this.state.filter);
        const doneCount = this.state.todoData.filter((el) => el.done).length;
        const todoCount = this.state.todoData.length - doneCount;
        return (<div className="todo-app">
            <AppHeader toDo={todoCount} done={doneCount}/>
            <div className="top-panel d-flex">
                <SearchPanel onSearchPanel={this.onSearchPanel}/>
                <ItemStatusFilter
                    filter={this.state.filter}
                    onFilterPanel={this.onFilterPanel}/>
            </div>

            <TodoList todos={visibleItems}
                      onDeleted={this.onDeleteItem}
                      onToggleDone={this.onToggleDone}
                      onToggleImportant={this.onToggleImportant}/>
            <AddNewItem
                onItemAdd={this.onAddItem}/>
        </div>);
    };
}