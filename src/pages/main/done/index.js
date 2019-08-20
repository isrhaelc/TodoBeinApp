import React, {Component} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TasksActions from '../../../store/ducks/tasks';

import styles from './styles';

class Done extends Component {
  componentDidMount() {
    const {loadRequest} = this.props;
    loadRequest();
  }

  handleDelete = async task => {
    const {deleteTask} = this.props;
    try {
      deleteTask(task.id);
    } catch (error) {
      alert(error);
    }
  };

  stateTask = async task => {
    const {updateTask} = this.props;
    try {
      updateTask(task, 'inprogress');
    } catch (error) {
      alert(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.listContainer}
          data={this.props.tasks}
          keyExtractor={(item, index) => item.title}
          renderItem={({item}) => (
            <View style={styles.listItem}>
              <View style={styles.infoContainer}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
              </View>
              <View style={styles.actionsContainer}>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={() => this.stateTask(item)}>
                  <Icon name="action-undo" size={25} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={() => this.handleDelete(item)}>
                  <Icon name="trash" size={25} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks.doneTasks,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(TasksActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Done);
