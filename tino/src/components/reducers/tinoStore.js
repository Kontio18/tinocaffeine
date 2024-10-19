import { createStore } from 'redux';
import todos from './reducer';

const tinoStore = createStore(todos, {items:[]});

export default tinoStore