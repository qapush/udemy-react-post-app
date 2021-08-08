import React, {Component} from 'react';
import nextId from "react-id-generator";

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import './app.css';

export default class App extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            data:[
                {label: 'Going to learn React', important: true, like: false, id: nextId()},
                {label: 'That is so good', important: false, like: false, id: nextId()},
                {label: 'I need a break...', important: false, like: false, id: nextId()}
            ],
            term: '',
            filter: 'all'
        };
        
        // alternative syntex to bind() method

        this.onUpdateSearch = term => {
            this.setState({ term })
        }

        this.onFilterSelect = filter => {
            this.setState({ filter })
        }

        this.searchPost = (items, term) => {
            
            if(term.length === 0){
                return items;
            }

            return items.filter( item => {
                return item.label.indexOf(term) > -1;
            }) 

        }

        this.filterPost = (items, filter) => {
            
            if(filter === 'like') {
                return items.filter(item => item.like)
            } else {
                return items
            }
           
       }

        this.deleteItem = id => {
            this.setState( ({data}) => {
                const index = data.findIndex( elem => elem.id === id);

                const before = data.slice(0, index);
                const after = data.slice(index + 1);

                const newArr = [...before, ...after];
                return {
                    data: newArr
                }
            })
        };

        this.addItem = body => {
            const newItem = {
                label: body,
                important: false,
                id: nextId()
            }

            this.setState(({data}) => {
                const newArray = [...data, newItem];
                return {
                    data: newArray
                }
            })

        };

        this.onToggleImportant = id => {
            this.setState( ({data}) => {
                const index = data.findIndex( elem => elem.id === id );

                const oldItem = data[index];
                const newItem = {...oldItem, important: !oldItem.important}

                const newArray = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

                return {
                    data: newArray
                }
            });
        };

        this.onToggleLiked = id => {
            this.setState( ({data}) => {
                const index = data.findIndex( elem => elem.id === id );

                const oldItem = data[index];
                const newItem = {...oldItem, like: !oldItem.like}

                const newArray = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

                return {
                    data: newArray
                }
            });
        };

    }


    render() {

        const { data, term, filter } = this.state;

        const liked = data.filter( item => item.like ).length;
        const allPosts = data.length;

        const visiblePosts = this.filterPost( this.searchPost(data, term), filter);

        return (
            <div className="app">
                 <AppHeader 
                    liked = { liked }
                    allPosts = { allPosts }
                />
                 <div className="search-panel d-flex">
                     <SearchPanel 
                        onUpdateSearch = { this.onUpdateSearch }
                     />
                     <PostStatusFilter
                        filter = { filter }
                        onFilterSelect = { this.onFilterSelect }
                     />
                 </div>
                 <PostList 
                     posts={ visiblePosts }
                     onDelete={ this.deleteItem }
                     onToggleImportant={ this.onToggleImportant }    
                     onToggleLiked={ this.onToggleLiked }    
                     />
                 <PostAddForm
                    onAdd={ this.addItem }
                 />
            </div>
         )
    }   

}