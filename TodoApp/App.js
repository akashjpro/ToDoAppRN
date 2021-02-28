/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  AppRegistry,
  Platform,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import AddView from './componets/AddView';
import Counter from './componets/Counter';
import TaskFlatList from './componets/TaskFlatList';

import {createStore} from 'redux';
import {Provider} from 'react-redux';

//State
const appState = {
  data: [
    {title: 'Go to the office', isFinished: true},
    {title: 'Prepare tasks for today', isFinished: false},
    {title: 'Team meeting', isFinished: false},
    {title: 'Commit tasks changed', isFinished: false},
  ],
};

// Action

const finishTaskAction = (index) => {
  return {
    type: 'FINISH',
    atIndex: index,
  };
};

const deleteTask = (index) => {
  return {
    type: 'DELETE',
    atIndex: index,
  };
};

// Reducer

const taskListReducer = (state = appState, action) => {
  let newTaskList = state.data;
  switch (action.type) {
    case 'ADD':
      const newTask = {title: action.taskName, isFinished: false};
      return {...state, data: [...state.data, newTask]};

    case 'FINISH':
      newTaskList[action.atIndex].isFinished = true;
      return {...state, data: newTaskList};

    case 'DELETE':
      newTaskList = newTaskList.filter((item, i) => i !== action.atIndex);
      return {...state, data: newTaskList};
  }

  return state;
};

// Store

const store = createStore(taskListReducer, appState);
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {title: 'Go to the office', isFinished: true},
        {title: 'Prepare tasks for today', isFinished: false},
        {title: 'Team meeting', isFinished: false},
        {title: 'Commit tasks changed', isFinished: false},
      ],
    };
  }

  onAddNewTask = (taskName) => {
    if (taskName === '') return;

    const newTask = {title: taskName, isFinished: false};
    const newTaskList = [...this.state.data, newTask];

    this.setState({data: newTaskList});
  };

  // onFinishedItem = (index) => {
  //   let newTaskList = this.state.data;
  //   newTaskList[index].isFinished = true;
  //   this.setState({data: newTaskList});
  // };

  // onDeleteItem = (index) => {
  //   let newTaskList = this.state.data.filter((item, i) => i !== index);
  //   this.setState({data: newTaskList});
  // };

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <AddView onAddNewTask={this.onAddNewTask}></AddView>
          <Counter />
          <TaskFlatList />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1F5FE',
    marginTop: 20,
  },
});
